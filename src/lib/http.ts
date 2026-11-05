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
  const controller = init.signal ? null : new AbortController();
  const timer = controller
    ? window.setTimeout(() => controller.abort(), 20000)
    : 0;
  try {
    const res = await fetch(url, {
      credentials: 'include',
      ...init,
      signal: init.signal ?? controller?.signal,
      headers: {
        Accept: 'text/html,application/xhtml+xml,*/*',
        ...(init.headers || {}),
      },
    });
    if (!res.ok) {
      throw new Error(`服务器返回 HTTP ${res.status}`);
    }
    // 会话失效时 phpwind 可能 302 到登录页；对非登录请求直接提示重新登录。
    const finalUrl = res.url || url;
    if (!/login\.php/i.test(path) && /\/login\.php(\?|$)/i.test(finalUrl)) {
      throw new Error('登录已过期，请重新登录');
    }
    const buf = await res.arrayBuffer();
    const html = decodeForumText(buf);
    return { html, url: finalUrl, status: res.status };
  } catch (e) {
    if (controller?.signal.aborted) {
      throw new Error('请求超时，请检查网络后重试');
    }
    throw e;
  } finally {
    if (timer) window.clearTimeout(timer);
  }
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

    let settled = false;
    iframe.addEventListener('load', () => {
      // 新建 iframe 会先加载 about:blank 并触发一次 load；忽略第一次空白 load，
      // 否则会把空响应当成提交结果，造成“服务器已成功但客户端报失败/重复提交”。
      try {
        const href = iframe.contentWindow?.location?.href || '';
        if (!settled && (href === 'about:blank' || href === '')) return;
      } catch {
        /* ignore */
      }
      if (settled) return;
      settled = true;
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
