import type { ThreadTypeTag } from '@/lib/types';
import { navigate } from '@/router';
import { splitTitleTypes, stripForumTitlePrefix } from '@/lib/title';

export function TitleWithTypes(props: {
  title: string;
  typeTags?: ThreadTypeTag[];
  fid?: number;
  /** Board / forum name — rendered as a navigable chip before category tags. */
  forumName?: string;
  as?: 'h1' | 'span';
  className?: string;
  /** When true, render only the plain title text (tags rendered separately). */
  textOnly?: boolean;
}) {
  const tags =
    props.typeTags && props.typeTags.length
      ? props.typeTags
      : splitTitleTypes(props.title).typeTags;
  const fromSplit =
    props.typeTags && props.typeTags.length
      ? props.title
      : splitTitleTypes(props.title).title || props.title;
  const plain = stripForumTitlePrefix(fromSplit, props.forumName);

  if (props.textOnly) {
    return <span class="xzqh-title-text">{plain}</span>;
  }

  const Tag = props.as === 'h1' ? 'h1' : 'span';

  return (
    <Tag class={props.className || (props.as === 'h1' ? 'xzqh-h1' : undefined)}>
      <ForumTag name={props.forumName} fid={props.fid} />
      <TypeTags tags={tags} fid={props.fid} />
      <span class="xzqh-title-text">{plain}</span>
    </Tag>
  );
}

export function ForumTag(props: { name?: string; fid?: number }) {
  const name = props.name?.trim();
  if (!name || !props.fid) return null;
  return (
    <button
      type="button"
      class="xzqh-type-tag xzqh-forum-tag"
      title={`版块：${name}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate({ name: 'forum', fid: props.fid!, page: 1 });
      }}
    >
      {name}
    </button>
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
