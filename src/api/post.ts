import { fetchHtml, parseDocument, postForm, postMultipart, qs, forumUrl } from '@/lib/http';
import { extractPostForm } from '@/parsers/thread';
import { parseVerifyhash } from '@/parsers/index';
import { detectShowMsg } from '@/parsers/showmsg';
import type { PostFormMeta } from '@/lib/types';

export async function loadComposeForm(opts: {
  fid: number;
  tid?: number;
  quotePid?: number;
  editPid?: number;
}): Promise<PostFormMeta> {
  let path: string;
  if (opts.editPid && opts.tid) {
    path = `post.php` + qs({ action: 'modify', tid: opts.tid, pid: opts.editPid });
  } else if (opts.tid && opts.quotePid) {
    path = `post.php` + qs({ fid: opts.fid, tid: opts.tid, action: 'quote', pid: opts.quotePid });
  } else if (opts.tid) {
    path = `post.php` + qs({ fid: opts.fid, tid: opts.tid });
  } else {
    path = `post.php` + qs({ fid: opts.fid });
  }

  const { html } = await fetchHtml(path);
  const doc = parseDocument(html);
  const err = detectShowMsg(html, doc);
  if (err) {
    throw new Error(err.message);
  }

  const extracted = extractPostForm(doc);
  const verifyhash = parseVerifyhash(html) || extracted?.fields.verify || '';
  const fields = extracted?.fields || { verify: verifyhash, fid: String(opts.fid) };
  if (opts.tid) fields.tid = String(opts.tid);

  const titleRequired = !opts.tid || !!doc.querySelector('input[name="atc_title"]');
  const uploadEnabled = !!doc.querySelector('input[type="file"]');

  return {
    action: extracted?.action || path,
    fields,
    verifyhash,
    titleRequired,
    uploadEnabled,
  };
}

export async function submitPost(opts: {
  action: string;
  fields: Record<string, string>;
  title?: string;
  content: string;
  files?: File[];
}): Promise<{ ok: boolean; message: string; redirect?: string }> {
  const data = { ...opts.fields };
  if (opts.title !== undefined) data.atc_title = opts.title;
  data.atc_content = opts.content;
  if (!data.ajax) data.ajax = '1';
  if (!data.nowtime) {
    /* query param handled below */
  }

  const actionUrl = opts.action.includes('http')
    ? opts.action
    : forumUrl(opts.action);
  const u = new URL(actionUrl, forumUrl(''));
  if (!u.searchParams.has('nowtime')) u.searchParams.set('nowtime', String(Date.now()));
  if (data.verify && !u.searchParams.has('verify')) u.searchParams.set('verify', data.verify);

  let html: string;
  let url: string;

  if (opts.files?.length) {
    const fd = new FormData();
    for (const [k, v] of Object.entries(data)) fd.append(k, v ?? '');
    opts.files.forEach((f, i) => {
      fd.append(`attachment_${i + 1}`, f);
      // common PW field names
      fd.append('attachment', f);
    });
    const res = await postMultipart(u.pathname + u.search, fd);
    html = res.html;
    url = res.url;
  } else {
    const res = await postForm(u.pathname.replace(/^\/lt\//, '') + u.search, data);
    // postForm path relative to /lt/
    html = res.html;
    url = res.url;
  }

  return interpretPostResponse(html, url);
}

function interpretPostResponse(html: string, url: string): { ok: boolean; message: string; redirect?: string } {
  const parts = html.split('\t');
  if (parts.length >= 2 && /jump|reload|nextto/i.test(parts[1])) {
    return {
      ok: true,
      message: parts[0].replace(/<[^>]+>/g, '').trim() || '发表成功',
      redirect: parts[1] === 'jump' ? parts[2] : undefined,
    };
  }

  if (/发表成功|发帖成功|回复成功|编辑成功|正在返回|read\.php\?tid=/.test(html)) {
    const tid = html.match(/read\.php\?tid=(\d+)/)?.[1];
    return {
      ok: true,
      message: '发表成功',
      redirect: tid ? `read.php?tid=${tid}` : url,
    };
  }

  const err = detectShowMsg(html, parseDocument(html));
  if (err) return { ok: false, message: err.message };

  const cleaned = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleaned.length < 300 && /失败|错误|不能|禁止|验证|权限/.test(cleaned)) {
    return { ok: false, message: cleaned.slice(0, 200) };
  }

  // Ambiguous: if URL landed on read.php assume ok
  if (/read\.php\?tid=/.test(url)) {
    return { ok: true, message: '已提交', redirect: url };
  }

  return { ok: false, message: cleaned.slice(0, 180) || '提交失败，请检查权限或内容' };
}

export async function deletePost(opts: { tid: number; pid: number; verifyhash: string }): Promise<{ ok: boolean; message: string }> {
  // Common PW delete via job.php or post action — try ajax style
  const path =
    `job.php` +
    qs({
      action: 'del',
      tid: opts.tid,
      pid: opts.pid,
      verify: opts.verifyhash,
      nowtime: Date.now(),
    });
  const { html } = await fetchHtml(path);
  if (/成功|已删除|reload|jump/.test(html)) return { ok: true, message: '已删除' };
  return { ok: false, message: html.replace(/<[^>]+>/g, ' ').trim().slice(0, 160) || '删除失败' };
}

export async function favorThread(tid: number, verifyhash: string): Promise<{ ok: boolean; message: string }> {
  const path =
    `pw_ajax.php` +
    qs({ action: 'favor', tid, verify: verifyhash, nowtime: Date.now() });
  const { html } = await fetchHtml(path);
  if (/成功|收藏/.test(html)) return { ok: true, message: '收藏成功' };
  // alternate
  const alt = await fetchHtml(
    `job.php` + qs({ action: 'favor', tid, verify: verifyhash, nowtime: Date.now() }),
  );
  if (/成功|收藏/.test(alt.html)) return { ok: true, message: '收藏成功' };
  return { ok: false, message: '收藏失败或已收藏' };
}
