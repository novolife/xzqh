import { absUrl } from '@/lib/http';
import type { ForumBoard, ForumCategory, IndexFeedItem, ThreadItem } from '@/lib/types';

/**
 * phpwind 8.7 index layout on xzqh.info:
 *   <div class="t" id="t_17">
 *     <div class="h">...<h3 class="cateT"><a href="...?cateid=17">区划地名区</a></h3></div>
 *     <table><tbody id="cate_17">
 *       <tr class="tr3" id="fid_3">
 *         <th><h2 class="forumT"><a id="fn_3" href="thread.php?fid=3">区划改革</a></h2>...</th>
 *       </tr>
 *     </tbody></table>
 *   </div>
 */
export function parseIndexForums(doc: Document): ForumCategory[] {
  const fromBlocks = parseByCategoryBlocks(doc);
  if (fromBlocks.length > 0) return fromBlocks;

  const fromRows = parseByTableRows(doc);
  if (fromRows.length > 0) return fromRows;

  return [{ name: '版块', boards: collectBoardsFallback(doc) }];
}

function parseByCategoryBlocks(doc: Document): ForumCategory[] {
  const categories: ForumCategory[] = [];
  const seenFid = new Set<number>();

  // Prefer explicit category containers
  const blocks = [
    ...doc.querySelectorAll('div.t[id^="t_"]'),
    ...doc.querySelectorAll('div.t'),
  ];
  // de-dupe
  const used = new Set<Element>();

  for (const block of blocks) {
    if (used.has(block)) continue;
    used.add(block);

    const cateName = extractCategoryName(block);
    if (!cateName) continue;
    // Skip non-forum blocks like 友情链接
    if (/友情链接|在线用户|联盟|广告/.test(cateName)) continue;

    const boards: ForumBoard[] = [];
    const rows = block.querySelectorAll('tr[id^="fid_"], tr.tr3');
    for (const tr of rows) {
      const board = parseBoardRow(tr);
      if (!board || seenFid.has(board.fid)) continue;
      seenFid.add(board.fid);
      boards.push(board);
    }

    // Fallback: fn_* links inside block
    if (!boards.length) {
      for (const a of block.querySelectorAll('a[id^="fn_"], h2.forumT a[href*="thread.php?fid="]')) {
        const board = parseBoardAnchor(a as HTMLAnchorElement, a.closest('tr') || block);
        if (!board || seenFid.has(board.fid)) continue;
        seenFid.add(board.fid);
        boards.push(board);
      }
    }

    if (boards.length) {
      categories.push({ name: cateName, boards });
    }
  }

  return categories;
}

function extractCategoryName(block: Element): string | null {
  const cateA =
    block.querySelector('h3.cateT a') ||
    block.querySelector('.cateT a') ||
    block.querySelector('a[href*="cateid="]');
  if (cateA) {
    const name = (cateA.textContent || '').replace(/\s+/g, ' ').trim();
    if (name) return name;
  }

  const h = block.querySelector(':scope > .h, .h');
  if (h) {
    // Prefer last meaningful token like 区划地名区; strip 分栏版主 line
    const clone = h.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('a.closeicon, span.fr, script').forEach((n) => n.remove());
    let t = (clone.textContent || '').replace(/\s+/g, ' ').trim();
    t = t.replace(/^分栏版主[:：].*$/u, '').trim();
    // Sometimes name remains only in the cate link we already tried
    const m = (h.textContent || '').match(/(区划地名区|区划相关区|管理交流区|[^\s]{2,12}区)\s*$/);
    if (m) return m[1];
    if (t && t.length <= 20 && !/分栏版主/.test(t)) return t;
  }

  // id="t_17" paired with known names is unreliable; require text
  return null;
}

function parseBoardRow(tr: Element): ForumBoard | null {
  const a =
    (tr.querySelector('a[id^="fn_"]') as HTMLAnchorElement | null) ||
    (tr.querySelector('h2.forumT a[href*="thread.php?fid="]') as HTMLAnchorElement | null) ||
    ([...tr.querySelectorAll('a[href*="thread.php?fid="]')].find((el) => {
      const name = (el.textContent || '').trim();
      return name && !name.startsWith('【') && !/^\d+$/.test(name);
    }) as HTMLAnchorElement | undefined);

  if (!a) return null;
  return parseBoardAnchor(a, tr);
}

