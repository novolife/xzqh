import { absUrl } from '@/lib/http';

/** Strip characters unsafe inside a CSS font-family value. */
export function safeFontFamily(name: string): string {
  return String(name || '')
    .replace(/["';<>\\{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

/**
 * Sanitize and enhance already-rendered phpwind HTML content.
 * Preserves author-chosen fonts (`[font=…]`, `<font face>`, inline font-family).
 */
export function enhanceContentHtml(html: string): string {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/\b(src|href)=["'](?!https?:|data:|javascript:)([^"']+)["']/gi, (_m, attr, url) => {
    return `${attr}="${absUrl(url)}"`;
  });

  // 残留 Wind Code 字体：按所选字体渲染
  s = s.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, (_m, name, body) => {
    const fam = safeFontFamily(name);
    return fam ? `<span class="xzqh-font" style="font-family:${fam}">${body}</span>` : body;
  });

  // <font face="…"> → 明确的 font-family，避免被正文默认字体盖住观感
  s = s.replace(/<font\b([^>]*)>/gi, (_m, rawAttrs: string) => {
    const attrs = String(rawAttrs || '');
    const face = attrs.match(/\bface\s*=\s*(["'])([^"']*)\1/i)?.[2] ?? attrs.match(/\bface\s*=\s*([^\s>]+)/i)?.[1];
    const fam = safeFontFamily(face || '');
    if (!fam) return `<font${attrs}>`;
    if (/\bfont-family\s*:/i.test(attrs)) return `<font${attrs}>`;
    if (/\bstyle\s*=\s*(["'])/i.test(attrs)) {
      return `<font${attrs.replace(/\bstyle\s*=\s*(["'])/i, (_s, q) => `style=${q}font-family:${fam};`)}>`;
    }
    return `<font${attrs} style="font-family:${fam}">`;
  });

  return s;
}

/** If the content root itself carries a font, wrap inner HTML so it survives innerHTML extraction. */
export function wrapWithElementFont(el: Element, innerHtml: string): string {
  const style = el.getAttribute('style') || '';
  const fromStyle = style.match(/font-family\s*:\s*([^;]+)/i)?.[1];
  const fromFace = el.getAttribute('face') || '';
  const fam = safeFontFamily(fromStyle || fromFace);
  if (!fam) return innerHtml;
  return `<span class="xzqh-font" style="font-family:${fam}">${innerHtml}</span>`;
}

const SIZE_PX = [10, 12, 14, 16, 18, 24, 36];

export type WindcodePreviewOpts = {
  /** aid → relative/absolute path for `[attachment=aid]` preview */
  attachments?: Record<number, string>;
};

/** Convert Wind Code / BBCode-like text into safe HTML for preview. */
export function windcodeToHtml(raw: string, opts: WindcodePreviewOpts = {}): string {
  let s = escapeHtml(raw);

  // Tables first (contain newlines)
  s = s.replace(/\[table(?:=([^\]]+))?\]([\s\S]*?)\[\/table\]/gi, (_m, attrs, body) => {
    const width = String(attrs || '')
      .split(',')[0]
      ?.trim();
    const style = width && /^\d+$/.test(width) ? ` style="width:${width}px"` : '';
    const rows = String(body).replace(/\[tr\]([\s\S]*?)\[\/tr\]/gi, (_m2, cells) => {
      const tds = String(cells).replace(/\[td(?:=([^\]]+))?\]([\s\S]*?)\[\/td\]/gi, (_m3, _a, c) => {
        return `<td>${c}</td>`;
      });
      return `<tr>${tds}</tr>`;
    });
    return `<table class="wc-table"${style}>${rows}</table>`;
  });

  // Lists
  s = s.replace(/\[list(?:=([^\]]+))?\]([\s\S]*?)\[\/list\]/gi, (_m, type, body) => {
    const tag = type ? 'ol' : 'ul';
    const items = String(body)
      .replace(/\[\*\]|\[li\]/gi, '\n§LI§')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const t = line
          .replace(/^§LI§/, '')
          .replace(/\[\/li\]/gi, '')
          .trim();
        return t ? `<li>${t}</li>` : '';
      })
      .join('');
    return `<${tag} class="wc-list">${items}</${tag}>`;
  });

  s = s.replace(/\r\n|\r|\n/g, '<br/>');
  s = s.replace(/\[br\]/gi, '<br/>');
  s = s.replace(/\[hr\]/gi, '<hr class="wc-hr"/>');

  s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1</strong>');
  s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1</em>');
  s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>');
  s = s.replace(/\[strike\]([\s\S]*?)\[\/strike\]/gi, '<s>$1</s>');
  s = s.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<s>$1</s>');

  s = s.replace(/\[color=([#\w]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>');
  s = s.replace(
    /\[backcolor=([#\w]+)\]([\s\S]*?)\[\/backcolor\]/gi,
    '<span style="background-color:$1">$2</span>',
  );
  s = s.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, (_m, name, body) => {
    const fam = safeFontFamily(String(name));
    return fam ? `<span class="xzqh-font" style="font-family:${fam}">${body}</span>` : body;
  });
  s = s.replace(/\[size=(\d+)\]([\s\S]*?)\[\/size\]/gi, (_m, n, body) => {
    const i = Math.min(7, Math.max(1, Number(n))) - 1;
    return `<span style="font-size:${SIZE_PX[i]}px">${body}</span>`;
  });

  s = s.replace(
    /\[align=(left|center|right)\]([\s\S]*?)\[\/align\]/gi,
    '<div style="text-align:$1">$2</div>',
  );
  s = s.replace(
    /\[paragraph\]([\s\S]*?)\[\/paragraph\]/gi,
    '<p class="wc-paragraph">$1</p>',
  );

  s = s.replace(
    /\[url\](https?:\/\/[^\[]+)\[\/url\]/gi,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
  );
  s = s.replace(
    /\[url=(https?:\/\/[^\]]+)\]([\s\S]*?)\[\/url\]/gi,
    '<a href="$1" target="_blank" rel="noreferrer">$2</a>',
  );
  s = s.replace(/\[img\]([^\[]+)\[\/img\]/gi, (_m, url) => {
    const src = absUrl(String(url).trim());
    return src ? `<img src="${src}" alt="" loading="lazy" />` : '';
  });
  s = s.replace(/\[attachment=(\d+)\]/gi, (_m, aidStr) => {
    const aid = Number(aidStr);
    const path = opts.attachments?.[aid];
    if (path) {
      return `<img src="${absUrl(path)}" alt="附件${aid}" loading="lazy" class="wc-attach-img" />`;
    }
    return `<span class="wc-attach" data-aid="${aid}">[附件 #${aid}]</span>`;
  });

  s = s.replace(
    /\[quote\]([\s\S]*?)\[\/quote\]/gi,
    '<blockquote class="wc-quote">$1</blockquote>',
  );
  s = s.replace(
    /\[quote=([^\]]+)\]([\s\S]*?)\[\/quote\]/gi,
    '<blockquote class="wc-quote"><cite>$1</cite>$2</blockquote>',
  );
  s = s.replace(
    /\[blockquote\]([\s\S]*?)\[\/blockquote\]/gi,
    '<blockquote class="wc-quote">$1</blockquote>',
  );
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<pre class="wc-code"><code>$1</code></pre>');

  s = s.replace(
    /\[sell(?:=([^\]]+))?\]([\s\S]*?)\[\/sell\]/gi,
    (_m, price, body) =>
      `<div class="wc-sell"><span class="wc-sell-label">出售内容${price ? `（${escapeHtml(String(price))}）` : ''}</span><div>${body}</div></div>`,
  );
  s = s.replace(
    /\[(?:hide|post)(?:=([^\]]+))?\]([\s\S]*?)\[\/(?:hide|post)\]/gi,
    (_m, cond, body) =>
      `<div class="wc-hide"><span class="wc-hide-label">隐藏内容${cond ? `（${escapeHtml(String(cond))}）` : ''}</span><div>${body}</div></div>`,
  );

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

/** Strip Wind Code / formatting tags for clear-style. */
export function stripWindcodeStyles(raw: string): string {
  return raw
    .replace(/\[\/?(?:b|i|u|strike|s|paragraph)\]/gi, '')
    .replace(/\[\/?(?:color|backcolor|font|size|align)=[^\]]*\]/gi, '')
    .replace(/\[\/(?:color|backcolor|font|size|align)\]/gi, '');
}

export function countWindcodeChars(raw: string): { chars: number; bytesApprox: number } {
  const plain = raw
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  let bytes = 0;
  for (const ch of plain) {
    bytes += ch.charCodeAt(0) > 127 ? 2 : 1;
  }
  return { chars: plain.length, bytesApprox: bytes };
}
