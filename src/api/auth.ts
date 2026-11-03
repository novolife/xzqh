import { fetchHtml, forumUrl, postForm } from '@/lib/http';
import { extractQuitVerify, parseSessionFromHtml } from '@/lib/session';
import type { SessionUser } from '@/lib/types';

/** Always fetch a fresh page — SPA document stays on first paint and is unreliable. */
export async function loadSession(): Promise<SessionUser> {
  const { html } = await fetchHtml('index.php', {
    cache: 'no-store',
    headers: { 'Cache-Control': 'no-cache' },
  });
  let session = parseSessionFromHtml(html);

  // Fallback: personal center (u.php) when index parse is weak but quit exists / uid missing name
  if (
    (/login\.php\?action=quit/i.test(html) || session.uid > 0) &&
    (!session.username || session.username === '已登录' || session.username === '游客')
  ) {
    try {
      const profile = await fetchHtml('u.php', { cache: 'no-store' });
      const fromProfile = parseSessionFromHtml(profile.html);
      if (fromProfile.uid > 0) {
        session = {
          ...session,
          uid: fromProfile.uid || session.uid,
          username:
            fromProfile.username && fromProfile.username !== '游客'
              ? fromProfile.username
              : session.username,
          groupid: fromProfile.groupid || session.groupid,
          verifyhash: fromProfile.verifyhash || session.verifyhash,
          loggedIn: true,
        };
      }
      if (!session.username || session.username === '已登录') {
        const heading =
          profile.html.match(/id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i)?.[1] ||
          profile.html.match(/<img[^>]+alt=["']([^"']+)["']/i)?.[1];
        if (heading && !/个人中心|提示信息|登录/.test(heading)) {
          session = { ...session, username: heading.trim(), loggedIn: true };
        }
      }
    } catch {
      /* keep index session */
    }
  }

  return session;
}

export async function fetchLoginPage(): Promise<{
  captchaUrl: string | null;
  sessionid: string | null;
  verifyhash: string;
  jumpurl: string;
  cloudgdcode: boolean;
}> {
  const { html } = await fetchHtml('login.php', { cache: 'no-store' });
  const verifyhash = html.match(/verifyhash\s*=\s*['"]([^'"]+)/i)?.[1] || '';
  const cloudgdcode = /cloudgdcode\s*=\s*1/.test(html) || /cloudcaptchaurl\s*=/.test(html);
  const cloud = html.match(/cloudcaptchaurl\s*=\s*["']([^"']+)/i)?.[1] || null;
  const sessionid =
    cloud?.match(/sessionid=([^&]+)/)?.[1] ||
    html.match(/cloudcksessionid=([^;"\s]+)/)?.[1] ||
    null;

  let captchaUrl: string | null = null;
  if (cloud) {
    const base = cloud.replace(/nowtime=\d+/g, '').replace(/&&+/g, '&');
    captchaUrl = `${base}${base.endsWith('&') || base.endsWith('?') ? '' : '&'}nowtime=${Date.now()}&`;
  } else {
    captchaUrl = forumUrl(`ck.php?nowtime=${Date.now()}`);
  }

  return {
    captchaUrl,
    sessionid,
    verifyhash,
    jumpurl: location.href,
    cloudgdcode,
  };
}

export function refreshCaptchaUrl(base: string | null): string {
  if (!base) return forumUrl(`ck.php?nowtime=${Date.now()}`);
  const cleaned = base.replace(/nowtime=\d+/g, '').replace(/&&+/g, '&');
  const join = cleaned.includes('?') ? (cleaned.endsWith('&') || cleaned.endsWith('?') ? '' : '&') : '?';
  return `${cleaned}${join}nowtime=${Date.now()}&`;
}

/**
 * Login with username + password + gdcode (Aliyun cloud captcha or ck.php).
 * Mirrors original login.php fields: pwuser/pwpwd/gdcode/step/lgt/cktime/hideid/jumpurl.
 */
export async function login(opts: {
  username: string;
  password: string;
  gdcode: string;
  remember?: boolean;
  jumpurl?: string;
  hideid?: '0' | '1';
}): Promise<{ ok: boolean; message: string; session?: SessionUser }> {
  const data: Record<string, string> = {
    pwuser: opts.username.trim(),
    pwpwd: opts.password,
    gdcode: opts.gdcode.trim(),
    step: '2',
    lgt: '0',
    jumpurl: opts.jumpurl || forumUrl('index.php'),
    forward: '',
    m: 'bbs',
    hideid: opts.hideid || '0',
    cktime: opts.remember === false ? '0' : '31536000',
  };

  const { html, url } = await postForm('login.php?', data);

  // Authoritative check: fresh index must expose winduid
  const session = await loadSession();
  if (session.uid > 0 || session.loggedIn) {
    if (!session.username || session.username === '已登录' || session.username === '游客') {
      session.username = opts.username.trim();
      session.loggedIn = true;
    }
    return { ok: true, message: '登录成功', session };
  }

  if (/登录成功|欢迎您回来|正在返回|登陆成功/.test(html)) {
    return {
      ok: true,
      message: '登录成功',
      session: {
        uid: 0,
        username: opts.username.trim(),
        groupid: 0,
        verifyhash: '',
        loggedIn: true,
      },
    };
  }

  const tipText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  let msg = '登录失败';
  if (/验证码/.test(tipText)) msg = '验证码错误或已过期，请点击图片刷新后重试';
  else if (/密码|用户名|帐号|账号/.test(tipText)) msg = '用户名或密码错误';
  else if (/提示信息/.test(html)) msg = tipText.slice(0, 160) || msg;
  else msg = `登录失败 (${url})`;

  return { ok: false, message: msg };
}

export async function logout(): Promise<void> {
  // Prefer quit URL with verify, as used by this forum header
  try {
    const { html } = await fetchHtml('index.php', { cache: 'no-store' });
    const verify = extractQuitVerify(html) || parseSessionFromHtml(html).verifyhash;
    if (verify) {
      await fetchHtml(`login.php?action=quit&verify=${verify}`);
      return;
    }
  } catch {
    /* fall through */
  }
  await fetchHtml('login.php?action=quit');
}
