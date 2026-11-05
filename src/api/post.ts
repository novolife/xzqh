import { fetchHtml, parseDocument, postForm, postMultipart, qs, forumUrl } from '@/lib/http';
import {
  extractComposeOptionFlags,
  extractComposeTypes,
  extractPostForm,
} from '@/parsers/thread';
import { parseVerifyhash } from '@/parsers/index';
import { detectShowMsg } from '@/parsers/showmsg';
import type { PostFormMeta } from '@/lib/types';

export async function loadComposeForm(opts: {
  fid: number;
  tid?: number;
  /** 原站 pid 参数；楼主为 'tpc' */
  quotePid?: number | string;
  /** 原站 pid 参数；楼主为 'tpc' */
  editPid?: number | string;
  /** 楼层序号，原站 modify 链接的 article= */
  article?: number;
}): Promise<PostFormMeta> {
  let path: string;
  if (opts.editPid && opts.tid) {
    // 本站 modify 必须带 fid，否则返回「提示信息」页
    path =
      `post.php` +
      qs({
        action: 'modify',
        fid: opts.fid || undefined,
        tid: opts.tid,
        pid: opts.editPid,
        article: opts.article,
      });
  } else if (opts.tid && opts.quotePid) {
    path = `post.php` + qs({ fid: opts.fid, tid: opts.tid, action: 'quote', pid: opts.quotePid, article: opts.article });
  } else if (opts.tid) {
    // 回复必须带 action=reply：否则 phpwind 会返回“发表主题”表单，
    // 提交时会创建新主题而不是回复。
    path = `post.php` + qs({ fid: opts.fid, tid: opts.tid, action: 'reply' });
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
  if (!fields.action) fields.action = opts.tid ? 'reply' : 'new';

  // 新主题必须填标题；回复/引用隐藏标题框（标题沿用表单里的 Re: 值）；
  // 编辑主题首楼允许改标题，编辑回复不显示标题框。
  const showTitle =
    !opts.tid ||
    (opts.editPid != null && (opts.article === 0 || opts.article == null));
  const titleRequired = showTitle;

  // 上传权限以原站 imageConfig.tabs 为准；没有 imageConfig 时退回文件输入探测。
  const imageTabs = html.match(/imageConfig\s*=\s*\{[\s\S]*?tabs\s*:\s*\[([^\]]*)\]/i)?.[1];
  const uploadEnabled = imageTabs
    ? /['"]local['"]/.test(imageTabs)
    : !!doc.querySelector('input[type="file"], .B_fileIcon, a[title*="附件"]');

  return {
    action: extracted?.action || path,
    fields,
    verifyhash,
    titleRequired,
    showTitle,
    uploadEnabled,
    types: extractComposeTypes(doc),
    options: extractComposeOptionFlags(doc),
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
  const first = (parts[0] || '').trim();
  // phpwind AJAX 提交成功/失败格式：success\t<url> / error\t<message>
  if (first === 'success') {
    const target = (parts[1] || '').trim();
    return {
      ok: true,
      message: '发表成功',
      redirect: /read\.php\?tid=/.test(target) ? target : undefined,
    };
  }
  if (first === 'error') {
    return { ok: false, message: (parts[1] || '提交失败').trim() };
  }
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

/**
 * 删除帖子/楼层。官方 8.7 的删除入口不是 job.php?action=del，而是
 * POST post.php?fid={fid} 的 delForm：step=1 + action=modify + pid + article。
 * 楼主首楼 pid 为 'tpc'，article 为 0。
 */
export async function deletePost(opts: {
  fid: number;
  tid: number;
  pid: number | string;
  article?: number;
  verifyhash: string;
}): Promise<{ ok: boolean; message: string }> {
  const { html, url } = await postForm(`post.php?fid=${opts.fid}`, {
    step: '1',
    action: 'modify',
    fid: String(opts.fid),
    tid: String(opts.tid),
    pid: String(opts.pid),
    article: String(opts.article ?? 0),
    verify: opts.verifyhash,
    _hexie: 'cn0zz',
  });
  if (
    /read\.php\?tid=|after_delete|删除成功|已删除/.test(html) ||
    /read\.php\?tid=/.test(url)
  ) {
    return { ok: true, message: '已删除' };
  }
  const err = detectShowMsg(html, parseDocument(html));
  return { ok: false, message: err?.message || '删除失败或没有权限' };
}

/**
 * 收藏主题。官方读帖页收藏链接为：
 * apps.php?q=collection&a=favor&type=postfavor&ajax=1&id={tid}
 * （原实现误用 pw_ajax.php?action=favor）
 */
export async function favorThread(tid: number, verifyhash: string): Promise<{ ok: boolean; message: string }> {
  const path =
    `apps.php` +
    qs({
      q: 'collection',
      a: 'favor',
      type: 'postfavor',
      ajax: '1',
      id: tid,
      verify: verifyhash || undefined,
      nowtime: Date.now(),
    });
  const { html, status } = await fetchHtml(path);
  const cleaned = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (status >= 400) return { ok: false, message: `收藏失败 (HTTP ${status})` };
  if (/success|收藏成功|已收藏|favor/i.test(html) && !/失败|错误|error/i.test(cleaned)) {
    return { ok: true, message: '收藏成功' };
  }
  const err = detectShowMsg(html, parseDocument(html));
  return { ok: false, message: err?.message || cleaned.slice(0, 160) || '收藏失败或已收藏' };
}
