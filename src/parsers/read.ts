import type {
  AttachmentItem,
  FloorRating,
  FloorRatingChange,
  FloorRatingEntry,
  PostFloor,
  ThreadDetail,
} from '@/lib/types';
import { absUrl } from '@/lib/http';
import { detectShowMsg } from './showmsg';
import { parseVerifyhash } from './index';
import { parseMaxPage, extractPostForm } from './thread';
import { enhanceContentHtml, escapeHtml, wrapWithElementFont } from '@/windcode';
import { splitTitleTypes, stripForumTitlePrefix } from '@/lib/title';
import type { ThreadTypeTag } from '@/lib/types';

export function parseThreadDetail(html: string, doc: Document, tid: number, page: number): ThreadDetail {
  const err = detectShowMsg(html, doc);
  const verifyhash = parseVerifyhash(html);

  if (err) {
    return {
      tid,
      fid: 0,
      title: '',
      floors: [],
      page,
      totalPages: 1,
      canReply: false,
      canFavor: false,
      isVote: false,
      verifyhash,
      error: err,
    };
  }

  // Prefer on-page subject (has [分类] link); document.title wrongly embeds 版块名.
  const rawTitle =
    extractSubjectTitle(doc) ||
    cleanTitle(doc.title) ||
    '';

  // Category links near subject, e.g. [欧洲其他]
  const typeTags: ThreadTypeTag[] = [];
  for (const a of doc.querySelectorAll(
    '#breadCrumb a[href*="type="], .breadCrumb a[href*="type="], a.view[href*="type="], h1 a[href*="type="], #subject_tpc a[href*="type="]',
  )) {
    const href = a.getAttribute('href') || '';
    const name = (a.textContent || '').replace(/[\[\]【】]/g, '').trim();
    const typeId = href.match(/[?&]type=(\d+)/)?.[1];
    if (!name || /倒序|收藏|复制/.test(name)) continue;
    if (!typeTags.some((t) => t.name === name)) typeTags.push({ name, typeId, href });
  }
  const split = splitTitleTypes(rawTitle);
  for (const t of split.typeTags) {
    if (!typeTags.some((x) => x.name === t.name)) typeTags.push(t);
  }
  let title = typeTags.length ? split.title || rawTitle : rawTitle;

  const crumbForum = [...doc.querySelectorAll('#breadCrumb a, .breadCrumb a')].find((a) => {
    const href = a.getAttribute('href') || '';
    return /thread\.php\?[^#]*\bfid=\d+/i.test(href) && !/[?&]type=/.test(href);
  });
  const forumName =
    crumbForum?.textContent?.trim() ||
    [...doc.querySelectorAll('#breadCrumb a, .breadCrumb a')]
      .map((a) => ({
        text: a.textContent?.trim() || '',
        href: a.getAttribute('href') || '',
      }))
      .filter(
        (t) =>
          t.text &&
          t.text !== '方舆' &&
          !/新帖|精华/.test(t.text) &&
          !/read\.php\?.*\btid=/i.test(t.href),
      )
      .map((t) => t.text)[0];

  const fid = Number(
    crumbForum?.getAttribute('href')?.match(/fid=(\d+)/)?.[1] ||
      html.match(/\bfid\s*=\s*['"]?(\d+)/i)?.[1] ||
      (doc.querySelector('a[href*="thread.php?fid="]') as HTMLAnchorElement | null)?.href?.match(
        /fid=(\d+)/,
      )?.[1] ||
      0,
  );

  title = stripForumTitlePrefix(title, forumName);

  const floors = parseFloors(doc);
  const totalPages = parseMaxPage(doc);
  const canReply = !!doc.querySelector(
    'a[href*="post.php"][href*="tid="], textarea[name="atc_content"], #fastpostform',
  );
  const canFavor = /favor|收藏/.test(html);
  const isVote = !!doc.querySelector('form[action*="vote"], .vote');
  const voteEl = doc.querySelector('.vote, form[action*="job.php?action=vote"]');
  const voteHtml = voteEl ? enhanceContentHtml(voteEl.innerHTML) : undefined;

  const replyForm = extractPostForm(doc);
  const fast = doc.querySelector('#fastpostform, form[name="FORM"]') as HTMLFormElement | null;
  let replyFields = replyForm?.fields;
  if (fast) {
    replyFields = {};
    for (const el of Array.from(fast.elements) as HTMLInputElement[]) {
      if (!el.name || el.type === 'file' || el.type === 'submit' || el.type === 'button') continue;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) continue;
      replyFields[el.name] = el.value ?? '';
    }
    if (verifyhash) replyFields.verify = verifyhash;
  }
  // 原站脚本会把 _hexie 占位值替换成真实值；DOMParser 不执行脚本，需手动提取。
  const hexie = html.match(/document\.FORM\._hexie\.value\s*=\s*'([^']+)'/i)?.[1];
  if (replyFields && hexie) replyFields._hexie = hexie;

  return {
    tid,
    fid,
    title,
    typeTags: typeTags.length ? typeTags : undefined,
    forumName,
    floors,
    page,
    totalPages,
    canReply,
    canFavor,
    isVote,
    voteHtml,
    verifyhash,
    replyAction: replyForm?.action || (fast?.getAttribute('action') || undefined),
    replyForm: replyFields,
  };
}

function cleanTitle(t: string): string {
  return t
    .replace(/\s*-?\s*Powered by phpwind.*/i, '')
    .replace(/^方舆\s*-?\s*/, '')
    .trim();
}

/** Subject from read page h1, without [复制链接] and other chrome. */
function extractSubjectTitle(doc: Document): string {
  const el =
    doc.querySelector('#subject_tpc, span#subject_tpc, h1.read_h1, .read_h1') ||
    doc.querySelector('h1');
  if (!el) return '';
  const clone = el.cloneNode(true) as HTMLElement;
  for (const n of clone.querySelectorAll(
    'a.gray, a[onclick*="copyUrl"], a[title*="复制"], script, style',
  )) {
    n.remove();
  }
  return (clone.textContent || '').replace(/\s+/g, ' ').trim();
}

/**
 * xzqh.info read page floors:
 *   <div class="read_t" id="readfloor_tpc|readfloor_{pid}">
 *     <table class="floot">
 *       <td class="floot_left">
 *         <div class="readName"><a href="u.php?uid=...">用户名</a></div>
 *         <div class="readFace">...<img class="pic" src="attachment/upload/middle/../{uid}.jpg">
 *       <td>... tipTop floor# / date ...
 *           <div id="read_{pid}" class="f14">content / .tpc_content
 */
function parseFloors(doc: Document): PostFloor[] {
  const floors: PostFloor[] = [];
  const blocks = [...doc.querySelectorAll('div.read_t')];

  if (blocks.length) {
    blocks.forEach((el, idx) => {
      const floor = parseReadFloor(el, idx);
      if (floor) floors.push(floor);
    });
    return floors;
  }

  // Fallback for other templates
  const contents = [...doc.querySelectorAll('.tpc_content, [id^="read_"]:not([id^="read_send"]):not([id^="readFace"]):not([id^="readfloor"])')];
  contents.forEach((c, idx) => {
    const block = c.closest('div.read_t, table.floot, .t5') || c.parentElement;
    if (!block) return;
    const floor = parseReadFloor(block, idx);
    if (floor) floors.push(floor);
  });

  return floors;
}

function parseReadFloor(el: Element, idx: number): PostFloor | null {
  const contentEl =
    el.querySelector('.tpc_content') ||
    el.querySelector(
      '[id^="read_"]:not([id^="read_send"]):not([id^="readFace"]):not([id^="readfloor"]):not([id^="read_Att"])',
    ) ||
    el.querySelector('#read_tpc');

  if (!contentEl) return null;

  // Author: prefer .readName link (left column), never fall back to random u.php in content
  const authorA =
    (el.querySelector('.readName a[href*="u.php"]') as HTMLAnchorElement | null) ||
    (el.querySelector('td.floot_left a[href*="u.php?uid="]') as HTMLAnchorElement | null);

  let author = authorA?.textContent?.replace(/\s+/g, ' ').trim() || '';
  let authorUid = Number((authorA?.getAttribute('href') || '').match(/uid=(\d+)/)?.[1] || 0) || undefined;

  // Avatar from left face area (visible userCard img, not only hidden card)
  const avatarImg =
    (el.querySelector('td.floot_left .readFace a.userCard img.pic') as HTMLImageElement | null) ||
    (el.querySelector('td.floot_left .readFace img.pic') as HTMLImageElement | null) ||
    (el.querySelector('td.floot_left a.face_img img') as HTMLImageElement | null);

  let avatarUrl = avatarImg?.getAttribute('src') || undefined;
  if (avatarUrl) avatarUrl = absUrl(avatarUrl);

  // Infer uid from avatar path .../171465.jpg if missing
  if (!authorUid && avatarUrl) {
    authorUid = Number(avatarUrl.match(/\/(\d+)\.(?:png|jpe?g|gif)/i)?.[1] || 0) || undefined;
  }
  if (!author && authorUid) author = `用户${authorUid}`;
  if (!author) author = '匿名';

  // Floor number from tipTop copyFloorUrl link text, or index
  const floorNumEl = el.querySelector('.tipTop a.s2, .tipTop a[onclick*="copyFloorUrl"]');
  let floor = Number((floorNumEl?.textContent || '').trim() || 0);
  if (!floor) {
    if (/readfloor_tpc/i.test(el.id) || contentEl.id === 'read_tpc') floor = 0; // 楼主
    else floor = idx;
  }
  // Display 楼主 as floor 0 → UI can show 楼主; keep numeric: 0 for OP, else N
  const displayFloor = /readfloor_tpc/i.test(el.id) || contentEl.id === 'read_tpc' ? 0 : floor || idx;

  // Prefer real post id from edit/quote links or read_{pid} / post_{pid}
  const editHref =
    (el.querySelector('a[href*="action=modify"]') as HTMLAnchorElement | null)?.getAttribute('href') ||
    '';
  const quoteHref =
    (el.querySelector('a[href*="action=quote"]') as HTMLAnchorElement | null)?.getAttribute('href') ||
    '';
  // pid 既可能是数字，也可能是楼主首楼的 'tpc'，必须保留原始字符串。
  const linkPidRaw =
    editHref.match(/[?&]pid=([^&#]+)/)?.[1] ||
    quoteHref.match(/[?&]pid=([^&#]+)/)?.[1] ||
    '';
  const linkPid = /^\d+$/.test(linkPidRaw) ? Number(linkPidRaw) : 0;
  const articleMatch =
    editHref.match(/[?&]article=(\d+)/) || quoteHref.match(/[?&]article=(\d+)/);
  const articleFromLink = articleMatch ? Number(articleMatch[1]) : undefined;
  const pid = Number(
    linkPid ||
      (contentEl.id || '').match(/^read_(\d+)$/)?.[1] ||
      (el.id || '').match(/readfloor_(\d+)/)?.[1] ||
      (el.querySelector('a[name^="post_"]')?.getAttribute('name') || '').match(/post_(\d+)/)?.[1] ||
      (el.querySelector('a[name^="a"][name*="ajax"]')?.getAttribute('name') || '').match(/(\d+)/)?.[1] ||
      0,
  );
  const pidParam =
    linkPidRaw ||
    (pid ? String(pid) : '') ||
    (/readfloor_tpc/i.test(el.id) || contentEl.id === 'read_tpc' ? 'tpc' : '');

  // Date: prefer title attribute on tipTop span
  const dateSpan = el.querySelector('.tipTop span[title]');
  const postDate =
    dateSpan?.getAttribute('title') ||
    (el.querySelector('.tipTop')?.textContent || '').match(
      /\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}(?::\d{2})?/,
    )?.[0] ||
    (el.textContent || '').match(/发表于[:：]\s*([^\s]+(?:\s+\d{2}:\d{2})?)/)?.[1];

  const canEdit =
    /编辑/.test(el.innerHTML) &&
    !!el.querySelector('a[href*="modify"], a[href*="action=modify"]');
  const canDelete =
    /删除/.test(el.innerHTML) && !!el.querySelector('a[href*="del"], a[onclick*="del"]');
  const canQuote =
    /引用|回复/.test(el.innerHTML) ||
    !!el.querySelector('a[href*="quote"], a[onclick*="quote"], a[onclick*="postreply"]');

  const attachImages = parseReadAttachBlock(el, contentEl);
  const attachments = dedupeAttachments([...parseAttachments(contentEl), ...attachImages]);
  const contentHtml =
    enhanceContentHtml(wrapWithElementFont(contentEl, contentEl.innerHTML)) +
    attachImagesHtml(attachImages);
  const rating = parseFloorRating(el);

  return {
    pid: pid || 0,
    pidParam: pidParam || String(pid || idx + 1),
    floor: displayFloor,
    article:
      articleFromLink !== undefined
        ? articleFromLink
        : displayFloor > 0
          ? displayFloor
          : undefined,
    author,
    authorUid,
    avatarUrl,
    postDate: postDate || undefined,
    contentHtml,
    canEdit,
    canDelete,
    canQuote,
    attachments,
    rating,
  };
}

/** 原站 `.read_score`：无评分时 `display:none`，有记录时展示条数、汇总和明细。 */
function parseFloorRating(el: Element): FloorRating | undefined {
  const box = el.querySelector('.read_score, [id^="mark_"]');
  if (!box) return undefined;
  if (/display\s*:\s*none/i.test(box.getAttribute('style') || '')) return undefined;

  const entries = [...box.querySelectorAll('tr[id^="pingLogTr_"]')]
    .map(parseRatingRow)
    .filter((row): row is FloorRatingEntry => !!row);
  const countText = (box.querySelector('[id^="pingNum_"]')?.textContent || '').trim();
  const count = Number(countText) || entries.length;
  if (count <= 0 && entries.length === 0) return undefined;

  return {
    count: count || entries.length,
    totals: parseCreditChanges(box.querySelector('[id^="pingTotal_"]')),
    entries,
  };
}

function parseRatingRow(tr: Element): FloorRatingEntry | null {
  const userLink = tr.querySelector('a[href*="u.php"]') as HTMLAnchorElement | null;
  const username = (userLink?.textContent || '').replace(/\s+/g, ' ').trim();
  if (!username) return null;
  const uid = Number((userLink?.getAttribute('href') || '').match(/uid=(\d+)/)?.[1] || 0) || undefined;
  const cells = [...tr.children].filter((node) => node.tagName === 'TD');
  const reasonText = (cells[2]?.textContent || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const reason = !reasonText || /^[-—－]+$/.test(reasonText) ? undefined : reasonText;
  const time = (tr.querySelector('.read_score_time')?.textContent || cells[3]?.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();
  return {
    username,
    uid,
    changes: parseCreditChanges(cells[1] || null),
    reason,
    time: time || undefined,
  };
}

function parseCreditChanges(root: Element | null): FloorRatingChange[] {
  if (!root) return [];
  const valueSpans = [...root.querySelectorAll('span')].filter((span) => {
    if (span.querySelector('span')) return false;
    return /^[+-]\d+/.test((span.textContent || '').replace(/\s+/g, ''));
  });
  const changes = valueSpans.map((span) => {
    const value = (span.textContent || '').replace(/\s+/g, '');
    const holder = span.parentElement && span.parentElement !== root ? span.parentElement : span;
    let name = '';
    if (holder !== span) {
      const clone = holder.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('span').forEach((node) => node.remove());
      name = (clone.textContent || '').replace(/\u00a0/g, ' ').replace(/[，,]/g, ' ').replace(/\s+/g, ' ').trim();
    }
    if (!name) {
      const parts: string[] = [];
      let prev = span.previousSibling;
      while (prev) {
        if (prev.nodeType === Node.TEXT_NODE) parts.unshift(prev.textContent || '');
        prev = prev.previousSibling;
      }
      name = parts.join('').replace(/\u00a0/g, ' ').replace(/[，,]/g, '').replace(/\s+/g, ' ').trim();
    }
    return { name, value };
  });
  if (changes.length) return changes;

  const text = (root.textContent || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const matched = text.match(/([^\d+\-，,\s]+)\s*([+-]\d+)/);
  return matched ? [{ name: matched[1], value: matched[2] }] : [];
}

/**
 * 原站把插入的图片放在正文外的 `#read_Att_* .imgList`，不在 `.tpc_content` 里。
 * 例如 attachment/*.gif。这里收进来，稍后插回正文以便显示和打开查看器。
 */
function parseReadAttachBlock(floor: Element, contentEl: Element): AttachmentItem[] {
  const block = floor.querySelector('[id^="read_Att_"]');
  if (!block || contentEl.contains(block)) return [];
  const inContent = new Set(
    [...contentEl.querySelectorAll('img')]
      .map((img) => absUrl(img.getAttribute('src')))
      .filter(Boolean),
  );
  const items: AttachmentItem[] = [];
  const seen = new Set<string>();
  for (const img of block.querySelectorAll('img[src*="attachment/"]')) {
    if (img.closest('.pw_menu')) continue;
    const url = absUrl(img.getAttribute('src'));
    if (!url || seen.has(url) || inContent.has(url)) continue;
    seen.add(url);
    const li = img.closest('li');
    const raw = (li?.querySelector('[id^="att_pic_"]:not([id*="_sub"])')?.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    const name = raw.replace(/^图片\s*[:：]\s*/, '').trim() || '图片';
    items.push({ name, url, isImage: true });
  }
  for (const a of block.querySelectorAll('a[href*="job.php?action=download"], a[href*="attachment/"]')) {
    if (a.querySelector('img')) continue;
    const url = absUrl(a.getAttribute('href'));
    if (!url || seen.has(url) || inContent.has(url)) continue;
    seen.add(url);
    const name = (a.textContent || '').replace(/\s+/g, ' ').trim() || '附件';
    const isImage = /\.(png|jpe?g|gif|webp|bmp)(?:$|\?)/i.test(url);
    items.push({ name, url, isImage });
  }
  return items;
}

function attachImagesHtml(items: AttachmentItem[]): string {
  return items
    .filter((item) => item.isImage && item.url)
    .map(
      (item) =>
        `<p class="xzqh-attach-img"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.name)}" loading="lazy" /></p>`,
    )
    .join('');
}

function dedupeAttachments(items: AttachmentItem[]): AttachmentItem[] {
  const seen = new Set<string>();
  const out: AttachmentItem[] = [];
  for (const item of items) {
    const key = item.url || `${item.name}-${item.isImage}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function parseAttachments(scope: Element): AttachmentItem[] {
  const items: AttachmentItem[] = [];
  for (const a of scope.querySelectorAll('a[href*="job.php?action=download"], a[href*="attachment/"]')) {
    const href = absUrl(a.getAttribute('href'));
    const name = (a.textContent || '').trim() || '附件';
    const aid = Number(href.match(/aid=(\d+)/)?.[1] || 0) || undefined;
    items.push({ aid, name, url: href, isImage: false });
  }
  for (const img of scope.querySelectorAll('img[src*="attachment/"], img[src*="job.php"]')) {
    // Skip face avatars mistakenly inside content
    if (img.closest('.readFace, .floot_left')) continue;
    const src = absUrl(img.getAttribute('src'));
    if (!src) continue;
    items.push({ name: '图片附件', url: src, isImage: true });
  }
  return items;
}
