/** 最短列瀑布流：按 DOM 序依次放入当前最矮列（同高取最左）→ 先横后竖且行高不拉齐。 */

export type MasonryOptions = {
  minColWidth?: number;
  gap?: number;
  /** 最多列数，默认 8 */
  maxCols?: number;
};

export function resetMasonry(container: HTMLElement): void {
  container.classList.remove('xzqh-masonry-on');
  container.style.removeProperty('height');
  container.style.removeProperty('position');
  for (const child of Array.from(container.children) as HTMLElement[]) {
    child.style.removeProperty('position');
    child.style.removeProperty('left');
    child.style.removeProperty('top');
    child.style.removeProperty('width');
    child.style.removeProperty('min-height');
    const sub = child.querySelector('.xzqh-subject-line') as HTMLElement | null;
    sub?.style.removeProperty('min-height');
  }
}

export function layoutMasonry(container: HTMLElement, opts: MasonryOptions = {}): void {
  const gap = opts.gap ?? 12;
  const minColWidth = opts.minColWidth ?? 168;
  const maxCols = opts.maxCols ?? 8;
  const items = Array.from(container.children) as HTMLElement[];
  if (!items.length) {
    resetMasonry(container);
    return;
  }

  const width = container.clientWidth;
  if (width <= 0) return;

  const cols = Math.min(
    maxCols,
    Math.max(1, Math.floor((width + gap) / (minColWidth + gap))),
  );
  const colW = (width - gap * (cols - 1)) / cols;
  const colH = new Array(cols).fill(0);

  container.classList.add('xzqh-masonry-on');
  container.style.position = 'relative';

  // 卡片只定宽；正方形下限在 .xzqh-subject-line
  for (const item of items) {
    item.style.position = 'absolute';
    item.style.width = `${colW}px`;
    item.style.height = 'auto';
    item.style.removeProperty('min-height');
    item.style.left = '0';
    item.style.top = '0';
    const sub = item.querySelector('.xzqh-subject-line') as HTMLElement | null;
    if (sub) {
      const sw = sub.clientWidth || Math.max(0, colW - 20);
      sub.style.minHeight = `${sw}px`;
    }
  }

  // 强制回流后再量高；多量一次避免 meta 换行后高度低估、底部被盖住
  void container.offsetHeight;

  const place = () => {
    colH.fill(0);
    for (const item of items) {
      let col = 0;
      for (let i = 1; i < cols; i++) {
        if (colH[i] < colH[col]) col = i;
      }
      const h = Math.max(item.offsetHeight, item.scrollHeight);
      item.style.left = `${col * (colW + gap)}px`;
      item.style.top = `${colH[col]}px`;
      colH[col] += h + gap;
    }
    const total = Math.max(0, ...colH) - (items.length ? gap : 0);
    container.style.height = `${Math.max(0, total)}px`;
  };

  place();
  void container.offsetHeight;
  place();
}

export function shouldUseMasonry(listEl: HTMLElement): boolean {
  if (listEl.classList.contains('xzqh-home-feed-list')) return false;
  const app = listEl.closest('.xzqh-app');
  return app?.getAttribute('data-list') === 'card';
}
