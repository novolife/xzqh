import { fetchHtml, parseDocument, qs } from '@/lib/http';
import { parseThreadList } from '@/parsers/thread';
import { parseThreadDetail } from '@/parsers/read';
import type { ThreadDetail, ThreadListResult } from '@/lib/types';

export async function fetchThreadList(opts: {
  fid: number;
  page?: number;
  type?: string;
  special?: string;
  search?: string;
  orderway?: string;
}): Promise<ThreadListResult> {
  const page = opts.page || 1;
  const path =
    `thread.php` +
    qs({
      fid: opts.fid,
      page,
      type: opts.type,
      special: opts.special,
      search: opts.search,
      orderway: opts.orderway,
      asc: opts.orderway ? 'DESC' : undefined,
    });
  const { html } = await fetchHtml(path);
  const doc = parseDocument(html);
  return parseThreadList(html, doc, opts.fid, page);
}

export async function fetchThreadDetail(tid: number, page = 1): Promise<ThreadDetail> {
  const path = `read.php` + qs({ tid, page });
  const { html } = await fetchHtml(path);
  const doc = parseDocument(html);
  return parseThreadDetail(html, doc, tid, page);
}
