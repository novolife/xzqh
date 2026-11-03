import type { ThreadTypeTag } from '@/lib/types';
import { navigate } from '@/router';
import { splitTitleTypes } from '@/lib/title';

export function TitleWithTypes(props: {
  title: string;
  typeTags?: ThreadTypeTag[];
  fid?: number;
  as?: 'h1' | 'span';
  className?: string;
  /** When true, render only the plain title text (tags rendered separately). */
  textOnly?: boolean;
}) {
  const tags =
    props.typeTags && props.typeTags.length
      ? props.typeTags
      : splitTitleTypes(props.title).typeTags;
  const plain =
    props.typeTags && props.typeTags.length
      ? props.title
      : splitTitleTypes(props.title).title || props.title;

  if (props.textOnly) {
    return <span class="xzqh-title-text">{plain}</span>;
  }

  const Tag = props.as === 'h1' ? 'h1' : 'span';

  return (
    <Tag class={props.className || (props.as === 'h1' ? 'xzqh-h1' : undefined)}>
      <TypeTags tags={tags} fid={props.fid} />
      <span class="xzqh-title-text">{plain}</span>
    </Tag>
  );
}

export function TypeTags(props: { tags: ThreadTypeTag[]; fid?: number }) {
  if (!props.tags.length) return null;
  return (
    <>
      {props.tags.map((t) => (
        <button
          type="button"
          key={`${t.name}-${t.typeId || ''}`}
          class="xzqh-type-tag"
          title={`分类：${t.name}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const fid =
              props.fid ||
              Number(t.href?.match(/fid=(\d+)/)?.[1] || 0);
            const typeId = t.typeId || t.href?.match(/[?&]type=(\d+)/)?.[1];
            if (fid && typeId) {
              navigate({ name: 'forum', fid, page: 1, type: typeId });
            }
          }}
        >
          {t.name}
        </button>
      ))}
    </>
  );
}
