import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type {
  ForumBoard,
  ForumCategory,
  ForumTypeTab,
  IndexFeedItem,
  IndexFooterInfo,
  MessageItem,
  PostFloor,
  SessionUser,
  ThreadDetail,
  ThreadItem,
  ThreadListResult,
  UserProfile,
} from '@/lib/types';
import { Alert, Loading, Pager } from './Layout';
import { TitleWithTypes, TypeTags } from './TitleWithTypes';
import { MasonryList } from './MasonryList';
import { WindEditor, type EditorFlashAtt } from './WindEditor';
import { splitTitleTypes } from '@/lib/title';
import { navigate } from '@/router';
import { fetchForumIndex } from '@/api/forum';
import { fetchThreadDetail, fetchThreadList } from '@/api/thread';
import { fetchLoginPage, login, refreshCaptchaUrl } from '@/api/auth';
import { deletePost, favorThread, loadComposeForm, submitPost } from '@/api/post';
import { flashAttFields, isImageFile, uploadMutiFile } from '@/api/attach';
import { searchForum } from '@/api/search';
import { fetchUserProfile } from '@/api/user';
import { fetchMessages, sendMessage } from '@/api/message';
import { wrapQuote } from '@/windcode';
import { setClientDisabled } from '@/lib/session';
import { teardownClient } from '@/bootstrap';
import { submitVote } from '@/api/vote';
import {
  FONT_SIZE_BASE_PX,
  LIST_STYLE_OPTIONS,
  THEME_OPTIONS,
  fontScaleToPx,
  loadPrefs,
  savePrefs,
  type ListStyleId,
  type ThemeId,
} from '@/lib/prefs';
import {
  BOARD_MENU_TOGGLE_EVENT,
  setBoardMenuAvailable,
} from '@/lib/boardMenu';

function UserNameLink(props: { name: string; uid?: number; username?: string }) {
  const name = props.name?.trim();
  if (!name) return null;
  const uid = props.uid && props.uid > 0 ? props.uid : undefined;
  const username = props.username?.trim() || name;
  const href = uid ? `u.php?uid=${uid}` : `u.php?username=${encodeURIComponent(username)}`;
  // 用户页不走客户端，整页打开原站 u.php
  return (
    <a href={href} class="xzqh-user-link">
      {name}
    </a>
  );
}

