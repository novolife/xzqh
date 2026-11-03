import { forumUrl, postMultipart, qs } from '@/lib/http';

export function attachmentDownloadUrl(aid: number): string {
  return forumUrl(`job.php?action=download&aid=${aid}`);
}

export async function uploadAttachment(opts: {
  file: File;
  verifyhash: string;
  fid?: number;
  tid?: number;
  onProgress?: (pct: number) => void;
}): Promise<{ ok: boolean; message: string; url?: string; aid?: number }> {
  // Best-effort multi upload endpoint used by PW 8.7
  const path =
    `job.php` +
    qs({
      action: 'mutiupload',
      verify: opts.verifyhash,
      fid: opts.fid,
      nowtime: Date.now(),
    });

  const fd = new FormData();
  fd.append('file', opts.file);
  fd.append('Filedata', opts.file);
  fd.append('attachment', opts.file);
  fd.append('verify', opts.verifyhash);

  opts.onProgress?.(10);
  try {
    const { html } = await postMultipart(path, fd);
    opts.onProgress?.(100);
    const aid = Number(html.match(/aid[=:]?\s*(\d+)/i)?.[1] || 0) || undefined;
    const url = html.match(/https?:\/\/[^\s"'<>]+attachment[^\s"'<>]+/)?.[0];
    if (/错误|失败|非法|权限|太大/.test(html) && !aid && !url) {
      return { ok: false, message: html.replace(/<[^>]+>/g, ' ').trim().slice(0, 160) || '上传失败' };
    }
    return {
      ok: true,
      message: '上传完成（以发帖关联为准）',
      aid,
      url,
    };
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : '上传失败' };
  }
}
