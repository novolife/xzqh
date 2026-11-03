import { decodeForumText, formDataFromRecord } from './encoding';

const BASE = (() => {
  try {
    const u = new URL(location.href);
    const m = u.pathname.match(/^(.*?\/lt\/)/);
    if (m) return `${u.origin}${m[1]}`;
  } catch {
    /* ignore */
  }
  return 'http://xzqh.info/lt/';
})();

export function forumUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path.replace(/^\//, ''), BASE).href;
}

export function getBase(): string {
  return BASE;
}

export async function fetchHtml(
  path: string,
  init: RequestInit = {},
): Promise<{ html: string; url: string; status: number }> {
  const url = forumUrl(path);
  const res = await fetch(url, {
    credentials: 'include',
    ...init,
    headers: {
      Accept: 'text/html,application/xhtml+xml,*/*',
      ...(init.headers || {}),
    },
  });
  const buf = await res.arrayBuffer();
  const html = decodeForumText(buf);
  return { html, url: res.url || url, status: res.status };
}

/**
 * POST as application/x-www-form-urlencoded via hidden form + iframe,
 * with accept-charset=GBK so CJK matches phpwind.
 */
export async function postForm(
  path: string,
  data: Record<string, string>,
  _opts: { multipart?: boolean; extraHeaders?: Record<string, string> } = {},
): Promise<{ html: string; url: string; status: number }> {
  if (_opts.multipart) {
    return postMultipart(path, formDataFromRecord(data));
  }
  return postViaGbkForm(forumUrl(path), data);
}

export async function postMultipart(
  path: string,
  form: FormData,
): Promise<{ html: string; url: string; status: number }> {
  const url = forumUrl(path);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: form,
  });
  const buf = await res.arrayBuffer();
  return { html: decodeForumText(buf), url: res.url || url, status: res.status };
}

function postViaGbkForm(
  action: string,
  data: Record<string, string>,
): Promise<{ html: string; url: string; status: number }> {
  return new Promise((resolve, reject) => {
    const name = `xzqh_iframe_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement('iframe');
    iframe.name = name;
    iframe.setAttribute('name', name);
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = action;
    form.target = name;
    form.acceptCharset = 'GBK';
    form.style.display = 'none';
    form.enctype = 'application/x-www-form-urlencoded';

    for (const [k, v] of Object.entries(data)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v ?? '';
      form.appendChild(input);
    }
    document.body.appendChild(form);

    const cleanup = () => {
      form.remove();
      setTimeout(() => iframe.remove(), 0);
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('提交超时'));
    }, 30000);

    iframe.addEventListener('load', () => {
      window.clearTimeout(timer);
      try {
        const idoc = iframe.contentDocument || iframe.contentWindow?.document;
        const html = idoc?.documentElement?.innerHTML || idoc?.body?.innerHTML || '';
        const url = iframe.contentWindow?.location?.href || action;
        cleanup();
        resolve({ html, url, status: 200 });
      } catch (e) {
        cleanup();
        // Cross-origin unlikely on same site; treat as soft success
        resolve({ html: '', url: action, status: 200 });
        void e;
      }
    });

    form.submit();
  });
}

export function parseDocument(html: string): Document {
  return new DOMParser().parseFromString(html, 'text/html');
}

export function absUrl(href: string | null | undefined): string {
  if (!href) return '';
  try {
    return new URL(href, BASE).href;
  } catch {
    return href;
  }
}

export function qs(params: Record<string, string | number | undefined | null>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}
