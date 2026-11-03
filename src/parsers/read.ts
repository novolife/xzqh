import type { AttachmentItem, PostFloor, ThreadDetail } from '@/lib/types';
import { absUrl } from '@/lib/http';
import { detectShowMsg } from './showmsg';
import { parseVerifyhash } from './index';
import { parseMaxPage, extractPostForm } from './thread';
import { enhanceContentHtml } from '@/windcode';
import { splitTitleTypes } from '@/lib/title';
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

  const rawTitle =
    cleanTitle(doc.title) ||
    doc.querySelector('h1, .read_h1, #subject_tpc, span#subject_tpc')?.textContent?.trim() ||
    '';

  // Category links near subject, e.g. [欧洲其他]
  const typeTags: ThreadTypeTag[] = [];
  for (const a of doc.querySelectorAll(
    '#breadCrumb a[href*="type="], .breadCrumb a[href*="type="], a.view[href*="type="], h1 a[href*="type="]',
  )) {
    const href = a.getAttribute('href') || '';
    const name = (a.textContent || '').replace(/[\[\]【】]/g, '').trim();
    const typeId = href.match(/[?&]type=(\d+)/)?.[1];
    if (!name) continue;
    if (!typeTags.some((t) => t.name === name)) typeTags.push({ name, typeId, href });
  }
  const split = splitTitleTypes(rawTitle);
  for (const t of split.typeTags) {
    if (!typeTags.some((x) => x.name === t.name)) typeTags.push(t);
  }
  const title = typeTags.length ? split.title || rawTitle : rawTitle;

  const fid = Number(
    html.match(/\bfid\s*=\s*['"]?(\d+)/i)?.[1] ||
      (doc.querySelector('a[href*="thread.php?fid="]') as HTMLAnchorElement | null)?.href?.match(
        /fid=(\d+)/,
      )?.[1] ||
      0,
  );

  const forumName = [...doc.querySelectorAll('#breadCrumb a, .breadCrumb a')]
    .map((a) => a.textContent?.trim() || '')
    .filter((t) => t && t !== '方舆' && !/新帖|精华/.test(t))
    .pop();

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
    replyForm: replyFields,
  };
}

function cleanTitle(t: string): string {
  return t
    .replace(/\s*-?\s*Powered by phpwind.*/i, '')
    .replace(/^方舆\s*-?\s*/, '')
    .trim();
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
    el.querySelector('[id^="read_"]:not([id^="read_send"]):not([id^="readFace"]):not([id^="readfloor"])') ||
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

  // pid from readfloor_123 / read_123 / name=post_123
  const pid = Number(
    (el.id || '').match(/readfloor_(\d+)/)?.[1] ||
      (contentEl.id || '').match(/^read_(\d+)$/)?.[1] ||
      (el.querySelector('a[name^="post_"]')?.getAttribute('name') || '').match(/post_(\d+)/)?.[1] ||
      0,
  );

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

  const attachments = parseAttachments(contentEl);
  const contentHtml = enhanceContentHtml(contentEl.innerHTML);

  return {
    pid: pid || idx + 1,
    floor: displayFloor,
    author,
    authorUid,
    avatarUrl,
    postDate: postDate || undefined,
    contentHtml,
    canEdit,
    canDelete,
    canQuote,
    attachments,
  };
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
