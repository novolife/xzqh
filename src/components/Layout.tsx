import type { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { SessionUser } from '@/lib/types';
import { navigate } from '@/router';
import { forumUrl } from '@/lib/http';
import {
  LIST_STYLE_OPTIONS,
  PREFS_EVENT,
  THEME_OPTIONS,
  loadPrefs,
  savePrefs,
  type ClientPrefs,
  type ListStyleId,
  type ThemeId,
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
}) {
  const { user, children, onLogout, unread, showListStyle = true } = props;
  const [prefs, setPrefs] = useState<ClientPrefs>(() => loadPrefs());
  const [boardMenu, setBoardMenu] = useState({ available: false, open: false });
  const [narrow, setNarrow] = useState(() => {
    try {
      return window.matchMedia('(max-width: 860px)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const sync = (e?: Event) => {
      const detail = (e as CustomEvent<ClientPrefs> | undefined)?.detail;
      setPrefs(detail || loadPrefs());
    };
    window.addEventListener(PREFS_EVENT, sync as EventListener);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(PREFS_EVENT, sync as EventListener);
      window.removeEventListener('storage', sync);
    };
  }, []);

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
    const mq = window.matchMedia('(max-width: 860px)');
    const onChange = () => setNarrow(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const allowListStyleSwitch = showListStyle && !narrow;
  const effectiveList = !showListStyle ? 'list' : narrow ? 'card' : prefs.listStyle;

  return (
    <div
      class="xzqh-app"
      data-theme={prefs.theme}
      data-list={effectiveList}
      data-narrow={narrow ? '1' : '0'}
    >
      <header class="xzqh-top">
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
                  <a href="message.php" onClick={(e) => { e.preventDefault(); navigate({ name: 'messages' }); }}>
                    私信{(unread ?? 0) > 0 ? `(${unread})` : ''}
                  </a>
                  <a
                    href={user.uid ? `u.php?uid=${user.uid}` : 'u.php'}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ name: 'user', uid: user.uid || undefined, username: user.username });
                    }}
                  >
                    {user.username}
                  </a>
                  <button type="button" class="xzqh-btn" onClick={onLogout}>退出</button>
                </>
              ) : (
                <button type="button" class="xzqh-btn primary" onClick={() => navigate({ name: 'login' })}>
                  登录
                </button>
              )}
              <label class="xzqh-pref-inline" title="配色主题">
                <span class="xzqh-sr-only">主题</span>
                <select
                  value={prefs.theme}
                  onChange={(e) => setPrefs(savePrefs({ theme: (e.currentTarget as HTMLSelectElement).value as ThemeId }))}
                >
                  {THEME_OPTIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
              {allowListStyleSwitch && (
                <label class="xzqh-pref-inline" title="列表样式">
                  <span class="xzqh-sr-only">列表</span>
                  <select
                    value={prefs.listStyle}
                    onChange={(e) =>
                      setPrefs(savePrefs({ listStyle: (e.currentTarget as HTMLSelectElement).value as ListStyleId }))
                    }
                  >
                    {LIST_STYLE_OPTIONS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <button type="button" class="xzqh-btn" onClick={() => navigate({ name: 'settings' })}>设置</button>
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
