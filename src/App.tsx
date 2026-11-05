import { useEffect, useState } from 'preact/hooks';
import type { Route, SessionUser } from './lib/types';
import { Layout } from './components/Layout';
import {
  ComposePage,
  ForumPage,
  HomePage,
  LoginPage,
  MessagesPage,
  SearchPage,
  SettingsPage,
  ThreadPage,
  UserPage,
} from './components/pages';
import { loadSession, logout } from './api/auth';
import { fetchUnreadHint } from './api/message';
import { linkClickHandler, parseLocation } from './router';

export function App() {
  const [route, setRoute] = useState<Route>(() => parseLocation());
  const [user, setUser] = useState<SessionUser | null>(null);
  const [unread, setUnread] = useState(0);

  const refreshSession = async () => {
    const s = await loadSession();
    setUser(s);
    if (s.loggedIn) {
      try {
        const n = await fetchUnreadHint(s.verifyhash);
        setUnread(n);
      } catch {
        setUnread(0);
      }
    } else setUnread(0);
    return s;
  };

  useEffect(() => {
    refreshSession();
    const onPop = () => setRoute(parseLocation());
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', linkClickHandler);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', linkClickHandler);
    };
  }, []);

  const body = (() => {
    switch (route.name) {
      case 'home':
        return <HomePage />;
      case 'forum':
        return (
          <ForumPage
            fid={route.fid}
            page={route.page}
            type={route.type}
            special={route.special}
            search={route.search}
            user={user}
          />
        );
      case 'thread':
        return <ThreadPage tid={route.tid} page={route.page} user={user} />;
      case 'compose':
        return (
          <ComposePage
            fid={route.fid}
            tid={route.tid}
            quotePid={route.quotePid}
            editPid={route.editPid}
            article={route.article}
          />
        );
      case 'login':
        return (
          <LoginPage
            onSuccess={async (session) => {
              if (session?.loggedIn) setUser(session);
              const s = await refreshSession();
              if (s.loggedIn) setUser(s);
              setRoute({ name: 'home' });
              history.pushState({ xzqh: true }, '', 'index.php');
            }}
          />
        );
      case 'search':
        return <SearchPage keyword={route.keyword} digest={route.digest} schTime={route.schTime} />;
      case 'user':
        return <UserPage uid={route.uid} username={route.username} />;
      case 'messages':
        return <MessagesPage />;
      case 'settings':
        return <SettingsPage />;
    }
  })();

  return (
    <Layout
      user={user}
      unread={unread}
      showListStyle={route.name !== 'thread'}
      settingsOpen={route.name === 'settings'}
      onLogout={async () => {
        await logout();
        await refreshSession();
        setRoute({ name: 'home' });
        history.pushState({ xzqh: true }, '', 'index.php');
      }}
    >
      {body}
    </Layout>
  );
}
