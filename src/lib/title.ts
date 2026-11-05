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

/** Strip leading "版块名 - " from a title (e.g. document.title leftovers). */
export function stripForumTitlePrefix(title: string, forumName?: string): string {
  const name = (forumName || '').trim();
  let rest = (title || '').replace(/\s+/g, ' ').trim();
  if (!name || !rest) return rest;
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  rest = rest.replace(new RegExp(`^${esc}\\s*[-–—|]\\s*`), '').trim();
  if (rest === name) return '';
  return rest || title.trim();
}