function HomeFeedList(props: { items: IndexFeedItem[]; keyPrefix: string }) {
  const items = props.items.slice(0, 20);
  if (!items.length) return <div class="xzqh-muted">暂无数据</div>;
  return (
    <div class="xzqh-list xzqh-home-feed-list">
      {items.map((t) => (
        <div class="xzqh-item" key={`${props.keyPrefix}-${t.tid}-${t.title}`}>
          <div class="xzqh-item-main">
            <div class="xzqh-subject-line">
              {t.forumName && (
                <span class="xzqh-badges">
                  <a
                    class="xzqh-badge"
                    href={t.fid ? `thread.php?fid=${t.fid}` : undefined}
                    onClick={(e) => {
                      if (!t.fid) return;
                      e.preventDefault();
                      navigate({ name: 'forum', fid: t.fid!, page: 1 });
                    }}
                  >
                    {t.forumName}
                  </a>
                </span>
              )}
              <a
                class="title"
                href={`read.php?tid=${t.tid}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate({ name: 'thread', tid: t.tid, page: 1 });
                }}
              >
                {t.title}
              </a>
            </div>
            {(t.author || t.time) && (
              <div class="xzqh-meta">
                {t.author || ''}
                {t.time ? ` · ${t.time}` : ''}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomePage() {
  const [cats, setCats] = useState<ForumCategory[]>([]);
  const [latestTopics, setLatestTopics] = useState<IndexFeedItem[]>([]);
  const [recentReplies, setRecentReplies] = useState<IndexFeedItem[]>([]);
  const [footer, setFooter] = useState<IndexFooterInfo | null>(null);
  const [feedTab, setFeedTab] = useState<'topics' | 'replies'>('topics');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchForumIndex();
        if (!alive) return;
        setCats(data.categories);
        setLatestTopics(data.latestTopics);
        setRecentReplies(data.recentReplies);
        setFooter(data.footer);
        if (!data.latestTopics.length && data.recentReplies.length) setFeedTab('replies');
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : '加载失败');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <Loading />;
  const showFeed = latestTopics.length > 0 || recentReplies.length > 0;
  const showFooter =
    !!footer &&
    (footer.friendLinks.length > 0 ||
      !!footer.onlineSummary ||
      footer.onlineUsers.length > 0 ||
      footer.memberGroups.length > 0);
  return (
    <div>
      {err && <Alert type="error">{err}</Alert>}
      <div class="xzqh-panel xzqh-home-feed" style={{ marginBottom: 16 }}>
        <h1 class="xzqh-h1">方舆论坛</h1>
        {showFeed && (
          <>
            <div class="xzqh-types xzqh-home-feed-tabs">
              <button
                type="button"
                class={feedTab === 'topics' ? 'active' : ''}
                onClick={() => setFeedTab('topics')}
              >
                最新主题{latestTopics.length ? ` (${latestTopics.length})` : ''}
              </button>
              <button
                type="button"
                class={feedTab === 'replies' ? 'active' : ''}
                onClick={() => setFeedTab('replies')}
              >
                最近回复{recentReplies.length ? ` (${recentReplies.length})` : ''}
              </button>
            </div>
            <div class="xzqh-home-feed-cols">
              <section
                class={`xzqh-home-feed-col${feedTab === 'topics' ? ' is-active' : ''}`}
                data-feed="topics"
              >
                <h2 class="xzqh-home-feed-col-title">
                  最新主题{latestTopics.length ? ` (${latestTopics.length})` : ''}
                </h2>
                <HomeFeedList items={latestTopics} keyPrefix="topics" />
              </section>
              <section
                class={`xzqh-home-feed-col${feedTab === 'replies' ? ' is-active' : ''}`}
                data-feed="replies"
              >
                <h2 class="xzqh-home-feed-col-title">
                  最近回复{recentReplies.length ? ` (${recentReplies.length})` : ''}
                </h2>
                <HomeFeedList items={recentReplies} keyPrefix="replies" />
              </section>
            </div>
          </>
        )}
      </div>
      {cats.length === 0 && <Alert>未解析到版块分区，请刷新重试。</Alert>}
      {cats.map((c) => (
        <section class="xzqh-cat xzqh-panel" key={c.name} style={{ marginBottom: 16 }}>
          <h2 class="xzqh-cat-title">{c.name}</h2>
          <div class="xzqh-grid-boards">
            {c.boards.map((b) => (
              <div class="xzqh-board" key={b.fid}>
                <div class="xzqh-board-main">
                  <div class="xzqh-board-hd">
                    <a
                      class="title"
                      href={`thread.php?fid=${b.fid}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate({ name: 'forum', fid: b.fid, page: 1 });
                      }}
                    >
                      {b.name}
                    </a>
                    {b.description && <div class="xzqh-board-desc">{b.description}</div>}
                  </div>
                  {b.lastTitle ? (
                    <div class="xzqh-board-latest">
                      <span class="xzqh-board-latest-label">最新</span>
                      <div class="xzqh-board-latest-body">
                        {b.lastTid ? (
                          <a
                            class="xzqh-board-latest-title"
                            href={`read.php?tid=${b.lastTid}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate({ name: 'thread', tid: b.lastTid!, page: 1 });
                            }}
                          >
                            {b.lastTitle}
                          </a>
                        ) : (
                          <span class="xzqh-board-latest-title">{b.lastTitle}</span>
                        )}
                        {(b.lastAuthor || b.lastTime) && (
                          <div class="xzqh-board-latest-meta">
                            {b.lastAuthor}
                            {b.lastAuthor && b.lastTime ? ' · ' : ''}
                            {b.lastTime}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div class="xzqh-board-latest is-empty">暂无新帖</div>
                  )}
                  <div class="xzqh-board-ft">
                    <div class="xzqh-board-ft-meta">
                      {b.today != null ? <span>今日 {b.today}</span> : null}
                      <span>版主 {b.moderators.slice(0, 3).join(' ') || '—'}</span>
                    </div>
                    <div class="xzqh-stats">
                      <span>{b.topics} 主题</span>
                      <span>{b.posts} 帖子</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {showFooter && footer && (
        <section class="xzqh-panel xzqh-home-footer" aria-label="站点信息">
          {footer.friendLinks.length > 0 && (
            <div class="xzqh-home-footer-block">
              <h2 class="xzqh-home-footer-title">友情链接</h2>
              <div class="xzqh-friend-links">
                {footer.friendLinks.map((l) => (
                  <a
                    key={`${l.href}-${l.name}`}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={l.title || l.name}
                  >
                    {l.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          {(footer.onlineSummary || footer.onlineUsers.length > 0) && (
            <div class="xzqh-home-footer-block">
              <h2 class="xzqh-home-footer-title">
                在线用户
                {footer.onlineSummary ? (
                  <span class="xzqh-home-footer-sub"> — {footer.onlineSummary}</span>
                ) : null}
              </h2>
              {footer.onlineUsers.length > 0 && (
                <div class="xzqh-online-users">
                  {footer.onlineUsers.map((u) =>
                    u.href ? (
                      <a key={u.name} href={u.href} target="_blank" rel="noreferrer">
                        {u.name}
                      </a>
                    ) : (
                      <span key={u.name}>{u.name}</span>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
          {footer.memberGroups.length > 0 && (
            <div class="xzqh-home-footer-block">
              <h2 class="xzqh-home-footer-title">会员类型</h2>
              <div class="xzqh-member-groups">
                {footer.memberGroups.map((g) => (
                  <span class="xzqh-member-group" key={g.name}>
                    {g.iconUrl ? <img src={g.iconUrl} alt="" width={16} height={16} /> : null}
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ForumSideNav(props: {
  categories: ForumCategory[];
  currentFid: number;
  open: boolean;
  onClose: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  if (!props.categories.length) return null;

  const goBoard = (b: ForumBoard) => {
    props.onClose();
    navigate({ name: 'forum', fid: b.fid, page: 1 });
  };

  return (
    <>
      {props.open && <div class="xzqh-board-backdrop" onClick={props.onClose} />}
      <aside class={`xzqh-board-side${props.open ? ' open' : ''}`} aria-label="其他版块">
        <div class="xzqh-board-side-hd">
          <strong>版块导航</strong>
          <button type="button" class="xzqh-board-side-close" onClick={props.onClose} aria-label="关闭">
            ×
          </button>
        </div>
        {props.categories.map((c) => {
          const isCollapsed = !!collapsed[c.name];
          return (
            <div class={`xzqh-board-group${isCollapsed ? ' collapsed' : ''}`} key={c.name}>
              <button
                type="button"
                class="xzqh-board-group-title"
                onClick={() => setCollapsed((m) => ({ ...m, [c.name]: !m[c.name] }))}
              >
                {c.name}
              </button>
              {!isCollapsed && (
                <ul class="xzqh-board-group-list">
                  {c.boards.map((b) => (
                    <li key={b.fid}>
                      <a
                        href={`thread.php?fid=${b.fid}`}
                        class={b.fid === props.currentFid ? 'current' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          goBoard(b);
                        }}
                      >
                        {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}

export function ForumPage(props: {
  fid: number;
  page: number;
  type?: string;
  special?: string;
  search?: string;
  user: SessionUser | null;
}) {
  const [data, setData] = useState<ThreadListResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [openTypeId, setOpenTypeId] = useState<string | null>(null);
  const [sideOpen, setSideOpen] = useState(false);
  const [sideFallback, setSideFallback] = useState<ForumCategory[]>([]);
  const [typesCache, setTypesCache] = useState<{ fid: number; types: ForumTypeTab[] } | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setOpenTypeId(null);
    setSideOpen(false);
    fetchThreadList({
      fid: props.fid,
      page: props.page,
      type: props.type,
      special: props.special,
      search: props.search,
    })
      .then(async (d) => {
        if (!alive) return;
        setData(d);
        if (d.types.length) {
          setTypesCache((prev) => {
            if (prev?.fid === props.fid && prev.types.length > d.types.length) return prev;
            return { fid: props.fid, types: d.types };
          });
        }
        if (!d.sideCategories?.length) {
          try {
            const idx = await fetchForumIndex();
            if (alive) setSideFallback(idx.categories);
          } catch {
            if (alive) setSideFallback([]);
          }
        } else {
          setSideFallback([]);
        }
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [props.fid, props.page, props.type, props.special, props.search]);

  useEffect(() => {
    if (!openTypeId) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.('.xzqh-type-dd')) return;
      setOpenTypeId(null);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [openTypeId]);

  const sideCategories = data?.sideCategories?.length ? data.sideCategories : sideFallback;
  const hasBoardMenu = !loading && !!data && !data.error && sideCategories.length > 0;

  useEffect(() => {
    setBoardMenuAvailable(hasBoardMenu, sideOpen);
    return () => setBoardMenuAvailable(false, false);
  }, [hasBoardMenu, sideOpen]);

  useEffect(() => {
    if (!hasBoardMenu) return;
    const onToggle = () => setSideOpen((v) => !v);
    window.addEventListener(BOARD_MENU_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(BOARD_MENU_TOGGLE_EVENT, onToggle);
  }, [hasBoardMenu]);

  if (loading) return <Loading />;
  if (!data) return <Alert type="error">加载失败</Alert>;
  if (data.error) {
    return (
      <div class="xzqh-panel">
        <Alert type="error">{data.error.message}</Alert>
        {data.error.kind === 'login_required' && (
          <button type="button" class="xzqh-btn primary" onClick={() => navigate({ name: 'login' })}>
            去登录
          </button>
        )}
      </div>
    );
  }

  const goType = (t: { id: string; href: string }) => {
    setOpenTypeId(null);
    const isDigest = t.id === 'digest' || /[?&]search=digest/.test(t.href);
    navigate({
      name: 'forum',
      fid: props.fid,
      page: 1,
      type: !isDigest && /[?&]type=\d+/.test(t.href) ? t.id : undefined,
      special: !isDigest && /[?&]special=\d+/.test(t.href) ? t.id : undefined,
      search: isDigest ? 'digest' : undefined,
    });
  };

  const typeActive = (t: { id: string; href: string; children?: { id: string }[] }) => {
    if (t.id === 'digest' || t.href.includes('search=digest')) return props.search === 'digest';
    if (t.href.includes('special=') && props.special === t.id) return true;
    if (t.href.includes('type=') && props.type === t.id) return true;
    return !!t.children?.some((c) => c.id === props.type);
  };

  const typeTabs =
    typesCache?.fid === props.fid && typesCache.types.length > data.types.length
      ? typesCache.types
      : data.types;

  return (
    <div class="xzqh-forum-layout">
      {sideCategories.length > 0 && (
        <ForumSideNav
          categories={sideCategories}
          currentFid={props.fid}
          open={sideOpen}
          onClose={() => setSideOpen(false)}
        />
      )}
      <div class="xzqh-forum-main">
    <div class="xzqh-panel">
      <div class="xzqh-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <h1 class="xzqh-h1">{data.forumName}</h1>
        </div>
        {data.canPost && props.user?.loggedIn && (
          <button
            type="button"
            class="xzqh-btn primary"
            onClick={() => navigate({ name: 'compose', fid: props.fid })}
          >
            发帖
          </button>
        )}
      </div>
      {typeTabs.length > 0 && (
        <div class="xzqh-types">
          <button
            type="button"
            class={!props.type && !props.special && !props.search ? 'active' : ''}
            onClick={() => navigate({ name: 'forum', fid: props.fid, page: 1 })}
          >
            全部
          </button>
          {typeTabs.map((t) =>
            t.children?.length ? (
              <div class={`xzqh-type-dd${openTypeId === t.id ? ' open' : ''}`} key={`${t.id}-${t.name}`}>
                <button
                  type="button"
                  class={typeActive(t) ? 'active' : ''}
                  aria-expanded={openTypeId === t.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenTypeId((cur) => (cur === t.id ? null : t.id));
                  }}
                >
                  {t.name}
                  <span class="xzqh-type-caret" aria-hidden="true">
                    ▼
                  </span>
                </button>
                {openTypeId === t.id && (
                  <div class="xzqh-type-menu" role="menu">
                    <button type="button" role="menuitem" onClick={() => goType(t)}>
                      {t.name}（全部）
                    </button>
                    {t.children.map((c) => (
                      <button
                        type="button"
                        role="menuitem"
                        key={c.id}
                        class={props.type === c.id ? 'active' : ''}
                        onClick={() => goType(c)}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                key={`${t.id}-${t.name}`}
                class={typeActive(t) ? 'active' : ''}
                onClick={() => goType(t)}
              >
                {t.name}
              </button>
            ),
          )}
        </div>
      )}
      <Pager
        page={data.page}
        totalPages={data.totalPages}
        onChange={(p) =>
          navigate({
            name: 'forum',
            fid: props.fid,
            page: p,
            type: props.type,
            special: props.special,
            search: props.search,
          })
        }
      />
      <MasonryList layoutKey={`${data.fid}-${data.page}-${props.type || ''}-${props.special || ''}-${data.threads.map((t) => t.tid).join(',')}`}>
        {data.threads.map((t) => (
          <div class={`xzqh-item${t.topped ? ' topped' : ''}`} key={t.tid}>
            <div class="xzqh-item-main">
              <div class="xzqh-subject-line">
                <div class="xzqh-card-tags">
                  {(t.topped || t.digest || t.vote || t.hasImage || t.isNew) && (
                    <span class="xzqh-badges">
                      {t.topped && <span class="xzqh-badge xzqh-badge--top">置顶</span>}
                      {t.digest && <span class="xzqh-badge xzqh-badge--digest">精华</span>}
                      {t.vote && <span class="xzqh-badge xzqh-badge--vote">投票</span>}
                      {t.hasImage && <span class="xzqh-badge xzqh-badge--img">图</span>}
                      {t.isNew && <span class="xzqh-badge xzqh-badge--new">NEW</span>}
                    </span>
                  )}
                  <TypeTags
                    tags={t.typeTags?.length ? t.typeTags : splitTitleTypes(t.title).typeTags}
                    fid={data.fid}
                  />
                </div>
                <a
                  class="title"
                  href={`read.php?tid=${t.tid}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({ name: 'thread', tid: t.tid, page: 1 });
                  }}
                >
                  {t.typeTags?.length ? t.title : splitTitleTypes(t.title).title || t.title}
                </a>
              </div>
              <div class="xzqh-meta">
                <div class="xzqh-meta-row">
                  <UserNameLink
                    name={t.author}
                    uid={t.authorUid}
                    username={t.authorUsername || t.author}
                  />
                  {t.postDate ? ` · ${t.postDate}` : ''}
                </div>
                {(t.lastAuthor || t.lastTime) && (
                  <div class="xzqh-meta-row">
                    最后{' '}
                    {t.lastAuthor ? (
                      <UserNameLink
                        name={t.lastAuthor}
                        uid={t.lastAuthorUid}
                        username={t.lastAuthorUsername || t.lastAuthor}
                      />
                    ) : null}
                    {t.lastTime ? (
                      <>
                        {' '}
                        <a
                          class="xzqh-last-time"
                          href={t.lastTimeHref || `read.php?tid=${t.tid}&page=e#a`}
                          title="跳到最后回复"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate({ name: 'thread', tid: t.tid, page: 9999 });
                          }}
                        >
                          {t.lastTime}
                        </a>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <div class="xzqh-stats">
              <div>{t.replies} 回复</div>
              <div>{t.hits} 浏览</div>
            </div>
          </div>
        ))}
      </MasonryList>
      <Pager
        page={data.page}
        totalPages={data.totalPages}
        onChange={(p) =>
          navigate({
            name: 'forum',
            fid: props.fid,
            page: p,
            type: props.type,
            special: props.special,
            search: props.search,
          })
        }
      />
    </div>
      </div>
    </div>
  );
}

export function ThreadPage(props: { tid: number; page: number; user: SessionUser | null }) {
  const [data, setData] = useState<ThreadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [replyFlashAtts, setReplyFlashAtts] = useState<EditorFlashAtt[]>([]);
  const [replyFocusToken, setReplyFocusToken] = useState(0);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const voteBox = useRef<HTMLDivElement>(null);
  const replyDraftKey = `xzqh_draft_reply_${props.tid}`;

  const reload = async (page = props.page) => {
    setLoading(true);
    try {
      let p = page;
      const d = await fetchThreadDetail(props.tid, p === 9999 ? 1 : p);
      if (page === 9999 && d.totalPages > 1) {
        const last = await fetchThreadDetail(props.tid, d.totalPages);
        setData(last);
      } else setData(d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload(props.page);
  }, [props.tid, props.page]);

  useEffect(() => {
    if (!data || loading) return;
    if (props.page < 9999 && location.hash !== '#a') return;
    const last = document.querySelector('.xzqh-floor:last-of-type');
    last?.scrollIntoView({ block: 'start' });
  }, [data, loading, props.page]);

  useEffect(() => {
    const el = voteBox.current;
    if (!el || !data) return;

    // 服务端投票 HTML 依赖被剥离的原站 JS（vv.vote / checkVote）；客户端接管。
    el.querySelectorAll('button, input[type="button"], input[type="radio"], input[type="checkbox"]').forEach(
      (node) => {
        (node as HTMLElement).removeAttribute('onclick');
      },
    );

    // 原站 vote_Bot 是 span.btn2 > span > button 精灵图壳，会把文字挤出胶囊外；换成干净按钮。
    const voteBot = el.querySelector('.vote_Bot');
    if (voteBot) {
      const old = voteBot.querySelector('button, input[type="button"]') as HTMLElement | null;
      const label = ((old?.textContent || (old as HTMLInputElement | null)?.value || '投票') as string).trim() || '投票';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'xzqh-vote-submit';
      btn.textContent = label;
      voteBot.replaceChildren(btn);
    }

    const collect = () => {
      const selected = [
        ...el.querySelectorAll(
          'input[name*=vote]:checked, input[type=radio]:checked, input[type=checkbox]:checked',
        ),
      ]
        .map((node) => (node as HTMLInputElement).value)
        .filter(Boolean);
      const extra: Record<string, string> = {};
      for (const input of Array.from(el.querySelectorAll('input, select')) as HTMLInputElement[]) {
        if (!input.name || input.type === 'submit' || input.type === 'button') continue;
        if ((input.type === 'checkbox' || input.type === 'radio') && !input.checked) continue;
        extra[input.name] = input.value;
      }
      return { selected, extra };
    };

    const doVote = async () => {
      if (!data) return;
      const { selected, extra } = collect();
      if (!selected.length) {
        setMsg('请先选择投票选项');
        return;
      }
      const r = await submitVote({
        tid: data.tid,
        selected,
        verifyhash: data.verifyhash,
        extra,
      });
      setMsg(r.message);
      if (r.ok) reload(data.page);
    };

    const toggleVoters = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const on = el.classList.toggle('xzqh-vote--show-voters');
      const link = el.querySelector('#viewVoters') as HTMLElement | null;
      if (link) link.textContent = on ? '收起参与人员' : '查看参与人员';
    };

    const onClick = (e: Event) => {
      const target = e.target as Element | null;
      const votersLink = target?.closest?.('#viewVoters, a.fn, a.s4') as HTMLElement | null;
      if (votersLink && /参与人员|收起/.test(votersLink.textContent || '')) {
        toggleVoters(e);
        return;
      }
      const btn = target?.closest?.('button, input[type="button"]') as HTMLElement | null;
      if (!btn) return;
      const text = (btn.textContent || '').trim() || (btn as HTMLInputElement).value || '';
      if (!/^\s*投票\s*$/.test(text)) return;
      e.preventDefault();
      void doVote();
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      void doVote();
    };

    el.addEventListener('click', onClick);
    el.addEventListener('submit', onSubmit);
    return () => {
      el.removeEventListener('click', onClick);
      el.removeEventListener('submit', onSubmit);
    };
  }, [data?.tid, data?.voteHtml, data?.verifyhash]);

  if (loading) return <Loading />;
  if (!data) return <Alert type="error">加载失败</Alert>;
  if (data.error) {
    return (
      <div class="xzqh-panel">
        <Alert type="error">{data.error.message}</Alert>
        {data.error.kind === 'login_required' && (
          <button type="button" class="xzqh-btn primary" onClick={() => navigate({ name: 'login' })}>
            去登录
          </button>
        )}
      </div>
    );
  }

  const focusQuickReply = () => setReplyFocusToken((n) => n + 1);

  const onReply = async () => {
    if (!reply.trim()) {
      setMsg('请填写回复内容');
      focusQuickReply();
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const form = await loadComposeForm({ fid: data.fid, tid: data.tid });
      const res = await submitPost({
        action: form.action,
        fields: {
          ...form.fields,
          ...(data.replyForm || {}),
          ...flashAttFields(replyFlashAtts),
        },
        content: reply,
      });
      setMsg(res.message);
      if (res.ok) {
        setReply('');
        setReplyFlashAtts([]);
        try {
          localStorage.removeItem(replyDraftKey);
        } catch {
          /* ignore */
        }
        await reload(data.totalPages || props.page);
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : '回复失败');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div class="xzqh-panel" style={{ marginBottom: 14 }}>
        <div class="xzqh-toolbar">
          {data.fid > 0 && (
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={() => navigate({ name: 'forum', fid: data.fid, page: 1 })}
            >
              返回版块
            </button>
          )}
          {data.canReply && props.user?.loggedIn && (
            <button
              type="button"
              class="xzqh-btn primary"
              onClick={() => navigate({ name: 'compose', fid: data.fid, tid: data.tid })}
            >
              完整回复
            </button>
          )}
          {data.canFavor && props.user?.loggedIn && (
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={async () => {
                const r = await favorThread(data.tid, data.verifyhash || props.user?.verifyhash || '');
                setMsg(r.message);
              }}
            >
              收藏
            </button>
          )}
        </div>
        <TitleWithTypes
          as="h1"
          title={data.title}
          typeTags={data.typeTags}
          fid={data.fid || undefined}
          forumName={data.forumName}
        />
        {msg && <Alert type={/成功|收藏成功/.test(msg) ? 'ok' : 'warn'}>{msg}</Alert>}
        <Pager
          page={data.page}
          totalPages={data.totalPages}
          onChange={(p) => navigate({ name: 'thread', tid: data.tid, page: p })}
        />
      </div>

      {data.isVote && data.voteHtml && (
        <div class="xzqh-panel xzqh-vote-panel" style={{ marginBottom: 14 }}>
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>投票</h2>
          <div
            class="xzqh-vote"
            ref={voteBox}
            dangerouslySetInnerHTML={{ __html: data.voteHtml }}
          />
        </div>
      )}

      {data.floors.map((f) => (
        <FloorCard
          key={`${f.pidParam}-${f.floor}`}
          floor={f}
          tid={data.tid}
          fid={data.fid}
          verifyhash={data.verifyhash}
          onQuote={() => {
            setReply((prev) => wrapQuote(f.author, f.contentHtml) + prev);
            focusQuickReply();
          }}
          onDeleted={() => reload(data.page)}
        />
      ))}

      <Pager
        page={data.page}
        totalPages={data.totalPages}
        onChange={(p) => navigate({ name: 'thread', tid: data.tid, page: p })}
      />

      {data.canReply && props.user?.loggedIn && (
        <div class="xzqh-panel" id="xzqh-quick-reply">
          <div class="xzqh-row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
            <h2 style={{ margin: 0, fontSize: '1.05rem' }}>快速回复</h2>
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={() => navigate({ name: 'compose', fid: data.fid, tid: data.tid })}
            >
              完整回复
            </button>
          </div>
          {msg && /请填写|失败|错误|不能|禁止|验证|权限/.test(msg) && !/成功|收藏/.test(msg) && (
            <Alert type="error">{msg}</Alert>
          )}
          <div class="xzqh-form">
            <WindEditor
              value={reply}
              onChange={setReply}
              compact
              minRows={6}
              draftKey={replyDraftKey}
              placeholder="支持 Wind Code；可点「完整」展开全部工具栏"
              fid={data.fid || undefined}
              verifyhash={data.verifyhash || props.user?.verifyhash || undefined}
              flashAtts={replyFlashAtts}
              onFlashAttsChange={setReplyFlashAtts}
              focusToken={replyFocusToken}
            />
            {replyFlashAtts.length > 0 && (
              <div class="xzqh-meta">
                已上传 {replyFlashAtts.length} 个附件/图片，将随回复提交
              </div>
            )}
            <div class="xzqh-row">
              <button type="button" class="xzqh-btn primary" disabled={busy} onClick={onReply}>
                {busy ? '提交中…' : '发表回复'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FloorCard(props: {
  floor: PostFloor;
  tid: number;
  fid: number;
  verifyhash: string;
  onQuote: () => void;
  onDeleted: () => void;
}) {
  const { floor: f } = props;
  const floorLabel = f.floor === 0 ? '楼主' : `${f.floor} 楼`;
  return (
    <article class="xzqh-floor" id={`pid${f.pidParam || f.pid}`}>
      <div class="xzqh-floor-hd">
        <div class="xzqh-floor-user">
          {f.avatarUrl ? (
            <img class="xzqh-avatar" src={f.avatarUrl} alt="" width={40} height={40} loading="lazy" />
          ) : (
            <div class="xzqh-avatar xzqh-avatar-fallback" aria-hidden="true">
              {(f.author || '?').slice(0, 1)}
            </div>
          )}
          <div>
            <strong>
              <a
                href={
                  f.authorUid
                    ? `u.php?uid=${f.authorUid}`
                    : `u.php?username=${encodeURIComponent(f.author)}`
                }
              >
                {f.author}
              </a>
            </strong>
            <div class="xzqh-muted">{f.postDate || ''}</div>
          </div>
        </div>
        <div class="xzqh-muted">{floorLabel}</div>
      </div>
      <div class="xzqh-floor-bd" dangerouslySetInnerHTML={{ __html: f.contentHtml }} />
      {f.attachments.length > 0 && (
        <div class="xzqh-attach-list" style={{ padding: '0 16px 8px' }}>
          {f.attachments.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noreferrer">
              {a.isImage ? '图片' : '附件'}：{a.name}
            </a>
          ))}
        </div>
      )}
      <div class="xzqh-floor-ft">
        {f.canQuote && (
          <button type="button" class="xzqh-btn ghost" onClick={props.onQuote}>
            引用
          </button>
        )}
        {f.canEdit && (
          <button
            type="button"
            class="xzqh-btn ghost"
            onClick={() =>
              navigate({
                name: 'compose',
                fid: props.fid,
                tid: props.tid,
                editPid: f.pidParam,
                article: f.article,
              })
            }
          >
            编辑
          </button>
        )}
        {f.canDelete && (
          <button
            type="button"
            class="xzqh-btn danger"
            onClick={async () => {
              if (!confirm('确认删除该楼层？')) return;
              const r = await deletePost({
                fid: props.fid,
                tid: props.tid,
                pid: f.pidParam,
                article: f.article,
                verifyhash: props.verifyhash,
              });
              alert(r.message);
              if (r.ok) props.onDeleted();
            }}
          >
            删除
          </button>
        )}
      </div>
    </article>
  );
}

export function LoginPage(props: { onSuccess: (session?: SessionUser) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gdcode, setGdcode] = useState('');
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [hideid, setHideid] = useState(false);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  /** Reload captcha from login.php so Aliyun sessionid stays in sync with cookie. */
  const reloadCaptcha = async () => {
    const info = await fetchLoginPage();
    setCaptcha(info.captchaUrl ? refreshCaptchaUrl(info.captchaUrl) : null);
    setGdcode('');
  };

  useEffect(() => {
    reloadCaptcha();
  }, []);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (!username.trim() || !password || !gdcode.trim()) {
      setMsg('请填写用户名、密码和验证码');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const res = await login({
        username,
        password,
        gdcode,
        remember,
        hideid: hideid ? '1' : '0',
        jumpurl: forumUrlSafe(),
      });
      setMsg(res.message);
      if (res.ok) props.onSuccess(res.session);
      else await reloadCaptcha();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : '登录失败');
      await reloadCaptcha();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="xzqh-panel" style={{ maxWidth: 460, margin: '0 auto' }}>
      <h1 class="xzqh-h1">登录方舆</h1>
      {msg && <Alert type={/成功/.test(msg) ? 'ok' : 'error'}>{msg}</Alert>}
      <form class="xzqh-form" onSubmit={onSubmit}>
        <label>
          用户名
          <input
            name="pwuser"
            value={username}
            onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            autocomplete="username"
            maxlength={60}
          />
        </label>
        <label>
          密码
          <input
            name="pwpwd"
            type="password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
            autocomplete="current-password"
            maxlength={20}
          />
        </label>
        <label>
          验证码
          <div class="xzqh-captcha">
            <input
              name="gdcode"
              id="gdcode"
              value={gdcode}
              onInput={(e) => setGdcode((e.target as HTMLInputElement).value)}
              onFocus={() => {
                if (!captcha) reloadCaptcha();
              }}
              autocomplete="off"
            />
            {captcha ? (
              <img
                src={captcha}
                alt="验证码"
                title="看不清？点击换一张"
                onClick={() => reloadCaptcha()}
              />
            ) : (
              <button type="button" class="xzqh-btn ghost" onClick={() => reloadCaptcha()}>
                加载验证码
              </button>
            )}
          </div>
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember((e.target as HTMLInputElement).checked)}
          />
          下次自动登录
        </label>
        <label style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={hideid}
            onChange={(e) => setHideid((e.target as HTMLInputElement).checked)}
          />
          隐身登录
        </label>
        <button type="submit" class="xzqh-btn primary" disabled={busy}>
          {busy ? '登录中…' : '登录'}
        </button>
      </form>
    </div>
  );
}

function forumUrlSafe(): string {
  try {
    return location.href.includes('/lt/') ? location.href : 'http://xzqh.info/lt/index.php';
  } catch {
    return 'http://xzqh.info/lt/index.php';
  }
}

export function ComposePage(props: {
  fid: number;
  tid?: number;
  quotePid?: number | string;
  editPid?: number | string;
  article?: number;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [meta, setMeta] = useState<Awaited<ReturnType<typeof loadComposeForm>> | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadMsg, setUploadMsg] = useState('');
  const [flashAtts, setFlashAtts] = useState<EditorFlashAtt[]>([]);
  const [attachBusy, setAttachBusy] = useState(false);
  const [ptype, setPtype] = useState('');
  const [settingsTab, setSettingsTab] = useState<'common' | 'tags' | 'sell' | 'advanced'>('common');
  const [atcNewrp, setAtcNewrp] = useState(false);
  const [atcAnonymous, setAtcAnonymous] = useState(false);
  const [atcHide, setAtcHide] = useState(false);
  const [usernames, setUsernames] = useState('');
  const [tags, setTags] = useState('');
  const [requireSell, setRequireSell] = useState(false);
  const [sellMoney, setSellMoney] = useState('0');
  const [requireEnhide, setRequireEnhide] = useState(false);
  const [enhideRvrc, setEnhideRvrc] = useState('0');
  const [useSign, setUseSign] = useState(true);
  const [autoUrl, setAutoUrl] = useState(true);
  const [convert, setConvert] = useState(true);

  const draftKey = `xzqh_draft_compose_${props.fid}_${props.tid || 0}_${props.editPid || 0}`;

  useEffect(() => {
    loadComposeForm(props)
      .then((m) => {
        setMeta(m);
        if (m.fields.atc_title) setTitle(m.fields.atc_title);
        if (m.fields.atc_content) setContent(m.fields.atc_content);
        if (m.fields.p_type) setPtype(m.fields.p_type);
        if (m.fields.atc_tags) setTags(m.fields.atc_tags);
        if (m.fields.usernames) setUsernames(m.fields.usernames);
        if (m.fields.atc_money) setSellMoney(m.fields.atc_money);
        if (m.fields.atc_rvrc) setEnhideRvrc(m.fields.atc_rvrc);
        setAtcNewrp(m.fields.atc_newrp === '1');
        setAtcAnonymous(m.fields.atc_anonymous === '1');
        setAtcHide(m.fields.atc_hide === '1');
        setRequireSell(m.fields.atc_requiresell === '1');
        setRequireEnhide(m.fields.atc_requireenhide === '1');
        setUseSign(m.fields.atc_usesign !== '0');
        setAutoUrl(m.fields.atc_autourl !== '0');
        setConvert(m.fields.atc_convert !== '0');
      })
      .catch((e) => setMsg(e instanceof Error ? e.message : '无法打开编辑器'));
  }, [props.fid, props.tid, props.quotePid, props.editPid, props.article]);

  const buildFields = () => {
    if (!meta) return {};
    const fields = { ...meta.fields };
    if (ptype) fields.p_type = ptype;
    else delete fields.p_type;

    const setFlag = (name: string, on: boolean) => {
      if (on) fields[name] = '1';
      else delete fields[name];
    };
    setFlag('atc_newrp', atcNewrp);
    setFlag('atc_anonymous', atcAnonymous && !!meta.options.anonymousEnabled);
    setFlag('atc_hide', atcHide && !!meta.options.hideEnabled);
    setFlag('atc_requiresell', requireSell && !!meta.options.sellEnabled);
    setFlag('atc_requireenhide', requireEnhide && !!meta.options.enhideEnabled);
    setFlag('atc_usesign', useSign);
    setFlag('atc_autourl', autoUrl);
    setFlag('atc_convert', convert);

    fields.usernames = usernames.trim();
    fields.atc_tags = tags.trim();
    fields.atc_money = sellMoney || '0';
    fields.atc_rvrc = enhideRvrc || '0';
    Object.assign(fields, flashAttFields(flashAtts));
    return fields;
  };

  const goAfterSuccess = (redirect?: string) => {
    if (redirect && /tid=(\d+)/.test(redirect)) {
      const tid = Number(redirect.match(/tid=(\d+)/)![1]);
      navigate({ name: 'thread', tid, page: 9999 });
    } else if (props.tid) {
      navigate({ name: 'thread', tid: props.tid, page: 9999 });
    } else {
      navigate({ name: 'forum', fid: props.fid, page: 1 });
    }
  };

  const onSubmit = async () => {
    if (!meta) return;
    if (meta.titleRequired && !title.trim()) {
      setMsg('请填写标题');
      return;
    }
    if (!content.trim()) {
      setMsg('请填写内容');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const res = await submitPost({
        action: meta.action,
        fields: buildFields(),
        title: meta.showTitle ? title : undefined,
        content,
        files: files.length ? files : undefined,
      });
      setMsg(res.message);
      if (res.ok) {
        try {
          localStorage.removeItem(draftKey);
        } catch {
          /* ignore */
        }
        setFlashAtts([]);
        goAfterSuccess(res.redirect);
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : '提交失败');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="xzqh-panel xzqh-compose">
      <h1 class="xzqh-h1">{props.editPid ? '编辑帖子' : props.tid ? '回复主题' : '发表主题'}</h1>
      {msg && <Alert type={/成功|已提交/.test(msg) ? 'ok' : 'error'}>{msg}</Alert>}
      {!meta && !msg && <Loading />}
      {meta && (
        <div class="xzqh-form">
          {meta.showTitle && (
            <div class="xzqh-compose-title">
              {meta.types.length > 0 && (
                <select
                  class="xzqh-compose-type"
                  value={ptype}
                  onChange={(e) => setPtype((e.target as HTMLSelectElement).value)}
                  title="选择分类"
                >
                  <option value="">选择分类</option>
                  {meta.types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              )}
              <input
                class="xzqh-compose-title-input"
                value={title}
                placeholder="请输入标题"
                onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
              />
            </div>
          )}

          <WindEditor
            value={content}
            onChange={setContent}
            draftKey={draftKey}
            minRows={16}
            placeholder="在此输入正文，支持完整 Wind Code"
            fid={props.fid}
            verifyhash={meta.verifyhash}
            uploadEnabled={meta.uploadEnabled}
            flashAtts={flashAtts}
            onFlashAttsChange={setFlashAtts}
          />

          {meta.uploadEnabled && (
          <div class="xzqh-compose-attach">
            <div class="xzqh-compose-attach-hd">
              <strong>附件</strong>
              <span class="xzqh-muted">对应原站「插入附件」（任意允许类型）；图片请优先用编辑器「图片」</span>
            </div>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from((e.target as HTMLInputElement).files || []))}
            />
            {files.length > 0 && (
              <ul class="xzqh-attach-list">
                {files.map((f) => (
                  <li key={f.name + f.size}>
                    {f.name} · {(f.size / 1024).toFixed(1)} KB
                    {isImageFile(f) ? ' · 图片' : ''}
                  </li>
                ))}
              </ul>
            )}
            {files.length > 0 && (
              <button
                type="button"
                class="xzqh-btn ghost"
                disabled={attachBusy}
                onClick={async () => {
                  setAttachBusy(true);
                  setUploadMsg('');
                  const uploaded: EditorFlashAtt[] = [...flashAtts];
                  for (const file of files) {
                    const r = await uploadMutiFile({
                      file,
                      verifyhash: meta.verifyhash,
                      fid: props.fid,
                      onProgress: (p) => setUploadMsg(`${file.name} ${p}%`),
                    });
                    if (!r.ok || !r.aid) {
                      setUploadMsg(r.message || `${file.name} 上传失败`);
                      continue;
                    }
                    const item: EditorFlashAtt = {
                      aid: r.aid,
                      name: file.name,
                      path: r.path || r.url || '',
                      kind: isImageFile(file) ? 'image' : 'file',
                    };
                    const i = uploaded.findIndex((x) => x.aid === item.aid);
                    if (i >= 0) uploaded[i] = item;
                    else uploaded.push(item);
                    setContent(
                      (c) => `${c}${c && !/\n$/.test(c) ? '\n' : ''}[attachment=${r.aid}]\n`,
                    );
                  }
                  setFlashAtts(uploaded);
                  setFiles([]);
                  setUploadMsg(`已上传并插入 ${uploaded.length} 个附件`);
                  setAttachBusy(false);
                }}
              >
                {attachBusy ? '上传中…' : '上传所选附件并插入'}
              </button>
            )}
            {flashAtts.length > 0 && (
              <ul class="xzqh-attach-list">
                {flashAtts.map((a) => (
                  <li key={a.aid}>
                    {a.kind === 'image' ? '图片' : '附件'} #{a.aid} · {a.name}
                  </li>
                ))}
              </ul>
            )}
            {uploadMsg && <div class="xzqh-meta">{uploadMsg}</div>}
          </div>
          )}

          <div class="xzqh-compose-settings">
            <div class="xzqh-compose-tabs" role="tablist">
              {(
                [
                  ['common', '常用设置'],
                  ['tags', '主题标签'],
                  ['sell', '售密设置'],
                  ['advanced', '高级'],
                ] as const
              ).map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  role="tab"
                  class={`xzqh-compose-tab${settingsTab === id ? ' active' : ''}`}
                  aria-selected={settingsTab === id}
                  onClick={() => setSettingsTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div class="xzqh-compose-tabpanel">
              {settingsTab === 'common' && (
                <>
                  <label class="xzqh-check">
                    <input
                      type="checkbox"
                      checked={atcNewrp}
                      onChange={(e) => setAtcNewrp((e.target as HTMLInputElement).checked)}
                    />
                    回复站内短信提醒
                  </label>
                  <label class={`xzqh-check${meta.options.anonymousEnabled ? '' : ' is-disabled'}`}>
                    <input
                      type="checkbox"
                      disabled={!meta.options.anonymousEnabled}
                      checked={atcAnonymous}
                      onChange={(e) => setAtcAnonymous((e.target as HTMLInputElement).checked)}
                    />
                    匿名帖
                  </label>
                  <label class={`xzqh-check${meta.options.hideEnabled ? '' : ' is-disabled'}`}>
                    <input
                      type="checkbox"
                      disabled={!meta.options.hideEnabled}
                      checked={atcHide}
                      onChange={(e) => setAtcHide((e.target as HTMLInputElement).checked)}
                    />
                    隐藏此帖（回复可见）
                  </label>
                  <label>
                    提到某人
                    <input
                      value={usernames}
                      placeholder="用户名，多个用空格或逗号分隔"
                      onInput={(e) => setUsernames((e.target as HTMLInputElement).value)}
                    />
                  </label>
                </>
              )}
              {settingsTab === 'tags' && (
                <label>
                  主题标签
                  <input
                    value={tags}
                    placeholder="多个标签用空格分隔"
                    onInput={(e) => setTags((e.target as HTMLInputElement).value)}
                  />
                </label>
              )}
              {settingsTab === 'sell' && (
                <>
                  <label class={`xzqh-check${meta.options.sellEnabled ? '' : ' is-disabled'}`}>
                    <input
                      type="checkbox"
                      disabled={!meta.options.sellEnabled}
                      checked={requireSell}
                      onChange={(e) => setRequireSell((e.target as HTMLInputElement).checked)}
                    />
                    出售帖
                  </label>
                  <label>
                    出售：货币
                    <input
                      value={sellMoney}
                      disabled={!meta.options.sellEnabled}
                      onInput={(e) => setSellMoney((e.target as HTMLInputElement).value)}
                    />
                  </label>
                  <label class={`xzqh-check${meta.options.enhideEnabled ? '' : ' is-disabled'}`}>
                    <input
                      type="checkbox"
                      disabled={!meta.options.enhideEnabled}
                      checked={requireEnhide}
                      onChange={(e) => setRequireEnhide((e.target as HTMLInputElement).checked)}
                    />
                    加密浏览
                  </label>
                  <label>
                    加密：威望以上才能浏览
                    <input
                      value={enhideRvrc}
                      disabled={!meta.options.enhideEnabled}
                      onInput={(e) => setEnhideRvrc((e.target as HTMLInputElement).value)}
                    />
                  </label>
                  {!meta.options.sellEnabled && !meta.options.enhideEnabled && (
                    <p class="xzqh-muted">当前用户组不可用售密设置（与原站一致）。</p>
                  )}
                </>
              )}
              {settingsTab === 'advanced' && (
                <>
                  <label class="xzqh-check">
                    <input
                      type="checkbox"
                      checked={useSign}
                      onChange={(e) => setUseSign((e.target as HTMLInputElement).checked)}
                    />
                    使用帖子签名
                  </label>
                  <label class="xzqh-check">
                    <input
                      type="checkbox"
                      checked={autoUrl}
                      onChange={(e) => setAutoUrl((e.target as HTMLInputElement).checked)}
                    />
                    自动解析链接 URL
                  </label>
                  <label class="xzqh-check">
                    <input
                      type="checkbox"
                      checked={convert}
                      onChange={(e) => setConvert((e.target as HTMLInputElement).checked)}
                    />
                    WindCode 转换
                  </label>
                </>
              )}
            </div>
          </div>

          <div class="xzqh-row xzqh-compose-actions">
            <button type="button" class="xzqh-btn primary xzqh-btn-lg" disabled={busy} onClick={onSubmit}>
              {busy ? '提交中…' : '发布'}
            </button>
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={() => {
                try {
                  localStorage.setItem(
                    draftKey,
                    JSON.stringify({ content, title, savedAt: Date.now() }),
                  );
                  setMsg('已存为本地草稿');
                } catch {
                  setMsg('草稿保存失败');
                }
              }}
            >
              存为草稿
            </button>
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={() =>
                props.tid
                  ? navigate({ name: 'thread', tid: props.tid, page: 1 })
                  : navigate({ name: 'forum', fid: props.fid, page: 1 })
              }
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function SearchPage(props: { keyword?: string; digest?: boolean; schTime?: string }) {
  const [keyword, setKeyword] = useState(props.keyword || '');
  const [items, setItems] = useState<{ tid: number; title: string; author?: string }[]>([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async (kw = keyword) => {
    setLoading(true);
    setErr('');
    try {
      const res = await searchForum({
        keyword: kw,
        digest: props.digest,
        schTime: props.schTime,
      });
      if (res.error) setErr(res.error);
      setItems(res.items);
    } catch (e) {
      setErr(e instanceof Error ? e.message : '搜索失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.keyword || props.digest || props.schTime) run(props.keyword || '');
  }, [props.keyword, props.digest, props.schTime]);

  return (
    <div class="xzqh-panel">
      <h1 class="xzqh-h1">搜索</h1>
      <form
        class="xzqh-form"
        onSubmit={(e) => {
          e.preventDefault();
          const kw = keyword.trim();
          if (!kw) {
            setErr('请输入搜索关键词');
            return;
          }
          const sameQuery =
            (props.keyword || '') === kw && !props.digest && !props.schTime;
          navigate({ name: 'search', keyword: kw });
          // navigate 后 URL 未变化时 effect 不会重跑，这里补一次；否则会重复请求。
          if (sameQuery) run(kw);
        }}
      >
        <label>
          关键词
          <input value={keyword} onInput={(e) => setKeyword((e.target as HTMLInputElement).value)} />
        </label>
        <div class="xzqh-row">
          <button type="submit" class="xzqh-btn primary">
            搜索
          </button>
          <button type="button" class="xzqh-btn ghost" onClick={() => navigate({ name: 'search', schTime: 'newatc' })}>
            新帖
          </button>
          <button type="button" class="xzqh-btn ghost" onClick={() => navigate({ name: 'search', digest: true })}>
            精华
          </button>
        </div>
      </form>
      {loading && <Loading />}
      {err && <Alert type="error">{err}</Alert>}
      <MasonryList
        style={{ marginTop: 12 }}
        layoutKey={items.map((t) => t.tid).join(',')}
      >
        {items.map((t) => (
          <div class="xzqh-item" key={t.tid}>
            <a
              class="title"
              href={`read.php?tid=${t.tid}`}
              onClick={(e) => {
                e.preventDefault();
                navigate({ name: 'thread', tid: t.tid, page: 1 });
              }}
            >
              {t.title}
            </a>
            <div class="xzqh-meta">{t.author || ''}</div>
          </div>
        ))}
      </MasonryList>
    </div>
  );
}

export function UserPage(props: { uid?: number; username?: string }) {
  const [profile, setProfile] = useState<UserProfile | undefined>();
  const [threads, setThreads] = useState<ThreadItem[]>([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile(props)
      .then((r) => {
        setProfile(r.profile);
        setThreads(r.threads);
        setErr(r.error || '');
      })
      .finally(() => setLoading(false));
  }, [props.uid, props.username]);

  if (loading) return <Loading />;
  return (
    <div class="xzqh-panel">
      {err && <Alert type="error">{err}</Alert>}
      {profile && (
        <>
          <div class="xzqh-row">
            {profile.avatarUrl && (
              <img src={profile.avatarUrl} alt="" width={64} height={64} style={{ borderRadius: 12 }} />
            )}
            <div>
              <h1 class="xzqh-h1">{profile.username}</h1>
              <p class="xzqh-sub">
                uid={profile.uid}
                {profile.groupName ? ` · ${profile.groupName}` : ''}
              </p>
            </div>
          </div>
          {profile.credits && Object.keys(profile.credits).length > 0 && (
            <div class="xzqh-meta" style={{ marginBottom: 12 }}>
              {Object.entries(profile.credits).map(([k, v]) => (
                <span key={k} style={{ marginRight: 12 }}>
                  {k}: {v}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <h2 style={{ fontSize: '1rem' }}>相关帖子</h2>
      <div class="xzqh-list">
        {threads.map((t) => (
          <div class="xzqh-item" key={t.tid}>
            <a
              class="title"
              href={`read.php?tid=${t.tid}`}
              onClick={(e) => {
                e.preventDefault();
                navigate({ name: 'thread', tid: t.tid, page: 1 });
              }}
            >
              {t.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [items, setItems] = useState<MessageItem[]>([]);
  const [err, setErr] = useState('');
  const [to, setTo] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [msg, setMsg] = useState('');

  const reload = () =>
    fetchMessages().then((r) => {
      setItems(r.items);
      setErr(r.error || '');
    });

  useEffect(() => {
    reload();
  }, []);

  return (
    <div class="xzqh-panel">
      <h1 class="xzqh-h1">私信</h1>
      {err && (
        <>
          <Alert type="error">{err}</Alert>
          {/登录/.test(err) && (
            <button type="button" class="xzqh-btn primary" onClick={() => navigate({ name: 'login' })}>
              去登录
            </button>
          )}
        </>
      )}
      {!err && (
        <>
          <div class="xzqh-list" style={{ marginBottom: 16 }}>
            {items.map((m) => (
              <div class="xzqh-item" key={m.id + m.title}>
                <div>
                  <div class="title">{m.title}</div>
                  <div class="xzqh-meta">
                    {m.from}
                    {m.unread ? ' · 未读' : ''}
                  </div>
                </div>
                <a href={m.href} target="_blank" rel="noreferrer">
                  原页
                </a>
              </div>
            ))}
            {!items.length && <div class="xzqh-muted">暂无私信</div>}
          </div>
          <h2 style={{ fontSize: '1rem' }}>发送私信</h2>
          {msg && <Alert type={/成功/.test(msg) ? 'ok' : 'error'}>{msg}</Alert>}
          <div class="xzqh-form">
            <label>
              收件人
              <input value={to} onInput={(e) => setTo((e.target as HTMLInputElement).value)} />
            </label>
            <label>
              标题
              <input value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)} />
            </label>
            <label>
              内容
              <textarea value={content} onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)} />
            </label>
            <button
              type="button"
              class="xzqh-btn primary"
              onClick={async () => {
                const r = await sendMessage({ to, title, content });
                setMsg(r.message);
                if (r.ok) {
                  setContent('');
                  reload();
                }
              }}
            >
              发送
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function SettingsPage() {
  const [prefs, setPrefs] = useState(() => loadPrefs());

  return (
    <div class="xzqh-panel">
      <h1 class="xzqh-h1">客户端设置</h1>

      <section class="xzqh-settings-block">
        <h2 class="xzqh-settings-title">配色主题</h2>
        <div class="xzqh-theme-grid">
          {THEME_OPTIONS.map((t) => (
            <button
              type="button"
              key={t.id}
              class={`xzqh-theme-card${prefs.theme === t.id ? ' active' : ''}`}
              data-theme-preview={t.id}
              onClick={() => setPrefs(savePrefs({ theme: t.id as ThemeId }))}
            >
              <span class="xzqh-theme-swatch" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <strong>{t.name}</strong>
              <span>{t.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section class="xzqh-settings-block xzqh-settings-liststyle">
        <h2 class="xzqh-settings-title">列表样式</h2>
        <div class="xzqh-seg">
          {LIST_STYLE_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.id}
              class={prefs.listStyle === opt.id ? 'active' : ''}
              onClick={() => setPrefs(savePrefs({ listStyle: opt.id as ListStyleId }))}
            >
              <strong>{opt.name}</strong>
              <span>{opt.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section class="xzqh-settings-block xzqh-settings-fontsize">
        <h2 class="xzqh-settings-title">显示字号</h2>
        <div class="xzqh-font-scale">
          <span class="xzqh-font-scale-edge">-100%</span>
          <input
            class="xzqh-font-scale-range"
            type="range"
            min={-100}
            max={100}
            step={1}
            value={prefs.fontScale}
            aria-label="显示字号"
            onInput={(e) =>
              setPrefs(savePrefs({ fontScale: Number((e.target as HTMLInputElement).value) }))
            }
          />
          <span class="xzqh-font-scale-edge">+100%</span>
        </div>
        <div class="xzqh-font-scale-readout">
          {prefs.fontScale > 0 ? '+' : ''}
          {prefs.fontScale}% · 约 {fontScaleToPx(prefs.fontScale)}px
          {prefs.fontScale !== 0 && (
            <button
              type="button"
              class="xzqh-btn ghost"
              style={{ marginLeft: 8, padding: '2px 8px' }}
              onClick={() => setPrefs(savePrefs({ fontScale: 0 }))}
            >
              复位
            </button>
          )}
        </div>
      </section>

      <section class="xzqh-settings-block">
        <h2 class="xzqh-settings-title">原界面</h2>
        <div class="xzqh-row">
          <button
            type="button"
            class="xzqh-btn danger"
            onClick={() => {
              setClientDisabled(true);
              teardownClient();
              location.reload();
            }}
          >
            禁用客户端并恢复原界面
          </button>
          <button
            type="button"
            class="xzqh-btn ghost"
            onClick={() => {
              setClientDisabled(false);
              alert('已启用。刷新后生效。');
              location.reload();
            }}
          >
            重新启用客户端
          </button>
        </div>
      </section>
    </div>
  );
}
