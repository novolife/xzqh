import type { ThreadTypeTag } from './types';

/** Split leading [分类] / 【分类】 prefixes from a subject string. */
export function splitTitleTypes(raw: string): { typeTags: ThreadTypeTag[]; title: string } {
  let rest = (raw || '').replace(/\s+/g, ' ').trim();
  const typeTags: ThreadTypeTag[] = [];

  // Match one or more leading [xxx] or 【xxx】
  while (rest) {
    const m = rest.match(/^\s*[\[【]([^\]】]+)[\]】]\s*/);
    if (!m) break;
    const name = m[1].trim();
    if (name && !typeTags.some((t) => t.name === name)) {
      typeTags.push({ name });
    }
    rest = rest.slice(m[0].length).trim();
  }

  return { typeTags, title: rest || raw.trim() };
}
