import type { ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { SessionUser } from '@/lib/types';
import { navigate } from '@/router';
import { forumUrl } from '@/lib/http';
import {
  FONT_SCALE_NARROW_MQ,
  PREFS_EVENT,
  applyFontSizeToDocument,
  loadPrefs,
  type ClientPrefs,
} from '@/lib/prefs';
import { BOARD_MENU_STATE_EVENT, toggleBoardMenu } from '@/lib/boardMenu';

const LOGO_SRC = forumUrl('images/wind/logo.png');
const SEARCH_PLACEHOLDER = '搜索其实很简单！';

type SearchKind = 'local' | 'thread' | 'user' | 'forum';

/** 对齐原站顶栏搜索：POST searcher.php，离开客户端进原站结果页。 */
function NavSearch(props: { fid?: number; verifyhash?: string }) {
  const canLocal = !!props.fid && props.fid > 0;
  const [kind, setKind] = useState<SearchKind>(canLocal ? 'local' : 'thread');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKind(canLocal ? 'local' : 'thread');
  }, [canLocal, props.fid]);

  const type = kind === 'user' ? 'user' : kind === 'forum' ? 'forum' : 'thread';
  const useLocal = kind === 'local' && canLocal;

  return (
    <form
      class="xzqh-nav-search"
      action="searcher.php"
      method="post"
      accept-charset="GBK"
      onSubmit={(e) => {
        const kw = keyword.trim();
        if (!kw || kw === SEARCH_PLACEHOLDER) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="verify" value={props.verifyhash || ''} />
      <input type="hidden" name="step" value="2" />
      <input type="hidden" name="type" value={type} />
      {useLocal && (
        <>
          <input type="hidden" name="method" value="AND" />
          <input type="hidden" name="sch_area" value="1" />
          <input type="hidden" name="sch_time" value="all" />
          <input type="hidden" name="fid" value={String(props.fid)} />
        </>
      )}
      <input
        class="xzqh-nav-search-input"
        type="text"
        name="keyword"
        value={keyword}
        placeholder={SEARCH_PLACEHOLDER}
        autocomplete="off"
        onInput={(e) => setKeyword((e.target as HTMLInputElement).value)}
      />
      <select
        class="xzqh-nav-search-type"
        aria-label="搜索类型"
        value={kind}
        onChange={(e) => setKind((e.target as HTMLSelectElement).value as SearchKind)}
      >
        {canLocal && <option value="local">本版</option>}
        <option value="thread">帖子</option>
        <option value="user">用户</option>
        <option value="forum">版块</option>
      </select>
      <button type="submit" class="xzqh-nav-search-btn">
        搜索
      </button>
    </form>
  );
}

export function Layout(props: {
  user: SessionUser | null;
  children: ComponentChildren;
  onLogout: () => void;
  unread?: number;
  /** List/card switch only makes sense on list pages, not thread read. */
  showListStyle?: boolean;
  /** 当前是否在客户端设置页；再点「设置」退出。 */
  settingsOpen?: boolean;
  /** 当前版块 fid，用于「本版」搜索。 */
  searchFid?: number;
}) {
  const {
    user,
    children,
    onLogout,
    unread,
    showListStyle = true,
    settingsOpen = false,
    searchFid,
  } = props;
  const [prefs, setPrefs] = useState<ClientPrefs>(() => loadPrefs());
  const [boardMenu, setBoardMenu] = useState({ available: false, open: false });
  const topRef = useRef<HTMLElement>(null);
  const [narrow, setNarrow] = useState(() => {
    try {
      return window.matchMedia(FONT_SCALE_NARROW_MQ).matches;
    } catch {
      return false;
    }
  });

  const syncTopHeight = () => {
    const h = topRef.current?.getBoundingClientRect().height || 0;
    const px = Math.ceil(h);
    document.documentElement.style.setProperty('--xzqh-top-h', `${px || 112}px`);
  };

  useEffect(() => {
    const sync = (e?: Event) => {
      const detail = (e as CustomEvent<ClientPrefs> | undefined)?.detail;
      const next = detail || loadPrefs();
      setPrefs(next);
      applyFontSizeToDocument(next.fontScale);
      requestAnimationFrame(syncTopHeight);
    };
    applyFontSizeToDocument(loadPrefs().fontScale);
    window.addEventListener(PREFS_EVENT, sync as EventListener);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PREFS_EVENT, sync as EventListener);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    const el = topRef.current;
    syncTopHeight();
    if (!el) return;
    const ro = new ResizeObserver(() => syncTopHeight());
    ro.observe(el);
    window.addEventListener('resize', syncTopHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncTopHeight);
    };
  }, [prefs.fontScale, narrow]);

  useEffect(() => {
    const onState = (e: Event) => {
      const detail = (e as CustomEvent<{ available: boolean; open: boolean }>).detail;
      if (!detail) return;
      setBoardMenu({ available: !!detail.available, open: !!detail.open });
    };
    window.addEventListener(BOARD_MENU_STATE_EVENT, onState as EventListener);
    return () => window.removeEventListener(BOARD_MENU_STATE_EVENT, onState as EventListener);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(FONT_SCALE_NARROW_MQ);
    const onChange = () => {
      setNarrow(mq.matches);
      applyFontSizeToDocument(loadPrefs().fontScale);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const effectiveList = !showListStyle ? 'list' : narrow ? 'card' : prefs.listStyle;

  return (
    <div
      class="xzqh-app"
      data-theme={prefs.theme}
      data-list={effectiveList}
      data-font-scale={String(prefs.fontScale)}
      data-narrow={narrow ? '1' : '0'}
    >
      <header class="xzqh-top" ref={topRef}>
        <div class="xzqh-top-brandbar">
          <div class="xzqh-top-inner">
            <a
              class="xzqh-brand"
              href="index.php"
              onClick={(e) => {
                e.preventDefault();
                navigate({ name: 'home' });
              }}
            >
              <img class="xzqh-brand-logo" src={LOGO_SRC} alt="方舆论坛" />
            </a>
          </div>
        </div>
        <div class="xzqh-top-navbar">
          <div class="xzqh-top-inner xzqh-top-navrow">
            <nav class="xzqh-nav">
              <NavSearch fid={searchFid} verifyhash={user?.verifyhash} />
              {user?.loggedIn ? (
                <>
                  <a href="message.php">
                    消息{(unread ?? 0) > 0 ? `(${unread})` : ''}
                  </a>
                  <a href={user.uid ? `u.php?uid=${user.uid}` : 'u.php'}>
                    {user.username}
                  </a>
                  <button type="button" class="xzqh-btn" onClick={onLogout}>退出</button>
                </>
              ) : (
                <button type="button" class="xzqh-btn primary" onClick={() => navigate({ name: 'login' })}>
                  登录
                </button>
              )}
              <button
                type="button"
                class={`xzqh-btn${settingsOpen ? ' primary' : ''}`}
                aria-pressed={settingsOpen}
                onClick={() => {
                  if (settingsOpen) {
                    if (history.state?.xzqh && history.length > 1) history.back();
                    else navigate({ name: 'home' }, true);
                    return;
                  }
                  navigate({ name: 'settings' });
                }}
              >
                设置
              </button>
            </nav>
            {boardMenu.available && (
              <button
                type="button"
                class={`xzqh-board-menu-btn${boardMenu.open ? ' open' : ''}`}
                aria-expanded={boardMenu.open}
                aria-label="版块菜单"
                title="版块"
                onClick={() => toggleBoardMenu()}
              >
                <span class="xzqh-burger" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                版块
              </button>
            )}
          </div>
        </div>
      </header>
      <main class="xzqh-main">{children}</main>
    </div>
  );
}

export function Loading() {
  return <div class="xzqh-loading">加载中…</div>;
}

export function Alert(props: { type?: 'error' | 'ok' | 'warn'; children: ComponentChildren }) {
  const cls = props.type === 'error' ? 'error' : props.type === 'ok' ? 'ok' : '';
  return <div class={`xzqh-alert ${cls}`}>{props.children}</div>;
}

export function Pager(props: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const { page, totalPages, onChange } = props;
  if (totalPages <= 1) return null;
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return (
    <div class="xzqh-pager">
      <button type="button" class="xzqh-btn ghost" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        上一页
      </button>
      {start > 1 && (
        <button type="button" class="xzqh-btn ghost" onClick={() => onChange(1)}>
          1
        </button>
      )}
      {pages.map((p) => (
        <button
          type="button"
          key={p}
          class={`xzqh-btn ${p === page ? 'primary' : 'ghost'}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      {end < totalPages && (
        <button type="button" class="xzqh-btn ghost" onClick={() => onChange(totalPages)}>
          {totalPages}
        </button>
      )}
      <button
        type="button"
        class="xzqh-btn ghost"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        下一页
      </button>
    </div>
  );
}
