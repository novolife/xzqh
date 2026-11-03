import type { ForumError } from '@/lib/types';

export function detectShowMsg(html: string, doc?: Document): ForumError | null {
  const title =
    doc?.title ||
    match1(html, /<title>([^<]+)/i) ||
    '';
  const isTip = /提示信息/.test(title) || /class="[^"]*f14[^"]*"/.test(html) && /您没有登录|没有权限|只有注册会员/.test(html);

  if (!isTip && !/您没有登录或者您没有权限访问此页面/.test(html)) {
    // Still catch common messages
    if (!/只有注册会员才能进入|暂时不能使用此功能|没有权限访问/.test(html)) {
      return null;
    }
  }

  const raw =
    extractListMessages(doc) ||
    match1(html, /可能有如下几个原因[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i) ||
    match1(html, /class="[^"]*tip[^"]*"[^>]*>([\s\S]*?)<\//i) ||
    '';

  const text = stripTags(raw)
    .replace(/\s+/g, ' ')
    .trim() || guessMessage(html);

  const kind: ForumError['kind'] = /登录|注册会员|还不是站点会员|没有登录/.test(text)
    ? 'login_required'
    : /权限/.test(text)
      ? 'permission'
      : 'unknown';

  return { kind, message: text || '无权访问或需要登录' };
}

function extractListMessages(doc?: Document): string {
  if (!doc) return '';
  const items = [...doc.querySelectorAll('ul li, .tip ul li, #main li')].map((li) =>
    (li.textContent || '').trim(),
  );
  const useful = items.filter((t) => /登录|权限|会员|注册|不能/.test(t));
  return useful.join(' ');
}

function guessMessage(html: string): string {
  if (/只有注册会员才能进入/.test(html)) return '本版块为正规版块，只有注册会员才能进入！请先登录。';
  if (/暂时不能使用此功能/.test(html)) return '您还没有登录或注册，暂时不能使用此功能！';
  if (/没有权限/.test(html)) return '您没有权限访问此页面。';
  return '服务器返回了提示信息。';
}

function stripTags(s: string): string {
  return s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
}

function match1(s: string, re: RegExp): string | undefined {
  const m = s.match(re);
  return m?.[1];
}
