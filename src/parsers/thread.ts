import type {
  ForumCategory,
  ForumTypeTab,
  ThreadItem,
  ThreadListResult,
  ThreadTypeTag,
} from '@/lib/types';
import { splitTitleTypes } from '@/lib/title';
import { detectShowMsg } from './showmsg';
import { parseVerifyhash } from './index';

export function parseThreadList(html: string, doc: Document, fid: number, page: number): ThreadListResult {
  const err = detectShowMsg(html, doc);
  if (err) {
    return {
      fid,
      forumName: '',
      threads: [],
      page,
      totalPages: 1,
      types: [],
      sideCategories: parseSideForum(doc),
      canPost: false,
      error: err,
    };
  }

  const forumName =
    doc.title.replace(/\s*-?\s*Powered by phpwind.*/i, '').replace(/^方舆\s*-?\s*/, '').trim() ||
    doc.querySelector('#breadCrumb a:last-of-type')?.textContent?.trim() ||
    `版块 ${fid}`;

  const table = doc.getElementById('ajaxtable') || doc.querySelector('table');
  const threads: ThreadItem[] = [];

  const rows = table
    ? [...table.querySelectorAll('tr.tr3, tr')].filter((tr) => tr.querySelector('a[href*="read.php?tid="]'))
    : [];

  for (const tr of rows) {
    const item = parseThreadRow(tr);
    if (item) threads.push(item);
  }

  const totalPages = parseMaxPage(doc, `thread.php?fid=${fid}`);
  const types = parseForumTypeTabs(doc, fid);
  const sideCategories = parseSideForum(doc);

  const canPost = !!doc.querySelector('a[href*="post.php?fid="]');

  return {
    fid,
    forumName,
    threads,
    page,
    totalPages,
    types,
    sideCategories,
    canPost,
  };
}

/** Original phpwind `#sideForum` board tree on thread.php. */
export function parseSideForum(doc: Document): ForumCategory[] {
  const root = doc.getElementById('sideForum');
  if (!root) return [];
  const categories: ForumCategory[] = [];
  for (const dl of root.querySelectorAll(':scope > dl, dl')) {
    const name = (dl.querySelector('dt')?.textContent || '').replace(/\s+/g, ' ').trim();
    if (!name) continue;
    const boards = [];
    const seen = new Set<number>();
    for (const a of dl.querySelectorAll('dd a[href*="fid="], ul a[href*="fid="]')) {
      const href = a.getAttribute('href') || '';
      const boardFid = Number(href.match(/[?&]fid=(\d+)/)?.[1] || 0);
      const boardName = (a.textContent || '').replace(/\s+/g, ' ').trim();
      if (!boardFid || !boardName || seen.has(boardFid)) continue;
      seen.add(boardFid);
      boards.push({
        fid: boardFid,
        name: boardName,
        topics: 0,
        posts: 0,
        moderators: [] as string[],
      });
    }
    if (boards.length) categories.push({ name, boards });
  }
  return categories;
}

/** Prefer the last type=/special= in href — filtered pages look like type=730&type=66. */
function lastQueryParam(href: string, key: string): string | undefined {
  const re = new RegExp(`[?&]${key}=([^&#]*)`, 'gi');
  let last: string | undefined;
  let m: RegExpExecArray | null;
  while ((m = re.exec(href))) last = m[1];
  return last;
}

