import { absUrl, fetchHtml, forumUrl, qs } from '@/lib/http';

export function attachmentDownloadUrl(aid: number): string {
  return forumUrl(`job.php?action=download&aid=${aid}`);
}

export interface MutiUploadResult {
  ok: boolean;
  message: string;
  url?: string;
  path?: string;
  aid?: number;
}

const IMAGE_EXTS = new Set(['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp']);

export function isImageFile(file: File): boolean {
  if (file.type.startsWith('image/')) return true;
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return IMAGE_EXTS.has(ext);
}

/**
 * Flash 上传器会话字段。
 * 注意：这里的 verify 与页面 verifyhash **不是同一个值**，
 * 必须用本接口返回的 verify，否则服务器返回「非法请求」。
 */
async function fetchMutiPostData(fid?: number): Promise<Record<string, string>> {
  const path =
    `job.php` +
    qs({
      action: 'mutiupload',
      random: Math.floor(Math.random() * 100),
    });
  const { html } = await fetchHtml(path);
  const raw = html.trim();
  const data: Record<string, string> = {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const [k, v] of Object.entries(parsed)) {
      if (v != null && typeof v !== 'object') data[k] = String(v);
    }
  } catch {
    // 偶发包在 ajax CDATA 里
    const cdata = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1]?.trim();
    if (cdata) {
      try {
        const parsed = JSON.parse(cdata) as Record<string, unknown>;
        for (const [k, v] of Object.entries(parsed)) {
          if (v != null && typeof v !== 'object') data[k] = String(v);
        }
      } catch {
        /* ignore */
      }
    }
  }
  if (fid && fid > 0) data.fid = String(fid);
  if (!data.verify) {
    throw new Error('无法获取上传凭证，请刷新后重试');
  }
  return data;
}

/** 解析 mutiupload 响应：常见为 XML + CDATA 包 JSON。 */
export function parseMutiResponse(html: string): MutiUploadResult {
  const raw = html.trim();
  if (!raw) return { ok: false, message: '上传无响应' };

  const tryJson = (s: string): MutiUploadResult | null => {
    try {
      const data = JSON.parse(s) as { aid?: number | string; path?: string; url?: string };
      if (data.aid || data.path || data.url) {
        const aid = Number(data.aid) || undefined;
        const path = data.path || data.url;
        return {
          ok: true,
          message: '上传成功',
          aid,
          path: path || undefined,
          url: path ? absUrl(path) : undefined,
        };
      }
    } catch {
      /* ignore */
    }
    return null;
  };

  const direct = tryJson(raw);
  if (direct) return direct;

  const cdata = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1]?.trim();
  if (cdata) {
    const fromCdata = tryJson(cdata);
    if (fromCdata) return fromCdata;
    if (/非法|错误|失败|权限|太大|toobig|exterror/.test(cdata)) {
      return { ok: false, message: cdata.slice(0, 160) };
    }
    return { ok: false, message: cdata.slice(0, 160) || '上传失败' };
  }

  const aid = Number(raw.match(/["']?aid["']?\s*[:=]\s*["']?(\d+)/i)?.[1] || 0) || undefined;
  const path = raw.match(/["']?path["']?\s*[:=]\s*["']([^"']+)/i)?.[1];
  if (aid || path) {
    return {
      ok: true,
      message: '上传成功',
      aid,
      path,
      url: path ? absUrl(path) : undefined,
    };
  }

  const plain = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (/非法|错误|失败|权限|太大|toobig|exterror|upload_/.test(plain)) {
    return { ok: false, message: plain.slice(0, 160) || '上传失败' };
  }
  return { ok: false, message: plain.slice(0, 160) || '上传失败' };
}

function xhrUpload(opts: {
  url: string;
  form: FormData;
  timeoutMs?: number;
  onProgress?: (pct: number) => void;
}): Promise<{ html: string; status: number }> {
  const timeoutMs = opts.timeoutMs ?? 90000;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', opts.url, true);
    xhr.withCredentials = true;
    xhr.timeout = timeoutMs;
    xhr.responseType = 'arraybuffer';

    xhr.upload.onprogress = (ev) => {
      if (!ev.lengthComputable || !opts.onProgress) return;
      const pct = Math.max(1, Math.min(99, Math.round((ev.loaded / ev.total) * 100)));
      opts.onProgress(pct);
    };

    xhr.onload = () => {
      const buf = xhr.response as ArrayBuffer;
      let html = '';
      try {
        html = new TextDecoder('gbk').decode(buf);
      } catch {
        html = new TextDecoder('utf-8').decode(buf);
      }
      resolve({ html, status: xhr.status });
    };
    xhr.onerror = () => reject(new Error('网络错误，上传中断'));
    xhr.ontimeout = () => reject(new Error('上传超时，请缩小图片后重试'));
    xhr.onabort = () => reject(new Error('上传已取消'));

    opts.onProgress?.(1);
    xhr.send(opts.form);
  });
}

/**
 * phpwind 8.7 `job.php?action=mutiupload`
 * 原站 Flash 与图片/附件对话框共用此接口。
 */
export async function uploadMutiFile(opts: {
  file: File;
  fid?: number;
  /** 忽略：mutiupload 使用独立 verify，不能用页面 verifyhash */
  verifyhash?: string;
  onProgress?: (pct: number) => void;
}): Promise<MutiUploadResult> {
  opts.onProgress?.(2);
  let postData: Record<string, string>;
  try {
    postData = await fetchMutiPostData(opts.fid);
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : '获取上传凭证失败' };
  }
  opts.onProgress?.(5);

  const url =
    forumUrl('job.php') +
    qs({
      action: 'mutiupload',
      random: Math.floor(Math.random() * 100),
    });

  // Flash/SWFUpload 只提交 Filedata；重复附加同名文件可能导致服务端卡住
  const fd = new FormData();
  for (const [k, v] of Object.entries(postData)) fd.append(k, v);
  fd.append('Filedata', opts.file, opts.file.name);

  try {
    const { html, status } = await xhrUpload({
      url,
      form: fd,
      onProgress: opts.onProgress,
    });
    opts.onProgress?.(100);
    if (status >= 400) {
      return { ok: false, message: `上传失败 (HTTP ${status})` };
    }
    return parseMutiResponse(html);
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : '上传失败' };
  }
}

/** 编辑器「本地图片」 */
export async function uploadEditorImage(opts: {
  file: File;
  fid?: number;
  verifyhash?: string;
  onProgress?: (pct: number) => void;
}): Promise<MutiUploadResult> {
  if (!isImageFile(opts.file)) {
    return { ok: false, message: '仅支持 jpg / gif / png 等图片文件' };
  }
  const maxBytes = 20 * 1024 * 1024;
  if (opts.file.size > maxBytes) {
    return { ok: false, message: '图片过大（超过约 20MB）' };
  }
  return uploadMutiFile(opts);
}

/** @deprecated 使用 uploadMutiFile */
export async function uploadAttachment(opts: {
  file: File;
  verifyhash: string;
  fid?: number;
  tid?: number;
  onProgress?: (pct: number) => void;
}): Promise<MutiUploadResult> {
  return uploadMutiFile({
    file: opts.file,
    fid: opts.fid,
    onProgress: opts.onProgress,
  });
}

/** Build flashatt[...] fields for post.php after mutiupload. */
export function flashAttFields(
  items: { aid: number; desc?: string }[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const it of items) {
    out[`flashatt[${it.aid}][desc]`] = it.desc || '';
  }
  return out;
}
