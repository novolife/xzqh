export type ThemeId = 'fangyu' | 'jade' | 'ink' | 'lake' | 'night' | 'sand' | 'contrast';
export type ListStyleId = 'list' | 'card';

/** 客户端默认基准字号（px）。 */
export const FONT_SIZE_BASE_PX = 14;

export interface ClientPrefs {
  theme: ThemeId;
  listStyle: ListStyleId;
  /** 相对基准的缩放：-100%→一半，0%→基准，+100%→两倍。 */
  fontScale: number;
}

/** Default「方舆」对齐原站 phpwind wind 实测配色。 */
export const THEME_OPTIONS: { id: ThemeId; name: string; desc: string }[] = [
  { id: 'fangyu', name: '方舆', desc: '原站蓝橙' },
  { id: 'jade', name: '青绿', desc: '青绿暖纸' },
  { id: 'ink', name: '墨玉', desc: '冷灰纸白' },
  { id: 'lake', name: '澄湖', desc: '青蓝浅底' },
  { id: 'sand', name: '沙洲', desc: '琥珀浅棕' },
  { id: 'night', name: '夜航', desc: '深色护眼' },
  { id: 'contrast', name: '高对比', desc: '黑白分明' },
];

export const LIST_STYLE_OPTIONS: { id: ListStyleId; name: string; desc: string }[] = [
  { id: 'list', name: '列表式', desc: '紧凑分行，信息密度高' },
  { id: 'card', name: '卡片式', desc: '分块卡片，层次更清晰' },
];

const STORAGE_KEY = 'xzqh_client_prefs';
export const PREFS_EVENT = 'xzqh:prefs';

const DEFAULTS: ClientPrefs = {
  theme: 'fangyu',
  listStyle: 'list',
  fontScale: 0,
};

function isTheme(v: unknown): v is ThemeId {
  return THEME_OPTIONS.some((t) => t.id === v);
}

function isListStyle(v: unknown): v is ListStyleId {
  return LIST_STYLE_OPTIONS.some((t) => t.id === v);
}

/** -100%→0.5×，0%→1×，+100%→2×（例：14 → 7 / 14 / 28）。 */
export function fontScaleFactor(percent: number): number {
  return Math.pow(2, clampFontScale(percent) / 100);
}

export function fontScaleToPx(percent: number, base = FONT_SIZE_BASE_PX): number {
  return Math.round(base * fontScaleFactor(percent) * 10) / 10;
}

export function clampFontScale(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return DEFAULTS.fontScale;
  // 兼容旧版绝对 px 档位 12/14/16/18
  if (n === 12 || n === 14 || n === 16 || n === 18) {
    return Math.round(100 * Math.log2(n / FONT_SIZE_BASE_PX));
  }
  return Math.max(-100, Math.min(100, Math.round(n)));
}

function readFontScale(parsed: Record<string, unknown>): number {
  if ('fontScale' in parsed) return clampFontScale(parsed.fontScale);
  // 旧字段 fontSize
  if ('fontSize' in parsed) return clampFontScale(parsed.fontSize);
  return DEFAULTS.fontScale;
}

export function loadPrefs(): ClientPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      theme: isTheme(parsed.theme) ? parsed.theme : DEFAULTS.theme,
      listStyle: isListStyle(parsed.listStyle) ? parsed.listStyle : DEFAULTS.listStyle,
      fontScale: readFontScale(parsed),
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function savePrefs(patch: Partial<ClientPrefs>): ClientPrefs {
  const next = { ...loadPrefs(), ...patch };
  if (!isTheme(next.theme)) next.theme = DEFAULTS.theme;
  if (!isListStyle(next.listStyle)) next.listStyle = DEFAULTS.listStyle;
  next.fontScale = clampFontScale(next.fontScale);
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        theme: next.theme,
        listStyle: next.listStyle,
        fontScale: next.fontScale,
      }),
    );
  } catch {
    /* ignore */
  }
  applyFontSizeToDocument(next.fontScale);
  window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: next }));
  return next;
}

/** 与 Layout / 列表样式一致：窄屏不启用字号缩放。 */
export const FONT_SCALE_NARROW_MQ = '(max-width: 860px)';

export function isFontScaleNarrow(): boolean {
  try {
    return window.matchMedia(FONT_SCALE_NARROW_MQ).matches;
  } catch {
    return false;
  }
}

/**
 * 全局缩放：对 #xzqh-client-root 使用 zoom，整棵 UI（文字/间距/行内样式）一起变。
 * rem 基准固定为默认字号，避免与 zoom 叠乘。
 * 0% → 1×（14px），-100% → 0.5×，+100% → 2×。
 * 窄屏强制 1×，不应用字号调整。
 */
export function applyFontSizeToDocument(scale: number = loadPrefs().fontScale): void {
  const html = document.documentElement;
  if (!html.classList.contains('xzqh-client-active')) return;
  const pct = clampFontScale(scale);
  const narrow = isFontScaleNarrow();
  const factor = narrow ? 1 : fontScaleFactor(pct);
  const px = narrow ? FONT_SIZE_BASE_PX : fontScaleToPx(pct);

  html.style.fontSize = `${FONT_SIZE_BASE_PX}px`;
  html.style.setProperty('--xzqh-font-factor', String(factor));
  html.dataset.xzqhFont = String(px);
  html.dataset.xzqhFontScale = String(pct);
  html.dataset.xzqhFontNarrow = narrow ? '1' : '0';

  const root = document.getElementById('xzqh-client-root');
  if (root) {
    root.style.setProperty('--xzqh-font-factor', String(factor));
    root.style.zoom = String(factor);
  }
}

export function clearFontSizeFromDocument(): void {
  const html = document.documentElement;
  html.style.removeProperty('font-size');
  html.style.removeProperty('--xzqh-font-factor');
  delete html.dataset.xzqhFont;
  delete html.dataset.xzqhFontScale;
  delete html.dataset.xzqhFontNarrow;
  const root = document.getElementById('xzqh-client-root');
  if (root) {
    root.style.removeProperty('zoom');
    root.style.removeProperty('--xzqh-font-factor');
  }
}

export function applyPrefsToElement(el: HTMLElement | null | undefined, prefs: ClientPrefs = loadPrefs()): void {
  if (!el) return;
  el.dataset.theme = prefs.theme;
  el.dataset.list = prefs.listStyle;
  el.dataset.fontScale = String(prefs.fontScale);
  applyFontSizeToDocument(prefs.fontScale);
}
