import { parseDocument, postForm, qs, fetchHtml } from '@/lib/http';
import { detectShowMsg } from '@/parsers/showmsg';

/** Submit a poll using fields scraped from the thread vote form. */
export async function submitVote(opts: {
  tid: number;
  selected: string[];
  verifyhash: string;
  extra?: Record<string, string>;
}): Promise<{ ok: boolean; message: string }> {
  const data: Record<string, string> = {
    verify: opts.verifyhash,
    tid: String(opts.tid),
    ...(opts.extra || {}),
  };
  opts.selected.forEach((v, i) => {
    data[`voteid[${i}]`] = v;
    data.voteid = v;
  });

  const path = `job.php` + qs({ action: 'vote', tid: opts.tid, verify: opts.verifyhash, nowtime: Date.now() });
  const { html } = await postForm(path, data);
  if (/成功|谢谢|已投/.test(html)) return { ok: true, message: '投票成功' };
  const err = detectShowMsg(html, parseDocument(html));
  if (err) return { ok: false, message: err.message };

  // Some skins need GET first
  await fetchHtml(path);
  return { ok: false, message: html.replace(/<[^>]+>/g, ' ').trim().slice(0, 160) || '投票失败' };
}