/** Only collect classification tabs, not per-thread `[分类]` links. */
function parseForumTypeTabs(doc: Document, fid: number): ForumTypeTab[] {
  const out: ForumTypeTab[] = [];
  const seen = new Set<string>();

  const normalizeName = (raw: string) =>
    raw
      .replace(/[\[\]【】]/g, '')
      .replace(/[▼▽]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const parseLink = (rawName: string, href: string): ForumTypeTab | null => {
    const name = normalizeName(rawName);
    if (!name || /^\d+$/.test(name) || name === '--') return null;
    if (/^(全部|最新发帖|最后回复|新窗)$/.test(name)) return null;

    const typeRaw = lastQueryParam(href, 'type');
    const specialRaw = lastQueryParam(href, 'special');
    const typeId = typeRaw && typeRaw !== '0' ? typeRaw : undefined;
    const specialId = specialRaw && specialRaw !== '0' ? specialRaw : undefined;
    const digest = /[?&]search=digest(?:&|#|$)/i.test(href);
    if (!typeId && !specialId && !digest) return null;

    const id = typeId || specialId || (digest ? 'digest' : '');
    if (!id) return null;

    // Normalize href so navigation does not stack type= params
    let cleanHref = href;
    if (id === 'digest') cleanHref = `thread.php?fid=${fid}&search=digest`;
    else if (specialId && !typeId) cleanHref = `thread.php?fid=${fid}&special=${specialId}`;
    else if (typeId) cleanHref = `thread.php?fid=${fid}&type=${typeId}`;

    return { id, name, href: cleanHref };
  };

  const pushTop = (tab: ForumTypeTab | null) => {
    if (!tab) return;
    const kind = tab.href.includes('special=') ? 's' : tab.id === 'digest' ? 'd' : 't';
    const key = `${kind}:${tab.id}`;
    if (seen.has(key) || seen.has(`n:${tab.name}`)) return;
    seen.add(key);
    seen.add(`n:${tab.name}`);

    const childBox = doc.getElementById(`thread_typechild_${tab.id}`);
    if (childBox) {
      const children: ForumTypeTab[] = [];
      const childSeen = new Set<string>();
      for (const a of childBox.querySelectorAll('a[href*="type="]')) {
        const child = parseLink(a.textContent || '', a.getAttribute('href') || '');
        if (!child || childSeen.has(child.id)) continue;
        childSeen.add(child.id);
        children.push(child);
      }
      if (children.length) tab.children = children;
    }

    out.push(tab);
  };

  // Primary source: phpwind thread type tabs
  const tabLinks = [
    ...doc.querySelectorAll('li[id^="thread_type_"] > a'),
    ...doc.querySelectorAll('a[href*="special=1"][href*="#tabA"]'),
    ...doc.querySelectorAll('a[href*="search=digest"][href*="#tabA"]'),
  ];
  for (const a of tabLinks) {
    if (a.classList.contains('view')) continue;
    pushTop(parseLink(a.textContent || '', a.getAttribute('href') || ''));
  }

  // Fallback if tabs missing: only #tabA filter links, never row tags
  if (!out.length) {
    for (const a of doc.querySelectorAll(`a[href*="thread.php?fid=${fid}"][href*="#tabA"]`)) {
      if (a.classList.contains('view')) continue;
      const href = a.getAttribute('href') || '';
      if (!/[?&](?:type|special)=/.test(href) && !/[?&]search=digest/.test(href)) continue;
      pushTop(parseLink(a.textContent || '', href));
    }
  }

  return out.slice(0, 60);
}

function parseThreadRow(tr: Element): ThreadItem | null {
  // Prefer subject_t link; skip page-number links
  const titleA = (
    (tr.querySelector('a.subject_t[href*="read.php?tid="]') as HTMLAnchorElement | null) ||
    [...tr.querySelectorAll('a[href*="read.php?tid="]')].find((a) => {
      const t = (a.textContent || '').trim();
      return t.length > 1 && !/^\d+$/.test(t) && !a.classList.contains('view');
    })
  ) as HTMLAnchorElement | undefined;
  if (!titleA) return null;

  const tid = Number((titleA.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0);
  if (!tid) return null;

  let title = (titleA.textContent || '').replace(/\s+/g, ' ').trim();
  title = title.replace(/\s+\d+$/, '').trim();

  // Category tags are separate links: <a class="view" href="thread.php?fid=&type=">[欧洲其他]</a>
  const typeTags: ThreadTypeTag[] = [];
  for (const a of tr.querySelectorAll('a.view[href*="type="], a[href*="thread.php"][href*="type="]')) {
    const href = a.getAttribute('href') || '';
    const name = (a.textContent || '').replace(/[\[\]【】]/g, '').trim();
    const typeId = href.match(/[?&]type=(\d+)/)?.[1];
    if (!name) continue;
    if (!typeTags.some((t) => t.name === name)) {
      typeTags.push({ name, typeId, href });
    }
  }

  // Also peel [分类] embedded in title text if present
  const split = splitTitleTypes(title);
  for (const t of split.typeTags) {
    if (!typeTags.some((x) => x.name === t.name)) typeTags.push(t);
  }
  if (typeTags.length) title = split.title || title;

  const imgs = [...tr.querySelectorAll('img')];
  const icons = imgs.map((img) => img.getAttribute('src') || '');
  const topped = icons.some((s) => /headtopic/i.test(s));
  const digest = icons.some((s) => /digest/i.test(s));
  const vote = icons.some((s) => /vote/i.test(s));
  const hasImage = icons.some((s) => /\/img\.gif|image\.gif/i.test(s));
  const isNew = imgs.some((img) => {
    const src = img.getAttribute('src') || '';
    const tip = `${img.getAttribute('alt') || ''}${img.getAttribute('title') || ''}`;
    return /file\/new\.gif/i.test(src) || (/新帖/.test(tip) && /new\.gif/i.test(src));
  });
  const multipage = icons.some((s) => /multipage/i.test(s));

  const authorCells = [...tr.querySelectorAll('td.author')];
  const authorCell = authorCells[0];
  const lastCellEl = authorCells.length > 1 ? authorCells[authorCells.length - 1] : undefined;

  const authorLink = (
    (authorCell?.querySelector('a[href*="u.php"]') as HTMLAnchorElement | null) ||
    ([...tr.querySelectorAll('a[href*="u.php"]')][0] as HTMLAnchorElement | undefined)
  );
  const authorInfo = parseUserLink(authorLink);
  const author = authorInfo.name;
  const authorUid = authorInfo.uid;
  const authorUsername = authorInfo.username;

  const lastLink = lastCellEl?.querySelector('a[href*="u.php"]') as HTMLAnchorElement | null;
  const lastInfo = parseUserLink(lastLink);
  const lastAuthor = lastInfo.name || undefined;
  const lastAuthorUid = lastInfo.uid;
  const lastAuthorUsername = lastInfo.username;

  const cells = [...tr.children].map((td) => (td.textContent || '').replace(/\s+/g, ' ').trim());
  let replies = 0;
  let hits = 0;
  for (const c of cells) {
    const m = c.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (m) {
      replies = Number(m[1]);
      hits = Number(m[2]);
      break;
    }
  }

  const typeName = typeTags?.[typeTags.length - 1]?.name;
  const postDate =
    authorCell?.querySelector('p')?.textContent?.replace(/\s+/g, ' ').trim() ||
    cells.find((c) => /\d{4}-\d{2}-\d{2}/.test(c))?.match(/\d{4}-\d{2}-\d{2}/)?.[0];

  const lastTimeLink = lastCellEl?.querySelector(
    'p a[href*="read.php"], a[href*="read.php"][href*="page=e"]',
  ) as HTMLAnchorElement | null;
  const lastTimeEl = (lastTimeLink || lastCellEl?.querySelector('p')) as HTMLElement | null;
  const lastTime =
    lastTimeEl?.textContent?.replace(/\s+/g, ' ').trim() ||
    (lastCellEl?.textContent || '')
      .replace(lastAuthor || '', '')
      .replace(/\s+/g, ' ')
      .trim() ||
    undefined;
  const lastTimeHref = lastTimeLink?.getAttribute('href') || undefined;

  return {
    tid,
    title,
    author,
    authorUid,
    authorUsername,
    postDate,
    replies,
    hits,
    lastAuthor,
    lastAuthorUid,
    lastAuthorUsername,
    lastTime,
    lastTimeHref,
    topped,
    digest,
    vote,
    hasImage,
    isNew,
    multipage,
    typeName,
    typeTags: typeTags?.length ? typeTags : undefined,
  };
}

function parseUserLink(a: HTMLAnchorElement | null | undefined): {
  name: string;
  uid?: number;
  username?: string;
} {
  if (!a) return { name: '' };
  const href = a.getAttribute('href') || '';
  const name = (a.textContent || '').replace(/\s+/g, ' ').trim();
  const uid = Number(href.match(/[?&]uid=(\d+)/)?.[1] || 0) || undefined;
  let username =
    decodeUriComponentSafe(href.match(/[?&]username=([^&]+)/)?.[1] || '') ||
    a.getAttribute('data-card-key') ||
    undefined;
  if (username) username = username.trim() || undefined;
  if (!username && name && !uid) username = name;
  return { name, uid, username };
}

function decodeUriComponentSafe(s: string): string {
  if (!s) return '';
  try {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  } catch {
    return s;
  }
}

export function parseMaxPage(doc: Document, hint?: string): number {
  let max = 1;
  const fileHint = hint?.split('?')[0].replace(/^\//, '') || '';
  const fidHint = hint?.match(/[?&]fid=(\d+)/)?.[1] || '';

  // Prefer real page= links. Do NOT scrape .pages textContent: phpwind renders
  // "123456...120" without spaces, so /\d+/ becomes 123456.
  for (const a of doc.querySelectorAll('a[href*="page="]')) {
    const href = (a.getAttribute('href') || '').replace(/&amp;/g, '&');
    if (fileHint && !href.includes(fileHint)) continue;
    if (fidHint && !new RegExp(`[?&]fid=${fidHint}(?:&|#|$)`).test(href)) continue;
    const n = Number(href.match(/[?&]page=(\d+)/)?.[1] || 0);
    if (n > max) max = n;
  }

  // phpwind jump box: page=(value>120) ? 120 : value
  for (const el of doc.querySelectorAll('.pages, .pages3')) {
    const blob = el.innerHTML || '';
    for (const m of blob.matchAll(/value\s*>\s*(\d+)/gi)) {
      const n = Number(m[1]);
      if (n > max && n < 100000) max = n;
    }
  }
  return max;
}

export function extractPostForm(doc: Document): { action: string; fields: Record<string, string> } | null {
  const form =
    (doc.querySelector('form[action*="post.php"]') as HTMLFormElement | null) ||
    (doc.querySelector('form[name="FORM"]') as HTMLFormElement | null) ||
    (doc.querySelector('#main form') as HTMLFormElement | null);
  if (!form) return null;

  const fields: Record<string, string> = {};
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name) continue;
    if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) fields[el.name] = el.value;
      continue;
    }
    if (el.type === 'file' || el.type === 'submit' || el.type === 'button') continue;
    fields[el.name] = el.value ?? '';
  }

  const action = form.getAttribute('action') || 'post.php';
  const verify = parseVerifyhash(doc.documentElement.innerHTML);
  if (verify && !fields.verify) fields.verify = verify;

  return { action, fields };
}
