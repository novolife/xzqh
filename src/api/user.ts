import { absUrl, fetchHtml, parseDocument, qs } from '@/lib/http';
import { detectShowMsg } from '@/parsers/showmsg';
import type { ThreadItem, UserProfile } from '@/lib/types';

export async function fetchUserProfile(opts: {
  uid?: number;
  username?: string;
}): Promise<{ profile?: UserProfile; threads: ThreadItem[]; error?: string }> {
  const path =
    `u.php` +
    qs({
      uid: opts.uid,
      username: opts.username,
    });
  const { html } = await fetchHtml(path);
  const doc = parseDocument(html);
  const err = detectShowMsg(html, doc);
  if (err) return { threads: [], error: err.message };

  const username =
    doc.querySelector('.u-name, .username, h1')?.textContent?.trim() ||
    opts.username ||
    '用户';
  const uid =
    opts.uid ||
    Number(html.match(/uid=(\d+)/)?.[1] || 0) ||
    Number((doc.querySelector('a[href*="uid="]') as HTMLAnchorElement | null)?.href?.match(/uid=(\d+)/)?.[1] || 0);

  const avatar =
    (doc.querySelector('img.pic, .user-face img, .face img') as HTMLImageElement | null)?.src ||
    undefined;

  const credits: Record<string, string> = {};
  for (const li of doc.querySelectorAll('li, tr, .u-info span')) {
    const t = (li.textContent || '').replace(/\s+/g, ' ').trim();
    const m = t.match(/^(发帖|积分|威望|金钱|贡献|精华)[:：\s]+(.+)$/);
    if (m) credits[m[1]] = m[2];
  }

  const groupName =
    (html.match(/用户组[:：]\s*([^<\n]+)/)?.[1] || '').trim() ||
    doc.querySelector('.group, .level')?.textContent?.trim();

  const threads: ThreadItem[] = [];
  const seen = new Set<number>();
  for (const a of doc.querySelectorAll('a[href*="read.php?tid="]')) {
    const tid = Number((a.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0);
    const title = (a.textContent || '').trim();
    if (!tid || !title || seen.has(tid)) continue;
    seen.add(tid);
    threads.push({
      tid,
      title,
      author: username,
      replies: 0,
      hits: 0,
      topped: false,
      digest: false,
      vote: false,
      hasImage: false,
      isNew: false,
      multipage: false,
    });
    if (threads.length >= 30) break;
  }

  return {
    profile: {
      uid,
      username,
      groupName,
      credits,
      avatarUrl: avatar ? absUrl(avatar) : undefined,
      signatureHtml: doc.querySelector('.signature, .sign')?.innerHTML,
    },
    threads,
  };
}
