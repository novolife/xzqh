import { useEffect, useRef, useState } from 'preact/hooks';

type ViewerImage = { src: string; alt: string };
type ViewerSession = { images: ViewerImage[]; index: number };
type Frame = { zoom: number; tx: number; ty: number };
type ViewModel = Frame & {
  fit: number;
  nw: number;
  nh: number;
  mode: 'fit' | 'free';
};

const CONTENT_SELECTOR = '.xzqh-floor-bd, .xzqh-vote, .xzqh-ed-preview';
const MIN_ZOOM = 0.05;
const MAX_ZOOM = 8;

let session: ViewerSession | null = null;
const listeners = new Set<(next: ViewerSession | null) => void>();

function emit() {
  listeners.forEach((fn) => fn(session));
}

function openViewer(images: ViewerImage[], index: number) {
  if (!images.length) return;
  const i = Math.min(images.length - 1, Math.max(0, index));
  session = { images, index: i };
  emit();
}

function closeViewer() {
  if (!session) return;
  session = null;
  emit();
}

function moveViewer(delta: number) {
  if (!session) return;
  const next = session.index + delta;
  if (next < 0 || next >= session.images.length) return;
  session = { images: session.images, index: next };
  emit();
}

function isSkippable(img: HTMLImageElement): boolean {
  if (img.classList.contains('wc-smile')) return true;
  if (img.closest('.xzqh-avatar, .xzqh-brand, .xzqh-viewer')) return true;
  const src = `${img.getAttribute('src') || ''} ${img.currentSrc || ''}`;
  if (/\/images\/post\/smile\//i.test(src)) return true;
  if (!(img.getAttribute('src') || img.currentSrc)) return true;
  return false;
}

/** 链接若指向原图或附件，用它代替缩略图地址。 */
function fullSrc(img: HTMLImageElement): string {
  const raw = img.currentSrc || img.getAttribute('src') || '';
  const anchor = img.closest('a');
  const href = anchor?.href || '';
  if (href && isFullImageHref(href)) return href;
  try {
    return new URL(raw, location.href).href;
  } catch {
    return raw;
  }
}

function isFullImageHref(href: string): boolean {
  try {
    const url = new URL(href, location.href);
    if (/\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url.pathname)) return true;
    if (/\/attachment\//i.test(url.pathname)) return true;
    if (/job\.php$/i.test(url.pathname) && /(?:^|[?&])action=download(?:&|$)/i.test(url.search)) return true;
    return false;
  } catch {
    return false;
  }
}

function blankView(): ViewModel {
  return { zoom: 1, tx: 0, ty: 0, fit: 1, nw: 0, nh: 0, mode: 'fit' };
}

function limits(fit: number) {
  return {
    min: Math.min(fit * 0.5, 0.5, Math.max(MIN_ZOOM, fit)),
    max: Math.max(MAX_ZOOM, fit),
  };
}

export function ImageViewer() {
  const [current, setCurrent] = useState<ViewerSession | null>(session);
  const [frame, setFrame] = useState<Frame & { src: string }>({ zoom: 1, tx: 0, ty: 0, src: '' });
  const [errorSrc, setErrorSrc] = useState('');
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const view = useRef<ViewModel>(blankView());
  const movedRef = useRef(false);

  const image = current ? current.images[current.index] : undefined;
  const src = image?.src || '';
  const seenSrc = useRef(src);
  if (seenSrc.current !== src) {
    seenSrc.current = src;
    view.current = blankView();
  }
  const failed = !!src && errorSrc === src;
  const ready = !!src && frame.src === src && !failed;

  useEffect(() => subscribeViewer(setCurrent), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const img = target.closest('img');
      if (!(img instanceof HTMLImageElement)) return;
      const container = img.closest(CONTENT_SELECTOR);
      if (!container || isSkippable(img)) return;
      const nodes = [...container.querySelectorAll('img')].filter(
        (node): node is HTMLImageElement => node instanceof HTMLImageElement && !isSkippable(node),
      );
      const index = nodes.indexOf(img);
      if (index < 0) return;
      const images: ViewerImage[] = [];
      let openIndex = -1;
      for (const node of nodes) {
        const item = { src: fullSrc(node), alt: node.alt || '' };
        if (!item.src) continue;
        if (node === img) openIndex = images.length;
        images.push(item);
      }
      if (!images.length || openIndex < 0) return;
      e.preventDefault();
      e.stopPropagation();
      openViewer(images, openIndex);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (!current) return;
    const prevBody = document.body.style.overflow;
    const prevRoot = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevRoot;
    };
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if (e.key === 'Escape') {
        e.preventDefault();
        closeViewer();
        return;
      }
      if (typing) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveViewer(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveViewer(1);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomBy(1.25);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomBy(1 / 1.25);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const onResize = () => {
      if (!view.current.nw) return;
      const fit = computeFit(view.current.nw, view.current.nh);
      view.current.fit = fit;
      if (view.current.mode === 'fit') {
        publish(fit, 0, 0, 'fit');
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [current, src]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!current || !stage) return;
    const pointers = new Map<number, { x: number; y: number }>();
    let drag: { x: number; y: number; tx: number; ty: number } | null = null;
    let pinch: { dist: number; zoom: number } | null = null;

    const onWheel = (e: WheelEvent) => {
      if (!view.current.nw) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      applyZoom(view.current.zoom * factor, e.clientX, e.clientY);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!view.current.nw) return;
      stage.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size >= 2) {
        const [a, b] = [...pointers.values()];
        pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: view.current.zoom };
        drag = null;
        return;
      }
      drag = { x: e.clientX, y: e.clientY, tx: view.current.tx, ty: view.current.ty };
      setDragging(true);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size >= 2 && pinch) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        applyZoom(pinch.zoom * (dist / pinch.dist), (a.x + b.x) / 2, (a.y + b.y) / 2);
        movedRef.current = true;
        return;
      }
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (Math.hypot(dx, dy) > 4) movedRef.current = true;
      applyPan(drag.tx + dx, drag.ty + dy);
    };
    const endPointer = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 1) {
        const rest = [...pointers.values()][0];
        drag = { x: rest.x, y: rest.y, tx: view.current.tx, ty: view.current.ty };
      } else {
        drag = null;
        setDragging(false);
      }
    };
    const onDblClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLImageElement) || !view.current.nw) return;
      e.preventDefault();
      const fit = view.current.fit;
      if (Math.abs(view.current.zoom - fit) < 0.02) {
        const next = Math.min(limits(fit).max, Math.max(fit * 2, 1));
        applyZoom(next, e.clientX, e.clientY);
      } else {
        applyFit();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }
      const target = e.target;
      if (!(target instanceof Element) || target.closest('img')) return;
      closeViewer();
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);
    stage.addEventListener('dblclick', onDblClick);
    stage.addEventListener('click', onClick);
    return () => {
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', endPointer);
      stage.removeEventListener('pointercancel', endPointer);
      stage.removeEventListener('dblclick', onDblClick);
      stage.removeEventListener('click', onClick);
    };
  }, [current, src]);

  function stageBox() {
    const el = stageRef.current;
    if (!el) return { w: window.innerWidth, h: window.innerHeight, left: 0, top: 0 };
    const rect = el.getBoundingClientRect();
    return { w: rect.width, h: rect.height, left: rect.left, top: rect.top };
  }

  function computeFit(nw: number, nh: number) {
    const { w, h } = stageBox();
    const availW = Math.max(80, w - 48);
    const availH = Math.max(80, h - 96);
    if (!nw || !nh) return 1;
    return Math.min(availW / nw, availH / nh);
  }

  function clampPan(tx: number, ty: number, zoom: number) {
    const { w, h } = stageBox();
    const iw = view.current.nw * zoom;
    const ih = view.current.nh * zoom;
    const maxX = Math.max(0, (iw - w) / 2);
    const maxY = Math.max(0, (ih - h) / 2);
    return {
      tx: Math.min(maxX, Math.max(-maxX, tx)),
      ty: Math.min(maxY, Math.max(-maxY, ty)),
    };
  }

  function publish(zoom: number, tx: number, ty: number, mode: 'fit' | 'free') {
    view.current.zoom = zoom;
    view.current.tx = tx;
    view.current.ty = ty;
    view.current.mode = mode;
    setFrame({ zoom, tx, ty, src });
  }

  function applyZoom(next: number, clientX: number, clientY: number) {
    const v = view.current;
    if (!v.nw) return;
    const { min, max } = limits(v.fit);
    const zoom = Math.min(max, Math.max(min, next));
    const box = stageBox();
    const cx = box.left + box.w / 2;
    const cy = box.top + box.h / 2;
    const px = (clientX - cx - v.tx) / (v.zoom || 1);
    const py = (clientY - cy - v.ty) / (v.zoom || 1);
    const pan = clampPan(clientX - cx - px * zoom, clientY - cy - py * zoom, zoom);
    publish(zoom, pan.tx, pan.ty, Math.abs(zoom - v.fit) < 0.01 ? 'fit' : 'free');
  }

  function applyPan(tx: number, ty: number) {
    const pan = clampPan(tx, ty, view.current.zoom);
    publish(view.current.zoom, pan.tx, pan.ty, view.current.mode);
  }

  function applyFit() {
    const zoom = view.current.fit || 1;
    publish(zoom, 0, 0, 'fit');
  }

  function applyOriginal() {
    const zoom = Math.min(limits(view.current.fit).max, Math.max(limits(view.current.fit).min, 1));
    const pan = clampPan(0, 0, zoom);
    publish(zoom, pan.tx, pan.ty, 'free');
  }

  function zoomBy(factor: number) {
    const box = stageBox();
    applyZoom(view.current.zoom * factor, box.left + box.w / 2, box.top + box.h / 2);
  }

  function onLoad(e: Event) {
    const img = e.currentTarget;
    if (!(img instanceof HTMLImageElement) || !img.naturalWidth) return;
    const fit = computeFit(img.naturalWidth, img.naturalHeight);
    view.current.nw = img.naturalWidth;
    view.current.nh = img.naturalHeight;
    view.current.fit = fit;
    publish(fit, 0, 0, 'fit');
  }

  if (!current || !image) return null;

  const count = current.images.length;
  const atStart = current.index <= 0;
  const atEnd = current.index >= count - 1;

  return (
    <div class="xzqh-viewer" role="dialog" aria-modal="true" aria-label="图片查看">
      <button
        ref={closeRef}
        type="button"
        class="xzqh-viewer-close"
        aria-label="关闭"
        title="关闭"
        onClick={closeViewer}
      >
        ×
      </button>
      <div
        class={`xzqh-viewer-stage${dragging ? ' is-dragging' : ''}`}
        ref={stageRef}
      >
        {!ready && !failed && <div class="xzqh-viewer-status">加载中…</div>}
        {failed && <div class="xzqh-viewer-status">图片加载失败</div>}
        <img
          key={src}
          class={`xzqh-viewer-img${ready ? '' : ' is-pending'}`}
          src={src}
          alt={image.alt}
          draggable={false}
          style={{
            transform: `translate(calc(-50% + ${frame.tx}px), calc(-50% + ${frame.ty}px)) scale(${frame.zoom})`,
          }}
          onLoad={onLoad}
          onError={() => setErrorSrc(src)}
        />
      </div>
      <div class="xzqh-viewer-bar">
        {count > 1 && (
          <button type="button" class="xzqh-viewer-btn" disabled={atStart} onClick={() => moveViewer(-1)}>
            上一张
          </button>
        )}
        <button type="button" class="xzqh-viewer-btn" onClick={() => zoomBy(1 / 1.25)} disabled={!ready}>
          缩小
        </button>
        <button type="button" class="xzqh-viewer-btn" onClick={applyFit} disabled={!ready}>
          适应
        </button>
        <button type="button" class="xzqh-viewer-btn" onClick={applyOriginal} disabled={!ready}>
          原尺寸
        </button>
        <button type="button" class="xzqh-viewer-btn" onClick={() => zoomBy(1.25)} disabled={!ready}>
          放大
        </button>
        {ready && <span class="xzqh-viewer-pct">{Math.round(frame.zoom * 100)}%</span>}
        {count > 1 && (
          <button type="button" class="xzqh-viewer-btn" disabled={atEnd} onClick={() => moveViewer(1)}>
            下一张
          </button>
        )}
        {count > 1 && (
          <span class="xzqh-viewer-pct">
            {current.index + 1} / {count}
          </span>
        )}
        <a class="xzqh-viewer-btn" href={src} target="_blank" rel="noreferrer">
          新标签打开
        </a>
      </div>
    </div>
  );
}

function subscribeViewer(fn: (next: ViewerSession | null) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