function parseBoardAnchor(a: HTMLAnchorElement, scope: Element): ForumBoard | null {
  const href = a.getAttribute('href') || '';
  const fid =
    Number(href.match(/fid=(\d+)/)?.[1] || 0) ||
    Number((a.id || '').match(/fn_(\d+)/)?.[1] || 0) ||
    Number((scope.id || '').match(/fid_(\d+)/)?.[1] || 0);
  const name = (a.textContent || '').replace(/\s+/g, ' ').trim();
  if (!fid || !name || name.startsWith('【')) return null;

  const text = (scope.textContent || '').replace(/\s+/g, ' ').trim();
  const today = Number((scope.querySelector('.f10')?.textContent || text.match(/今日\s*(\d+)/)?.[1] || 0) || 0);

  const desc =
    scope.querySelector(`#desc_${fid}, p[id^="desc_"]`)?.textContent?.replace(/\s+/g, ' ').trim() ||
    undefined;

  const modScope = (scope.querySelector('th') as Element | null) || scope;
  const mods = [...modScope.querySelectorAll('a[href*="u.php"]')]
    .map((el) => (el.textContent || '').trim())
    .filter((n) => n && n !== name);

  const statsCells = [...scope.querySelectorAll('td, span')].map((el) =>
    (el.textContent || '').replace(/\s+/g, ' ').trim(),
  );
  let topics = 0;
  let posts = 0;
  for (const c of statsCells) {
    const m = c.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (m) {
      topics = Number(m[1]);
      posts = Number(m[2]);
      break;
    }
  }
  if (!topics && !posts) {
    const m = text.match(/(\d+)\s*\/\s*(\d+)/);
    if (m) {
      topics = Number(m[1]);
      posts = Number(m[2]);
    }
  }

  const lastA = scope.querySelector('a[href*="read.php?tid="]') as HTMLAnchorElement | null;
  const lastTid = Number((lastA?.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0) || undefined;

  const lastCell = scope.querySelector('td:last-child') || scope;
  const lastAuthor = lastCell.querySelector('a[href*="u.php"]')?.textContent?.trim();
  const lastTime = (lastCell.textContent || '').match(/\d{4}-\d{2}-\d{2}|\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}-\d{2}/)?.[0];

  return {
    fid,
    name,
    description: desc,
    topics,
    posts,
    moderators: unique(mods).slice(0, 8),
    today: today || undefined,
    lastTitle: lastA?.textContent?.trim() || undefined,
    lastTid,
    lastAuthor,
    lastTime,
  };
}

/** Legacy row walk — kept as secondary fallback. */
function parseByTableRows(doc: Document): ForumCategory[] {
  const categories: ForumCategory[] = [];
  let current: ForumCategory | null = null;
  const seenFid = new Set<number>();

  for (const tr of doc.querySelectorAll('tr')) {
    const text = (tr.textContent || '').replace(/\s+/g, ' ').trim();
    const cateInRow = tr.querySelector('h3.cateT a, a[href*="cateid="]');
    if (cateInRow) {
      const name = (cateInRow.textContent || '').trim();
      if (name) {
        current = { name, boards: [] };
        categories.push(current);
        continue;
      }
    }

    const board = parseBoardRow(tr);
    if (!board || seenFid.has(board.fid)) continue;
    // Skip topic-tag style rows without stats/forumT
    if (!tr.querySelector('h2.forumT, a[id^="fn_"]') && !/\/\s*\d+/.test(text)) continue;

    seenFid.add(board.fid);
    if (!current) {
      current = { name: '论坛', boards: [] };
      categories.push(current);
    }
    current.boards.push(board);
  }

  return categories.filter((c) => c.boards.length > 0);
}

/**
 * Parse 最新主题 / 最近回复 from phpwind area tabs:
 *   #tabswi1_A  → nav labels (最新主题 / 最近回复)
 *   #tabswi1_B > .switchItem[i] → corresponding lists
 */
