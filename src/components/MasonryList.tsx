import type { ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { PREFS_EVENT } from '@/lib/prefs';
import { layoutMasonry, resetMasonry, shouldUseMasonry } from '@/lib/masonry';

export function MasonryList(props: {
  children: ComponentChildren;
  className?: string;
  style?: preact.JSX.CSSProperties;
  /** 数据变化时重排（如帖子列表 tid 拼接） */
  layoutKey?: string | number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!el.isConnected) return;
        if (shouldUseMasonry(el)) layoutMasonry(el);
        else resetMasonry(el);
      });
    };

    schedule();

    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    const mo = new MutationObserver(schedule);
    mo.observe(el, { childList: true, subtree: true, characterData: true });

    const onPrefs = () => schedule();
    window.addEventListener(PREFS_EVENT, onPrefs);
    window.addEventListener('resize', schedule);

    // 图片等异步撑高
    el.querySelectorAll('img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', schedule, { once: true });
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener(PREFS_EVENT, onPrefs);
      window.removeEventListener('resize', schedule);
      resetMasonry(el);
    };
  }, [props.layoutKey, props.children]);

  return (
    <div
      ref={ref}
      class={`xzqh-list${props.className ? ` ${props.className}` : ''}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
