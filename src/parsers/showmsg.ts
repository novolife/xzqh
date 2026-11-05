import type { ForumError } from '@/lib/types';

/**
 * 识别 phpwind「提示信息」页。勿用过宽规则：
 * 普通帖页常有 .f14、侧栏「权限」、页脚「会员列表」，不能据此判为提示页。
 */
export function detectShowMsg(html: string, doc?: Document): ForumError | null {
  const title =
    doc?.title ||
    match1(html, /<title>([^<]+)/i) ||
    '';
  const tipTitle = /提示信息/.test(title);
  const hardPhrase =
    /您没有登录或者您没有权限访问此页面|只有注册会员才能进入|暂时不能使用此功能|您没有权限访问此页面|还不是站点会员/.test(
      html,
    );

  if (!tipTitle && !hardPhrase) return null;

  const raw =
    extractTipMessages(doc) ||
    match1(html, /可能有如下几个原因[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i) ||
    match1(html, /class="[^"]*tip[^"]*"[^>]*>([\s\S]*?)<\//i) ||
    '';

  const text =
    stripTags(raw)
      .replace(/\s+/g, ' ')
      .trim() || guessMessage(html);

  // 仍像整页乱抓（过长 / 夹带会员列表），退回短提示
  const message =
    text.length > 180 || /会员列表|会员排行|最后登录\d{4}/.test(text)
      ? guessMessage(html)
      : text || '无权访问或需要登录';

  const kind: ForumError['kind'] = /登录|注册会员|还不是站点会员|没有登录/.test(message)
    ? 'login_required'
    : /权限/.test(message)
      ? 'permission'
      : 'unknown';

  return { kind, message };
}

/** 只从提示框取 li，避免扫到全站页脚会员排行。 */
function extractTipMessages(doc?: Document): string {
  if (!doc) return '';
  const scopes = [
    ...doc.querySelectorAll(
      '.regIgnore, .regForm-wrap .f14, .f14.mb5, .tip ul, .t .tip, #notice, .tipw, #main .t3, #main .t .f14',
    ),
  ];
  if (!scopes.length && /提示信息/.test(doc.title || '')) {
    scopes.push(...doc.querySelectorAll('#main'));
  }
  const items: string[] = [];
  for (const scope of scopes) {
    for (const li of scope.querySelectorAll('li')) {
      const t = (li.textContent || '').replace(/\s+/g, ' ').trim();
      if (
        t &&
        /登录|权限|注册|不能|会员才能|不存在|禁止|非法|错误|关闭|未/.test(t) &&
        !/会员列表|会员排行|最后登录|注册时间|登录IP/.test(t)
      ) {
        items.push(t);
      }
    }
    if (!items.length) {
      const p = (scope.textContent || '').replace(/\s+/g, ' ').trim();
      if (
        p &&
        /登录|权限|注册|不能|不存在|禁止|非法|错误|关闭|未/.test(p) &&
        p.length < 200
      ) {
        items.push(p);
      }
    }
  }
  return [...new Set(items)].join(' ');
}

function guessMessage(html: string): string {
  if (/只有注册会员才能进入/.test(html)) return '本版块为正规版块，只有注册会员才能进入！请先登录。';
  if (/暂时不能使用此功能/.test(html)) return '您还没有登录或注册，暂时不能使用此功能！';
  if (/您没有登录或者您没有权限访问此页面|您没有权限访问此页面/.test(html))
    return '您没有登录或者您没有权限访问此页面。';
  if (/帖子不存在|主题不存在|版块不存在|该帖不存在/.test(html))
    return '主题或版块不存在，或已被删除。';
  if (/非法请求|undefined_action|illegal_request/.test(html))
    return '请求参数无效或已过期，请刷新后重试。';
  if (/没有权限/.test(html) && /提示信息/.test(html)) return '您没有权限访问此页面。';
  return '服务器返回了提示信息。';
}

function stripTags(s: string): string {
  return s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
}

function match1(s: string, re: RegExp): string | undefined {
  const m = s.match(re);
  return m?.[1];
}
