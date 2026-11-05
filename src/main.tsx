import { Component, render } from 'preact';
import type { ComponentChildren } from 'preact';
import { App } from './App';
import { ensureRoot, installEarlyMask, shouldActivate } from './bootstrap';
import { isClientDisabled, setClientDisabled } from './lib/session';
import './styles/app.css';

class ClientErrorBoundary extends Component<{ children: ComponentChildren }, { failed: boolean }> {
  state = { failed: false };

  componentDidCatch(err: unknown) {
    // 早期遮罩会隐藏原界面；渲染失败时必须给用户可操作的恢复入口。
    console.error('XZQH client render error', err);
    this.setState({ failed: true });
  }

  render() {
    if (this.state.failed) {
      return (
        <div style={{ padding: '32px 16px', font: '14px/1.6 sans-serif', color: '#333' }}>
          <h2 style={{ margin: '0 0 12px' }}>方舆客户端加载失败</h2>
          <p style={{ margin: '0 0 16px', color: '#666' }}>
            页面没有正常渲染。可以尝试刷新，或暂时恢复原论坛界面。
          </p>
          <button
            type="button"
            style={{ marginRight: 8, padding: '8px 14px' }}
            onClick={() => location.reload()}
          >
            刷新重试
          </button>
          <button
            type="button"
            style={{ padding: '8px 14px' }}
            onClick={() => {
              setClientDisabled(true);
              location.reload();
            }}
          >
            恢复原界面
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    render(
      <ClientErrorBoundary>
        <App />
      </ClientErrorBoundary>,
      root,
    );
  };

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
}

boot();
