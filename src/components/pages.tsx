import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type {
  ForumBoard,
  ForumCategory,
  ForumTypeTab,
  IndexFeedItem,
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
import { splitTitleTypes } from '@/lib/title';
import { navigate } from '@/router';
import { fetchForumIndex } from '@/api/forum';
import { fetchThreadDetail, fetchThreadList } from '@/api/thread';
import { fetchLoginPage, login, refreshCaptchaUrl } from '@/api/auth';
import { deletePost, favorThread, loadComposeForm, submitPost } from '@/api/post';
import { uploadAttachment } from '@/api/attach';
import { searchForum } from '@/api/search';
import { fetchUserProfile } from '@/api/user';
import { fetchMessages, sendMessage } from '@/api/message';
import { windcodeToHtml, wrapQuote } from '@/windcode';
import { setClientDisabled } from '@/lib/session';
import { teardownClient } from '@/bootstrap';
import { submitVote } from '@/api/vote';
import {
  LIST_STYLE_OPTIONS,
  THEME_OPTIONS,
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
  return (
    <a
      href={href}
      class="xzqh-user-link"
      onClick={(e) => {
        e.preventDefault();
        navigate({
          name: 'user',
          uid,
          username: uid ? undefined : username,
        });
      }}
    >
      {name}
    </a>
  );
}

export function HomePage() {
  const [cats, setCats] = useState<ForumCategory[]>([]);
  const [latestTopics, setLatestTopics] = useState<IndexFeedItem[]>([]);
  const [recentReplies, setRecentReplies] = useState<IndexFeedItem[]>([]);
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

  const feed = feedTab === 'topics' ? latestTopics : recentReplies;

  if (loading) return <Loading />;
  return (
    <div>
      {err && <Alert type="error">{err}</Alert>}
      <div class="xzqh-panel" style={{ marginBottom: 16 }}>
        <h1 class="xzqh-h1">方舆论坛</h1>
        {(latestTopics.length > 0 || recentReplies.length > 0) && (
          <>
            <div class="xzqh-types" style={{ marginTop: 4 }}>
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
            <div class="xzqh-list">
              {feed.slice(0, 20).map((t) => (
                <div class="xzqh-item" key={`${feedTab}-${t.tid}-${t.title}`}>
                  <div>
                    {t.forumName && (
                      <a
                        class="xzqh-badge"
                        href={t.fid ? `thread.php?fid=${t.fid}` : undefined}
                        onClick={(e) => {
                          if (!t.fid) return;
                          e.preventDefault();
                          navigate({ name: 'forum', fid: t.fid!, page: 1 });
                        }}
                        style={{ marginRight: 8 }}
                      >
                        {t.forumName}
                      </a>
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
                    {(t.author || t.time) && (
                      <div class="xzqh-meta">
                        {t.author || ''}
                        {t.time ? ` · ${t.time}` : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {!feed.length && <div class="xzqh-muted">暂无数据</div>}
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
                <div>
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
                  {b.description && <div class="xzqh-meta">{b.description}</div>}
                  <div class="xzqh-meta">
                    {b.today != null ? `今日 ${b.today} · ` : ''}
                    版主 {b.moderators.slice(0, 4).join(' ') || '—'}
                  </div>
                  {b.lastTitle && (
                    <div class="xzqh-meta" style={{ marginTop: 4 }}>
                      最新：
                      {b.lastTid ? (
                        <a
                          href={`read.php?tid=${b.lastTid}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate({ name: 'thread', tid: b.lastTid!, page: 1 });
                          }}
                        >
                          {b.lastTitle}
                        </a>
                      ) : (
                        b.lastTitle
                      )}
                      {b.lastAuthor ? ` · ${b.lastAuthor}` : ''}
                      {b.lastTime ? ` · ${b.lastTime}` : ''}
                    </div>
                  )}
                </div>
                <div class="xzqh-stats">
                  <div>{b.topics} 主题</div>
                  <div>{b.posts} 帖子</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
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

export function ForumPage(props: { fid: number; page: number; type?: string; special?: string }) {
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
  }, [props.fid, props.page, props.type, props.special]);

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
    navigate({
      name: 'forum',
      fid: props.fid,
      page: 1,
      type: /[?&]type=\d+/.test(t.href) && t.id !== 'digest' ? t.id : undefined,
      special: /[?&]special=\d+/.test(t.href) ? t.id : undefined,
    });
  };

  const typeActive = (t: { id: string; href: string; children?: { id: string }[] }) => {
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
        {data.canPost && (
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
            class={!props.type && !props.special ? 'active' : ''}
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
          })
        }
      />
      <div class="xzqh-list">
        {data.threads.map((t) => (
          <div class={`xzqh-item${t.topped ? ' topped' : ''}`} key={t.tid}>
            <div class="xzqh-item-main">
              <div class="xzqh-subject-line">
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
                <UserNameLink
                  name={t.author}
                  uid={t.authorUid}
                  username={t.authorUsername || t.author}
                />
                {t.postDate ? ` · ${t.postDate}` : ''}
                {t.lastAuthor ? (
                  <>
                    {' · 最后 '}
                    <UserNameLink
                      name={t.lastAuthor}
                      uid={t.lastAuthorUid}
                      username={t.lastAuthorUsername || t.lastAuthor}
                    />
                  </>
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
            </div>
            <div class="xzqh-stats">
              <div>{t.replies} 回复</div>
              <div>{t.hits} 浏览</div>
            </div>
          </div>
        ))}
      </div>
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
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const voteBox = useRef<HTMLDivElement>(null);

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
    if (!el) return;
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      if (!(form instanceof HTMLFormElement) || !data) return;
      const selected = [
        ...form.querySelectorAll(
          'input[name*=vote]:checked, input[type=radio]:checked, input[type=checkbox]:checked',
        ),
      ]
        .map((node) => (node as HTMLInputElement).value)
        .filter(Boolean);
      const extra: Record<string, string> = {};
      for (const input of Array.from(form.elements) as HTMLInputElement[]) {
        if (!input.name || input.type === 'submit') continue;
        if ((input.type === 'checkbox' || input.type === 'radio') && !input.checked) continue;
        extra[input.name] = input.value;
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
    el.addEventListener('submit', onSubmit);
    return () => el.removeEventListener('submit', onSubmit);
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

  const onReply = async () => {
    if (!reply.trim()) return;
    setBusy(true);
    setMsg('');
    try {
      const form = await loadComposeForm({ fid: data.fid, tid: data.tid });
      const res = await submitPost({
        action: form.action,
        fields: { ...form.fields, ...(data.replyForm || {}) },
        content: reply,
      });
      setMsg(res.message);
      if (res.ok) {
        setReply('');
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
          {data.canReply && (
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
        />
        <p class="xzqh-sub">
          {data.forumName || ''} · tid={data.tid}
        </p>
        {msg && <Alert type={/成功|收藏成功/.test(msg) ? 'ok' : 'warn'}>{msg}</Alert>}
        <Pager
          page={data.page}
          totalPages={data.totalPages}
          onChange={(p) => navigate({ name: 'thread', tid: data.tid, page: p })}
        />
      </div>

      {data.isVote && data.voteHtml && (
        <div class="xzqh-panel" style={{ marginBottom: 14 }}>
          <h2 style={{ marginTop: 0, fontSize: '1rem' }}>投票</h2>
          <div ref={voteBox} dangerouslySetInnerHTML={{ __html: data.voteHtml }} />
        </div>
      )}

      {data.floors.map((f) => (
        <FloorCard
          key={`${f.pid}-${f.floor}`}
          floor={f}
          tid={data.tid}
          fid={data.fid}
          verifyhash={data.verifyhash}
          onQuote={() => setReply((prev) => wrapQuote(f.author, f.contentHtml) + prev)}
          onDeleted={() => reload(data.page)}
        />
      ))}

      {data.canReply && (
        <div class="xzqh-panel">
          <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>快速回复</h2>
          <div class="xzqh-form">
            <textarea value={reply} onInput={(e) => setReply((e.target as HTMLTextAreaElement).value)} placeholder="支持 Wind Code，如 [quote] [img] [url]" />
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
    <article class="xzqh-floor" id={`pid${f.pid}`}>
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
                onClick={(e) => {
                  e.preventDefault();
                  navigate({
                    name: 'user',
                    uid: f.authorUid,
                    username: f.authorUid ? undefined : f.author,
                  });
                }}
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
              navigate({ name: 'compose', fid: props.fid, tid: props.tid, editPid: f.pid })
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
                tid: props.tid,
                pid: f.pid,
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
  quotePid?: number;
  editPid?: number;
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const [meta, setMeta] = useState<Awaited<ReturnType<typeof loadComposeForm>> | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    loadComposeForm(props)
      .then((m) => {
        setMeta(m);
        if (m.fields.atc_title) setTitle(m.fields.atc_title);
        if (m.fields.atc_content) setContent(m.fields.atc_content);
      })
      .catch((e) => setMsg(e instanceof Error ? e.message : '无法打开编辑器'));
  }, [props.fid, props.tid, props.quotePid, props.editPid]);

  const smiles = useMemo(() => Array.from({ length: 14 }, (_, i) => i + 1), []);

  const onSubmit = async () => {
    if (!meta) return;
    setBusy(true);
    setMsg('');
    try {
      const res = await submitPost({
        action: meta.action,
        fields: meta.fields,
        title: meta.titleRequired ? title : undefined,
        content,
        files: files.length ? files : undefined,
      });
      setMsg(res.message);
      if (res.ok) {
        if (res.redirect && /tid=(\d+)/.test(res.redirect)) {
          const tid = Number(res.redirect.match(/tid=(\d+)/)![1]);
          navigate({ name: 'thread', tid, page: 9999 });
        } else if (props.tid) {
          navigate({ name: 'thread', tid: props.tid, page: 9999 });
        } else {
          navigate({ name: 'forum', fid: props.fid, page: 1 });
        }
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : '提交失败');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="xzqh-panel">
      <h1 class="xzqh-h1">{props.editPid ? '编辑帖子' : props.tid ? '回复主题' : '发表新帖'}</h1>
      {msg && <Alert type={/成功|已提交/.test(msg) ? 'ok' : 'error'}>{msg}</Alert>}
      {!meta && !msg && <Loading />}
      {meta && (
        <div class="xzqh-form">
          {meta.titleRequired && (
            <label>
              标题
              <input value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)} />
            </label>
          )}
          <div class="xzqh-toolbar">
            {smiles.map((n) => (
              <button
                type="button"
                key={n}
                class="xzqh-btn ghost"
                title={`表情 ${n}`}
                onClick={() => setContent((c) => c + `[s:${n}]`)}
              >
                <img src={`images/post/smile/default/${n}.gif`} alt="" width={18} height={18} />
              </button>
            ))}
            <button type="button" class="xzqh-btn ghost" onClick={() => setContent((c) => c + '[b][/b]')}>
              B
            </button>
            <button type="button" class="xzqh-btn ghost" onClick={() => setContent((c) => c + '[url][/url]')}>
              链接
            </button>
            <button type="button" class="xzqh-btn ghost" onClick={() => setContent((c) => c + '[img][/img]')}>
              图片
            </button>
            <button type="button" class="xzqh-btn ghost" onClick={() => setPreview((p) => !p)}>
              {preview ? '编辑' : '预览'}
            </button>
          </div>
          {preview ? (
            <div class="xzqh-preview" dangerouslySetInnerHTML={{ __html: windcodeToHtml(content) }} />
          ) : (
            <textarea value={content} onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)} />
          )}
          <label>
            附件
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from((e.target as HTMLInputElement).files || []))}
            />
          </label>
          {meta.uploadEnabled && files[0] && (
            <button
              type="button"
              class="xzqh-btn ghost"
              onClick={async () => {
                const r = await uploadAttachment({
                  file: files[0],
                  verifyhash: meta.verifyhash,
                  fid: props.fid,
                  tid: props.tid,
                  onProgress: (p) => setUploadMsg(`上传 ${p}%`),
                });
                setUploadMsg(r.message + (r.url ? ` ${r.url}` : ''));
              }}
            >
              预上传测试
            </button>
          )}
          {uploadMsg && <div class="xzqh-meta">{uploadMsg}</div>}
          <div class="xzqh-row">
            <button type="button" class="xzqh-btn primary" disabled={busy} onClick={onSubmit}>
              {busy ? '提交中…' : '提交'}
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
          navigate({ name: 'search', keyword });
          run(keyword);
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
      <div class="xzqh-list" style={{ marginTop: 12 }}>
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
      </div>
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
        <p class="xzqh-meta" style={{ marginBottom: 10 }}>
          宽屏可切换；窄屏固定卡片式。
        </p>
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
        <p class="xzqh-meta" style={{ marginTop: 12 }}>
          控制台执行 <code>localStorage.removeItem('xzqh_client_disabled')</code> 也可重新启用。
        </p>
      </section>
    </div>
  );
}
