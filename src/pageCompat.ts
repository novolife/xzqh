function installPageCompat(): void {
  const w = window as Window & {
    defaultface?: string;
    facedb?: Record<string, string>;
    PwFace?: { init?: (...args: unknown[]) => unknown; __xzqhPatched?: boolean };
  };

  if (typeof w.defaultface === 'undefined') w.defaultface = 'default';
  if (!w.facedb || typeof w.facedb !== 'object') w.facedb = {};
  if (!Object.keys(w.facedb).length) w.facedb.default = '默认';

  const patchPwFace = () => {
    const pf = w.PwFace;
    if (!pf || pf.__xzqhPatched || typeof pf.init !== 'function') return false;
    const orig = pf.init.bind(pf);
    pf.init = (...args: unknown[]) => {
      if (typeof w.defaultface === 'undefined') w.defaultface = 'default';
      if (!w.facedb || typeof w.facedb !== 'object') w.facedb = { default: '默认' };
      else if (!Object.keys(w.facedb).length) w.facedb.default = '默认';
      try {
        return orig(...args);
      } catch {
        return undefined;
      }
    };
    pf.__xzqhPatched = true;
    return true;
  };

  if (patchPwFace()) return;

  const iv = window.setInterval(() => {
    if (patchPwFace()) window.clearInterval(iv);
  }, 0);
  window.setTimeout(() => window.clearInterval(iv), 15000);
}

installPageCompat();
