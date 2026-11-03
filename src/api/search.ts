import { fetchHtml, parseDocument, postForm, qs } from '@/lib/http';
import { detectShowMsg } from '@/parsers/showmsg';
import { parseVerifyhash } from '@/parsers/index';
import type { SearchResultItem } from '@/lib/types';

export async function searchForum(opts: {
  keyword: string;
  type?: string;
  digest?: boolean;
  schTime?: string;
  page?: number;
  verifyhash?: string;
}): Promise<{ items: SearchResultItem[]; error?: string; page: number }> {
  if (opts.schTime || opts.digest) {
    const path =
      `searcher.php` +
      qs({
        sch_time: opts.schTime,
        digest: opts.digest ? 1 : undefined,
        page: opts.page || 1,
        keyword: opts.keyword || undefined,
      });
    const { html } = await fetchHtml(path);
    return parseSearchResults(html, opts.page || 1);
  }

  let verify = opts.verifyhash;
  if (!verify) {
    const { html } = await fetchHtml('index.php');
    verify = parseVerifyhash(html);
  }

  const { html } = await postForm('searcher.php', {
    verify: verify || '',
    step: '2',
    type: opts.type || 'thread',
    keyword: opts.keyword,
  });
  return parseSearchResults(html, opts.page || 1);
}

function parseSearchResults(html: string, page: number): { items: SearchResultItem[]; error?: string; page: number } {
  const doc = parseDocument(html);
  const err = detectShowMsg(html, doc);
  if (err) return { items: [], error: err.message, page };

  const items: SearchResultItem[] = [];
  const seen = new Set<number>();
  for (const a of doc.querySelectorAll('a[href*="read.php?tid="]')) {
    const tid = Number((a.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0);
    const title = (a.textContent || '').trim();
    if (!tid || !title || seen.has(tid)) continue;
    seen.add(tid);
    const row = a.closest('tr, li, div');
    const author = row?.querySelector('a[href*="u.php"]')?.textContent?.trim();
    items.push({ tid, title, author });
    if (items.length >= 50) break;
  }
  return { items, page };
}
