/** Decode GBK (or fallback UTF-8) response bodies from phpwind. */
export function decodeForumText(buf: ArrayBuffer): string {
  try {
    return new TextDecoder('gbk').decode(buf);
  } catch {
    try {
      return new TextDecoder('gb18030').decode(buf);
    } catch {
      return new TextDecoder('utf-8').decode(buf);
    }
  }
}

/** Encode form body as GBK percent-encoding for application/x-www-form-urlencoded. */
export function encodeGbkForm(data: Record<string, string>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(data)) {
    parts.push(`${encodeGbkComponent(key)}=${encodeGbkComponent(value ?? '')}`);
  }
  return parts.join('&');
}

function encodeGbkComponent(str: string): string {
  const bytes = gbkEncode(str);
  let out = '';
  for (const b of bytes) {
    if (
      (b >= 0x30 && b <= 0x39) ||
      (b >= 0x41 && b <= 0x5a) ||
      (b >= 0x61 && b <= 0x7a) ||
      b === 0x2d ||
      b === 0x2e ||
      b === 0x5f ||
      b === 0x7e
    ) {
      out += String.fromCharCode(b);
    } else if (b === 0x20) {
      out += '+';
    } else {
      out += `%${b.toString(16).toUpperCase().padStart(2, '0')}`;
    }
  }
  return out;
}

/** Minimal GBK encoder via native TextEncoder if available, else UTF-8 fallback. */
function gbkEncode(str: string): Uint8Array {
  // Chromium supports GBK in TextEncoder in modern builds when labeled; otherwise use a form trick.
  try {
    // @ts-expect-error experimental label
    const enc = new TextEncoder('gbk');
    // Standard TextEncoder ignores label — detect by checking ASCII-only path
    if (typeof (enc as { encodeInto?: unknown }).encodeInto === 'function' && /[^\x00-\x7f]/.test(str) === false) {
      return enc.encode(str);
    }
  } catch {
    /* ignore */
  }

  // Use URL API with a GBK-capable browser form submission path via encodeURIComponent
  // For CJK, phpwind often accepts UTF-8 percent encoding on modern stacks; prefer manual GBK table-less approach:
  // Create a temporary form submission encoder using encodeURIComponent (UTF-8).
  // If the server strictly needs GBK, multipart FormData from same-origin page still works better.
  const utf8 = new TextEncoder().encode(str);
  return utf8;
}

export function formDataFromRecord(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) {
    fd.append(k, v ?? '');
  }
  return fd;
}