export function parseIndexFeeds(doc: Document): {
  latestTopics: IndexFeedItem[];
  recentReplies: IndexFeedItem[];
} {
  const panel = doc.getElementById('tabswi1_B');
  const switchItems = panel
    ? [...panel.children].filter((el) => el.classList?.contains('switchItem'))
    : [];

  let latestTopics: IndexFeedItem[] = [];
  let recentReplies: IndexFeedItem[] = [];

  if (switchItems.length >= 2) {
    // Tab order: 0=最新主题, 1=最近回复 (confirmed on xzqh.info)
    latestTopics = parseFeedSwitchItem(switchItems[0]);
    recentReplies = parseFeedSwitchItem(switchItems[1]);
  } else if (switchItems.length === 1) {
    latestTopics = parseFeedSwitchItem(switchItems[0]);
  }

  // Fallback if tabs missing
  if (!latestTopics.length) {
    latestTopics = parseLatestThreads(doc).map((t) => ({
      tid: t.tid,
      title: t.title,
    }));
  }

  return { latestTopics, recentReplies };
}

function parseFeedSwitchItem(el: Element): IndexFeedItem[] {
  const items: IndexFeedItem[] = [];
  const seen = new Set<number>();

  // Prefer list items in .newHotB / ul.cc
  const lis = [
    ...el.querySelectorAll('.newHotB li, ul.cc > li, ul li'),
  ].filter((li) => li.querySelector('a[href*="read.php?tid="]'));

  const rows = lis.length ? lis : [...el.querySelectorAll('li, tr')];

  for (const row of rows) {
    const forumA = row.querySelector('a[href*="thread.php?fid="]') as HTMLAnchorElement | null;
    const titleAs = [...row.querySelectorAll('a[href*="read.php?tid="]')] as HTMLAnchorElement[];
    const titleA =
      titleAs.find((a) => ((a.textContent || '').trim().length > 2)) || titleAs[0];
    if (!titleA) continue;

    const tid = Number((titleA.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0);
    const title = (titleA.textContent || '').replace(/\s+/g, ' ').trim();
    if (!tid || !title || seen.has(tid)) continue;
    seen.add(tid);

    const authorA = [...row.querySelectorAll('a[href*="u.php"]')].pop();
    const time =
      (row.textContent || '').match(/\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}:\d{2}/)?.[0];

    items.push({
      tid,
      title,
      forumName: (forumA?.textContent || '').replace(/[【】]/g, '').trim() || undefined,
      fid: Number((forumA?.getAttribute('href') || '').match(/fid=(\d+)/)?.[1] || 0) || undefined,
      author: authorA?.textContent?.trim() || undefined,
      time,
    });
    if (items.length >= 30) break;
  }

  // Featured newHotA headlines as supplement at front for 最新主题 panel
  if (!items.length) {
    for (const a of el.querySelectorAll('dl.newHotA a[href*="read.php?tid="]')) {
      const tid = Number((a.getAttribute('href') || '').match(/tid=(\d+)/)?.[1] || 0);
      const title = (a.textContent || '').trim();
      if (!tid || !title || seen.has(tid)) continue;
      seen.add(tid);
      items.push({ tid, title });
      if (items.length >= 20) break;
    }
  }

  return items;
}

export function parseLatestThreads(doc: Document): ThreadItem[] {
  const { latestTopics } = parseIndexFeeds(doc);
  return latestTopics.map((t) => ({
    tid: t.tid,
    title: t.title,
    author: t.author || '',
    replies: 0,
    hits: 0,
    topped: false,
    digest: false,
    vote: false,
    hasImage: false,
    isNew: false,
    multipage: false,
  }));
}

function collectBoardsFallback(doc: Document): ForumBoard[] {
  const map = new Map<number, ForumBoard>();
  for (const a of doc.querySelectorAll('a[id^="fn_"], h2.forumT a[href*="thread.php?fid="]')) {
    const board = parseBoardAnchor(a as HTMLAnchorElement, a.closest('tr') || a.parentElement || doc.body);
    if (!board || map.has(board.fid)) continue;
    map.set(board.fid, board);
  }
  return [...map.values()];
}

function unique(arr: string[]): string[] {
  return [...new Set(arr)];
}

export function parseVerifyhash(html: string): string {
  return html.match(/verifyhash\s*=\s*['"]([^'"]+)/i)?.[1] || '';
}

export { absUrl };
