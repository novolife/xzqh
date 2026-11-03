import { render } from 'preact';
import { App } from './App';
import { ensureRoot, installEarlyMask, shouldActivate } from './bootstrap';
import { isClientDisabled } from './lib/session';
import './styles/app.css';

function boot() {
  if (!shouldActivate()) {
    // Offer a tiny re-enable chip if disabled
    if (isClientDisabled()) {
      const ready = () => {
        if (document.getElementById('xzqh-reenable')) return;
        const btn = document.createElement('button');
        btn.id = 'xzqh-reenable';
        btn.textContent = '启用方舆客户端';
        btn.style.cssText =
          'position:fixed;right:12px;bottom:12px;z-index:2147483647;padding:8px 12px;border-radius:999px;border:0;background:#0f6a5a;color:#fff;cursor:pointer;font:14px/1.2 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2)';
        btn.onclick = () => {
          try {
            localStorage.removeItem('xzqh_client_disabled');
          } catch {
            /* ignore */
          }
          location.reload();
        };
        document.body.appendChild(btn);
      };
      if (document.body) ready();
      else document.addEventListener('DOMContentLoaded', ready, { once: true });
    }
    return;
  }

  installEarlyMask();
  const root = ensureRoot();

  const mount = () => {
    render(<App />, root);
  };

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
}

boot();
