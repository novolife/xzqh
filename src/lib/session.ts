import type { SessionUser } from './types';

const FALLBACK_COOKIE_PREFIX = '5e062_';

export function detectCookiePrefix(): string {
  const m = document.cookie.match(/(?:^|;\s*)([0-9a-f]+)_lastvisit=/i);
  if (m) return `${m[1]}_`;
  const any = document.cookie.match(/(?:^|;\s*)([0-9a-f]+)_c_stamp=/i);
  if (any) return `${any[1]}_`;
  return FALLBACK_COOKIE_PREFIX;
}

/**
 * winduser is HttpOnly on this site — document.cookie cannot see it.
 * Prefer HTML globals (winduid/windid) or quit-link presence.
 */
export function hasWinduserCookie(): boolean {
  const prefix = detectCookiePrefix();
  return new RegExp(`(?:^|;\\s*)${prefix}winduser=`).test(document.cookie);
}

/**
 * Parse session from a fresh forum HTML response (e.g. index.php).
 * Do NOT use the SPA-hijacked document — it keeps the first paint.
 */
export function parseSessionFromHtml(html: string): SessionUser {
  const verifyhash = match1(html, /verifyhash\s*=\s*['"]([^'"]+)/i) || '';

  const winduid = Number(
    match1(html, /\bwinduid\s*=\s*['"](\d+)['"]/i) ||
      match1(html, /\bwinduid\s*=\s*(\d+)\s*;/i) ||
      '0',
  );

  const windid = sanitizeUsername(
    match1(html, /\bwindid\s*=\s*['"]([^'"]*)['"]/i) ||
      match1(html, /\bUSERNAME\s*=\s*['"]([^'"]*)['"]/i) ||
      '',
  );

  const groupid = Number(
    match1(html, /\bgroupid\s*=\s*['"](-?\d+)['"]/i) ||
      match1(html, /\bgroupid\s*=\s*(-?\d+)\s*;/i) ||
      '0',
  );

  let username = windid;
  let uid = winduid;

  const header = extractHeaderUser(html);
  if (!username && header.username) username = header.username;
  if (uid <= 0 && header.uid) uid = header.uid;

  // This forum: logged-in pages always include quit link
  const hasQuit = /login\.php\?action=quit/i.test(html);
  const loggedIn = uid > 0 || (hasQuit && !!username);

  return {
    uid,
    username: username || (loggedIn ? '已登录' : '游客'),
    groupid,
    verifyhash,
    loggedIn: uid > 0 || hasQuit,
  };
}

export function parseSessionFromDocument(doc: Document = document): SessionUser {
  return parseSessionFromHtml(doc.documentElement?.innerHTML || '');
}

function extractHeaderUser(html: string): { username?: string; uid?: number } {
  // Site-specific: <dl class="login"> ... #td_userinfomore > a > span
  const loginDl = match1(html, /<dl class=["']login["']>([\s\S]*?)<\/dl>/i) || '';
  if (loginDl) {
    const name =
      sanitizeUsername(match1(loginDl, /id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i) || '') ||
      sanitizeUsername(match1(loginDl, /<img[^>]+alt=["']([^"']+)["']/i) || '');
    const uid =
      Number(match1(loginDl, /attachment\/upload\/small\/\d+\/(\d+)\.(?:png|jpe?g|gif)/i) || '0') ||
      Number(match1(loginDl, /u\.php\?uid=(\d+)/i) || '0') ||
      undefined;
    if (name || uid) return { username: name || undefined, uid: uid || undefined };
  }

  const more = match1(html, /id=["']td_userinfomore["']([\s\S]{0,500})/i) || '';
  if (more) {
    const name = sanitizeUsername(match1(more, /<span>([^<]+)<\/span>/i) || '');
    if (name) return { username: name };
  }

  const quitIdx = html.search(/login\.php\?action=quit/i);
  if (quitIdx >= 0) {
    const windowHtml = html.slice(Math.max(0, quitIdx - 2000), quitIdx + 200);
    const uid =
      Number(match1(windowHtml, /attachment\/upload\/small\/\d+\/(\d+)\./i) || '0') ||
      Number(match1(windowHtml, /u\.php\?uid=(\d+)/i) || '0') ||
      undefined;
    const name = sanitizeUsername(
      match1(windowHtml, /id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i) ||
        match1(windowHtml, /<img[^>]+alt=["']([^"']+)["']/i) ||
        '',
    );
    if (name || uid) return { username: name || undefined, uid };
  }

  return {};
}

export function extractQuitVerify(html: string): string {
  return (
    match1(html, /login\.php\?action=quit[^"'>\s]*[?&]verify=([a-f0-9]+)/i) ||
    match1(html, /login\.php\?action=quit&amp;verify=([a-f0-9]+)/i) ||
    ''
  );
}

function sanitizeUsername(name: string): string {
  const t = name.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  if (
    /^(输入用户名|用户名|密码|登录|注册|退出|发帖|搜索|游客|已登录|个人中心|方舆|消息|设置|帐号|权限)$/.test(
      t,
    )
  ) {
    return '';
  }
  if (t.length > 30) return '';
  return t;
}

function match1(s: string, re: RegExp): string | undefined {
  const m = s.match(re);
  return m?.[1];
}

export const STORAGE_DISABLED_KEY = 'xzqh_client_disabled';

export function isClientDisabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_DISABLED_KEY) === '1';
  } catch {
    return false;
  }
}

export function setClientDisabled(disabled: boolean): void {
  try {
    if (disabled) localStorage.setItem(STORAGE_DISABLED_KEY, '1');
    else localStorage.removeItem(STORAGE_DISABLED_KEY);
  } catch {
    /* ignore */
  }
}
