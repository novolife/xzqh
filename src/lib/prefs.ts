export type ThemeId = 'fangyu' | 'jade' | 'ink' | 'lake' | 'night' | 'sand';
export type ListStyleId = 'list' | 'card';

export interface ClientPrefs {
  theme: ThemeId;
  listStyle: ListStyleId;
}

/** Default「方舆」对齐原站 phpwind wind 实测配色。 */
export const THEME_OPTIONS: { id: ThemeId; name: string; desc: string }[] = [
  { id: 'fangyu', name: '方舆', desc: '原站蓝橙' },
  { id: 'jade', name: '青绿', desc: '青绿暖纸' },
  { id: 'ink', name: '墨玉', desc: '冷灰纸白' },
  { id: 'lake', name: '澄湖', desc: '青蓝浅底' },
  { id: 'sand', name: '沙洲', desc: '琥珀浅棕' },
  { id: 'night', name: '夜航', desc: '深色护眼' },
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
};

function isTheme(v: unknown): v is ThemeId {
  return THEME_OPTIONS.some((t) => t.id === v);
}

function isListStyle(v: unknown): v is ListStyleId {
  return LIST_STYLE_OPTIONS.some((t) => t.id === v);
}

export function loadPrefs(): ClientPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<ClientPrefs>;
    return {
      theme: isTheme(parsed.theme) ? parsed.theme : DEFAULTS.theme,
      listStyle: isListStyle(parsed.listStyle) ? parsed.listStyle : DEFAULTS.listStyle,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function savePrefs(patch: Partial<ClientPrefs>): ClientPrefs {
  const next = { ...loadPrefs(), ...patch };
  if (!isTheme(next.theme)) next.theme = DEFAULTS.theme;
  if (!isListStyle(next.listStyle)) next.listStyle = DEFAULTS.listStyle;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: next }));
  return next;
}

export function applyPrefsToElement(el: HTMLElement | null | undefined, prefs: ClientPrefs = loadPrefs()): void {
  if (!el) return;
  el.dataset.theme = prefs.theme;
  el.dataset.list = prefs.listStyle;
}
