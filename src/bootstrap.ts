import { isClientDisabled } from './lib/session';
import { applyFontSizeToDocument, clearFontSizeFromDocument, loadPrefs } from './lib/prefs';

const STYLE_ID = 'xzqh-client-hide-original';
const ROOT_ID = 'xzqh-client-root';

const THEME_BG: Record<string, string> = {
  fangyu: '#e6f3f9',
  jade: '#f3f1eb',
  ink: '#eef1f4',
  lake: '#e9f2f3',
  sand: '#f2ebe3',
  night: '#121820',
  contrast: '#ffffff',
};

/** 这些页面保持原站，客户端不接管（含 SPA 内跳转也要整页离开）。 */
export function isNativeOnlyPath(pathname: string = location.pathname): boolean {
  return /(^|\/)(u|profile|message|searcher)\.php$/i.test(pathname);
}

export function shouldActivate(): boolean {
  if (isClientDisabled()) return false;
  if (!/\/lt(\/|$)/.test(location.pathname)) return false;
  // Don't take over raw asset URLs
  if (/\.(js|css|gif|png|jpg|jpeg|ico|swf|xml)(\?|$)/i.test(location.pathname)) return false;
  if (isNativeOnlyPath()) return false;
  return true;
}

export function installEarlyMask(): void {
  if (document.getElementById(STYLE_ID)) return;
  const bg = THEME_BG[loadPrefs().theme] || THEME_BG.fangyu;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html.xzqh-client-active body > :not(#${ROOT_ID}) { display: none !important; }
    html.xzqh-client-active, html.xzqh-client-active body {
      margin: 0 !important;
      padding: 0 !important;
      background: ${bg} !important;
      min-height: 100%;
    }
    #${ROOT_ID} {
      display: block !important;
      min-height: 100vh;
      position: relative;
      z-index: 2147483646;
      zoom: var(--xzqh-font-factor, 1);
    }
  `;
  (document.documentElement || document.head || document).appendChild(style);
  document.documentElement.classList.add('xzqh-client-active');
  applyFontSizeToDocument(loadPrefs().fontScale);
}

export function ensureRoot(): HTMLElement {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = ROOT_ID;
    const mount = () => {
      if (!document.body) return false;
      if (!root!.parentElement) document.body.appendChild(root!);
      applyFontSizeToDocument(loadPrefs().fontScale);
      return true;
    };
    if (!mount()) {
      document.addEventListener('DOMContentLoaded', () => mount(), { once: true });
      const iv = setInterval(() => {
        if (mount()) clearInterval(iv);
      }, 10);
    }
  } else {
    applyFontSizeToDocument(loadPrefs().fontScale);
  }
  return root;
}

export function teardownClient(): void {
  clearFontSizeFromDocument();
  document.documentElement.classList.remove('xzqh-client-active');
  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(ROOT_ID)?.remove();
}
