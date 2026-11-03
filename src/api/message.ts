import { fetchHtml, parseDocument, postForm, qs } from '@/lib/http';
import { detectShowMsg } from '@/parsers/showmsg';
import { parseVerifyhash } from '@/parsers/index';
import type { MessageItem } from '@/lib/types';

export async function fetchMessages(): Promise<{ items: MessageItem[]; error?: string }> {
  const { html } = await fetchHtml('message.php');
  const doc = parseDocument(html);
  const err = detectShowMsg(html, doc);
  if (err) return { items: [], error: err.message };

  const items: MessageItem[] = [];
  for (const a of doc.querySelectorAll('a[href*="message.php"], a[href*="mid="]')) {
    const href = a.getAttribute('href') || '';
    const title = (a.textContent || '').trim();
    if (!title || title.length < 1) continue;
    if (!/mid=|type=|action=/.test(href) && !href.includes('message.php')) continue;
    const row = a.closest('tr, li');
    items.push({
      id: href.match(/mid=(\d+)/)?.[1] || String(items.length),
      from: row?.querySelector('a[href*="u.php"]')?.textContent?.trim() || '',
      title,
      href,
      unread: /new|未读|strong/.test(row?.innerHTML || ''),
    });
    if (items.length >= 50) break;
  }

  // Also notice links
  if (!items.length) {
    for (const tr of doc.querySelectorAll('tr')) {
      const t = (tr.textContent || '').trim();
      if (t.length < 4) continue;
      const a = tr.querySelector('a') as HTMLAnchorElement | null;
      if (!a) continue;
      items.push({
        id: String(items.length),
        from: '',
        title: (a.textContent || t).trim().slice(0, 80),
        href: a.getAttribute('href') || 'message.php',
      });
      if (items.length >= 30) break;
    }
  }

  return { items };
}

export async function sendMessage(opts: {
  to: string;
  title: string;
  content: string;
  verifyhash?: string;
}): Promise<{ ok: boolean; message: string }> {
  let verify = opts.verifyhash;
  if (!verify) {
    const { html } = await fetchHtml('message.php');
    verify = parseVerifyhash(html);
  }
  const { html } = await postForm('message.php?type=post', {
    verify: verify || '',
    step: '2',
    usernames: opts.to,
    msg_title: opts.title,
    msg_content: opts.content,
    atc_content: opts.content,
  });
  if (/成功|已发送/.test(html)) return { ok: true, message: '发送成功' };
  const err = detectShowMsg(html, parseDocument(html));
  return { ok: false, message: err?.message || html.replace(/<[^>]+>/g, ' ').trim().slice(0, 160) || '发送失败' };
}

/**
 * Unread count from message center.
 * Do NOT use pw_ajax.php?action=msg — it returns "请指定发送的用户" XML whose
 * version="1.0" was previously misparsed as unread=1.
 *
 * Authoritative marker on this site:
 *   <a href="message.php?type=sms&action=unread"><b>0</b>条未读消息</a>
 * Also check tab <em> badges next to 站内信/通知/请求.
 */
export async function fetchUnreadHint(_verifyhash?: string): Promise<number> {
  try {
    const { html } = await fetchHtml('message.php', { cache: 'no-store' });
    if (/提示信息|没有登录/.test(html) && !/条未读消息/.test(html)) return 0;

    const unreadLink = html.match(
      /message\.php\?[^"'<>]*action=unread[^"'<>]*?>[\s\S]*?<b>\s*(\d+)\s*<\/b>\s*条未读/i,
    );
    if (unreadLink) return Number(unreadLink[1] || 0);

    const plain = html.match(/<b>\s*(\d+)\s*<\/b>\s*条未读消息/i);
    if (plain) return Number(plain[1] || 0);

    // Sum non-empty orange <em> counts on message type tabs if present
    const doc = parseDocument(html);
    let sum = 0;
    for (const em of doc.querySelectorAll('a[href*="message.php?type="] em')) {
      const n = Number((em.textContent || '').replace(/\D/g, '') || 0);
      if (n > 0) sum += n;
    }
    return sum;
  } catch {
    return 0;
  }
}
