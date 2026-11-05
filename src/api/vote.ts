import { parseDocument, postForm, qs } from '@/lib/http';
import { detectShowMsg } from '@/parsers/showmsg';

/**
 * 提交投票。官方读帖页投票按钮通过 AJAX POST 到：
 *   job.php?action=vote
 * 请求体：tid、voteid（多选用 | 连接）、可选 voteaction=modify、verify。
 * 服务端成功响应：success\toperate_success；失败：error\t...
 */
export async function submitVote(opts: {
  tid: number;
  selected: string[];
  verifyhash: string;
  extra?: Record<string, string>;
}): Promise<{ ok: boolean; message: string }> {
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(opts.extra || {})) {
    // 表单里的 voteid[] 由 selected 统一拼成 voteid；避免重复/数组覆盖。
    if (/^voteid(\[.*\])?$/.test(k)) continue;
    data[k] = v;
  }
  data.verify = opts.verifyhash;
  data.tid = String(opts.tid);
  data.voteid = opts.selected.join('|');

  const path =
    `job.php` + qs({ action: 'vote', nowtime: Date.now() });
  const { html } = await postForm(path, data);
  const parts = html.split('\t');
  const first = (parts[0] || '').trim();
  if (first === 'success') return { ok: true, message: '投票成功' };
  if (first === 'error') return { ok: false, message: (parts[1] || '投票失败').trim() };

  if (/success|投票成功|谢谢|已投/.test(html)) return { ok: true, message: '投票成功' };
  const err = detectShowMsg(html, parseDocument(html));
  if (err) return { ok: false, message: err.message };
  const cleaned = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return { ok: false, message: cleaned.slice(0, 160) || '投票失败' };
}
