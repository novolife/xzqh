import type { Route } from './lib/types';

const BASE_PATH = (() => {
  const m = location.pathname.match(/^(.*?\/lt\/)/);
  return m ? m[1] : '/lt/';
})();

export function parseLocation(href: string = location.href): Route {
  const u = new URL(href, location.origin);
  const path = u.pathname;
  const q = u.searchParams;

  // Use /(^|\/)name\.php$/ so "thread.php" is NOT matched as "read.php"
  // (thread.php ends with the letters read.php).
  if (/(^|\/)login\.php$/i.test(path) || q.get('xzqh') === 'login') return { name: 'login' };
  if (/(^|\/)message\.php$/i.test(path)) return { name: 'messages' };
  if (/(^|\/)searcher\.php$/i.test(path)) {
    return {
      name: 'search',
      keyword: q.get('keyword') || '',
      digest: q.get('digest') === '1',
      schTime: q.get('sch_time') || undefined,
    };
  }
  if (/(^|\/)u\.php$/i.test(path)) {
    return {
      name: 'user',
      uid: q.get('uid') ? Number(q.get('uid')) : undefined,
      username: q.get('username') || undefined,
    };
  }
  if (/(^|\/)post\.php$/i.test(path)) {
    return {
      name: 'compose',
      fid: Number(q.get('fid') || 0),
      tid: q.get('tid') ? Number(q.get('tid')) : undefined,
      // Keep original pid string: topic first floor uses pid=tpc, not a number.
      quotePid:
        q.get('action') === 'quote' && q.get('pid') ? q.get('pid')! : undefined,
      editPid:
        q.get('action') === 'modify' && q.get('pid') ? q.get('pid')! : undefined,
      article: q.get('article') ? Number(q.get('article')) : undefined,
    };
  }
  // IMPORTANT: test thread.php BEFORE read.php — "thread.php".endsWith("read.php") === true
  if (/(^|\/)thread\.php$/i.test(path)) {
    return {
      name: 'forum',
      fid: Number(q.get('fid') || 0),
      page: Number(q.get('page') || 1) || 1,
      type: q.get('type') || undefined,
      special: q.get('special') || undefined,
      search: q.get('search') || undefined,
    };
  }
  if (/(^|\/)read\.php$/i.test(path)) {
    const page = q.get('page') === 'e' ? 9999 : Number(q.get('page') || 1);
    const tid = Number(q.get('tid') || 0);
    if (!tid) return { name: 'home' };
    return { name: 'thread', tid, page: page || 1 };
  }
  if (q.get('xzqh') === 'settings') return { name: 'settings' };

  return { name: 'home' };
}

export function routeToUrl(route: Route): string {
  switch (route.name) {
    case 'home':
      return `${BASE_PATH}index.php`;
    case 'forum':
      return `${BASE_PATH}thread.php?fid=${route.fid}&page=${route.page}${route.type ? `&type=${route.type}` : ''}${route.special ? `&special=${route.special}` : ''}${route.search ? `&search=${route.search}` : ''}`;
    case 'thread': {
      const page = route.page >= 9999 ? 'e' : String(route.page);
      return `${BASE_PATH}read.php?tid=${route.tid}&page=${page}${route.page >= 9999 ? '#a' : ''}`;
    }
    case 'compose': {
      const p = new URLSearchParams();
      if (route.editPid && route.tid) {
        p.set('action', 'modify');
        if (route.fid) p.set('fid', String(route.fid));
        p.set('tid', String(route.tid));
        p.set('pid', String(route.editPid));
        if (route.article != null) p.set('article', String(route.article));
      } else {
        p.set('fid', String(route.fid));
        if (route.tid) p.set('tid', String(route.tid));
        if (route.quotePid) {
          p.set('action', 'quote');
          p.set('pid', String(route.quotePid));
          if (route.article != null) p.set('article', String(route.article));
        } else if (route.tid) {
          // Plain reply MUST be action=reply; without it phpwind renders the
          // new-topic form and submissions create a new thread instead.
          p.set('action', 'reply');
        }
      }
      return `${BASE_PATH}post.php?${p.toString()}`;
    }
    case 'search': {
      const p = new URLSearchParams();
      if (route.keyword) p.set('keyword', route.keyword);
      if (route.digest) p.set('digest', '1');
      if (route.schTime) p.set('sch_time', route.schTime);
      const s = p.toString();
      return `${BASE_PATH}searcher.php${s ? `?${s}` : ''}`;
    }
    case 'user': {
      const p = new URLSearchParams();
      if (route.uid) p.set('uid', String(route.uid));
      if (route.username) p.set('username', route.username);
      return `${BASE_PATH}u.php?${p.toString()}`;
    }
    case 'messages':
      return `${BASE_PATH}message.php`;
    case 'login':
      return `${BASE_PATH}login.php`;
    case 'settings':
      return `${BASE_PATH}index.php?xzqh=settings`;
  }
}

function urlsEqual(a: string, b: string): boolean {
  try {
    const ua = new URL(a, location.origin);
    const ub = new URL(b, location.origin);
    return (
      ua.pathname === ub.pathname &&
      ua.search === ub.search &&
      ua.hash === ub.hash
    );
  } catch {
    return a === b;
  }
}

export function navigate(route: Route, replace = false): void {
  if (route.name === 'thread' && !route.tid) {
    route = { name: 'home' };
  }
  if (route.name === 'forum' && !route.fid) {
    route = { name: 'home' };
  }
  const url = routeToUrl(route);
  // 同一地址不重复压栈，避免后退要点两次
  if (!replace && urlsEqual(url, location.href)) {
    window.dispatchEvent(new PopStateEvent('popstate'));
    return;
  }
  if (replace) history.replaceState({ xzqh: true }, '', url);
  else history.pushState({ xzqh: true }, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function linkClickHandler(e: MouseEvent): void {
  // 元素自身 onClick 已 preventDefault + navigate 时不再处理，否则会 push 两次
  if (e.defaultPrevented) return;
  const t = e.target as HTMLElement | null;
  const a = t?.closest?.('a') as HTMLAnchorElement | null;
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('javascript:') || href.startsWith('#')) return;
  let url: URL;
  try {
    url = new URL(href, location.href);
  } catch {
    return;
  }
  if (url.origin !== location.origin) return;
  if (!url.pathname.includes('/lt/')) return;
  // let browser handle non-forum assets
  if (/\.(gif|png|jpg|jpeg|zip|rar|pdf)$/i.test(url.pathname)) return;
  // 用户页 / 资料设置 / 私信交给原站，整页跳转
  if (/(^|\/)(u|profile|message)\.php$/i.test(url.pathname)) return;
  e.preventDefault();
  const route = parseLocation(url.href);
  navigate(route);
}
