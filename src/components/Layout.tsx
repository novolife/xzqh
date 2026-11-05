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

export function Layout(props: {
  user: SessionUser | null;
  children: ComponentChildren;
  onLogout: () => void;
  unread?: number;
  /** List/card switch only makes sense on list pages, not thread read. */
  showListStyle?: boolean;
  /** 当前是否在客户端设置页；再点「设置」退出。 */
  settingsOpen?: boolean;
}) {
  const { user, children, onLogout, unread, showListStyle = true, settingsOpen = false } = props;
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
              <a href="index.php" onClick={(e) => { e.preventDefault(); navigate({ name: 'home' }); }}>版块</a>
              <a href="searcher.php?sch_time=newatc" onClick={(e) => { e.preventDefault(); navigate({ name: 'search', schTime: 'newatc' }); }}>新帖</a>
              <a href="searcher.php" onClick={(e) => { e.preventDefault(); navigate({ name: 'search' }); }}>搜索</a>
              {user?.loggedIn ? (
                <>
                  <a href="message.php">
                    私信{(unread ?? 0) > 0 ? `(${unread})` : ''}
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
