import { absUrl } from '@/lib/http';

/** Sanitize and enhance already-rendered phpwind HTML content. */
export function enhanceContentHtml(html: string): string {
  let s = html;
  // Remove scripts
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Fix relative urls in src/href
  s = s.replace(/\b(src|href)=["'](?!https?:|data:|javascript:)([^"']+)["']/gi, (_m, attr, url) => {
    return `${attr}="${absUrl(url)}"`;
  });
  return s;
}

/** Convert Wind Code / BBCode-like text into safe HTML for preview. */
export function windcodeToHtml(raw: string): string {
  let s = escapeHtml(raw);
  s = s.replace(/\r\n|\r|\n/g, '<br/>');

  s = s.replace(/\[br\]/gi, '<br/>');
  s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1</strong>');
  s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1</em>');
  s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>');
  s = s.replace(/\[url\](https?:\/\/[^\[]+)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  s = s.replace(/\[url=(https?:\/\/[^\]]+)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noreferrer">$2</a>');
  s = s.replace(/\[img\](https?:\/\/[^\[]+)\[\/img\]/gi, '<img src="$1" alt="" loading="lazy" />');
  s = s.replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '<blockquote class="wc-quote">$1</blockquote>');
  s = s.replace(/\[quote=([^\]]+)\]([\s\S]*?)\[\/quote\]/gi, '<blockquote class="wc-quote"><cite>$1</cite>$2</blockquote>');
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<pre class="wc-code"><code>$1</code></pre>');
  s = s.replace(/\[color=([#\w]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>');
  s = s.replace(/\[size=(\d+)\]([\s\S]*?)\[\/size\]/gi, '<span style="font-size:$1px">$2</span>');
  // smileys [s:N] common PW
  s = s.replace(/\[s:(\d+)\]/gi, (_m, n) => {
    return `<img class="wc-smile" src="${absUrl(`images/post/smile/default/${n}.gif`)}" alt="[s:${n}]" />`;
  });

  return s;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function wrapQuote(author: string, content: string): string {
  const plain = content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim()
    .slice(0, 800);
  return `[quote]${author ? `${author}：` : ''}\n${plain}\n[/quote]\n`;
}
