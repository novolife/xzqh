// ==UserScript==
// @name         XZQH Forum Client / 方舆论坛客户端
// @namespace    http://xzqh.info/lt/
// @version      1.0.0
// @author       XZQH Client
// @description  方舆论坛美化
// @license      MIT
// @icon         http://xzqh.info/lt/images/wind/logo.png
// @downloadURL  https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js
// @updateURL    https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js
// @match        http://xzqh.info/lt/*
// @match        https://xzqh.info/lt/*
// @match        http://www.xzqh.info/lt/*
// @match        https://www.xzqh.info/lt/*
// @connect      pin.aliyun.com
// @connect      xzqh.info
// @grant        none
// @run-at       document-start
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const a=document.createElement("style");a.textContent=e,(document.head||document.documentElement).append(a)})(' .xzqh-app,.xzqh-app[data-theme=fangyu]{--bg: #e6f3f9;--bg-top: #d6e8f4;--surface: #f0f9ff;--card: #ffffff;--ink: #333333;--muted: #666666;--line: #a6cbe7;--accent: #1b72af;--accent-2: #ff8800;--top: #176eac;--top-fg: #ffffff;--danger: #d74700;--ok: #008800;--glow-1: rgba(23, 110, 172, .16);--glow-2: rgba(255, 136, 0, .08);--badge: #e4eff5;--tag: #e4eff5;--tag-hover: #d6e8f4;--floor-hd: #f0f9ff;--alert: #fffae1;--alert-line: #a6cbe7;--alert-ink: #014c90;--shadow: 0 10px 28px rgba(1, 76, 144, .1);--radius: 14px;--font: "IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;--mono: "IBM Plex Mono", "Cascadia Mono", Consolas, monospace;--read: "Source Serif 4", "Noto Serif SC", "Songti SC", Georgia, serif}.xzqh-app[data-theme=jade]{--bg: #f3f1eb;--bg-top: #ebe6dc;--surface: #fffcf7;--card: #ffffff;--ink: #1c2430;--muted: #5d6b7c;--line: #d9d2c5;--accent: #0f6a5a;--accent-2: #c45c26;--top: #16352f;--top-fg: #f7f3ea;--danger: #a12828;--ok: #1f7a3f;--glow-1: rgba(15, 106, 90, .12);--glow-2: rgba(196, 92, 38, .1);--badge: #e7f2ef;--tag: #e8f0ee;--tag-hover: #d5e8e3;--floor-hd: #f7f3ea;--alert: #fff4e8;--alert-line: #f0c9a0;--alert-ink: #7a3e12;--shadow: 0 10px 30px rgba(22, 53, 47, .08)}.xzqh-app[data-theme=ink]{--bg: #eef1f4;--bg-top: #e4e9ef;--surface: #f8fafc;--card: #ffffff;--ink: #15202b;--muted: #5a6a7a;--line: #cfd8e3;--accent: #1f4e79;--accent-2: #b45309;--top: #13253a;--top-fg: #eef3f8;--danger: #9f1239;--ok: #047857;--glow-1: rgba(31, 78, 121, .14);--glow-2: rgba(180, 83, 9, .08);--badge: #e4eef8;--tag: #e7eef6;--tag-hover: #d5e3f0;--floor-hd: #eef2f7;--alert: #fff7ed;--alert-line: #fed7aa;--alert-ink: #9a3412;--shadow: 0 10px 28px rgba(19, 37, 58, .08)}.xzqh-app[data-theme=lake]{--bg: #e9f2f3;--bg-top: #dcecee;--surface: #f4fbfb;--card: #ffffff;--ink: #14303a;--muted: #4f6b74;--line: #c5d9de;--accent: #0e7490;--accent-2: #c2410c;--top: #0f3a45;--top-fg: #eef8fa;--danger: #b91c1c;--ok: #15803d;--glow-1: rgba(14, 116, 144, .14);--glow-2: rgba(194, 65, 12, .08);--badge: #d9f0f5;--tag: #dceef2;--tag-hover: #c5e4ea;--floor-hd: #e7f3f5;--alert: #fff7ed;--alert-line: #fdba74;--alert-ink: #9a3412;--shadow: 0 10px 28px rgba(15, 58, 69, .08)}.xzqh-app[data-theme=sand]{--bg: #f2ebe3;--bg-top: #ebe1d4;--surface: #fbf6ef;--card: #fffdf9;--ink: #2a2118;--muted: #6d5c4c;--line: #dccfbf;--accent: #8a5a2b;--accent-2: #a63d2a;--top: #3a2a1c;--top-fg: #f8efe4;--danger: #9f1239;--ok: #3f6212;--glow-1: rgba(138, 90, 43, .12);--glow-2: rgba(166, 61, 42, .08);--badge: #f0e4d4;--tag: #efe4d6;--tag-hover: #e4d5c2;--floor-hd: #f3e9dc;--alert: #fff4e8;--alert-line: #e8c9a0;--alert-ink: #7a3e12;--shadow: 0 10px 28px rgba(58, 42, 28, .08)}.xzqh-app[data-theme=night]{--bg: #121820;--bg-top: #0e141b;--surface: #1a222d;--card: #212b38;--ink: #e7eef6;--muted: #9aabbc;--line: #2f3b4b;--accent: #3db8a0;--accent-2: #e08a4f;--top: #0b1016;--top-fg: #e7eef6;--danger: #f07178;--ok: #7fd99a;--glow-1: rgba(61, 184, 160, .12);--glow-2: rgba(224, 138, 79, .08);--badge: #243342;--tag: #263445;--tag-hover: #314357;--floor-hd: #18212c;--alert: #2a241c;--alert-line: #5c4630;--alert-ink: #f0c9a0;--shadow: 0 12px 32px rgba(0, 0, 0, .35)}.xzqh-app[data-theme=contrast]{--bg: #ffffff;--bg-top: #f2f2f2;--surface: #ffffff;--card: #ffffff;--ink: #000000;--muted: #222222;--line: #000000;--accent: #0000cc;--accent-2: #c40000;--top: #000000;--top-fg: #ffffff;--danger: #b00000;--ok: #006600;--glow-1: transparent;--glow-2: transparent;--badge: #eeeeee;--tag: #eeeeee;--tag-hover: #dddddd;--floor-hd: #f5f5f5;--alert: #ffff66;--alert-line: #000000;--alert-ink: #000000;--shadow: none;--radius: 6px}*{box-sizing:border-box}button,input,textarea,select{font:inherit}a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}.xzqh-app{min-height:100vh;color:var(--ink);font-family:var(--font);font-size:1rem;background:radial-gradient(1200px 500px at 10% -10%,var(--glow-1),transparent 60%),radial-gradient(900px 400px at 100% 0%,var(--glow-2),transparent 55%),linear-gradient(180deg,var(--bg-top) 0%,var(--bg) 180px);transition:background-color .25s ease,color .2s ease}.xzqh-top{position:sticky;top:0;z-index:20;background:transparent;border-bottom:0}.xzqh-top-brandbar{background:var(--card);border-bottom:1px solid var(--line);color:var(--ink)}.xzqh-top-brandbar .xzqh-top-inner{padding-top:10px;padding-bottom:10px;justify-content:flex-start;gap:14px}.xzqh-top-navbar{-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);background:color-mix(in srgb,var(--top) 94%,transparent);color:var(--top-fg);border-bottom:1px solid color-mix(in srgb,var(--top-fg) 12%,transparent)}.xzqh-top-navbar .xzqh-top-inner{padding-top:8px;padding-bottom:8px;justify-content:flex-end}.xzqh-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.xzqh-pref-inline{display:inline-flex;align-items:center}.xzqh-pref-inline select{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid color-mix(in srgb,var(--top-fg) 28%,transparent);background:color-mix(in srgb,var(--top-fg) 10%,transparent);color:var(--top-fg)!important;border-radius:999px;padding:6px 28px 6px 12px;cursor:pointer;line-height:1.2;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 14px) 55%,calc(100% - 9px) 55%;background-size:5px 5px,5px 5px;background-repeat:no-repeat}.xzqh-pref-inline select:hover{background-color:color-mix(in srgb,var(--top-fg) 18%,transparent)}.xzqh-pref-inline option{color:var(--ink);background:var(--surface)}.xzqh-top-inner{width:70%;max-width:70%;margin:0 auto;padding:12px 0;display:flex;gap:12px;align-items:center;justify-content:space-between}.xzqh-top-navrow{justify-content:flex-start;gap:10px}.xzqh-top-navrow .xzqh-nav{flex:1 1 auto;justify-content:flex-start;min-width:0}.xzqh-top-navrow .xzqh-board-menu-btn{display:none;margin-left:auto;flex:0 0 auto}.xzqh-brand{display:inline-flex;align-items:center;min-width:0;color:var(--ink)!important;text-decoration:none!important}.xzqh-brand:hover{text-decoration:none!important;opacity:.92}.xzqh-brand-logo{display:block;height:48px;width:auto;max-width:min(360px,70vw);object-fit:contain;object-position:left center}.xzqh-brand-note{color:var(--muted);font-size:.8rem;white-space:nowrap}.xzqh-nav{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-end;width:100%}.xzqh-top-navbar a,.xzqh-top-navbar .xzqh-btn,.xzqh-top-navbar .xzqh-nav a,.xzqh-top-navbar .xzqh-nav .xzqh-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid transparent;background:color-mix(in srgb,var(--top-fg) 10%,transparent);color:var(--top-fg)!important;border-radius:999px;padding:7px 12px;cursor:pointer;text-decoration:none!important;line-height:1.2;font-size:1rem}.xzqh-top-navbar a:hover,.xzqh-top-navbar .xzqh-btn:hover{background:color-mix(in srgb,var(--top-fg) 18%,transparent);color:var(--top-fg)!important;text-decoration:none!important}.xzqh-nav-search{display:inline-flex;align-items:center;gap:4px;margin:0;padding:2px;border-radius:999px;background:color-mix(in srgb,var(--top-fg) 12%,transparent);border:1px solid color-mix(in srgb,var(--top-fg) 22%,transparent)}.xzqh-nav-search-input{width:9.5rem;min-width:0;border:0;outline:none;background:transparent;color:var(--top-fg);padding:5px 10px;font:inherit;line-height:1.2}.xzqh-nav-search-input::placeholder{color:color-mix(in srgb,var(--top-fg) 55%,transparent)}.xzqh-nav-search-type{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;border-left:1px solid color-mix(in srgb,var(--top-fg) 22%,transparent);background:transparent;color:var(--top-fg);padding:5px 18px 5px 8px;font:inherit;line-height:1.2;cursor:pointer;background-image:linear-gradient(45deg,transparent 50%,currentColor 50%),linear-gradient(135deg,currentColor 50%,transparent 50%);background-position:calc(100% - 10px) 55%,calc(100% - 5px) 55%;background-size:5px 5px,5px 5px;background-repeat:no-repeat}.xzqh-nav-search-type option{color:var(--ink);background:var(--surface)}.xzqh-nav-search-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;border-radius:999px;padding:5px 12px;margin:0;cursor:pointer;font:inherit;font-weight:650;line-height:1.2;color:var(--top);background:var(--top-fg)}.xzqh-nav-search-btn:hover{filter:brightness(.96)}@media(max-width:720px){.xzqh-nav-search-input{width:6.5rem}}.xzqh-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid transparent;background:color-mix(in srgb,var(--accent) 10%,transparent);color:var(--ink);border-radius:999px;padding:7px 12px;cursor:pointer;text-decoration:none;line-height:1.2}.xzqh-btn:hover{background:color-mix(in srgb,var(--accent) 16%,transparent);text-decoration:none}.xzqh-btn.primary{background:var(--accent-2);border-color:transparent;color:#fff!important}.xzqh-top-navbar .xzqh-btn.primary{background:var(--accent-2);color:#fff!important}.xzqh-btn.ghost{background:transparent;border-color:var(--line);color:var(--ink)}.xzqh-btn.danger{background:var(--danger);color:#fff!important}.xzqh-btn:disabled{opacity:.55;cursor:not-allowed}.xzqh-main{width:70%;max-width:70%;margin:0 auto;padding:20px 0 64px}.xzqh-panel{background:var(--surface);border:0;border-radius:0;box-shadow:none;padding:18px}.xzqh-h1{margin:0 0 18px;font-size:2.325rem;font-weight:700;line-height:1.25}.xzqh-sub{color:var(--muted);margin:0 0 16px;font-size:.95rem}.xzqh-grid-boards{display:flex;flex-direction:column;gap:0}.xzqh-cat{margin-top:0}.xzqh-cat-title,.xzqh-cat h2{margin:0 0 10px;font-size:1.08rem;color:var(--top);padding-bottom:6px;border-bottom:1px solid var(--line);letter-spacing:.02em}.xzqh-board{display:block;padding:12px 4px;border:0;border-bottom:1px solid var(--line);border-radius:0;background:transparent;transition:none;min-height:0}.xzqh-board:last-child{border-bottom:0}.xzqh-board:hover{transform:none;box-shadow:none}.xzqh-board-main{display:flex;flex-direction:column;gap:8px;min-width:0}.xzqh-board-hd{min-width:0}.xzqh-board a.title{display:inline-block;color:var(--ink);font-weight:750;font-size:1.12rem;line-height:1.3;text-decoration:none!important}.xzqh-board a.title:hover{color:var(--accent)}.xzqh-board-desc{margin-top:2px;color:var(--muted);font-size:.78rem;line-height:1.35}.xzqh-board-latest{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:start;padding:8px 10px;border-radius:10px;background:color-mix(in srgb,var(--accent) 7%,var(--surface));border:1px solid color-mix(in srgb,var(--accent) 14%,var(--line));min-width:0}.xzqh-board-latest.is-empty{display:block;color:var(--muted);font-size:.82rem;padding:6px 0;background:none;border:0}.xzqh-board-latest-label{flex:0 0 auto;margin-top:2px;padding:1px 6px;border-radius:999px;background:color-mix(in srgb,var(--accent) 14%,var(--card));color:var(--accent);font-size:.68rem;font-weight:700;letter-spacing:.04em;line-height:1.4}.xzqh-board-latest-body{min-width:0;display:flex;flex-direction:column;gap:2px}.xzqh-board-latest-title{color:var(--accent)!important;font-size:.98rem;font-weight:650;line-height:1.4;text-decoration:none!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word}a.xzqh-board-latest-title:hover{text-decoration:underline!important}.xzqh-board-latest-meta{color:var(--muted);font-size:.78rem;line-height:1.35}.xzqh-board-ft{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 12px;align-items:baseline;color:var(--muted);font-size:.75rem;line-height:1.35}.xzqh-board-ft-meta{display:flex;flex-wrap:wrap;gap:4px 10px;min-width:0}.xzqh-board .xzqh-stats{display:flex;gap:10px;width:auto;min-width:0;max-width:none;font-size:inherit;line-height:inherit;white-space:nowrap;text-align:right}.xzqh-app[data-list=card] .xzqh-grid-boards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,380px),1fr));gap:14px}.xzqh-app[data-list=card] .xzqh-cat-title,.xzqh-app[data-list=card] .xzqh-cat h2{margin:0 0 14px;font-size:1.2rem;padding-bottom:10px}.xzqh-app[data-list=card] .xzqh-board{padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:var(--card);transition:transform .18s ease,box-shadow .18s ease;min-height:0}.xzqh-app[data-list=card] .xzqh-board:last-child{border-bottom:1px solid var(--line)}.xzqh-app[data-list=card] .xzqh-board:hover{transform:translateY(-1px);box-shadow:var(--shadow)}.xzqh-app[data-list=card] .xzqh-board-main{gap:12px}.xzqh-app[data-list=card] .xzqh-board a.title{font-weight:780;font-size:1.35rem;line-height:1.3}.xzqh-app[data-list=card] .xzqh-board-desc{margin-top:4px;font-size:.86rem}.xzqh-app[data-list=card] .xzqh-board-latest{padding:12px;gap:10px}.xzqh-app[data-list=card] .xzqh-board-latest-label{font-size:.72rem;padding:2px 8px}.xzqh-app[data-list=card] .xzqh-board-latest-title{font-size:1.05rem;font-weight:700;-webkit-line-clamp:3}.xzqh-app[data-list=card] .xzqh-board-latest-meta{font-size:.82rem}.xzqh-app[data-list=card] .xzqh-board-ft{font-size:.8rem;padding-top:2px}.xzqh-home-footer{margin-top:8px;margin-bottom:8px;display:flex;flex-direction:column;gap:16px}.xzqh-home-footer-block{min-width:0}.xzqh-home-footer-title{margin:0 0 10px;font-size:1.02rem;font-weight:700;color:var(--top);padding-bottom:6px;border-bottom:1px solid var(--line);letter-spacing:.02em}.xzqh-home-footer-sub{font-size:.82rem;font-weight:500;color:var(--muted);letter-spacing:0}.xzqh-friend-links,.xzqh-online-users,.xzqh-member-groups{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}.xzqh-friend-links a,.xzqh-online-users a,.xzqh-online-users span{color:var(--accent);font-size:.9rem;line-height:1.4;text-decoration:none;white-space:nowrap}.xzqh-friend-links a:hover,.xzqh-online-users a:hover{text-decoration:underline}.xzqh-member-group{display:inline-flex;align-items:center;gap:5px;color:var(--ink);font-size:.88rem;line-height:1.35;white-space:nowrap}.xzqh-member-group img{width:16px;height:16px;object-fit:contain;flex:0 0 auto}.xzqh-home-feed{padding:12px 14px}.xzqh-home-feed .xzqh-h1{margin:0 0 4px;font-size:1.2rem}.xzqh-home-feed-tabs{display:none;margin:2px 0 4px;gap:4px}.xzqh-home-feed-tabs button{padding:2px 8px;font-size:.76rem;border-radius:999px}.xzqh-home-feed-cols{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;align-items:start}.xzqh-home-feed-col-title{margin:0 0 6px;font-size:.92rem;font-weight:700;color:var(--top);letter-spacing:.02em}.xzqh-app[data-narrow="1"] .xzqh-home-feed-tabs{display:flex}.xzqh-app[data-narrow="1"] .xzqh-home-feed-cols{grid-template-columns:1fr;gap:0}.xzqh-app[data-narrow="1"] .xzqh-home-feed-col{display:none}.xzqh-app[data-narrow="1"] .xzqh-home-feed-col.is-active{display:block}.xzqh-app[data-narrow="1"] .xzqh-home-feed-col-title{display:none}.xzqh-home-feed-list .xzqh-item{grid-template-columns:1fr;gap:2px;padding:5px 2px}.xzqh-home-feed-list .xzqh-subject-line{gap:4px 6px;line-height:1.3}.xzqh-home-feed-list .xzqh-badge{margin:0;padding:0 5px;font-size:.68rem;line-height:1.35}.xzqh-home-feed-list .xzqh-subject-line .title{font-size:.86rem;font-weight:600;line-height:1.3}.xzqh-home-feed-list .xzqh-meta{margin-top:1px;font-size:.72rem;line-height:1.3}.xzqh-app[data-list=card] .xzqh-home-feed-list{display:grid;grid-template-columns:repeat(auto-fill,108px);justify-content:start;gap:8px}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-item{display:flex;flex-direction:column;align-items:stretch;aspect-ratio:1 / 1;gap:4px;padding:6px;border:1px solid var(--line);border-radius:12px;background:var(--card);box-shadow:var(--shadow);margin:0;overflow:hidden;min-height:0;width:100%}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-item:last-child{border-bottom:1px solid var(--line)}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-item-main{display:flex;flex-direction:column;flex:1 1 auto;align-self:stretch;width:100%;min-width:0;min-height:0;gap:4px}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-subject-line{position:relative;flex:1 1 auto;align-self:stretch;width:100%;min-width:0;min-height:0;box-sizing:border-box;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:flex-start;justify-content:flex-end;gap:4px;padding:8px;border-radius:9px;background:radial-gradient(120% 90% at 12% 8%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),linear-gradient(165deg,color-mix(in srgb,var(--accent) 18%,var(--surface)),color-mix(in srgb,var(--accent-2) 14%,var(--card)) 55%,color-mix(in srgb,var(--top) 10%,var(--card)));overflow:hidden}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-subject-line .xzqh-badges{order:-1;margin:0;align-self:flex-start;max-width:100%}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-badge{background:color-mix(in srgb,var(--card) 82%,transparent);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);font-size:.62rem;padding:0 4px}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-subject-line .title{flex:0 1 auto;align-self:stretch;min-width:0;width:100%;margin-top:auto;color:var(--ink)!important;font-size:.78rem;font-weight:700;line-height:1.28;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;text-decoration:none!important;text-shadow:0 1px 0 color-mix(in srgb,var(--card) 55%,transparent)}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-subject-line .title:hover{color:var(--accent)!important}.xzqh-app[data-list=card] .xzqh-home-feed-list .xzqh-meta{margin-top:0;padding:0 1px;font-size:.64rem;line-height:1.25;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}.xzqh-meta{color:var(--muted);font-size:.85rem}.xzqh-meta .xzqh-user-link,.xzqh-meta .xzqh-last-time{color:var(--accent);font-weight:550}.xzqh-meta .xzqh-user-link:hover,.xzqh-meta .xzqh-last-time:hover{text-decoration:underline}.xzqh-stats{text-align:right;font-variant-numeric:tabular-nums;color:var(--muted);font-size:.85rem;white-space:nowrap;width:7rem;min-width:7rem;max-width:7rem;flex-shrink:0;line-height:1.35;float:none!important;position:static!important}.xzqh-list{display:flex;flex-direction:column;gap:0}.xzqh-item{display:grid;grid-template-columns:minmax(0,1fr) 7rem;gap:8px 16px;align-items:start;padding:14px 8px;border-bottom:1px solid var(--line);overflow:hidden}.xzqh-item.topped{background:color-mix(in srgb,var(--accent-2) 8%,transparent);border-radius:8px;border-bottom-color:transparent;margin-bottom:2px}.xzqh-item:last-child{border-bottom:0}.xzqh-item-main{min-width:0;overflow:hidden;float:none!important}.xzqh-item .title{color:var(--ink);font-weight:600;font-size:1.02rem;float:none!important}.xzqh-badges{display:inline-flex;flex-wrap:wrap;gap:4px;flex-shrink:0;align-items:center;float:none!important;position:static!important}.xzqh-badge{display:inline-block;float:none!important;position:static!important;font-size:.72rem;padding:2px 6px;border-radius:6px;background:var(--badge);color:var(--accent);font-weight:600;line-height:1.35;white-space:nowrap}.xzqh-badge--top{background:color-mix(in srgb,var(--accent-2) 18%,var(--surface));color:var(--accent-2)}.xzqh-badge--digest{background:color-mix(in srgb,var(--ok) 16%,var(--surface));color:var(--ok)}.xzqh-vote-panel{border-color:color-mix(in srgb,var(--accent-2) 28%,var(--line))}.xzqh-vote{color:var(--ink);font-size:.92rem;line-height:1.5}.xzqh-vote h4{margin:0 0 10px;font-size:.88rem;font-weight:600;color:var(--muted);line-height:1.45}.xzqh-vote h4 .b{font-weight:600;color:var(--muted)}.xzqh-vote h4 a,.xzqh-vote #viewVoters{color:var(--accent);font-weight:650;cursor:pointer;text-decoration:none}.xzqh-vote h4 a:hover,.xzqh-vote #viewVoters:hover{text-decoration:underline}.xzqh-vote table{width:100%;max-width:520px;border-collapse:collapse;table-layout:auto}.xzqh-vote tr,.xzqh-vote td{display:table-cell}.xzqh-vote tr{display:table-row}.xzqh-vote .vote_text{padding:12px 0 4px;vertical-align:middle}.xzqh-vote .vote_pick{display:inline-block;margin-right:8px;vertical-align:middle;width:1.2em}.xzqh-vote .vote_pick input{margin:0;width:1.05rem;height:1.05rem;accent-color:var(--accent-2);cursor:pointer;vertical-align:middle}.xzqh-vote .vote_text label{display:inline;font-size:1.15rem;font-weight:750;color:var(--ink);line-height:1.35;cursor:pointer;letter-spacing:.01em}.xzqh-vote .vote_numline{width:300px;max-width:62%;padding:2px 0 8px;vertical-align:middle}.xzqh-vote .perCent{width:300px;max-width:100%;height:14px;background:#e8eef3;border-radius:4px;overflow:hidden;position:relative}.xzqh-vote .perValue{float:left;height:100%;min-width:0;border-radius:4px;background-color:#006ad7!important;background-image:none!important}.xzqh-vote .perValue span{display:none!important}.xzqh-vote .perValue.perbgA{background-color:#006ad7!important}.xzqh-vote .perValue.perbgB{background-color:#f80!important}.xzqh-vote .perValue.perbgC{background-color:#7aa012!important}.xzqh-vote .perValue.perbgD{background-color:#8b6bb5!important}.xzqh-vote .perValue.perbgE{background-color:#c45c5c!important}.xzqh-vote .vote_result{padding:2px 0 8px 10px;white-space:nowrap;vertical-align:middle;width:1%;font-size:0;font-variant-numeric:tabular-nums}.xzqh-vote .vote_result div{white-space:nowrap}.xzqh-vote .vote_result .gray{font-size:.95rem;font-weight:750;color:var(--ink);padding:0 0 0 2px}.xzqh-vote .vote_part{display:none;margin:0 0 6px;padding:6px 10px;width:300px;max-width:100%;border-radius:6px;background:#f7f7f7;color:var(--muted);font-size:.78rem;font-weight:400;line-height:1.55;word-break:break-all}.xzqh-vote.xzqh-vote--show-voters .vote_part{display:block}.xzqh-vote .vote_Bot{margin-top:14px;padding-top:4px}.xzqh-vote .vote_Bot .btn2,.xzqh-vote .vote_Bot .btn2>span{display:contents;background:none!important;border:0!important;padding:0!important;margin:0!important;height:auto!important;line-height:normal!important}.xzqh-vote .xzqh-vote-submit,.xzqh-vote .vote_Bot button{-moz-appearance:none;appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;height:auto!important;min-height:2.5rem;border:0!important;border-radius:999px;padding:.65rem 1.75rem!important;margin:0!important;cursor:pointer;font-size:1.05rem;font-weight:800;line-height:1!important;letter-spacing:.08em;color:#fff!important;background:var(--accent-2)!important;background-image:none!important;text-shadow:none!important;box-shadow:0 6px 16px color-mix(in srgb,var(--accent-2) 35%,transparent);overflow:visible;vertical-align:middle;white-space:nowrap}.xzqh-vote .xzqh-vote-submit:hover,.xzqh-vote .vote_Bot button:hover{filter:brightness(1.05)}.xzqh-badge--vote{background:color-mix(in srgb,var(--accent) 14%,var(--surface));color:var(--accent)}.xzqh-badge--img{background:var(--badge);color:var(--accent)}.xzqh-badge--new{background:color-mix(in srgb,#e11d48 16%,var(--surface));color:#e11d48;letter-spacing:.04em}.xzqh-subject-line{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;line-height:1.45;min-width:0}.xzqh-subject-line .title{flex:1 1 auto;min-width:8rem;word-break:break-word}.xzqh-type-tag{display:inline-block;border:0;margin:0;padding:2px 8px;border-radius:6px;background:var(--tag);color:var(--accent);font-size:.78rem;font-weight:650;cursor:pointer;line-height:1.35;white-space:nowrap;flex-shrink:0}.xzqh-type-tag:hover{background:var(--tag-hover)}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list){display:block}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list).xzqh-masonry-on{position:relative}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item{display:flex;flex-direction:column;grid-template-columns:unset;align-items:stretch;width:100%;height:auto;min-height:0;aspect-ratio:auto;gap:8px;padding:10px 10px 12px;border:1px solid var(--line);border-radius:18px;background:var(--card);box-shadow:var(--shadow);margin:0 0 12px;overflow:visible;box-sizing:border-box}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list).xzqh-masonry-on .xzqh-item{margin:0}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item.topped{border-color:color-mix(in srgb,var(--accent-2) 32%,var(--line))}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item:last-child{border-bottom:1px solid var(--line)}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item-main{display:flex;flex-direction:column;flex:0 0 auto;align-self:stretch;width:100%;min-width:0;min-height:0;height:auto;gap:8px;overflow:visible}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line{position:relative;container-type:inline-size;flex:0 1 auto;align-self:stretch;width:100%;min-width:0;min-height:100cqw;height:auto;box-sizing:border-box;display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:8px;padding:12px 12px 14px;border-radius:14px;background:radial-gradient(120% 90% at 12% 8%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),linear-gradient(165deg,color-mix(in srgb,var(--accent) 18%,var(--surface)),color-mix(in srgb,var(--accent-2) 14%,var(--card)) 55%,color-mix(in srgb,var(--top) 10%,var(--card)));overflow:hidden}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item.topped .xzqh-subject-line{background:radial-gradient(120% 90% at 88% 10%,color-mix(in srgb,var(--accent-2) 26%,transparent),transparent 50%),linear-gradient(165deg,color-mix(in srgb,var(--accent-2) 20%,var(--surface)),color-mix(in srgb,var(--accent) 12%,var(--card)))}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .xzqh-card-tags{display:flex;flex-wrap:wrap;align-items:center;align-content:flex-start;gap:6px 8px;flex:0 0 auto;width:100%;min-width:0}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .xzqh-badges{margin:0;display:inline-flex;flex-wrap:wrap;align-items:center;width:auto;max-width:100%;gap:4px}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .xzqh-type-tag{width:auto;max-width:100%;flex:0 0 auto;background:color-mix(in srgb,var(--card) 82%,transparent);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .title{flex:0 1 auto;align-self:stretch;margin-top:auto;min-width:0;width:100%;color:var(--ink)!important;font-size:clamp(1.08rem,2.6vw,1.42rem);font-weight:780;letter-spacing:.01em;line-height:1.32;display:block;overflow:visible;white-space:normal;word-break:break-word;text-decoration:none!important;text-shadow:0 1px 0 color-mix(in srgb,var(--card) 55%,transparent)}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .title:hover{color:var(--accent)!important}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-meta{margin-top:0;padding:0 2px;font-size:.75rem;line-height:1.45;flex:0 0 auto;display:flex;flex-direction:column;gap:2px;overflow:visible;white-space:normal;word-break:break-word}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-meta-row{display:block;overflow:visible;white-space:normal;word-break:break-word}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-stats{width:auto!important;min-width:0!important;max-width:none!important;flex:0 0 auto;align-self:stretch;text-align:left;padding:8px 2px 4px;margin:0;border-top:1px solid var(--line);border-left:0;display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:.74rem;line-height:1.5;overflow:visible;white-space:normal}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-stats>div{white-space:nowrap;line-height:1.5;overflow:visible}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item>.title{flex:1 1 auto;display:flex;align-items:flex-end;padding:12px;border-radius:14px;font-size:clamp(1.08rem,2.6vw,1.42rem);font-weight:780;line-height:1.32;background:linear-gradient(165deg,color-mix(in srgb,var(--accent) 16%,var(--surface)),color-mix(in srgb,var(--accent-2) 12%,var(--card)));display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}.xzqh-h1 .xzqh-type-tag{font-size:.85rem;margin-right:8px;vertical-align:baseline}.xzqh-forum-tag{background:color-mix(in srgb,var(--accent) 14%,var(--surface))}.xzqh-forum-tag:hover{background:color-mix(in srgb,var(--accent) 22%,var(--surface))}.xzqh-title-text{vertical-align:middle}.xzqh-pager{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:16px 0}.xzqh-pager button,.xzqh-pager a{min-width:36px;text-align:center}.xzqh-floor{border:1px solid var(--line);border-radius:12px;background:var(--card);margin-bottom:14px;overflow:hidden}.xzqh-floor-hd{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 14px;background:var(--floor-hd);border-bottom:1px solid var(--line);font-size:.9rem}.xzqh-floor-user{display:flex;gap:10px;align-items:center;min-width:0}.xzqh-avatar{width:40px;height:40px;border-radius:10px;object-fit:cover;background:var(--badge);flex:0 0 auto}.xzqh-avatar-fallback{display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--surface))}.xzqh-floor-bd{padding:16px 16px 8px;font-family:system-ui,-apple-system,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;font-size:1.05rem;line-height:1.75;overflow-wrap:anywhere}.xzqh-floor-bd img{max-width:100%;height:auto;border-radius:8px}.xzqh-floor-bd blockquote,.wc-quote{margin:12px 0;padding:10px 12px;background:color-mix(in srgb,var(--bg) 80%,var(--surface));border-left:3px solid var(--accent);color:var(--muted);font-family:inherit;font-size:.95rem}.xzqh-floor-ft{display:flex;flex-wrap:wrap;gap:8px;padding:8px 14px 14px}.xzqh-form{display:flex;flex-direction:column;gap:12px}.xzqh-form label{display:flex;flex-direction:column;gap:6px;font-size:.9rem;color:var(--muted)}.xzqh-form input[type=text],.xzqh-form input[type=password],.xzqh-form textarea,.xzqh-form select{width:100%;border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:var(--card);color:var(--ink)}.xzqh-form textarea{min-height:180px;resize:vertical;font-family:var(--mono);font-size:.92rem;line-height:1.5}.xzqh-captcha{display:flex;gap:10px;align-items:center}.xzqh-captcha img{height:36px;border-radius:6px;cursor:pointer;border:1px solid var(--line)}.xzqh-alert{padding:12px 14px;border-radius:10px;background:var(--alert);border:1px solid var(--alert-line);color:var(--alert-ink);margin-bottom:14px}.xzqh-alert.error{background:color-mix(in srgb,var(--danger) 12%,var(--surface));border-color:color-mix(in srgb,var(--danger) 28%,var(--line));color:var(--danger)}.xzqh-alert.ok{background:color-mix(in srgb,var(--ok) 12%,var(--surface));border-color:color-mix(in srgb,var(--ok) 28%,var(--line));color:var(--ok)}.xzqh-toolbar{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}.xzqh-preview{border:1px dashed var(--line);border-radius:10px;padding:12px;background:color-mix(in srgb,var(--bg) 70%,var(--surface));font-family:system-ui,-apple-system,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;line-height:1.7}.xzqh-editor{border:1px solid var(--line);border-radius:12px;background:var(--card);overflow:hidden}.xzqh-editor.is-full{position:fixed;top:12px;right:12px;bottom:12px;left:12px;z-index:1200;display:flex;flex-direction:column;box-shadow:var(--shadow);border-radius:12px}.xzqh-editor.is-full .xzqh-ed-textarea,.xzqh-editor.is-full .xzqh-ed-preview{flex:1;min-height:0}.xzqh-ed-toolbar{background:color-mix(in srgb,var(--surface) 70%,var(--card));border-bottom:1px solid var(--line)}.xzqh-ed-row{display:flex;flex-wrap:wrap;gap:4px;align-items:center;padding:8px 10px}.xzqh-ed-spacer{flex:1;min-width:8px}.xzqh-ed-sep{width:1px;height:18px;background:var(--line);margin:0 2px}.xzqh-ed-btn{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid transparent;background:transparent;color:var(--ink);border-radius:6px;min-width:28px;height:28px;padding:0 7px;cursor:pointer;font-size:.82rem;line-height:1}.xzqh-ed-btn:hover,.xzqh-ed-btn.active{background:color-mix(in srgb,var(--accent) 12%,var(--card));border-color:color-mix(in srgb,var(--accent) 28%,var(--line));color:var(--accent)}.xzqh-ed-btn-lg{min-width:44px;font-weight:600}.xzqh-form .xzqh-ed-select,.xzqh-ed-select{width:5.75rem;min-width:5.75rem;max-width:none;height:30px;box-sizing:border-box;border:1px solid var(--line);border-radius:6px;background:var(--card);color:var(--ink);font-size:.8rem;line-height:28px;padding:0 2px 0 6px;vertical-align:middle}.xzqh-form .xzqh-ed-select-sm,.xzqh-ed-select-sm{width:3.5rem;min-width:3.5rem;max-width:none}.xzqh-ed-a{position:relative;display:inline-block;font-weight:700;padding-bottom:3px}.xzqh-ed-a-bar{position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:1px}.xzqh-ed-panel{padding:10px 12px;border-top:1px solid var(--line);background:var(--surface)}.xzqh-ed-swatches{display:flex;flex-wrap:wrap;gap:6px}.xzqh-ed-swatch{width:22px;height:22px;border-radius:4px;border:1px solid color-mix(in srgb,var(--ink) 20%,var(--line));cursor:pointer;padding:0}.xzqh-ed-smiles{display:flex;flex-wrap:wrap;gap:6px}.xzqh-ed-smile{border:1px solid transparent;background:var(--card);border-radius:6px;padding:4px;cursor:pointer}.xzqh-ed-smile:hover{border-color:var(--accent)}.xzqh-ed-form-panel{display:flex;flex-direction:column;gap:10px}.xzqh-ed-form-panel label{display:flex;flex-direction:column;gap:4px;font-size:.85rem;color:var(--muted)}.xzqh-ed-form-panel input{border:1px solid var(--line);border-radius:8px;padding:8px 10px;background:var(--card);color:var(--ink)}.xzqh-ed-inline-form{flex-direction:row;flex-wrap:wrap;align-items:flex-end}.xzqh-ed-inline-form label{min-width:88px}.xzqh-ed-image-panel{padding-top:0}.xzqh-ed-subtabs{display:flex;gap:0;border-bottom:1px solid var(--line);margin:0 -12px 10px;padding:0 8px}.xzqh-ed-subtab{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background:transparent;color:var(--muted);padding:8px 12px;cursor:pointer;font:inherit;border-bottom:2px solid transparent;margin-bottom:-1px}.xzqh-ed-subtab.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:600}.xzqh-ed-img-thumbs{display:flex;flex-wrap:wrap;gap:8px}.xzqh-ed-img-thumb{width:72px;height:72px;padding:0;border:1px solid var(--line);border-radius:8px;overflow:hidden;background:var(--card);cursor:pointer}.xzqh-ed-img-thumb img{width:100%;height:100%;object-fit:cover;display:block}.xzqh-ed-img-thumb:hover{border-color:var(--accent)}.wc-attach{display:inline-block;padding:2px 8px;border-radius:6px;background:var(--badge);color:var(--accent);font-family:var(--font);font-size:.85rem}.wc-attach-img{max-width:100%;height:auto;border-radius:8px}.xzqh-ed-textarea{width:100%;min-height:220px;border:0;border-radius:0;padding:14px 16px;resize:vertical;background:var(--card);color:var(--ink);font-family:var(--mono);font-size:.92rem;line-height:1.55;outline:none}.xzqh-ed-preview{min-height:220px;border:0;border-radius:0;padding:14px 16px}.xzqh-ed-footer{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:8px 12px;border-top:1px solid var(--line);background:color-mix(in srgb,var(--surface) 80%,var(--card));font-size:.82rem}.xzqh-ed-footer-links{display:flex;flex-wrap:wrap;gap:12px}.xzqh-ed-footer-meta{color:var(--muted)}.xzqh-linkish{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background:none;color:var(--accent);cursor:pointer;padding:0;font:inherit}.xzqh-linkish:hover{text-decoration:underline}.xzqh-ed-toast{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:8px 12px;background:var(--alert);color:var(--alert-ink);border-top:1px solid var(--alert-line);font-size:.85rem}.wc-table{border-collapse:collapse;margin:8px 0;width:auto;max-width:100%}.wc-table td{border:1px solid var(--line);padding:6px 8px}.wc-list{margin:8px 0 8px 1.4em}.wc-hr{border:0;border-top:1px solid var(--line);margin:12px 0}.wc-paragraph{text-indent:2em;margin:.4em 0}.wc-code{background:color-mix(in srgb,var(--bg) 70%,var(--surface));padding:10px 12px;border-radius:8px;overflow:auto;font-family:var(--mono);font-size:.88rem}.wc-sell,.wc-hide{margin:10px 0;padding:10px 12px;border-radius:8px;border:1px dashed var(--line);background:color-mix(in srgb,var(--bg) 75%,var(--surface))}.wc-sell-label,.wc-hide-label{display:inline-block;font-size:.8rem;color:var(--accent-2);margin-bottom:6px;font-family:var(--font)}.xzqh-compose-title{display:flex;gap:8px;align-items:stretch}.xzqh-form .xzqh-compose-type,.xzqh-compose-type{flex:0 0 auto;width:8rem;min-width:8rem;max-width:none;box-sizing:border-box;border:1px solid var(--line);border-radius:10px;padding:10px 4px 10px 10px;background:var(--card);color:var(--ink)}.xzqh-compose-title-input{flex:1 1 auto;min-width:0;width:auto;border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:var(--card);color:var(--ink)}.xzqh-compose-attach{border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:color-mix(in srgb,var(--surface) 60%,var(--card));display:flex;flex-direction:column;gap:8px}.xzqh-compose-attach-hd{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.xzqh-compose-settings{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--card)}.xzqh-compose-tabs{display:flex;flex-wrap:wrap;gap:0;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--surface) 70%,var(--card))}.xzqh-compose-tab{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:0;background:transparent;color:var(--muted);padding:10px 14px;cursor:pointer;font:inherit;border-bottom:2px solid transparent;margin-bottom:-1px}.xzqh-compose-tab.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:600}.xzqh-compose-tabpanel{padding:14px;display:flex;flex-direction:column;gap:10px}.xzqh-check{display:flex!important;flex-direction:row!important;align-items:center;gap:8px!important;color:var(--ink)!important}.xzqh-check input{width:auto}.xzqh-check.is-disabled{opacity:.55}.xzqh-compose-actions{margin-top:4px}.xzqh-btn-lg{padding:10px 22px;font-size:1rem}@media(max-width:720px){.xzqh-compose-title{flex-direction:column}.xzqh-ed-sep{display:none}.xzqh-editor.is-full{top:0;right:0;bottom:0;left:0;border-radius:0}}.xzqh-attach-list{display:flex;flex-direction:column;gap:6px;font-size:.9rem}.xzqh-muted{color:var(--muted)}.xzqh-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.xzqh-loading{padding:40px 10px;text-align:center;color:var(--muted)}.xzqh-types{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;margin-bottom:12px;align-items:center}.xzqh-types a,.xzqh-types>button,.xzqh-type-dd>button{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:5px 10px;color:var(--muted);cursor:pointer}.xzqh-types .active,.xzqh-type-menu button.active{background:var(--accent);border-color:var(--accent);color:#fff}.xzqh-type-dd{position:relative;display:inline-flex}.xzqh-type-caret{margin-left:4px;font-size:.65em;opacity:.75;vertical-align:middle}.xzqh-type-dd.open>button{border-color:var(--accent);color:var(--accent)}.xzqh-type-menu{position:absolute;top:calc(100% + 6px);left:0;z-index:30;min-width:140px;max-height:280px;overflow:auto;display:flex;flex-direction:column;gap:2px;padding:6px;border:1px solid var(--line);border-radius:10px;background:var(--card);box-shadow:var(--shadow)}.xzqh-type-menu button{border:0;background:transparent;color:var(--ink);text-align:left;border-radius:8px;padding:7px 10px;cursor:pointer;white-space:nowrap}.xzqh-type-menu button:hover{background:color-mix(in srgb,var(--accent) 10%,var(--surface));color:var(--accent)}.xzqh-settings-block{margin-top:22px;padding-top:18px;border-top:1px solid var(--line)}.xzqh-settings-block:first-of-type{margin-top:8px;padding-top:0;border-top:0}.xzqh-settings-title{margin:0 0 12px;font-size:1.05rem;color:var(--ink)}.xzqh-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}.xzqh-theme-card{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;border:1px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);padding:12px;cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease}.xzqh-theme-card:hover{transform:translateY(-1px);box-shadow:var(--shadow)}.xzqh-theme-card.active{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 28%,transparent)}.xzqh-theme-card strong{font-size:.95rem}.xzqh-theme-card>span:last-child{color:var(--muted);font-size:.78rem}.xzqh-theme-swatch{display:flex;width:100%;height:28px;border-radius:8px;overflow:hidden;margin-bottom:6px;border:1px solid color-mix(in srgb,var(--line) 80%,transparent)}.xzqh-theme-swatch i{flex:1;display:block}.xzqh-theme-card[data-theme-preview=fangyu] .xzqh-theme-swatch{background:#e6f3f9}.xzqh-theme-card[data-theme-preview=fangyu] .xzqh-theme-swatch i:nth-child(1){background:#176eac}.xzqh-theme-card[data-theme-preview=fangyu] .xzqh-theme-swatch i:nth-child(2){background:#1b72af}.xzqh-theme-card[data-theme-preview=fangyu] .xzqh-theme-swatch i:nth-child(3){background:#f80}.xzqh-theme-card[data-theme-preview=jade] .xzqh-theme-swatch{background:#f3f1eb}.xzqh-theme-card[data-theme-preview=jade] .xzqh-theme-swatch i:nth-child(1){background:#16352f}.xzqh-theme-card[data-theme-preview=jade] .xzqh-theme-swatch i:nth-child(2){background:#0f6a5a}.xzqh-theme-card[data-theme-preview=jade] .xzqh-theme-swatch i:nth-child(3){background:#c45c26}.xzqh-theme-card[data-theme-preview=ink] .xzqh-theme-swatch{background:#eef1f4}.xzqh-theme-card[data-theme-preview=ink] .xzqh-theme-swatch i:nth-child(1){background:#13253a}.xzqh-theme-card[data-theme-preview=ink] .xzqh-theme-swatch i:nth-child(2){background:#1f4e79}.xzqh-theme-card[data-theme-preview=ink] .xzqh-theme-swatch i:nth-child(3){background:#b45309}.xzqh-theme-card[data-theme-preview=lake] .xzqh-theme-swatch{background:#e9f2f3}.xzqh-theme-card[data-theme-preview=lake] .xzqh-theme-swatch i:nth-child(1){background:#0f3a45}.xzqh-theme-card[data-theme-preview=lake] .xzqh-theme-swatch i:nth-child(2){background:#0e7490}.xzqh-theme-card[data-theme-preview=lake] .xzqh-theme-swatch i:nth-child(3){background:#c2410c}.xzqh-theme-card[data-theme-preview=sand] .xzqh-theme-swatch{background:#f2ebe3}.xzqh-theme-card[data-theme-preview=sand] .xzqh-theme-swatch i:nth-child(1){background:#3a2a1c}.xzqh-theme-card[data-theme-preview=sand] .xzqh-theme-swatch i:nth-child(2){background:#8a5a2b}.xzqh-theme-card[data-theme-preview=sand] .xzqh-theme-swatch i:nth-child(3){background:#a63d2a}.xzqh-theme-card[data-theme-preview=night] .xzqh-theme-swatch{background:#121820}.xzqh-theme-card[data-theme-preview=night] .xzqh-theme-swatch i:nth-child(1){background:#0b1016}.xzqh-theme-card[data-theme-preview=night] .xzqh-theme-swatch i:nth-child(2){background:#3db8a0}.xzqh-theme-card[data-theme-preview=night] .xzqh-theme-swatch i:nth-child(3){background:#e08a4f}.xzqh-theme-card[data-theme-preview=contrast] .xzqh-theme-swatch{background:#fff;border:1px solid #000}.xzqh-theme-card[data-theme-preview=contrast] .xzqh-theme-swatch i:nth-child(1){background:#000}.xzqh-theme-card[data-theme-preview=contrast] .xzqh-theme-swatch i:nth-child(2){background:#00c}.xzqh-theme-card[data-theme-preview=contrast] .xzqh-theme-swatch i:nth-child(3){background:#c40000}.xzqh-seg{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.xzqh-seg>button{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;border:1px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);padding:14px;cursor:pointer}.xzqh-seg>button strong{font-size:.98rem}.xzqh-seg>button span{color:var(--muted);font-size:.8rem}.xzqh-seg>button.active{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 28%,transparent)}.xzqh-font-scale{display:flex;align-items:center;gap:10px}.xzqh-font-scale-edge{flex:0 0 auto;color:var(--muted);font-size:.78rem;font-variant-numeric:tabular-nums;min-width:3.2em}.xzqh-font-scale-edge:last-child{text-align:right}.xzqh-font-scale-range{flex:1 1 auto;min-width:0;width:100%;accent-color:var(--accent);cursor:pointer}.xzqh-font-scale-readout{margin-top:10px;color:var(--muted);font-size:.86rem;font-variant-numeric:tabular-nums;display:flex;align-items:center;flex-wrap:wrap;gap:4px}.xzqh-forum-layout{display:block}.xzqh-forum-main{min-width:0}.xzqh-board-menu-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid color-mix(in srgb,var(--top-fg) 28%,transparent);background:color-mix(in srgb,var(--top-fg) 10%,transparent);color:var(--top-fg)!important;border-radius:999px;padding:7px 12px;cursor:pointer;font-weight:600;line-height:1.2}.xzqh-board-menu-btn:hover,.xzqh-board-menu-btn.open{background:color-mix(in srgb,var(--top-fg) 18%,transparent)}.xzqh-burger{display:inline-flex;flex-direction:column;gap:3px;width:16px}.xzqh-burger i{display:block;height:2px;border-radius:2px;background:currentColor}.xzqh-board-backdrop{display:none}.xzqh-board-side{position:fixed;left:0;top:calc(var(--xzqh-top-h, 112px) + 8px);z-index:15;width:10%;box-sizing:border-box;background:var(--card);border:1px solid var(--line);border-left:0;border-radius:0 14px 14px 0;box-shadow:var(--shadow);padding:10px 6px 12px;max-height:calc(100vh - var(--xzqh-top-h, 112px) - 24px);overflow:auto}.xzqh-board-side-hd{display:none;align-items:center;justify-content:space-between;padding:4px 8px 10px;border-bottom:1px solid var(--line);margin-bottom:8px}.xzqh-board-side-close{border:0;background:transparent;color:var(--muted);font-size:1.4rem;line-height:1;cursor:pointer;padding:0 4px}.xzqh-board-group{margin-bottom:6px}.xzqh-board-group-title{width:100%;border:0;background:transparent;color:var(--accent);font-weight:700;font-size:.86rem;text-align:left;padding:8px 8px 4px;cursor:pointer}.xzqh-board-group-list{list-style:none;margin:0;padding:0 4px 6px}.xzqh-board-group-list a{display:block;padding:6px 8px;border-radius:8px;color:var(--ink);text-decoration:none;font-size:.88rem;line-height:1.3}.xzqh-board-group-list a:hover{background:color-mix(in srgb,var(--accent) 10%,var(--surface));color:var(--accent);text-decoration:none}.xzqh-board-group-list a.current{background:color-mix(in srgb,var(--accent) 16%,var(--surface));color:var(--accent);font-weight:700}@media(max-width:860px){.xzqh-settings-liststyle,.xzqh-settings-fontsize{display:none}.xzqh-top-navrow .xzqh-board-menu-btn{display:inline-flex}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-subject-line .title{font-size:clamp(1.12rem,4.6vw,1.35rem)}.xzqh-app[data-list=card] .xzqh-home-feed-list{grid-template-columns:repeat(auto-fill,100px);gap:8px}.xzqh-board-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:40;background:#0c182461}.xzqh-top-inner,.xzqh-main{width:100%;max-width:none;padding-left:12px;padding-right:12px}.xzqh-main{padding-top:16px;padding-bottom:48px}.xzqh-board-side{position:fixed;top:0;left:auto;right:0;z-index:41;width:min(78vw,280px);height:100vh;max-height:none;border-radius:14px 0 0 14px;transform:translate(105%);transition:transform .2s ease;padding-top:12px}.xzqh-board-side.open{transform:translate(0)}.xzqh-board-side-hd{display:flex}}@media(max-width:720px){.xzqh-top-brandbar .xzqh-top-inner{flex-wrap:wrap}.xzqh-brand-logo{height:40px}.xzqh-top-navbar .xzqh-top-inner,.xzqh-nav{justify-content:flex-start}.xzqh-board{grid-template-columns:1fr}.xzqh-stats{text-align:left;min-width:0;width:auto;max-width:none}.xzqh-item{grid-template-columns:1fr}.xzqh-app[data-list=card] .xzqh-list:not(.xzqh-home-feed-list) .xzqh-item{aspect-ratio:auto;height:auto}.xzqh-app[data-list=card] .xzqh-home-feed-list{grid-template-columns:repeat(auto-fill,96px)}.xzqh-floor-hd{flex-direction:column}} ');

(function () {
  'use strict';

  var n, l$1, u$2, i$1, r$1, o$1, e$1, f$2, c$1, a$1, s$1, h$1, p$1, v$1, d$1 = {}, w$1 = [], _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, g = Array.isArray;
  function m$1(n2, l2) {
    for (var u2 in l2) n2[u2] = l2[u2];
    return n2;
  }
  function b(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function k$1(l2, u2, t2) {
    var i2, r2, o2, e2 = {};
    for (o2 in u2) "key" == o2 ? i2 = u2[o2] : "ref" == o2 ? r2 = u2[o2] : e2[o2] = u2[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return x(l2, e2, i2, r2, null);
  }
  function x(n2, t2, i2, r2, o2) {
    var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u$2 : o2, __i: -1, __u: 0 };
    return null == o2 && null != l$1.vnode && l$1.vnode(e2), e2;
  }
  function S(n2) {
    return n2.children;
  }
  function C$1(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function $(n2, l2) {
    if (null == l2) return n2.__ ? $(n2.__, n2.__i + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++) if (null != (u2 = n2.__k[l2]) && null != u2.__e) return u2.__e;
    return "function" == typeof n2.type ? $(n2) : null;
  }
  function I(n2) {
    if (n2.__P && n2.__d) {
      var u2 = n2.__v, t2 = u2.__e, i2 = [], r2 = [], o2 = m$1({}, u2);
      o2.__v = u2.__v + 1, l$1.vnode && l$1.vnode(o2), q(n2.__P, o2, u2, n2.__n, n2.__P.namespaceURI, 32 & u2.__u ? [t2] : null, i2, null == t2 ? $(u2) : t2, !!(32 & u2.__u), r2), o2.__v = u2.__v, o2.__.__k[o2.__i] = o2, D$1(i2, o2, r2), u2.__e = u2.__ = null, o2.__e != t2 && P(o2);
    }
  }
  function P(n2) {
    if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
      if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
    }), P(n2);
  }
  function A$1(n2) {
    (!n2.__d && (n2.__d = true) && i$1.push(n2) && !H.__r++ || r$1 != l$1.debounceRendering) && ((r$1 = l$1.debounceRendering) || o$1)(H);
  }
  function H() {
    try {
      for (var n2, l2 = 1; i$1.length; ) i$1.length > l2 && i$1.sort(e$1), n2 = i$1.shift(), l2 = i$1.length, I(n2);
    } finally {
      i$1.length = H.__r = 0;
    }
  }
  function L(n2, l2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, _2, g2 = t2 && t2.__k || w$1, m2 = l2.length;
    for (f2 = T$1(u2, l2, g2, f2, m2), s2 = 0; s2 < m2; s2++) null != (p2 = u2.__k[s2]) && (h2 = -1 != p2.__i && g2[p2.__i] || d$1, p2.__i = s2, _2 = q(n2, p2, h2, i2, r2, o2, e2, f2, c2, a2), v2 = p2.__e, p2.ref && h2.ref != p2.ref && (h2.ref && J(h2.ref, null, p2), a2.push(p2.ref, p2.__c || v2, p2)), null == y2 && null != v2 && (y2 = v2), 4 & p2.__u ? (f2 = j$1(p2, f2, n2), h2.__e && (h2.__e = null)) : "function" == typeof p2.type && void 0 !== _2 ? f2 = _2 : v2 && (f2 = v2.nextSibling), p2.__u &= -7);
    return u2.__e = y2, f2;
  }
  function T$1(n2, l2, u2, t2, i2) {
    var r2, o2, e2, f2, c2, a2 = u2.length, s2 = a2, h2 = 0;
    for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = x(null, o2, null, null, null) : g(o2) ? o2 = n2.__k[r2] = x(S, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = x(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f2 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = O(o2, u2, f2, s2)) && (s2--, (e2 = u2[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > a2 ? h2-- : i2 < a2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f2 && (c2 == f2 - 1 ? h2-- : c2 == f2 + 1 ? h2++ : (c2 > f2 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (s2) for (r2 = 0; r2 < a2; r2++) null != (e2 = u2[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = $(e2)), K(e2, e2));
    return t2;
  }
  function j$1(n2, l2, u2) {
    var t2, i2;
    if ("function" == typeof n2.type) {
      for (t2 = n2.__k, i2 = 0; t2 && i2 < t2.length; i2++) t2[i2] && (t2[i2].__ = n2, l2 = j$1(t2[i2], l2, u2));
      return l2;
    }
    n2.__e != l2 && (l2 && n2.type && !l2.parentNode && (l2 = $(n2)), l2 = u2.insertBefore(n2.__e, l2 || null));
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function O(n2, l2, u2, t2) {
    var i2, r2, o2, e2 = n2.key, f2 = n2.type, c2 = l2[u2], a2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == e2 || a2 && e2 == c2.key && f2 == c2.type) return u2;
    if (t2 > (a2 ? 1 : 0)) {
      for (i2 = u2 - 1, r2 = u2 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f2 == c2.type) return o2;
    }
    return -1;
  }
  function z$1(n2, l2, u2) {
    "-" == l2[0] ? n2.setProperty(l2, null == u2 ? "" : u2) : n2[l2] = null == u2 ? "" : "number" != typeof u2 || _.test(l2) ? u2 : u2 + "px";
  }
  function N(n2, l2, u2, t2, i2) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u2) n2.style.cssText = u2;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u2 && l2 in u2 || z$1(n2.style, l2, "");
      if (u2) for (l2 in u2) t2 && u2[l2] == t2[l2] || z$1(n2.style, l2, u2[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(s$1, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? t2 ? u2[a$1] = t2[a$1] : (u2[a$1] = h$1, n2.addEventListener(l2, r2 ? v$1 : p$1, r2)) : n2.removeEventListener(l2, r2 ? v$1 : p$1, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u2 ? "" : u2;
        break n;
      } catch (n3) {
      }
      "function" == typeof u2 || (null == u2 || false === u2 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u2 ? "" : u2));
    }
  }
  function V(n2) {
    return function(u2) {
      if (this.l) {
        var t2 = this.l[u2.type + n2];
        if (null == u2[c$1]) u2[c$1] = h$1++;
        else if (u2[c$1] < t2[a$1]) return;
        return t2(l$1.event ? l$1.event(u2) : u2);
      }
    };
  }
  function q(n2, u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, d2, _2, k2, x2, M, I2, P2, A2, H2, T2, j2, F = u2.type;
    if (void 0 !== u2.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f2 = u2.__e = t2.__e]), (s2 = l$1.__b) && s2(u2);
    n: if ("function" == typeof F) {
      h2 = e2.length;
      try {
        if (x2 = u2.props, M = F.prototype && F.prototype.render, I2 = (s2 = F.contextType) && i2[s2.__c], P2 = s2 ? I2 ? I2.props.value : s2.__ : i2, t2.__c ? k2 = (p2 = u2.__c = t2.__c).__ = p2.__E : (M ? u2.__c = p2 = new F(x2, P2) : (u2.__c = p2 = new C$1(x2, P2), p2.constructor = F, p2.render = Q), I2 && I2.sub(p2), p2.state || (p2.state = {}), p2.__n = i2, v2 = p2.__d = true, p2.__h = [], p2._sb = []), M && null == p2.__s && (p2.__s = p2.state), M && null != F.getDerivedStateFromProps && (p2.__s == p2.state && (p2.__s = m$1({}, p2.__s)), m$1(p2.__s, F.getDerivedStateFromProps(x2, p2.__s))), y2 = p2.props, d2 = p2.state, p2.__v = u2, v2) M && null == F.getDerivedStateFromProps && null != p2.componentWillMount && p2.componentWillMount(), M && null != p2.componentDidMount && p2.__h.push(p2.componentDidMount);
        else {
          if (M && null == F.getDerivedStateFromProps && x2 !== y2 && null != p2.componentWillReceiveProps && p2.componentWillReceiveProps(x2, P2), u2.__v == t2.__v || !p2.__e && null != p2.shouldComponentUpdate && false === p2.shouldComponentUpdate(x2, p2.__s, P2)) {
            u2.__v != t2.__v && (p2.props = x2, p2.state = p2.__s, p2.__d = false), u2.__e = t2.__e, u2.__k = t2.__k, u2.__k.some(function(n3) {
              n3 && (n3.__ = u2);
            }), w$1.push.apply(p2.__h, p2._sb), p2._sb = [], p2.__h.length && e2.push(p2), f2 = $(t2);
            break n;
          }
          null != p2.componentWillUpdate && p2.componentWillUpdate(x2, p2.__s, P2), M && null != p2.componentDidUpdate && p2.__h.push(function() {
            p2.componentDidUpdate(y2, d2, _2);
          });
        }
        if (p2.context = P2, p2.props = x2, p2.__P = n2, p2.__e = false, A2 = l$1.__r, H2 = 0, M) p2.state = p2.__s, p2.__d = false, A2 && A2(u2), s2 = p2.render(p2.props, p2.state, p2.context), w$1.push.apply(p2.__h, p2._sb), p2._sb = [];
        else do {
          p2.__d = false, A2 && A2(u2), s2 = p2.render(p2.props, p2.state, p2.context), p2.state = p2.__s;
        } while (p2.__d && ++H2 < 25);
        p2.state = p2.__s, null != p2.getChildContext && (i2 = m$1(m$1({}, i2), p2.getChildContext())), M && !v2 && null != p2.getSnapshotBeforeUpdate && (_2 = p2.getSnapshotBeforeUpdate(y2, d2)), T2 = null != s2 && s2.type === S && null == s2.key ? E(s2.props.children) : s2, f2 = L(n2, g(T2) ? T2 : [T2], u2, t2, i2, r2, o2, e2, f2, c2, a2), p2.base = u2.__e, u2.__u &= -161, p2.__h.length && e2.push(p2), k2 && (p2.__E = p2.__ = null);
      } catch (n3) {
        if (e2.length = h2, u2.__v = null, c2 || null != o2) {
          if (n3.then) {
            for (u2.__u |= c2 ? 160 : 128; f2 && 8 == f2.nodeType && f2.nextSibling; ) f2 = f2.nextSibling;
            null != o2 && (o2[o2.indexOf(f2)] = null), u2.__e = f2;
          } else if (null != o2) for (j2 = o2.length; j2--; ) b(o2[j2]);
        } else u2.__e = t2.__e;
        null == u2.__k && (u2.__k = t2.__k || []), n3.then || B$1(u2), l$1.__e(n3, u2, t2);
      }
    } else null == o2 && u2.__v == t2.__v ? (u2.__k = t2.__k, u2.__e = t2.__e) : f2 = u2.__e = G(t2.__e, u2, t2, i2, r2, o2, e2, c2, a2);
    return (s2 = l$1.diffed) && s2(u2), 128 & u2.__u ? void 0 : f2;
  }
  function B$1(n2) {
    n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B$1));
  }
  function D$1(n2, u2, t2) {
    for (var i2 = 0; i2 < t2.length; i2++) J(t2[i2], t2[++i2], t2[++i2]);
    l$1.__c && l$1.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l$1.__e(n3, u3.__v);
      }
    });
  }
  function E(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : void 0 !== n2.constructor ? null : m$1({}, n2);
  }
  function G(u2, t2, i2, r2, o2, e2, f2, c2, a2) {
    var s2, h2, p2, v2, y2, w2, _2, m2 = i2.props || d$1, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (s2 = 0; s2 < e2.length; s2++) if ((y2 = e2[s2]) && "setAttribute" in y2 == !!x2 && (x2 ? y2.localName == x2 : 3 == y2.nodeType)) {
        u2 = y2, e2[s2] = null;
        break;
      }
    }
    if (null == u2) {
      if (null == x2) return document.createTextNode(k2);
      u2 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l$1.__m && l$1.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) m2 === k2 || c2 && u2.data == k2 || (u2.data = k2);
    else {
      if (e2 = "textarea" == x2 && null != k2.defaultValue ? null : e2 && n.call(u2.childNodes), !c2 && null != e2) for (m2 = {}, s2 = 0; s2 < u2.attributes.length; s2++) m2[(y2 = u2.attributes[s2]).name] = y2.value;
      for (s2 in m2) y2 = m2[s2], "dangerouslySetInnerHTML" == s2 ? p2 = y2 : "children" == s2 || s2 in k2 || "value" == s2 && "defaultValue" in k2 || "checked" == s2 && "defaultChecked" in k2 || N(u2, s2, null, y2, o2);
      for (s2 in k2) y2 = k2[s2], "children" == s2 ? v2 = y2 : "dangerouslySetInnerHTML" == s2 ? h2 = y2 : "value" == s2 ? w2 = y2 : "checked" == s2 ? _2 = y2 : c2 && "function" != typeof y2 || m2[s2] === y2 || N(u2, s2, y2, m2[s2], o2);
      if (h2) c2 || p2 && (h2.__html == p2.__html || h2.__html == u2.innerHTML) || (u2.innerHTML = h2.__html), t2.__k = [];
      else if (p2 && (u2.innerHTML = ""), L("template" == t2.type ? u2.content : u2, g(v2) ? v2 : [v2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f2, e2 ? e2[0] : i2.__k && $(i2, 0), c2, a2), null != e2) for (s2 = e2.length; s2--; ) b(e2[s2]);
      c2 && "textarea" != x2 || (s2 = "value", "progress" == x2 && null == w2 ? u2.removeAttribute("value") : null != w2 && (w2 !== u2[s2] || "progress" == x2 && !w2 || "option" == x2 && w2 != m2[s2]) && N(u2, s2, w2, m2[s2], o2), s2 = "checked", null != _2 && _2 != u2[s2] && N(u2, s2, _2, m2[s2], o2));
    }
    return u2;
  }
  function J(n2, u2, t2) {
    try {
      if ("function" == typeof n2) {
        var i2 = "function" == typeof n2.__u;
        i2 && n2.__u(), i2 && null == u2 || (n2.__u = n2(u2));
      } else n2.current = u2;
    } catch (n3) {
      l$1.__e(n3, t2);
    }
  }
  function K(n2, u2, t2) {
    var i2, r2;
    if (l$1.unmount && l$1.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || J(i2, null, u2)), null != (i2 = n2.__c)) {
      if (i2.componentWillUnmount) try {
        i2.componentWillUnmount();
      } catch (n3) {
        l$1.__e(n3, u2);
      }
      i2.base = i2.__P = i2.__n = null;
    }
    if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && K(i2[r2], u2, t2 || "function" != typeof n2.type);
    t2 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function Q(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function R(u2, t2, i2) {
    var r2, o2, e2, f2;
    t2 == document && (t2 = document.documentElement), l$1.__ && l$1.__(u2, t2), o2 = (r2 = false) ? null : t2.__k, e2 = [], f2 = [], q(t2, u2 = t2.__k = k$1(S, null, [u2]), o2 || d$1, d$1, t2.namespaceURI, o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, o2 ? o2.__e : t2.firstChild, r2, f2), D$1(e2, u2, f2), u2.props.children = null;
  }
  n = w$1.slice, l$1 = { __e: function(n2, l2, u2, t2) {
    for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
      if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u$2 = 0, C$1.prototype.setState = function(n2, l2) {
    var u2;
    u2 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m$1({}, this.state), "function" == typeof n2 && (n2 = n2(m$1({}, u2), this.props)), n2 && m$1(u2, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), A$1(this));
  }, C$1.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), A$1(this));
  }, C$1.prototype.render = S, i$1 = [], o$1 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e$1 = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, H.__r = 0, f$2 = Math.random().toString(8), c$1 = "__d" + f$2, a$1 = "__a" + f$2, s$1 = /(PointerCapture)$|Capture$/i, h$1 = 0, p$1 = V(false), v$1 = V(true);
  var f$1 = 0;
  function u$1(e2, t2, n2, o2, i2, u2) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f$1, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l$1.vnode && l$1.vnode(l2), l2;
  }
  function installPageCompat() {
    const w2 = window;
    if (typeof w2.defaultface === "undefined") w2.defaultface = "default";
    if (!w2.facedb || typeof w2.facedb !== "object") w2.facedb = {};
    if (!Object.keys(w2.facedb).length) w2.facedb.default = "默认";
    const patchPwFace = () => {
      const pf = w2.PwFace;
      if (!pf || pf.__xzqhPatched || typeof pf.init !== "function") return false;
      const orig = pf.init.bind(pf);
      pf.init = (...args) => {
        if (typeof w2.defaultface === "undefined") w2.defaultface = "default";
        if (!w2.facedb || typeof w2.facedb !== "object") w2.facedb = { default: "默认" };
        else if (!Object.keys(w2.facedb).length) w2.facedb.default = "默认";
        try {
          return orig(...args);
        } catch {
          return void 0;
        }
      };
      pf.__xzqhPatched = true;
      return true;
    };
    if (patchPwFace()) return;
    const iv = window.setInterval(() => {
      if (patchPwFace()) window.clearInterval(iv);
    }, 0);
    window.setTimeout(() => window.clearInterval(iv), 15e3);
  }
  installPageCompat();
  var t, r, u, i, o = 0, f = [], c = l$1, e = c.__b, a = c.__r, v = c.diffed, l = c.__c, m = c.unmount, p = c.__;
  function s(n2, t2) {
    c.__h && c.__h(r, n2, o || t2), o = 0;
    var u2 = r.__H || (r.__H = { __: [], __h: [] });
    return n2 >= u2.__.length && u2.__.push({}), u2.__[n2];
  }
  function d(n2) {
    return o = 1, y(D, n2);
  }
  function y(n2, u2, i2) {
    var o2 = s(t++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [D(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.__f)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H) return true;
        var u3 = false, i3 = o2.__c.props !== n3;
        if (o2.__c.__H.__.some(function(n4) {
          if (n4.__N) {
            u3 = true;
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
          }
        }), c2) {
          var f3 = c2.call(this, n3, t2, r2);
          return u3 ? f3 || i3 : f3;
        }
        return !u3 || i3;
      };
      r.__f = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function h(n2, u2) {
    var i2 = s(t++, 3);
    !c.__s && C(i2.__H, u2) && (i2.__ = n2, i2.u = u2, r.__H.__h.push(i2));
  }
  function A(n2) {
    return o = 5, T(function() {
      return { current: n2 };
    }, []);
  }
  function T(n2, r2) {
    var u2 = s(t++, 7);
    return C(u2.__H, r2) && (u2.__ = n2(), u2.__H = r2, u2.__h = n2), u2.__;
  }
  function j() {
    for (var n2; n2 = f.shift(); ) {
      var t2 = n2.__H;
      if (n2.__P && t2) try {
        t2.__h.some(z), t2.__h.some(B), t2.__h = [];
      } catch (r2) {
        t2.__h = [], c.__e(r2, n2.__v);
      }
    }
  }
  c.__b = function(n2) {
    r = null, e && e(n2);
  }, c.__ = function(n2, t2) {
    n2 && t2.__k && t2.__k.__m && (n2.__m = t2.__k.__m), p && p(n2, t2);
  }, c.__r = function(n2) {
    a && a(n2), t = 0;
    var i2 = (r = n2.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.some(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i2.__h.some(z), i2.__h.some(B), i2.__h = [], t = 0)), u = r;
  }, c.diffed = function(n2) {
    v && v(n2);
    var t2 = n2.__c;
    t2 && t2.__H && (t2.__H.__h.length && (1 !== f.push(t2) && i === c.requestAnimationFrame || ((i = c.requestAnimationFrame) || w)(j)), t2.__H.__.some(function(n3) {
      n3.u && (n3.__H = n3.u, n3.u = void 0);
    })), u = r = null;
  }, c.__c = function(n2, t2) {
    t2.some(function(n3) {
      try {
        n3.__h.some(z), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B(n4);
        });
      } catch (r2) {
        t2.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t2 = [], c.__e(r2, n3.__v);
      }
    }), l && l(n2, t2);
  }, c.unmount = function(n2) {
    m && m(n2);
    var t2, r2 = n2.__c;
    r2 && r2.__H && (r2.__H.__.some(function(n3) {
      try {
        z(n3);
      } catch (n4) {
        t2 = n4;
      }
    }), r2.__H = void 0, t2 && c.__e(t2, r2.__v));
  };
  var k = "function" == typeof requestAnimationFrame;
  function w(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), k && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 35);
    k && (t2 = requestAnimationFrame(r2));
  }
  function z(n2) {
    var t2 = r, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r = t2;
  }
  function B(n2) {
    var t2 = r;
    n2.__c = n2.__(), r = t2;
  }
  function C(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function D(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  function parseSessionFromHtml(html) {
    const verifyhash = match1$1(html, /verifyhash\s*=\s*['"]([^'"]+)/i) || "";
    const winduid = Number(
      match1$1(html, /\bwinduid\s*=\s*['"](\d+)['"]/i) || match1$1(html, /\bwinduid\s*=\s*(\d+)\s*;/i) || "0"
    );
    const windid = sanitizeUsername(
      match1$1(html, /\bwindid\s*=\s*['"]([^'"]*)['"]/i) || match1$1(html, /\bUSERNAME\s*=\s*['"]([^'"]*)['"]/i) || ""
    );
    const groupid = Number(
      match1$1(html, /\bgroupid\s*=\s*['"](-?\d+)['"]/i) || match1$1(html, /\bgroupid\s*=\s*(-?\d+)\s*;/i) || "0"
    );
    let username = windid;
    let uid = winduid;
    const header = extractHeaderUser(html);
    if (!username && header.username) username = header.username;
    if (uid <= 0 && header.uid) uid = header.uid;
    const hasQuit = /login\.php\?action=quit/i.test(html);
    const loggedIn = uid > 0 || hasQuit && !!username;
    return {
      uid,
      username: username || (loggedIn ? "已登录" : "游客"),
      groupid,
      verifyhash,
      loggedIn: uid > 0 || hasQuit
    };
  }
  function extractHeaderUser(html) {
    const loginDl = match1$1(html, /<dl class=["']login["']>([\s\S]*?)<\/dl>/i) || "";
    if (loginDl) {
      const name = sanitizeUsername(match1$1(loginDl, /id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i) || "") || sanitizeUsername(match1$1(loginDl, /<img[^>]+alt=["']([^"']+)["']/i) || "");
      const uid = Number(match1$1(loginDl, /attachment\/upload\/small\/\d+\/(\d+)\.(?:png|jpe?g|gif)/i) || "0") || Number(match1$1(loginDl, /u\.php\?uid=(\d+)/i) || "0") || void 0;
      if (name || uid) return { username: name || void 0, uid: uid || void 0 };
    }
    const more = match1$1(html, /id=["']td_userinfomore["']([\s\S]{0,500})/i) || "";
    if (more) {
      const name = sanitizeUsername(match1$1(more, /<span>([^<]+)<\/span>/i) || "");
      if (name) return { username: name };
    }
    const quitIdx = html.search(/login\.php\?action=quit/i);
    if (quitIdx >= 0) {
      const windowHtml = html.slice(Math.max(0, quitIdx - 2e3), quitIdx + 200);
      const uid = Number(match1$1(windowHtml, /attachment\/upload\/small\/\d+\/(\d+)\./i) || "0") || Number(match1$1(windowHtml, /u\.php\?uid=(\d+)/i) || "0") || void 0;
      const name = sanitizeUsername(
        match1$1(windowHtml, /id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i) || match1$1(windowHtml, /<img[^>]+alt=["']([^"']+)["']/i) || ""
      );
      if (name || uid) return { username: name || void 0, uid };
    }
    return {};
  }
  function extractQuitVerify(html) {
    return match1$1(html, /login\.php\?action=quit[^"'>\s]*[?&]verify=([a-f0-9]+)/i) || match1$1(html, /login\.php\?action=quit&amp;verify=([a-f0-9]+)/i) || "";
  }
  function sanitizeUsername(name) {
    const t2 = name.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!t2) return "";
    if (/^(输入用户名|用户名|密码|登录|注册|退出|发帖|搜索|游客|已登录|个人中心|方舆|消息|设置|帐号|权限)$/.test(
      t2
    )) {
      return "";
    }
    if (t2.length > 30) return "";
    return t2;
  }
  function match1$1(s2, re) {
    const m2 = s2.match(re);
    return m2 == null ? void 0 : m2[1];
  }
  const STORAGE_DISABLED_KEY = "xzqh_client_disabled";
  function isClientDisabled() {
    try {
      return localStorage.getItem(STORAGE_DISABLED_KEY) === "1";
    } catch {
      return false;
    }
  }
  function setClientDisabled(disabled) {
    try {
      if (disabled) localStorage.setItem(STORAGE_DISABLED_KEY, "1");
      else localStorage.removeItem(STORAGE_DISABLED_KEY);
    } catch {
    }
  }
  const FONT_SIZE_BASE_PX = 14;
  const THEME_OPTIONS = [
    { id: "fangyu", name: "方舆", desc: "原站蓝橙" },
    { id: "jade", name: "青绿", desc: "青绿暖纸" },
    { id: "ink", name: "墨玉", desc: "冷灰纸白" },
    { id: "lake", name: "澄湖", desc: "青蓝浅底" },
    { id: "sand", name: "沙洲", desc: "琥珀浅棕" },
    { id: "night", name: "夜航", desc: "深色护眼" },
    { id: "contrast", name: "高对比", desc: "黑白分明" }
  ];
  const LIST_STYLE_OPTIONS = [
    { id: "list", name: "列表式", desc: "紧凑分行，信息密度高" },
    { id: "card", name: "卡片式", desc: "分块卡片，层次更清晰" }
  ];
  const STORAGE_KEY = "xzqh_client_prefs";
  const PREFS_EVENT = "xzqh:prefs";
  const DEFAULTS = {
    theme: "fangyu",
    listStyle: "list",
    fontScale: 0
  };
  function isTheme(v2) {
    return THEME_OPTIONS.some((t2) => t2.id === v2);
  }
  function isListStyle(v2) {
    return LIST_STYLE_OPTIONS.some((t2) => t2.id === v2);
  }
  function fontScaleFactor(percent) {
    return Math.pow(2, clampFontScale(percent) / 100);
  }
  function fontScaleToPx(percent, base = FONT_SIZE_BASE_PX) {
    return Math.round(base * fontScaleFactor(percent) * 10) / 10;
  }
  function clampFontScale(v2) {
    const n2 = Number(v2);
    if (!Number.isFinite(n2)) return DEFAULTS.fontScale;
    if (n2 === 12 || n2 === 14 || n2 === 16 || n2 === 18) {
      return Math.round(100 * Math.log2(n2 / FONT_SIZE_BASE_PX));
    }
    return Math.max(-100, Math.min(100, Math.round(n2)));
  }
  function readFontScale(parsed) {
    if ("fontScale" in parsed) return clampFontScale(parsed.fontScale);
    if ("fontSize" in parsed) return clampFontScale(parsed.fontSize);
    return DEFAULTS.fontScale;
  }
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULTS };
      const parsed = JSON.parse(raw);
      return {
        theme: isTheme(parsed.theme) ? parsed.theme : DEFAULTS.theme,
        listStyle: isListStyle(parsed.listStyle) ? parsed.listStyle : DEFAULTS.listStyle,
        fontScale: readFontScale(parsed)
      };
    } catch {
      return { ...DEFAULTS };
    }
  }
  function savePrefs(patch) {
    const next = { ...loadPrefs(), ...patch };
    if (!isTheme(next.theme)) next.theme = DEFAULTS.theme;
    if (!isListStyle(next.listStyle)) next.listStyle = DEFAULTS.listStyle;
    next.fontScale = clampFontScale(next.fontScale);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          theme: next.theme,
          listStyle: next.listStyle,
          fontScale: next.fontScale
        })
      );
    } catch {
    }
    applyFontSizeToDocument(next.fontScale);
    window.dispatchEvent(new CustomEvent(PREFS_EVENT, { detail: next }));
    return next;
  }
  const FONT_SCALE_NARROW_MQ = "(max-width: 860px)";
  function isFontScaleNarrow() {
    try {
      return window.matchMedia(FONT_SCALE_NARROW_MQ).matches;
    } catch {
      return false;
    }
  }
  function applyFontSizeToDocument(scale = loadPrefs().fontScale) {
    const html = document.documentElement;
    if (!html.classList.contains("xzqh-client-active")) return;
    const pct = clampFontScale(scale);
    const narrow = isFontScaleNarrow();
    const factor = narrow ? 1 : fontScaleFactor(pct);
    const px = narrow ? FONT_SIZE_BASE_PX : fontScaleToPx(pct);
    html.style.fontSize = `${FONT_SIZE_BASE_PX}px`;
    html.style.setProperty("--xzqh-font-factor", String(factor));
    html.dataset.xzqhFont = String(px);
    html.dataset.xzqhFontScale = String(pct);
    html.dataset.xzqhFontNarrow = narrow ? "1" : "0";
    const root = document.getElementById("xzqh-client-root");
    if (root) {
      root.style.setProperty("--xzqh-font-factor", String(factor));
      root.style.zoom = String(factor);
    }
  }
  function clearFontSizeFromDocument() {
    const html = document.documentElement;
    html.style.removeProperty("font-size");
    html.style.removeProperty("--xzqh-font-factor");
    delete html.dataset.xzqhFont;
    delete html.dataset.xzqhFontScale;
    delete html.dataset.xzqhFontNarrow;
    const root = document.getElementById("xzqh-client-root");
    if (root) {
      root.style.removeProperty("zoom");
      root.style.removeProperty("--xzqh-font-factor");
    }
  }
  const STYLE_ID = "xzqh-client-hide-original";
  const ROOT_ID = "xzqh-client-root";
  const THEME_BG = {
    fangyu: "#e6f3f9",
    jade: "#f3f1eb",
    ink: "#eef1f4",
    lake: "#e9f2f3",
    sand: "#f2ebe3",
    night: "#121820",
    contrast: "#ffffff"
  };
  function isNativeOnlyPath(pathname = location.pathname) {
    return /(^|\/)(u|profile|message|searcher)\.php$/i.test(pathname);
  }
  function shouldActivate() {
    if (isClientDisabled()) return false;
    if (!/\/lt(\/|$)/.test(location.pathname)) return false;
    if (/\.(js|css|gif|png|jpg|jpeg|ico|swf|xml)(\?|$)/i.test(location.pathname)) return false;
    if (isNativeOnlyPath()) return false;
    return true;
  }
  function installEarlyMask() {
    if (document.getElementById(STYLE_ID)) return;
    const bg = THEME_BG[loadPrefs().theme] || THEME_BG.fangyu;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
    html.xzqh-client-active body > :not(#${ROOT_ID}) { display: none !important; }
    html.xzqh-client-active, html.xzqh-client-active body {
      margin: 0 !important;
      padding: 0 !important;
      background: ${bg} !important;
      min-height: 100%;
    }
    #${ROOT_ID} {
      display: block !important;
      min-height: 100vh;
      position: relative;
      z-index: 2147483646;
      zoom: var(--xzqh-font-factor, 1);
    }
  `;
    (document.documentElement || document.head || document).appendChild(style);
    document.documentElement.classList.add("xzqh-client-active");
    applyFontSizeToDocument(loadPrefs().fontScale);
  }
  function ensureRoot() {
    let root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      const mount = () => {
        if (!document.body) return false;
        if (!root.parentElement) document.body.appendChild(root);
        applyFontSizeToDocument(loadPrefs().fontScale);
        return true;
      };
      if (!mount()) {
        document.addEventListener("DOMContentLoaded", () => mount(), { once: true });
        const iv = setInterval(() => {
          if (mount()) clearInterval(iv);
        }, 10);
      }
    } else {
      applyFontSizeToDocument(loadPrefs().fontScale);
    }
    return root;
  }
  function teardownClient() {
    var _a, _b;
    clearFontSizeFromDocument();
    document.documentElement.classList.remove("xzqh-client-active");
    (_a = document.getElementById(STYLE_ID)) == null ? void 0 : _a.remove();
    (_b = document.getElementById(ROOT_ID)) == null ? void 0 : _b.remove();
  }
  const BASE_PATH = (() => {
    const m2 = location.pathname.match(/^(.*?\/lt\/)/);
    return m2 ? m2[1] : "/lt/";
  })();
  function parseLocation(href = location.href) {
    const u2 = new URL(href, location.origin);
    const path = u2.pathname;
    const q2 = u2.searchParams;
    if (/(^|\/)login\.php$/i.test(path) || q2.get("xzqh") === "login") return { name: "login" };
    if (/(^|\/)message\.php$/i.test(path)) return { name: "messages" };
    if (/(^|\/)searcher\.php$/i.test(path)) {
      return {
        name: "search",
        keyword: q2.get("keyword") || "",
        digest: q2.get("digest") === "1",
        schTime: q2.get("sch_time") || void 0
      };
    }
    if (/(^|\/)u\.php$/i.test(path)) {
      return {
        name: "user",
        uid: q2.get("uid") ? Number(q2.get("uid")) : void 0,
        username: q2.get("username") || void 0
      };
    }
    if (/(^|\/)post\.php$/i.test(path)) {
      return {
        name: "compose",
        fid: Number(q2.get("fid") || 0),
        tid: q2.get("tid") ? Number(q2.get("tid")) : void 0,
        // Keep original pid string: topic first floor uses pid=tpc, not a number.
        quotePid: q2.get("action") === "quote" && q2.get("pid") ? q2.get("pid") : void 0,
        editPid: q2.get("action") === "modify" && q2.get("pid") ? q2.get("pid") : void 0,
        article: q2.get("article") ? Number(q2.get("article")) : void 0
      };
    }
    if (/(^|\/)thread\.php$/i.test(path)) {
      return {
        name: "forum",
        fid: Number(q2.get("fid") || 0),
        page: Number(q2.get("page") || 1) || 1,
        type: q2.get("type") || void 0,
        special: q2.get("special") || void 0,
        search: q2.get("search") || void 0
      };
    }
    if (/(^|\/)read\.php$/i.test(path)) {
      const page = q2.get("page") === "e" ? 9999 : Number(q2.get("page") || 1);
      const tid = Number(q2.get("tid") || 0);
      if (!tid) return { name: "home" };
      return { name: "thread", tid, page: page || 1 };
    }
    if (q2.get("xzqh") === "settings") return { name: "settings" };
    return { name: "home" };
  }
  function routeToUrl(route) {
    switch (route.name) {
      case "home":
        return `${BASE_PATH}index.php`;
      case "forum":
        return `${BASE_PATH}thread.php?fid=${route.fid}&page=${route.page}${route.type ? `&type=${route.type}` : ""}${route.special ? `&special=${route.special}` : ""}${route.search ? `&search=${route.search}` : ""}`;
      case "thread": {
        if (route.page >= 9999) {
          return `${BASE_PATH}read.php?tid=${route.tid}&page=e#a`;
        }
        if (!route.page || route.page <= 1) {
          return `${BASE_PATH}read.php?tid=${route.tid}`;
        }
        return `${BASE_PATH}read.php?tid=${route.tid}&page=${route.page}`;
      }
      case "compose": {
        const p2 = new URLSearchParams();
        if (route.editPid && route.tid) {
          p2.set("action", "modify");
          if (route.fid) p2.set("fid", String(route.fid));
          p2.set("tid", String(route.tid));
          p2.set("pid", String(route.editPid));
          if (route.article != null) p2.set("article", String(route.article));
        } else {
          p2.set("fid", String(route.fid));
          if (route.tid) p2.set("tid", String(route.tid));
          if (route.quotePid) {
            p2.set("action", "quote");
            p2.set("pid", String(route.quotePid));
            if (route.article != null) p2.set("article", String(route.article));
          } else if (route.tid) {
            p2.set("action", "reply");
          }
        }
        return `${BASE_PATH}post.php?${p2.toString()}`;
      }
      case "search": {
        const p2 = new URLSearchParams();
        if (route.keyword) p2.set("keyword", route.keyword);
        if (route.digest) p2.set("digest", "1");
        if (route.schTime) p2.set("sch_time", route.schTime);
        const s2 = p2.toString();
        return `${BASE_PATH}searcher.php${s2 ? `?${s2}` : ""}`;
      }
      case "user": {
        const p2 = new URLSearchParams();
        if (route.uid) p2.set("uid", String(route.uid));
        if (route.username) p2.set("username", route.username);
        return `${BASE_PATH}u.php?${p2.toString()}`;
      }
      case "messages":
        return `${BASE_PATH}message.php`;
      case "login":
        return `${BASE_PATH}login.php`;
      case "settings":
        return `${BASE_PATH}index.php?xzqh=settings`;
    }
  }
  function urlsEqual(a2, b2) {
    try {
      const ua = new URL(a2, location.origin);
      const ub = new URL(b2, location.origin);
      return ua.pathname === ub.pathname && ua.search === ub.search && ua.hash === ub.hash;
    } catch {
      return a2 === b2;
    }
  }
  function navigate(route, replace = false) {
    if (route.name === "thread" && !route.tid) {
      route = { name: "home" };
    }
    if (route.name === "forum" && !route.fid) {
      route = { name: "home" };
    }
    const url = routeToUrl(route);
    try {
      const path = new URL(url, location.origin).pathname;
      if (isNativeOnlyPath(path)) {
        if (replace) location.replace(url);
        else location.assign(url);
        return;
      }
    } catch {
    }
    if (!replace && urlsEqual(url, location.href)) {
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }
    if (replace) history.replaceState({ xzqh: true }, "", url);
    else history.pushState({ xzqh: true }, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  function linkClickHandler(e2) {
    var _a;
    if (e2.defaultPrevented) return;
    const t2 = e2.target;
    const a2 = (_a = t2 == null ? void 0 : t2.closest) == null ? void 0 : _a.call(t2, "a");
    if (!a2 || a2.target === "_blank" || a2.hasAttribute("download")) return;
    const href = a2.getAttribute("href");
    if (!href || href.startsWith("javascript:") || href.startsWith("#")) return;
    let url;
    try {
      url = new URL(href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (!url.pathname.includes("/lt/")) return;
    if (/\.(gif|png|jpg|jpeg|zip|rar|pdf)$/i.test(url.pathname)) return;
    if (isNativeOnlyPath(url.pathname)) return;
    e2.preventDefault();
    const route = parseLocation(url.href);
    navigate(route);
  }
  function decodeForumText(buf) {
    try {
      return new TextDecoder("gbk").decode(buf);
    } catch {
      try {
        return new TextDecoder("gb18030").decode(buf);
      } catch {
        return new TextDecoder("utf-8").decode(buf);
      }
    }
  }
  function formDataFromRecord(data) {
    const fd = new FormData();
    for (const [k2, v2] of Object.entries(data)) {
      fd.append(k2, v2 ?? "");
    }
    return fd;
  }
  const BASE = (() => {
    try {
      const u2 = new URL(location.href);
      const m2 = u2.pathname.match(/^(.*?\/lt\/)/);
      if (m2) return `${u2.origin}${m2[1]}`;
    } catch {
    }
    return "http://xzqh.info/lt/";
  })();
  function forumUrl(path) {
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(path.replace(/^\//, ""), BASE).href;
  }
  async function fetchHtml(path, init = {}) {
    const url = forumUrl(path);
    const controller = init.signal ? null : new AbortController();
    const timer = controller ? window.setTimeout(() => controller.abort(), 2e4) : 0;
    try {
      const res = await fetch(url, {
        credentials: "include",
        ...init,
        signal: init.signal ?? (controller == null ? void 0 : controller.signal),
        headers: {
          Accept: "text/html,application/xhtml+xml,*/*",
          ...init.headers || {}
        }
      });
      if (!res.ok) {
        throw new Error(`服务器返回 HTTP ${res.status}`);
      }
      const finalUrl = res.url || url;
      if (!/login\.php/i.test(path) && /\/login\.php(\?|$)/i.test(finalUrl)) {
        throw new Error("登录已过期，请重新登录");
      }
      const buf = await res.arrayBuffer();
      const html = decodeForumText(buf);
      return { html, url: finalUrl, status: res.status };
    } catch (e2) {
      if (controller == null ? void 0 : controller.signal.aborted) {
        throw new Error("请求超时，请检查网络后重试");
      }
      throw e2;
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }
  async function postForm(path, data, _opts = {}) {
    if (_opts.multipart) {
      return postMultipart(path, formDataFromRecord(data));
    }
    return postViaGbkForm(forumUrl(path), data);
  }
  async function postMultipart(path, form) {
    const url = forumUrl(path);
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: form
    });
    const buf = await res.arrayBuffer();
    return { html: decodeForumText(buf), url: res.url || url, status: res.status };
  }
  function postViaGbkForm(action, data) {
    return new Promise((resolve, reject) => {
      const name = `xzqh_iframe_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const iframe = document.createElement("iframe");
      iframe.name = name;
      iframe.setAttribute("name", name);
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      const form = document.createElement("form");
      form.method = "POST";
      form.action = action;
      form.target = name;
      form.acceptCharset = "GBK";
      form.style.display = "none";
      form.enctype = "application/x-www-form-urlencoded";
      for (const [k2, v2] of Object.entries(data)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k2;
        input.value = v2 ?? "";
        form.appendChild(input);
      }
      document.body.appendChild(form);
      const cleanup = () => {
        form.remove();
        setTimeout(() => iframe.remove(), 0);
      };
      const timer = window.setTimeout(() => {
        cleanup();
        reject(new Error("提交超时"));
      }, 3e4);
      let settled = false;
      iframe.addEventListener("load", () => {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
          const href = ((_b = (_a = iframe.contentWindow) == null ? void 0 : _a.location) == null ? void 0 : _b.href) || "";
          if (!settled && (href === "about:blank" || href === "")) return;
        } catch {
        }
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        try {
          const idoc = iframe.contentDocument || ((_c = iframe.contentWindow) == null ? void 0 : _c.document);
          const html = ((_d = idoc == null ? void 0 : idoc.documentElement) == null ? void 0 : _d.innerHTML) || ((_e = idoc == null ? void 0 : idoc.body) == null ? void 0 : _e.innerHTML) || "";
          const url = ((_g = (_f = iframe.contentWindow) == null ? void 0 : _f.location) == null ? void 0 : _g.href) || action;
          cleanup();
          resolve({ html, url, status: 200 });
        } catch (e2) {
          cleanup();
          resolve({ html: "", url: action, status: 200 });
        }
      });
      form.submit();
    });
  }
  function parseDocument(html) {
    return new DOMParser().parseFromString(html, "text/html");
  }
  function absUrl(href) {
    if (!href) return "";
    try {
      return new URL(href, BASE).href;
    } catch {
      return href;
    }
  }
  function qs(params) {
    const sp = new URLSearchParams();
    for (const [k2, v2] of Object.entries(params)) {
      if (v2 === void 0 || v2 === null || v2 === "") continue;
      sp.set(k2, String(v2));
    }
    const s2 = sp.toString();
    return s2 ? `?${s2}` : "";
  }
  const BOARD_MENU_TOGGLE_EVENT = "xzqh:board-menu-toggle";
  const BOARD_MENU_STATE_EVENT = "xzqh:board-menu-state";
  function toggleBoardMenu() {
    window.dispatchEvent(new CustomEvent(BOARD_MENU_TOGGLE_EVENT));
  }
  function setBoardMenuAvailable(available, open = false) {
    window.dispatchEvent(
      new CustomEvent(BOARD_MENU_STATE_EVENT, { detail: { available, open } })
    );
  }
  const LOGO_SRC = forumUrl("images/wind/logo.png");
  const SEARCH_PLACEHOLDER = "搜索其实很简单！";
  function NavSearch(props) {
    const canLocal = !!props.fid && props.fid > 0;
    const [kind, setKind] = d(canLocal ? "local" : "thread");
    const [keyword, setKeyword] = d("");
    h(() => {
      setKind(canLocal ? "local" : "thread");
    }, [canLocal, props.fid]);
    const type = kind === "user" ? "user" : kind === "forum" ? "forum" : "thread";
    const useLocal = kind === "local" && canLocal;
    return /* @__PURE__ */ u$1(
      "form",
      {
        class: "xzqh-nav-search",
        action: "searcher.php",
        method: "post",
        "accept-charset": "GBK",
        onSubmit: (e2) => {
          const kw = keyword.trim();
          if (!kw || kw === SEARCH_PLACEHOLDER) {
            e2.preventDefault();
          }
        },
        children: [
          /* @__PURE__ */ u$1("input", { type: "hidden", name: "verify", value: props.verifyhash || "" }),
          /* @__PURE__ */ u$1("input", { type: "hidden", name: "step", value: "2" }),
          /* @__PURE__ */ u$1("input", { type: "hidden", name: "type", value: type }),
          useLocal && /* @__PURE__ */ u$1(S, { children: [
            /* @__PURE__ */ u$1("input", { type: "hidden", name: "method", value: "AND" }),
            /* @__PURE__ */ u$1("input", { type: "hidden", name: "sch_area", value: "1" }),
            /* @__PURE__ */ u$1("input", { type: "hidden", name: "sch_time", value: "all" }),
            /* @__PURE__ */ u$1("input", { type: "hidden", name: "fid", value: String(props.fid) })
          ] }),
          /* @__PURE__ */ u$1(
            "input",
            {
              class: "xzqh-nav-search-input",
              type: "text",
              name: "keyword",
              value: keyword,
              placeholder: SEARCH_PLACEHOLDER,
              autocomplete: "off",
              onInput: (e2) => setKeyword(e2.target.value)
            }
          ),
          /* @__PURE__ */ u$1(
            "select",
            {
              class: "xzqh-nav-search-type",
              "aria-label": "搜索类型",
              value: kind,
              onChange: (e2) => setKind(e2.target.value),
              children: [
                canLocal && /* @__PURE__ */ u$1("option", { value: "local", children: "本版" }),
                /* @__PURE__ */ u$1("option", { value: "thread", children: "帖子" }),
                /* @__PURE__ */ u$1("option", { value: "user", children: "用户" }),
                /* @__PURE__ */ u$1("option", { value: "forum", children: "版块" })
              ]
            }
          ),
          /* @__PURE__ */ u$1("button", { type: "submit", class: "xzqh-nav-search-btn", children: "搜索" })
        ]
      }
    );
  }
  function Layout(props) {
    const {
      user,
      children,
      onLogout,
      unread,
      showListStyle = true,
      settingsOpen = false,
      searchFid
    } = props;
    const [prefs, setPrefs] = d(() => loadPrefs());
    const [boardMenu, setBoardMenu] = d({ available: false, open: false });
    const topRef = A(null);
    const [narrow, setNarrow] = d(() => {
      try {
        return window.matchMedia(FONT_SCALE_NARROW_MQ).matches;
      } catch {
        return false;
      }
    });
    const syncTopHeight = () => {
      var _a;
      const h2 = ((_a = topRef.current) == null ? void 0 : _a.getBoundingClientRect().height) || 0;
      const px = Math.ceil(h2);
      document.documentElement.style.setProperty("--xzqh-top-h", `${px || 112}px`);
    };
    h(() => {
      const sync = (e2) => {
        const detail = e2 == null ? void 0 : e2.detail;
        const next = detail || loadPrefs();
        setPrefs(next);
        applyFontSizeToDocument(next.fontScale);
        requestAnimationFrame(syncTopHeight);
      };
      applyFontSizeToDocument(loadPrefs().fontScale);
      window.addEventListener(PREFS_EVENT, sync);
      window.addEventListener("storage", sync);
      return () => {
        window.removeEventListener(PREFS_EVENT, sync);
        window.removeEventListener("storage", sync);
      };
    }, []);
    h(() => {
      const el = topRef.current;
      syncTopHeight();
      if (!el) return;
      const ro = new ResizeObserver(() => syncTopHeight());
      ro.observe(el);
      window.addEventListener("resize", syncTopHeight);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", syncTopHeight);
      };
    }, [prefs.fontScale, narrow]);
    h(() => {
      const onState = (e2) => {
        const detail = e2.detail;
        if (!detail) return;
        setBoardMenu({ available: !!detail.available, open: !!detail.open });
      };
      window.addEventListener(BOARD_MENU_STATE_EVENT, onState);
      return () => window.removeEventListener(BOARD_MENU_STATE_EVENT, onState);
    }, []);
    h(() => {
      const mq = window.matchMedia(FONT_SCALE_NARROW_MQ);
      const onChange = () => {
        setNarrow(mq.matches);
        applyFontSizeToDocument(loadPrefs().fontScale);
      };
      onChange();
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }, []);
    const effectiveList = !showListStyle ? "list" : narrow ? "card" : prefs.listStyle;
    return /* @__PURE__ */ u$1(
      "div",
      {
        class: "xzqh-app",
        "data-theme": prefs.theme,
        "data-list": effectiveList,
        "data-font-scale": String(prefs.fontScale),
        "data-narrow": narrow ? "1" : "0",
        children: [
          /* @__PURE__ */ u$1("header", { class: "xzqh-top", ref: topRef, children: [
            /* @__PURE__ */ u$1("div", { class: "xzqh-top-brandbar", children: /* @__PURE__ */ u$1("div", { class: "xzqh-top-inner", children: /* @__PURE__ */ u$1(
              "a",
              {
                class: "xzqh-brand",
                href: "index.php",
                onClick: (e2) => {
                  e2.preventDefault();
                  navigate({ name: "home" });
                },
                children: /* @__PURE__ */ u$1("img", { class: "xzqh-brand-logo", src: LOGO_SRC, alt: "方舆论坛" })
              }
            ) }) }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-top-navbar", children: /* @__PURE__ */ u$1("div", { class: "xzqh-top-inner xzqh-top-navrow", children: [
              /* @__PURE__ */ u$1("nav", { class: "xzqh-nav", children: [
                /* @__PURE__ */ u$1(NavSearch, { fid: searchFid, verifyhash: user == null ? void 0 : user.verifyhash }),
                (user == null ? void 0 : user.loggedIn) ? /* @__PURE__ */ u$1(S, { children: [
                  /* @__PURE__ */ u$1("a", { href: "message.php", children: [
                    "消息",
                    (unread ?? 0) > 0 ? `(${unread})` : ""
                  ] }),
                  /* @__PURE__ */ u$1("a", { href: user.uid ? `u.php?uid=${user.uid}` : "u.php", children: user.username }),
                  /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn", onClick: onLogout, children: "退出" })
                ] }) : /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", onClick: () => navigate({ name: "login" }), children: "登录" }),
                /* @__PURE__ */ u$1(
                  "button",
                  {
                    type: "button",
                    class: `xzqh-btn${settingsOpen ? " primary" : ""}`,
                    "aria-pressed": settingsOpen,
                    onClick: () => {
                      var _a;
                      if (settingsOpen) {
                        if (((_a = history.state) == null ? void 0 : _a.xzqh) && history.length > 1) history.back();
                        else navigate({ name: "home" }, true);
                        return;
                      }
                      navigate({ name: "settings" });
                    },
                    children: "设置"
                  }
                )
              ] }),
              boardMenu.available && /* @__PURE__ */ u$1(
                "button",
                {
                  type: "button",
                  class: `xzqh-board-menu-btn${boardMenu.open ? " open" : ""}`,
                  "aria-expanded": boardMenu.open,
                  "aria-label": "版块菜单",
                  title: "版块",
                  onClick: () => toggleBoardMenu(),
                  children: [
                    /* @__PURE__ */ u$1("span", { class: "xzqh-burger", "aria-hidden": "true", children: [
                      /* @__PURE__ */ u$1("i", {}),
                      /* @__PURE__ */ u$1("i", {}),
                      /* @__PURE__ */ u$1("i", {})
                    ] }),
                    "版块"
                  ]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ u$1("main", { class: "xzqh-main", children })
        ]
      }
    );
  }
  function Loading() {
    return /* @__PURE__ */ u$1("div", { class: "xzqh-loading", children: "加载中…" });
  }
  function Alert(props) {
    const cls = props.type === "error" ? "error" : props.type === "ok" ? "ok" : "";
    return /* @__PURE__ */ u$1("div", { class: `xzqh-alert ${cls}`, children: props.children });
  }
  function Pager(props) {
    const { page, totalPages, onChange } = props;
    if (totalPages <= 1) return null;
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i2 = start; i2 <= end; i2++) pages.push(i2);
    return /* @__PURE__ */ u$1("div", { class: "xzqh-pager", children: [
      /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", disabled: page <= 1, onClick: () => onChange(page - 1), children: "上一页" }),
      start > 1 && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: () => onChange(1), children: "1" }),
      pages.map((p2) => /* @__PURE__ */ u$1(
        "button",
        {
          type: "button",
          class: `xzqh-btn ${p2 === page ? "primary" : "ghost"}`,
          onClick: () => onChange(p2),
          children: p2
        },
        p2
      )),
      end < totalPages && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: () => onChange(totalPages), children: totalPages }),
      /* @__PURE__ */ u$1(
        "button",
        {
          type: "button",
          class: "xzqh-btn ghost",
          disabled: page >= totalPages,
          onClick: () => onChange(page + 1),
          children: "下一页"
        }
      )
    ] });
  }
  function splitTitleTypes(raw) {
    let rest = (raw || "").replace(/\s+/g, " ").trim();
    const typeTags = [];
    while (rest) {
      const m2 = rest.match(/^\s*[\[【]([^\]】]+)[\]】]\s*/);
      if (!m2) break;
      const name = m2[1].trim();
      if (name && !typeTags.some((t2) => t2.name === name)) {
        typeTags.push({ name });
      }
      rest = rest.slice(m2[0].length).trim();
    }
    return { typeTags, title: rest || raw.trim() };
  }
  function stripForumTitlePrefix(title, forumName) {
    const name = (forumName || "").trim();
    let rest = (title || "").replace(/\s+/g, " ").trim();
    if (!name || !rest) return rest;
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    rest = rest.replace(new RegExp(`^${esc}\\s*[-–—|]\\s*`), "").trim();
    if (rest === name) return "";
    return rest || title.trim();
  }
  function TitleWithTypes(props) {
    const tags = props.typeTags && props.typeTags.length ? props.typeTags : splitTitleTypes(props.title).typeTags;
    const fromSplit = props.typeTags && props.typeTags.length ? props.title : splitTitleTypes(props.title).title || props.title;
    const plain = stripForumTitlePrefix(fromSplit, props.forumName);
    if (props.textOnly) {
      return /* @__PURE__ */ u$1("span", { class: "xzqh-title-text", children: plain });
    }
    const Tag = props.as === "h1" ? "h1" : "span";
    return /* @__PURE__ */ u$1(Tag, { class: props.className || (props.as === "h1" ? "xzqh-h1" : void 0), children: [
      /* @__PURE__ */ u$1(ForumTag, { name: props.forumName, fid: props.fid }),
      /* @__PURE__ */ u$1(TypeTags, { tags, fid: props.fid }),
      /* @__PURE__ */ u$1("span", { class: "xzqh-title-text", children: plain })
    ] });
  }
  function ForumTag(props) {
    var _a;
    const name = (_a = props.name) == null ? void 0 : _a.trim();
    if (!name || !props.fid) return null;
    return /* @__PURE__ */ u$1(
      "button",
      {
        type: "button",
        class: "xzqh-type-tag xzqh-forum-tag",
        title: `版块：${name}`,
        onClick: (e2) => {
          e2.preventDefault();
          e2.stopPropagation();
          navigate({ name: "forum", fid: props.fid, page: 1 });
        },
        children: name
      }
    );
  }
  function TypeTags(props) {
    if (!props.tags.length) return null;
    return /* @__PURE__ */ u$1(S, { children: props.tags.map((t2) => /* @__PURE__ */ u$1(
      "button",
      {
        type: "button",
        class: "xzqh-type-tag",
        title: `分类：${t2.name}`,
        onClick: (e2) => {
          var _a, _b, _c, _d;
          e2.preventDefault();
          e2.stopPropagation();
          const fid = props.fid || Number(((_b = (_a = t2.href) == null ? void 0 : _a.match(/fid=(\d+)/)) == null ? void 0 : _b[1]) || 0);
          const typeId = t2.typeId || ((_d = (_c = t2.href) == null ? void 0 : _c.match(/[?&]type=(\d+)/)) == null ? void 0 : _d[1]);
          if (fid && typeId) {
            navigate({ name: "forum", fid, page: 1, type: typeId });
          }
        },
        children: t2.name
      },
      `${t2.name}-${t2.typeId || ""}`
    )) });
  }
  function resetMasonry(container) {
    container.classList.remove("xzqh-masonry-on");
    container.style.removeProperty("height");
    container.style.removeProperty("position");
    for (const child of Array.from(container.children)) {
      child.style.removeProperty("position");
      child.style.removeProperty("left");
      child.style.removeProperty("top");
      child.style.removeProperty("width");
      child.style.removeProperty("min-height");
      const sub = child.querySelector(".xzqh-subject-line");
      sub == null ? void 0 : sub.style.removeProperty("min-height");
    }
  }
  function layoutMasonry(container, opts = {}) {
    const gap = opts.gap ?? 12;
    const minColWidth = opts.minColWidth ?? 168;
    const maxCols = opts.maxCols ?? 8;
    const items = Array.from(container.children);
    if (!items.length) {
      resetMasonry(container);
      return;
    }
    const width = container.clientWidth;
    if (width <= 0) return;
    const cols = Math.min(
      maxCols,
      Math.max(1, Math.floor((width + gap) / (minColWidth + gap)))
    );
    const colW = (width - gap * (cols - 1)) / cols;
    const colH = new Array(cols).fill(0);
    container.classList.add("xzqh-masonry-on");
    container.style.position = "relative";
    for (const item of items) {
      item.style.position = "absolute";
      item.style.width = `${colW}px`;
      item.style.height = "auto";
      item.style.removeProperty("min-height");
      item.style.left = "0";
      item.style.top = "0";
      const sub = item.querySelector(".xzqh-subject-line");
      if (sub) {
        const sw = sub.clientWidth || Math.max(0, colW - 20);
        sub.style.minHeight = `${sw}px`;
      }
    }
    void container.offsetHeight;
    const place = () => {
      colH.fill(0);
      for (const item of items) {
        let col = 0;
        for (let i2 = 1; i2 < cols; i2++) {
          if (colH[i2] < colH[col]) col = i2;
        }
        const h2 = Math.max(item.offsetHeight, item.scrollHeight);
        item.style.left = `${col * (colW + gap)}px`;
        item.style.top = `${colH[col]}px`;
        colH[col] += h2 + gap;
      }
      const total = Math.max(0, ...colH) - (items.length ? gap : 0);
      container.style.height = `${Math.max(0, total)}px`;
    };
    place();
    void container.offsetHeight;
    place();
  }
  function shouldUseMasonry(listEl) {
    if (listEl.classList.contains("xzqh-home-feed-list")) return false;
    const app = listEl.closest(".xzqh-app");
    return (app == null ? void 0 : app.getAttribute("data-list")) === "card";
  }
  function MasonryList(props) {
    const ref = A(null);
    h(() => {
      const el = ref.current;
      if (!el) return;
      let raf = 0;
      const schedule = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          if (!el.isConnected) return;
          if (shouldUseMasonry(el)) layoutMasonry(el);
          else resetMasonry(el);
        });
      };
      schedule();
      const ro = new ResizeObserver(schedule);
      ro.observe(el);
      const mo = new MutationObserver(schedule);
      mo.observe(el, { childList: true, subtree: true, characterData: true });
      const onPrefs = () => schedule();
      window.addEventListener(PREFS_EVENT, onPrefs);
      window.addEventListener("resize", schedule);
      el.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", schedule, { once: true });
      });
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        mo.disconnect();
        window.removeEventListener(PREFS_EVENT, onPrefs);
        window.removeEventListener("resize", schedule);
        resetMasonry(el);
      };
    }, [props.layoutKey, props.children]);
    return /* @__PURE__ */ u$1(
      "div",
      {
        ref,
        class: `xzqh-list${props.className ? ` ${props.className}` : ""}`,
        style: props.style,
        children: props.children
      }
    );
  }
  const IMAGE_EXTS = /* @__PURE__ */ new Set(["jpg", "jpeg", "gif", "png", "bmp", "webp"]);
  function isImageFile(file) {
    var _a;
    if (file.type.startsWith("image/")) return true;
    const ext = ((_a = file.name.split(".").pop()) == null ? void 0 : _a.toLowerCase()) || "";
    return IMAGE_EXTS.has(ext);
  }
  async function fetchMutiPostData(fid) {
    var _a, _b;
    const path = `job.php` + qs({
      action: "mutiupload",
      random: Math.floor(Math.random() * 100)
    });
    const { html } = await fetchHtml(path);
    const raw = html.trim();
    const data = {};
    try {
      const parsed = JSON.parse(raw);
      for (const [k2, v2] of Object.entries(parsed)) {
        if (v2 != null && typeof v2 !== "object") data[k2] = String(v2);
      }
    } catch {
      const cdata = (_b = (_a = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim();
      if (cdata) {
        try {
          const parsed = JSON.parse(cdata);
          for (const [k2, v2] of Object.entries(parsed)) {
            if (v2 != null && typeof v2 !== "object") data[k2] = String(v2);
          }
        } catch {
        }
      }
    }
    if (fid && fid > 0) data.fid = String(fid);
    if (!data.verify) {
      throw new Error("无法获取上传凭证，请刷新后重试");
    }
    return data;
  }
  function parseMutiResponse(html) {
    var _a, _b, _c, _d;
    const raw = html.trim();
    if (!raw) return { ok: false, message: "上传无响应" };
    const tryJson = (s2) => {
      try {
        const data = JSON.parse(s2);
        if (data.aid || data.path || data.url) {
          const aid2 = Number(data.aid) || void 0;
          const path2 = data.path || data.url;
          return {
            ok: true,
            message: "上传成功",
            aid: aid2,
            path: path2 || void 0,
            url: path2 ? absUrl(path2) : void 0
          };
        }
      } catch {
      }
      return null;
    };
    const direct = tryJson(raw);
    if (direct) return direct;
    const cdata = (_b = (_a = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim();
    if (cdata) {
      const fromCdata = tryJson(cdata);
      if (fromCdata) return fromCdata;
      if (/非法|错误|失败|权限|太大|toobig|exterror/.test(cdata)) {
        return { ok: false, message: cdata.slice(0, 160) };
      }
      return { ok: false, message: cdata.slice(0, 160) || "上传失败" };
    }
    const aid = Number(((_c = raw.match(/["']?aid["']?\s*[:=]\s*["']?(\d+)/i)) == null ? void 0 : _c[1]) || 0) || void 0;
    const path = (_d = raw.match(/["']?path["']?\s*[:=]\s*["']([^"']+)/i)) == null ? void 0 : _d[1];
    if (aid || path) {
      return {
        ok: true,
        message: "上传成功",
        aid,
        path,
        url: path ? absUrl(path) : void 0
      };
    }
    const plain = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (/非法|错误|失败|权限|太大|toobig|exterror|upload_/.test(plain)) {
      return { ok: false, message: plain.slice(0, 160) || "上传失败" };
    }
    return { ok: false, message: plain.slice(0, 160) || "上传失败" };
  }
  function xhrUpload(opts) {
    const timeoutMs = opts.timeoutMs ?? 9e4;
    return new Promise((resolve, reject) => {
      var _a;
      const xhr = new XMLHttpRequest();
      xhr.open("POST", opts.url, true);
      xhr.withCredentials = true;
      xhr.timeout = timeoutMs;
      xhr.responseType = "arraybuffer";
      xhr.upload.onprogress = (ev) => {
        if (!ev.lengthComputable || !opts.onProgress) return;
        const pct = Math.max(1, Math.min(99, Math.round(ev.loaded / ev.total * 100)));
        opts.onProgress(pct);
      };
      xhr.onload = () => {
        const buf = xhr.response;
        let html = "";
        try {
          html = new TextDecoder("gbk").decode(buf);
        } catch {
          html = new TextDecoder("utf-8").decode(buf);
        }
        resolve({ html, status: xhr.status });
      };
      xhr.onerror = () => reject(new Error("网络错误，上传中断"));
      xhr.ontimeout = () => reject(new Error("上传超时，请缩小图片后重试"));
      xhr.onabort = () => reject(new Error("上传已取消"));
      (_a = opts.onProgress) == null ? void 0 : _a.call(opts, 1);
      xhr.send(opts.form);
    });
  }
  async function uploadMutiFile(opts) {
    var _a, _b, _c;
    (_a = opts.onProgress) == null ? void 0 : _a.call(opts, 2);
    let postData;
    try {
      postData = await fetchMutiPostData(opts.fid);
    } catch (e2) {
      return { ok: false, message: e2 instanceof Error ? e2.message : "获取上传凭证失败" };
    }
    (_b = opts.onProgress) == null ? void 0 : _b.call(opts, 5);
    const url = forumUrl("job.php") + qs({
      action: "mutiupload",
      random: Math.floor(Math.random() * 100)
    });
    const fd = new FormData();
    for (const [k2, v2] of Object.entries(postData)) fd.append(k2, v2);
    fd.append("Filedata", opts.file, opts.file.name);
    try {
      const { html, status } = await xhrUpload({
        url,
        form: fd,
        onProgress: opts.onProgress
      });
      (_c = opts.onProgress) == null ? void 0 : _c.call(opts, 100);
      if (status >= 400) {
        return { ok: false, message: `上传失败 (HTTP ${status})` };
      }
      return parseMutiResponse(html);
    } catch (e2) {
      return { ok: false, message: e2 instanceof Error ? e2.message : "上传失败" };
    }
  }
  async function uploadEditorImage(opts) {
    if (!isImageFile(opts.file)) {
      return { ok: false, message: "仅支持 jpg / gif / png 等图片文件" };
    }
    const maxBytes = 20 * 1024 * 1024;
    if (opts.file.size > maxBytes) {
      return { ok: false, message: "图片过大（超过约 20MB）" };
    }
    return uploadMutiFile(opts);
  }
  function flashAttFields(items) {
    const out = {};
    for (const it of items) {
      out[`flashatt[${it.aid}][desc]`] = it.desc || "";
    }
    return out;
  }
  function safeFontFamily(name) {
    return String(name || "").replace(/["';<>\\{}]/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
  }
  function enhanceContentHtml(html) {
    let s2 = html;
    s2 = s2.replace(/<script[\s\S]*?<\/script>/gi, "");
    s2 = s2.replace(/\b(src|href)=["'](?!https?:|data:|javascript:)([^"']+)["']/gi, (_m, attr, url) => {
      return `${attr}="${absUrl(url)}"`;
    });
    s2 = s2.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, (_m, name, body) => {
      const fam = safeFontFamily(name);
      return fam ? `<span class="xzqh-font" style="font-family:${fam}">${body}</span>` : body;
    });
    s2 = s2.replace(/<font\b([^>]*)>/gi, (_m, rawAttrs) => {
      var _a, _b;
      const attrs = String(rawAttrs || "");
      const face = ((_a = attrs.match(/\bface\s*=\s*(["'])([^"']*)\1/i)) == null ? void 0 : _a[2]) ?? ((_b = attrs.match(/\bface\s*=\s*([^\s>]+)/i)) == null ? void 0 : _b[1]);
      const fam = safeFontFamily(face || "");
      if (!fam) return `<font${attrs}>`;
      if (/\bfont-family\s*:/i.test(attrs)) return `<font${attrs}>`;
      if (/\bstyle\s*=\s*(["'])/i.test(attrs)) {
        return `<font${attrs.replace(/\bstyle\s*=\s*(["'])/i, (_s, q2) => `style=${q2}font-family:${fam};`)}>`;
      }
      return `<font${attrs} style="font-family:${fam}">`;
    });
    return s2;
  }
  function wrapWithElementFont(el, innerHtml) {
    var _a;
    const style = el.getAttribute("style") || "";
    const fromStyle = (_a = style.match(/font-family\s*:\s*([^;]+)/i)) == null ? void 0 : _a[1];
    const fromFace = el.getAttribute("face") || "";
    const fam = safeFontFamily(fromStyle || fromFace);
    if (!fam) return innerHtml;
    return `<span class="xzqh-font" style="font-family:${fam}">${innerHtml}</span>`;
  }
  const SIZE_PX = [10, 12, 14, 16, 18, 24, 36];
  function windcodeToHtml(raw, opts = {}) {
    let s2 = escapeHtml(raw);
    s2 = s2.replace(/\[table(?:=([^\]]+))?\]([\s\S]*?)\[\/table\]/gi, (_m, attrs, body) => {
      var _a;
      const width = (_a = String(attrs || "").split(",")[0]) == null ? void 0 : _a.trim();
      const style = width && /^\d+$/.test(width) ? ` style="width:${width}px"` : "";
      const rows = String(body).replace(/\[tr\]([\s\S]*?)\[\/tr\]/gi, (_m2, cells) => {
        const tds = String(cells).replace(/\[td(?:=([^\]]+))?\]([\s\S]*?)\[\/td\]/gi, (_m3, _a2, c2) => {
          return `<td>${c2}</td>`;
        });
        return `<tr>${tds}</tr>`;
      });
      return `<table class="wc-table"${style}>${rows}</table>`;
    });
    s2 = s2.replace(/\[list(?:=([^\]]+))?\]([\s\S]*?)\[\/list\]/gi, (_m, type, body) => {
      const tag = type ? "ol" : "ul";
      const items = String(body).replace(/\[\*\]|\[li\]/gi, "\n§LI§").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
        const t2 = line.replace(/^§LI§/, "").replace(/\[\/li\]/gi, "").trim();
        return t2 ? `<li>${t2}</li>` : "";
      }).join("");
      return `<${tag} class="wc-list">${items}</${tag}>`;
    });
    s2 = s2.replace(/\r\n|\r|\n/g, "<br/>");
    s2 = s2.replace(/\[br\]/gi, "<br/>");
    s2 = s2.replace(/\[hr\]/gi, '<hr class="wc-hr"/>');
    s2 = s2.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, "<strong>$1</strong>");
    s2 = s2.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, "<em>$1</em>");
    s2 = s2.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, "<u>$1</u>");
    s2 = s2.replace(/\[strike\]([\s\S]*?)\[\/strike\]/gi, "<s>$1</s>");
    s2 = s2.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, "<s>$1</s>");
    s2 = s2.replace(/\[color=([#\w]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>');
    s2 = s2.replace(
      /\[backcolor=([#\w]+)\]([\s\S]*?)\[\/backcolor\]/gi,
      '<span style="background-color:$1">$2</span>'
    );
    s2 = s2.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, (_m, name, body) => {
      const fam = safeFontFamily(String(name));
      return fam ? `<span class="xzqh-font" style="font-family:${fam}">${body}</span>` : body;
    });
    s2 = s2.replace(/\[size=(\d+)\]([\s\S]*?)\[\/size\]/gi, (_m, n2, body) => {
      const i2 = Math.min(7, Math.max(1, Number(n2))) - 1;
      return `<span style="font-size:${SIZE_PX[i2]}px">${body}</span>`;
    });
    s2 = s2.replace(
      /\[align=(left|center|right)\]([\s\S]*?)\[\/align\]/gi,
      '<div style="text-align:$1">$2</div>'
    );
    s2 = s2.replace(
      /\[paragraph\]([\s\S]*?)\[\/paragraph\]/gi,
      '<p class="wc-paragraph">$1</p>'
    );
    s2 = s2.replace(
      /\[url\](https?:\/\/[^\[]+)\[\/url\]/gi,
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
    );
    s2 = s2.replace(
      /\[url=(https?:\/\/[^\]]+)\]([\s\S]*?)\[\/url\]/gi,
      '<a href="$1" target="_blank" rel="noreferrer">$2</a>'
    );
    s2 = s2.replace(/\[img\]([^\[]+)\[\/img\]/gi, (_m, url) => {
      const src = absUrl(String(url).trim());
      return src ? `<img src="${src}" alt="" loading="lazy" />` : "";
    });
    s2 = s2.replace(/\[attachment=(\d+)\]/gi, (_m, aidStr) => {
      var _a;
      const aid = Number(aidStr);
      const path = (_a = opts.attachments) == null ? void 0 : _a[aid];
      if (path) {
        return `<img src="${absUrl(path)}" alt="附件${aid}" loading="lazy" class="wc-attach-img" />`;
      }
      return `<span class="wc-attach" data-aid="${aid}">[附件 #${aid}]</span>`;
    });
    s2 = s2.replace(
      /\[quote\]([\s\S]*?)\[\/quote\]/gi,
      '<blockquote class="wc-quote">$1</blockquote>'
    );
    s2 = s2.replace(
      /\[quote=([^\]]+)\]([\s\S]*?)\[\/quote\]/gi,
      '<blockquote class="wc-quote"><cite>$1</cite>$2</blockquote>'
    );
    s2 = s2.replace(
      /\[blockquote\]([\s\S]*?)\[\/blockquote\]/gi,
      '<blockquote class="wc-quote">$1</blockquote>'
    );
    s2 = s2.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<pre class="wc-code"><code>$1</code></pre>');
    s2 = s2.replace(
      /\[sell(?:=([^\]]+))?\]([\s\S]*?)\[\/sell\]/gi,
      (_m, price, body) => `<div class="wc-sell"><span class="wc-sell-label">出售内容${price ? `（${escapeHtml(String(price))}）` : ""}</span><div>${body}</div></div>`
    );
    s2 = s2.replace(
      /\[(?:hide|post)(?:=([^\]]+))?\]([\s\S]*?)\[\/(?:hide|post)\]/gi,
      (_m, cond, body) => `<div class="wc-hide"><span class="wc-hide-label">隐藏内容${cond ? `（${escapeHtml(String(cond))}）` : ""}</span><div>${body}</div></div>`
    );
    s2 = s2.replace(/\[s:(\d+)\]/gi, (_m, n2) => {
      return `<img class="wc-smile" src="${absUrl(`images/post/smile/default/${n2}.gif`)}" alt="[s:${n2}]" />`;
    });
    return s2;
  }
  function escapeHtml(s2) {
    return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function wrapQuote(author, content) {
    const plain = content.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").trim().slice(0, 800);
    return `[quote]${author ? `${author}：` : ""}
${plain}
[/quote]
`;
  }
  function stripWindcodeStyles(raw) {
    return raw.replace(/\[\/?(?:b|i|u|strike|s|paragraph)\]/gi, "").replace(/\[\/?(?:color|backcolor|font|size|align)=[^\]]*\]/gi, "").replace(/\[\/(?:color|backcolor|font|size|align)\]/gi, "");
  }
  function countWindcodeChars(raw) {
    const plain = raw.replace(/\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
    let bytes = 0;
    for (const ch of plain) {
      bytes += ch.charCodeAt(0) > 127 ? 2 : 1;
    }
    return { chars: plain.length, bytesApprox: bytes };
  }
  const FONTS = [
    "宋体",
    "新宋体",
    "楷体_GB2312",
    "黑体",
    "微软雅黑",
    "Arial",
    "Courier New",
    "Georgia",
    "Tahoma",
    "Times New Roman",
    "Verdana",
    "impact"
  ];
  const COLORS = [
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#cccccc",
    "#ffffff",
    "#ff0000",
    "#ff8800",
    "#ffcc00",
    "#008800",
    "#00aaaa",
    "#1b72af",
    "#0000ff",
    "#8800ff",
    "#ff00aa",
    "#a52a2a"
  ];
  const SMILE_COUNT = 14;
  function WindEditor(props) {
    const taRef = A(null);
    const localFileRef = A(null);
    const [panel, setPanel] = d(null);
    const [preview, setPreview] = d(false);
    const [simple, setSimple] = d(!!props.compact);
    const [fullscreen, setFullscreen] = d(false);
    const [msg, setMsg] = d("");
    const [linkUrl, setLinkUrl] = d("https://");
    const [linkText, setLinkText] = d("");
    const [imgUrl, setImgUrl] = d("https://");
    const [imgTab, setImgTab] = d(
      () => props.uploadEnabled === false ? "network" : "local"
    );
    const [imgBusy, setImgBusy] = d(false);
    const [imgProgress, setImgProgress] = d("");
    const [tableRows, setTableRows] = d(2);
    const [tableCols, setTableCols] = d(2);
    const [sellPrice, setSellPrice] = d("1");
    const history2 = A([]);
    const histIdx = A(-1);
    const applyingHistory = A(false);
    const sel = A({ start: 0, end: 0 });
    const flashAtts = props.flashAtts || [];
    const uploadEnabled = props.uploadEnabled !== false;
    const counts = T(() => countWindcodeChars(props.value), [props.value]);
    const attachPreviewMap = T(() => {
      const m2 = {};
      for (const a2 of flashAtts) {
        if (a2.path) m2[a2.aid] = a2.path;
      }
      return m2;
    }, [flashAtts]);
    const addFlashAtt = (item) => {
      var _a;
      const next = [...flashAtts.filter((x2) => x2.aid !== item.aid), item];
      (_a = props.onFlashAttsChange) == null ? void 0 : _a.call(props, next);
    };
    h(() => {
      setSimple(!!props.compact);
    }, [props.compact]);
    h(() => {
      if (props.focusToken == null || props.focusToken <= 0) return;
      const el = taRef.current;
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      requestAnimationFrame(() => {
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len);
        sel.current = { start: len, end: len };
      });
    }, [props.focusToken]);
    const handleLocalImage = async (file) => {
      if (!uploadEnabled) {
        setMsg("当前用户组/版块未开启本地图片上传");
        return;
      }
      setImgBusy(true);
      setImgProgress("获取上传凭证…");
      const r2 = await uploadEditorImage({
        file,
        fid: props.fid,
        onProgress: (p2) => setImgProgress(p2 < 5 ? "准备上传…" : `上传 ${p2}%`)
      });
      setImgBusy(false);
      setImgProgress("");
      if (!r2.ok || !r2.aid) {
        setMsg(r2.message || "图片上传失败");
        return;
      }
      const path = r2.path || r2.url || "";
      addFlashAtt({
        aid: r2.aid,
        name: file.name,
        path,
        kind: "image"
      });
      insert(`[attachment=${r2.aid}]`);
      setMsg(`已上传并插入图片：${file.name}`);
    };
    const pushHistory = (value, start, end) => {
      if (applyingHistory.current) return;
      const cur = history2.current[histIdx.current];
      if (cur && cur.value === value) return;
      history2.current = history2.current.slice(0, histIdx.current + 1);
      history2.current.push({ value, start, end });
      if (history2.current.length > 80) history2.current.shift();
      histIdx.current = history2.current.length - 1;
    };
    h(() => {
      if (!props.value && histIdx.current < 0) {
        pushHistory("", 0, 0);
      }
    }, []);
    h(() => {
      if (!props.draftKey) return;
      const id = window.setInterval(() => {
        try {
          if (props.value.trim()) {
            localStorage.setItem(
              props.draftKey,
              JSON.stringify({ content: props.value, savedAt: Date.now() })
            );
          }
        } catch {
        }
      }, 8e3);
      return () => clearInterval(id);
    }, [props.draftKey, props.value]);
    const rememberSel = () => {
      const el = taRef.current;
      if (!el) return;
      sel.current = { start: el.selectionStart, end: el.selectionEnd };
    };
    const focusRestore = (start, end) => {
      requestAnimationFrame(() => {
        const el = taRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(start, end);
        sel.current = { start, end };
      });
    };
    const setValue = (next, cursorStart, cursorEnd = cursorStart) => {
      pushHistory(next, cursorStart, cursorEnd);
      props.onChange(next);
      focusRestore(cursorStart, cursorEnd);
    };
    const wrap = (before, after, placeholder = "") => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      const selected = value.slice(start, end);
      const inner = selected || placeholder;
      const next = value.slice(0, start) + before + inner + after + value.slice(end);
      const c0 = start + before.length;
      const c1 = c0 + inner.length;
      setValue(next, selected ? c0 : c0, selected ? c1 : c0 + inner.length);
      if (!selected && placeholder) focusRestore(c0, c0 + placeholder.length);
    };
    const insert = (text) => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      const next = value.slice(0, start) + text + value.slice(end);
      const pos = start + text.length;
      setValue(next, pos);
    };
    const undo = () => {
      if (histIdx.current <= 0) return;
      histIdx.current -= 1;
      const st = history2.current[histIdx.current];
      applyingHistory.current = true;
      props.onChange(st.value);
      focusRestore(st.start, st.end);
      applyingHistory.current = false;
    };
    const redo = () => {
      if (histIdx.current >= history2.current.length - 1) return;
      histIdx.current += 1;
      const st = history2.current[histIdx.current];
      applyingHistory.current = true;
      props.onChange(st.value);
      focusRestore(st.start, st.end);
      applyingHistory.current = false;
    };
    const unlink = () => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      const selected = value.slice(start, end);
      const plain = selected.replace(/\[url(?:=[^\]]+)?\]([\s\S]*?)\[\/url\]/gi, "$1").replace(/\[url\]([\s\S]*?)\[\/url\]/gi, "$1");
      const next = value.slice(0, start) + plain + value.slice(end);
      setValue(next, start, start + plain.length);
    };
    const outdent = () => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      const selected = value.slice(start, end);
      const target = selected || value;
      const plain = target.replace(/\[blockquote\]([\s\S]*?)\[\/blockquote\]/gi, "$1").replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, "$1");
      if (!selected) {
        setValue(plain, 0, 0);
        return;
      }
      const next = value.slice(0, start) + plain + value.slice(end);
      setValue(next, start, start + plain.length);
    };
    const clearStyle = () => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      if (start === end) {
        setValue(stripWindcodeStyles(value), 0, 0);
        return;
      }
      const selected = value.slice(start, end);
      const plain = stripWindcodeStyles(selected);
      const next = value.slice(0, start) + plain + value.slice(end);
      setValue(next, start, start + plain.length);
    };
    const insertList = (ordered) => {
      const el = taRef.current;
      const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
      const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
      const value = props.value;
      const selected = value.slice(start, end) || "列表项";
      const items = selected.split(/\n+/).map((l2) => l2.trim()).filter(Boolean).map((l2) => `[li]${l2}[/li]`).join("\n");
      const block = `[list${ordered ? "=1" : ""}]
${items}
[/list]`;
      const next = value.slice(0, start) + block + value.slice(end);
      setValue(next, start + block.length);
    };
    const insertTable = () => {
      const rows = Math.min(10, Math.max(1, tableRows));
      const cols = Math.min(10, Math.max(1, tableCols));
      const lines = ["[table]"];
      for (let r2 = 0; r2 < rows; r2++) {
        lines.push("[tr]");
        for (let c2 = 0; c2 < cols; c2++) lines.push(`[td]内容${r2 + 1}-${c2 + 1}[/td]`);
        lines.push("[/tr]");
      }
      lines.push("[/table]");
      insert(lines.join("\n"));
      setPanel(null);
    };
    const restoreDraft = () => {
      if (!props.draftKey) {
        setMsg("当前页面未启用草稿");
        return;
      }
      try {
        const raw = localStorage.getItem(props.draftKey);
        if (!raw) {
          setMsg("没有可恢复的草稿");
          return;
        }
        const data = JSON.parse(raw);
        if (!data.content) {
          setMsg("草稿为空");
          return;
        }
        setValue(data.content, data.content.length);
        setMsg("已恢复本地草稿");
      } catch {
        setMsg("草稿读取失败");
      }
    };
    const saveDraft = () => {
      if (!props.draftKey) {
        setMsg("当前页面未启用草稿");
        return;
      }
      try {
        localStorage.setItem(
          props.draftKey,
          JSON.stringify({ content: props.value, savedAt: Date.now() })
        );
        setMsg("已存入本地草稿箱");
      } catch {
        setMsg("草稿保存失败");
      }
    };
    const checkWords = () => {
      const { chars, bytesApprox } = countWindcodeChars(props.value);
      setMsg(`字数检查：约 ${chars} 字 / ${bytesApprox} 字节（不含标签）`);
    };
    const onKeyDown = (e2) => {
      const mod = e2.ctrlKey || e2.metaKey;
      if (!mod) return;
      const k2 = e2.key.toLowerCase();
      if (k2 === "b") {
        e2.preventDefault();
        wrap("[b]", "[/b]", "粗体");
      } else if (k2 === "i") {
        e2.preventDefault();
        wrap("[i]", "[/i]", "斜体");
      } else if (k2 === "u") {
        e2.preventDefault();
        wrap("[u]", "[/u]", "下划线");
      } else if (k2 === "z" && !e2.shiftKey) {
        e2.preventDefault();
        undo();
      } else if (k2 === "y" || k2 === "z" && e2.shiftKey) {
        e2.preventDefault();
        redo();
      }
    };
    const togglePanel = (p2) => {
      rememberSel();
      setPanel((cur) => cur === p2 ? null : p2);
    };
    const ToolBtn = (p2) => /* @__PURE__ */ u$1(
      "button",
      {
        type: "button",
        class: `xzqh-ed-btn${p2.active ? " active" : ""}${p2.className ? ` ${p2.className}` : ""}`,
        title: p2.title,
        onMouseDown: (e2) => e2.preventDefault(),
        onClick: () => {
          rememberSel();
          p2.onClick();
        },
        children: p2.children
      }
    );
    return /* @__PURE__ */ u$1("div", { class: `xzqh-editor${fullscreen ? " is-full" : ""}${props.className ? ` ${props.className}` : ""}`, children: [
      /* @__PURE__ */ u$1("div", { class: "xzqh-ed-toolbar", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-ed-row", children: [
          !simple && /* @__PURE__ */ u$1(S, { children: [
            /* @__PURE__ */ u$1(
              "select",
              {
                class: "xzqh-ed-select",
                title: "字体",
                defaultValue: "",
                onChange: (e2) => {
                  const v2 = e2.target.value;
                  e2.target.value = "";
                  if (v2) wrap(`[font=${v2}]`, "[/font]", "文字");
                },
                children: [
                  /* @__PURE__ */ u$1("option", { value: "", disabled: true, children: "字体" }),
                  FONTS.map((f2) => /* @__PURE__ */ u$1("option", { value: f2, style: { fontFamily: f2 }, children: f2 }, f2))
                ]
              }
            ),
            /* @__PURE__ */ u$1(
              "select",
              {
                class: "xzqh-ed-select xzqh-ed-select-sm",
                title: "字号",
                defaultValue: "",
                onChange: (e2) => {
                  const v2 = e2.target.value;
                  e2.target.value = "";
                  if (v2) wrap(`[size=${v2}]`, "[/size]", "文字");
                },
                children: [
                  /* @__PURE__ */ u$1("option", { value: "", disabled: true, children: "号" }),
                  [1, 2, 3, 4, 5, 6, 7].map((n2) => /* @__PURE__ */ u$1("option", { value: n2, children: n2 }, n2))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "粗体 (Ctrl+B)", onClick: () => wrap("[b]", "[/b]", "粗体"), children: /* @__PURE__ */ u$1("b", { children: "B" }) }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "斜体 (Ctrl+I)", onClick: () => wrap("[i]", "[/i]", "斜体"), children: /* @__PURE__ */ u$1("i", { children: "I" }) }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "下划线 (Ctrl+U)", onClick: () => wrap("[u]", "[/u]", "下划线"), children: /* @__PURE__ */ u$1("span", { style: { textDecoration: "underline" }, children: "U" }) }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "删除线", onClick: () => wrap("[strike]", "[/strike]", "删除线"), children: /* @__PURE__ */ u$1("s", { children: "S" }) }),
          simple && /* @__PURE__ */ u$1(S, { children: [
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入链接", active: panel === "link", onClick: () => togglePanel("link"), children: "链" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入引用", onClick: () => wrap("[quote]", "[/quote]", "引用内容"), children: "“”" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "撤销 (Ctrl+Z)", onClick: undo, children: "↶" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "恢复 (Ctrl+Y)", onClick: redo, children: "↷" })
          ] }),
          !simple && /* @__PURE__ */ u$1(S, { children: [
            /* @__PURE__ */ u$1(ToolBtn, { title: "文字颜色", active: panel === "color", onClick: () => togglePanel("color"), children: /* @__PURE__ */ u$1("span", { class: "xzqh-ed-a", children: [
              "A",
              /* @__PURE__ */ u$1("span", { class: "xzqh-ed-a-bar", style: { background: "#e11" } })
            ] }) }),
            /* @__PURE__ */ u$1(
              ToolBtn,
              {
                title: "背景色",
                active: panel === "backcolor",
                onClick: () => togglePanel("backcolor"),
                children: /* @__PURE__ */ u$1("span", { class: "xzqh-ed-a", children: [
                  "A",
                  /* @__PURE__ */ u$1("span", { class: "xzqh-ed-a-bar", style: { background: "#fd0" } })
                ] })
              }
            ),
            /* @__PURE__ */ u$1(ToolBtn, { title: "清除样式", onClick: clearStyle, children: "Tx" }),
            /* @__PURE__ */ u$1("span", { class: "xzqh-ed-sep" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "左对齐", onClick: () => wrap("[align=left]", "[/align]", "左对齐"), children: "左" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "居中对齐", onClick: () => wrap("[align=center]", "[/align]", "居中"), children: "中" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "右对齐", onClick: () => wrap("[align=right]", "[/align]", "右对齐"), children: "右" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "段落化", onClick: () => wrap("[paragraph]", "[/paragraph]", "段落"), children: "¶" }),
            /* @__PURE__ */ u$1("span", { class: "xzqh-ed-sep" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "编号", onClick: () => insertList(true), children: "1." }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "项目符号", onClick: () => insertList(false), children: "•" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "缩进", onClick: () => wrap("[blockquote]", "[/blockquote]", "缩进内容"), children: "»»" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "取消缩进", onClick: outdent, children: "««" }),
            /* @__PURE__ */ u$1("span", { class: "xzqh-ed-sep" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "分隔线", onClick: () => insert("[hr]\n"), children: "―" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入引用", onClick: () => wrap("[quote]", "[/quote]", "引用内容"), children: "“”" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入代码", onClick: () => wrap("[code]", "[/code]", "代码"), children: "</>" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入出售", active: panel === "sell", onClick: () => togglePanel("sell"), children: "$" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入隐藏", active: panel === "hide", onClick: () => togglePanel("hide"), children: "隐" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入链接", active: panel === "link", onClick: () => togglePanel("link"), children: "链" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "取消链接", onClick: unlink, children: "断" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "插入表格", active: panel === "table", onClick: () => togglePanel("table"), children: "表" }),
            /* @__PURE__ */ u$1("span", { class: "xzqh-ed-sep" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "撤销 (Ctrl+Z)", onClick: undo, children: "↶" }),
            /* @__PURE__ */ u$1(ToolBtn, { title: "恢复 (Ctrl+Y)", onClick: redo, children: "↷" })
          ] }),
          /* @__PURE__ */ u$1("span", { class: "xzqh-ed-sep" }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "表情", active: panel === "smile", onClick: () => togglePanel("smile"), className: "xzqh-ed-btn-lg", children: "表情" }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "图片", active: panel === "image", onClick: () => togglePanel("image"), className: "xzqh-ed-btn-lg", children: "图片" }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-ed-spacer" }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "简单/完整工具栏", active: simple, onClick: () => setSimple((v2) => !v2), children: simple ? "完整" : "简单" }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "全屏", active: fullscreen, onClick: () => setFullscreen((v2) => !v2), children: fullscreen ? "退出" : "全屏" }),
          /* @__PURE__ */ u$1(ToolBtn, { title: "预览", active: preview, onClick: () => setPreview((v2) => !v2), children: preview ? "编辑" : "预览" })
        ] }),
        panel === "color" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel", children: /* @__PURE__ */ u$1("div", { class: "xzqh-ed-swatches", children: COLORS.map((c2) => /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: "xzqh-ed-swatch",
            style: { background: c2 },
            title: c2,
            onMouseDown: (e2) => e2.preventDefault(),
            onClick: () => {
              wrap(`[color=${c2}]`, "[/color]", "文字");
              setPanel(null);
            }
          },
          c2
        )) }) }),
        panel === "backcolor" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel", children: /* @__PURE__ */ u$1("div", { class: "xzqh-ed-swatches", children: COLORS.map((c2) => /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: "xzqh-ed-swatch",
            style: { background: c2 },
            title: c2,
            onMouseDown: (e2) => e2.preventDefault(),
            onClick: () => {
              wrap(`[backcolor=${c2}]`, "[/backcolor]", "文字");
              setPanel(null);
            }
          },
          c2
        )) }) }),
        panel === "smile" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel", children: /* @__PURE__ */ u$1("div", { class: "xzqh-ed-smiles", children: Array.from({ length: SMILE_COUNT }, (_2, i2) => i2 + 1).map((n2) => /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: "xzqh-ed-smile",
            title: `表情 ${n2}`,
            onMouseDown: (e2) => e2.preventDefault(),
            onClick: () => {
              insert(`[s:${n2}]`);
              setPanel(null);
            },
            children: /* @__PURE__ */ u$1("img", { src: `images/post/smile/default/${n2}.gif`, alt: "", width: 22, height: 22 })
          },
          n2
        )) }) }),
        panel === "image" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel xzqh-ed-image-panel", children: [
          /* @__PURE__ */ u$1("div", { class: "xzqh-ed-subtabs", role: "tablist", children: [
            uploadEnabled && /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                role: "tab",
                class: `xzqh-ed-subtab${imgTab === "local" ? " active" : ""}`,
                onClick: () => setImgTab("local"),
                children: "本地图片"
              }
            ),
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                role: "tab",
                class: `xzqh-ed-subtab${imgTab === "network" ? " active" : ""}`,
                onClick: () => setImgTab("network"),
                children: "网络图片"
              }
            )
          ] }),
          uploadEnabled && imgTab === "local" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-form-panel", children: [
            /* @__PURE__ */ u$1("p", { class: "xzqh-muted", style: { margin: 0 }, children: "上传 jpg / gif / png，插入正文（对齐原站图片对话框；与下方「附件」入口分开）。" }),
            /* @__PURE__ */ u$1(
              "input",
              {
                ref: localFileRef,
                type: "file",
                accept: ".jpg,.jpeg,.gif,.png,.bmp,image/*",
                multiple: true,
                hidden: true,
                onChange: async (e2) => {
                  const list = Array.from(e2.target.files || []);
                  e2.target.value = "";
                  for (const f2 of list) await handleLocalImage(f2);
                }
              }
            ),
            /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: [
              /* @__PURE__ */ u$1(
                "button",
                {
                  type: "button",
                  class: "xzqh-btn primary",
                  disabled: imgBusy,
                  onClick: () => {
                    var _a;
                    return (_a = localFileRef.current) == null ? void 0 : _a.click();
                  },
                  children: imgBusy ? "上传中…" : "选择并上传图片"
                }
              ),
              imgProgress && /* @__PURE__ */ u$1("span", { class: "xzqh-muted", children: imgProgress })
            ] }),
            flashAtts.filter((a2) => a2.kind === "image").length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-img-thumbs", children: flashAtts.filter((a2) => a2.kind === "image").map((a2) => /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: "xzqh-ed-img-thumb",
                title: `再次插入 ${a2.name}`,
                onMouseDown: (e2) => e2.preventDefault(),
                onClick: () => insert(`[attachment=${a2.aid}]`),
                children: a2.path ? /* @__PURE__ */ u$1("img", { src: absUrl(a2.path), alt: a2.name }) : /* @__PURE__ */ u$1("span", { children: [
                  "#",
                  a2.aid
                ] })
              },
              a2.aid
            )) })
          ] }),
          imgTab === "network" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-form-panel", children: [
            /* @__PURE__ */ u$1("label", { children: [
              "图片地址",
              /* @__PURE__ */ u$1(
                "input",
                {
                  value: imgUrl,
                  onInput: (e2) => setImgUrl(e2.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: "xzqh-btn primary",
                onClick: () => {
                  const u2 = imgUrl.trim();
                  if (!/^https?:\/\//i.test(u2)) {
                    setMsg("请输入以 http(s):// 开头的图片地址");
                    return;
                  }
                  insert(`[img]${u2}[/img]`);
                  setPanel(null);
                },
                children: "插入网络图片"
              }
            )
          ] })
        ] }),
        panel === "link" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel xzqh-ed-form-panel", children: [
          /* @__PURE__ */ u$1("label", { children: [
            "链接地址",
            /* @__PURE__ */ u$1("input", { value: linkUrl, onInput: (e2) => setLinkUrl(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1("label", { children: [
            "链接文字（可选）",
            /* @__PURE__ */ u$1("input", { value: linkText, onInput: (e2) => setLinkText(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn primary",
              onClick: () => {
                if (!/^https?:\/\//i.test(linkUrl)) {
                  setMsg("请输入以 http(s):// 开头的链接");
                  return;
                }
                const el = taRef.current;
                const start = (el == null ? void 0 : el.selectionStart) ?? sel.current.start;
                const end = (el == null ? void 0 : el.selectionEnd) ?? sel.current.end;
                const selected = props.value.slice(start, end);
                const text = (linkText || selected || linkUrl).trim() || linkUrl;
                const tag = `[url=${linkUrl.trim()}]${text}[/url]`;
                const next = props.value.slice(0, start) + tag + props.value.slice(end);
                setValue(next, start + tag.length);
                setPanel(null);
              },
              children: "插入链接"
            }
          )
        ] }),
        panel === "table" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel xzqh-ed-form-panel xzqh-ed-inline-form", children: [
          /* @__PURE__ */ u$1("label", { children: [
            "行",
            /* @__PURE__ */ u$1(
              "input",
              {
                type: "number",
                min: 1,
                max: 10,
                value: tableRows,
                onInput: (e2) => setTableRows(Number(e2.target.value) || 1)
              }
            )
          ] }),
          /* @__PURE__ */ u$1("label", { children: [
            "列",
            /* @__PURE__ */ u$1(
              "input",
              {
                type: "number",
                min: 1,
                max: 10,
                value: tableCols,
                onInput: (e2) => setTableCols(Number(e2.target.value) || 1)
              }
            )
          ] }),
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", onClick: insertTable, children: "插入表格" })
        ] }),
        panel === "sell" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel xzqh-ed-form-panel xzqh-ed-inline-form", children: [
          /* @__PURE__ */ u$1("label", { children: [
            "售价",
            /* @__PURE__ */ u$1("input", { value: sellPrice, onInput: (e2) => setSellPrice(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn primary",
              onClick: () => {
                wrap(`[sell=${sellPrice || "1"}]`, "[/sell]", "出售内容");
                setPanel(null);
              },
              children: "插入出售"
            }
          )
        ] }),
        panel === "hide" && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-panel xzqh-ed-form-panel", children: [
          /* @__PURE__ */ u$1("p", { class: "xzqh-muted", style: { margin: 0 }, children: "插入隐藏标签，浏览者需满足条件后可见（以论坛权限为准）。" }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: [
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: "xzqh-btn primary",
                onClick: () => {
                  wrap("[hide]", "[/hide]", "隐藏内容");
                  setPanel(null);
                },
                children: "插入 [hide]"
              }
            ),
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: "xzqh-btn ghost",
                onClick: () => {
                  wrap("[post]", "[/post]", "隐藏内容");
                  setPanel(null);
                },
                children: "插入 [post]"
              }
            )
          ] })
        ] })
      ] }),
      preview ? /* @__PURE__ */ u$1(
        "div",
        {
          class: "xzqh-preview xzqh-ed-preview",
          dangerouslySetInnerHTML: {
            __html: windcodeToHtml(props.value, { attachments: attachPreviewMap })
          }
        }
      ) : /* @__PURE__ */ u$1(
        "textarea",
        {
          ref: taRef,
          class: "xzqh-ed-textarea",
          value: props.value,
          placeholder: props.placeholder || "支持 Wind Code，可使用上方工具栏插入格式",
          rows: props.minRows || (props.compact ? 6 : 14),
          onSelect: rememberSel,
          onClick: rememberSel,
          onKeyUp: rememberSel,
          onKeyDown,
          onInput: (e2) => {
            const el = e2.target;
            pushHistory(el.value, el.selectionStart, el.selectionEnd);
            props.onChange(el.value);
          }
        }
      ),
      /* @__PURE__ */ u$1("div", { class: "xzqh-ed-footer", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-ed-footer-links", children: [
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-linkish", onClick: restoreDraft, children: "恢复数据" }),
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-linkish", onClick: saveDraft, children: "草稿箱" }),
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-linkish", onClick: checkWords, children: "字数检查" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-ed-footer-meta", children: [
          counts.chars,
          " 字 · Wind Code"
        ] })
      ] }),
      msg && /* @__PURE__ */ u$1("div", { class: "xzqh-ed-toast", role: "status", children: [
        msg,
        /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-linkish", onClick: () => setMsg(""), children: "关闭" })
      ] })
    ] });
  }
  function parseIndexForums(doc) {
    const fromBlocks = parseByCategoryBlocks(doc);
    if (fromBlocks.length > 0) return fromBlocks;
    const fromRows = parseByTableRows(doc);
    if (fromRows.length > 0) return fromRows;
    return [{ name: "版块", boards: collectBoardsFallback(doc) }];
  }
  function parseByCategoryBlocks(doc) {
    const categories = [];
    const seenFid = /* @__PURE__ */ new Set();
    const blocks = [
      ...doc.querySelectorAll('div.t[id^="t_"]'),
      ...doc.querySelectorAll("div.t")
    ];
    const used = /* @__PURE__ */ new Set();
    for (const block of blocks) {
      if (used.has(block)) continue;
      used.add(block);
      const cateName = extractCategoryName(block);
      if (!cateName) continue;
      if (/友情链接|在线用户|联盟|广告/.test(cateName)) continue;
      const boards = [];
      const rows = block.querySelectorAll('tr[id^="fid_"], tr.tr3');
      for (const tr of rows) {
        const board = parseBoardRow(tr);
        if (!board || seenFid.has(board.fid)) continue;
        seenFid.add(board.fid);
        boards.push(board);
      }
      if (!boards.length) {
        for (const a2 of block.querySelectorAll('a[id^="fn_"], h2.forumT a[href*="thread.php?fid="]')) {
          const board = parseBoardAnchor(a2, a2.closest("tr") || block);
          if (!board || seenFid.has(board.fid)) continue;
          seenFid.add(board.fid);
          boards.push(board);
        }
      }
      if (boards.length) {
        categories.push({ name: cateName, boards });
      }
    }
    return categories;
  }
  function extractCategoryName(block) {
    const cateA = block.querySelector("h3.cateT a") || block.querySelector(".cateT a") || block.querySelector('a[href*="cateid="]');
    if (cateA) {
      const name = (cateA.textContent || "").replace(/\s+/g, " ").trim();
      if (name) return name;
    }
    const h2 = block.querySelector(":scope > .h, .h");
    if (h2) {
      const clone = h2.cloneNode(true);
      clone.querySelectorAll("a.closeicon, span.fr, script").forEach((n2) => n2.remove());
      let t2 = (clone.textContent || "").replace(/\s+/g, " ").trim();
      t2 = t2.replace(/^分栏版主[:：].*$/u, "").trim();
      const m2 = (h2.textContent || "").match(/(区划地名区|区划相关区|管理交流区|[^\s]{2,12}区)\s*$/);
      if (m2) return m2[1];
      if (t2 && t2.length <= 20 && !/分栏版主/.test(t2)) return t2;
    }
    return null;
  }
  function parseBoardRow(tr) {
    const a2 = tr.querySelector('a[id^="fn_"]') || tr.querySelector('h2.forumT a[href*="thread.php?fid="]') || [...tr.querySelectorAll('a[href*="thread.php?fid="]')].find((el) => {
      const name = (el.textContent || "").trim();
      return name && !name.startsWith("【") && !/^\d+$/.test(name);
    });
    if (!a2) return null;
    return parseBoardAnchor(a2, tr);
  }
  function parseBoardAnchor(a2, scope) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const href = a2.getAttribute("href") || "";
    const fid = Number(((_a = href.match(/fid=(\d+)/)) == null ? void 0 : _a[1]) || 0) || Number(((_b = (a2.id || "").match(/fn_(\d+)/)) == null ? void 0 : _b[1]) || 0) || Number(((_c = (scope.id || "").match(/fid_(\d+)/)) == null ? void 0 : _c[1]) || 0);
    const name = (a2.textContent || "").replace(/\s+/g, " ").trim();
    if (!fid || !name || name.startsWith("【")) return null;
    const text = (scope.textContent || "").replace(/\s+/g, " ").trim();
    const today = Number(((_d = scope.querySelector(".f10")) == null ? void 0 : _d.textContent) || ((_e = text.match(/今日\s*(\d+)/)) == null ? void 0 : _e[1]) || 0 || 0);
    const desc = ((_g = (_f = scope.querySelector(`#desc_${fid}, p[id^="desc_"]`)) == null ? void 0 : _f.textContent) == null ? void 0 : _g.replace(/\s+/g, " ").trim()) || void 0;
    const modScope = scope.querySelector("th") || scope;
    const mods = [...modScope.querySelectorAll('a[href*="u.php"]')].map((el) => (el.textContent || "").trim()).filter((n2) => n2 && n2 !== name);
    const statsCells = [...scope.querySelectorAll("td, span")].map(
      (el) => (el.textContent || "").replace(/\s+/g, " ").trim()
    );
    let topics = 0;
    let posts = 0;
    for (const c2 of statsCells) {
      const m2 = c2.match(/^(\d+)\s*\/\s*(\d+)$/);
      if (m2) {
        topics = Number(m2[1]);
        posts = Number(m2[2]);
        break;
      }
    }
    if (!topics && !posts) {
      const m2 = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (m2) {
        topics = Number(m2[1]);
        posts = Number(m2[2]);
      }
    }
    const lastA = scope.querySelector('a[href*="read.php?tid="]');
    const lastTid = Number(((_h = ((lastA == null ? void 0 : lastA.getAttribute("href")) || "").match(/tid=(\d+)/)) == null ? void 0 : _h[1]) || 0) || void 0;
    const lastCell = scope.querySelector("td:last-child") || scope;
    const lastAuthor = (_j = (_i = lastCell.querySelector('a[href*="u.php"]')) == null ? void 0 : _i.textContent) == null ? void 0 : _j.trim();
    const lastTime = (_k = (lastCell.textContent || "").match(/\d{4}-\d{2}-\d{2}|\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}-\d{2}/)) == null ? void 0 : _k[0];
    return {
      fid,
      name,
      description: desc,
      topics,
      posts,
      moderators: unique(mods).slice(0, 8),
      today: today || void 0,
      lastTitle: ((_l = lastA == null ? void 0 : lastA.textContent) == null ? void 0 : _l.trim()) || void 0,
      lastTid,
      lastAuthor,
      lastTime
    };
  }
  function parseByTableRows(doc) {
    const categories = [];
    let current = null;
    const seenFid = /* @__PURE__ */ new Set();
    for (const tr of doc.querySelectorAll("tr")) {
      const text = (tr.textContent || "").replace(/\s+/g, " ").trim();
      const cateInRow = tr.querySelector('h3.cateT a, a[href*="cateid="]');
      if (cateInRow) {
        const name = (cateInRow.textContent || "").trim();
        if (name) {
          current = { name, boards: [] };
          categories.push(current);
          continue;
        }
      }
      const board = parseBoardRow(tr);
      if (!board || seenFid.has(board.fid)) continue;
      if (!tr.querySelector('h2.forumT, a[id^="fn_"]') && !/\/\s*\d+/.test(text)) continue;
      seenFid.add(board.fid);
      if (!current) {
        current = { name: "论坛", boards: [] };
        categories.push(current);
      }
      current.boards.push(board);
    }
    return categories.filter((c2) => c2.boards.length > 0);
  }
  function parseIndexFooter(doc) {
    const friendLinks = parseFriendLinks(doc);
    const online = parseOnlineBlock(doc);
    return {
      friendLinks,
      onlineSummary: online.summary,
      onlineUsers: online.users,
      memberGroups: online.groups
    };
  }
  function parseFriendLinks(doc) {
    var _a, _b;
    const box = doc.querySelector(".sharelink2") || ((_b = (_a = [...doc.querySelectorAll("div.h")].find((el) => /友情链接/.test(el.textContent || ""))) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.querySelector(".sharelink2, .tTable, .sharelink"));
    if (!box) return [];
    const links = [];
    const seen = /* @__PURE__ */ new Set();
    for (const a2 of box.querySelectorAll("a[href]")) {
      const href = (a2.getAttribute("href") || "").trim();
      const name = (a2.textContent || "").replace(/\s+/g, " ").trim();
      if (!href || !name || /^javascript:/i.test(href)) continue;
      const key = `${href}#${name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const title = (a2.getAttribute("title") || "").trim() || void 0;
      links.push({ name, href: absUrl(href) || href, title });
    }
    return links;
  }
  function parseOnlineBlock(doc) {
    var _a, _b;
    const header = [...doc.querySelectorAll("div.h")].find(
      (el) => /在线用户/.test(el.textContent || "")
    );
    if (!header) return { users: [], groups: [] };
    const summary = (header.textContent || "").replace(/\s+/g, " ").replace(/^在线用户\s*-?\s*/, "").trim();
    let body = header.nextElementSibling;
    if (!body || !body.querySelector("a, img, span, table")) {
      body = ((_a = header.parentElement) == null ? void 0 : _a.querySelector(".tTable")) || body;
    }
    const users = [];
    const groups = [];
    const seenUser = /* @__PURE__ */ new Set();
    const seenGroup = /* @__PURE__ */ new Set();
    if (body) {
      for (const a2 of body.querySelectorAll('a[href*="u.php"]')) {
        const name = (a2.textContent || "").replace(/\s+/g, " ").trim();
        if (!name || seenUser.has(name)) continue;
        seenUser.add(name);
        users.push({
          name,
          href: absUrl(a2.getAttribute("href") || "") || a2.getAttribute("href") || void 0
        });
        if (users.length >= 120) break;
      }
      for (const img of body.querySelectorAll('img[src*="group/"]')) {
        const name = (img.getAttribute("alt") || img.getAttribute("title") || "").trim() || (((_b = img.parentElement) == null ? void 0 : _b.textContent) || "").replace(/\s+/g, " ").trim();
        if (!name || seenGroup.has(name)) continue;
        seenGroup.add(name);
        const src = img.getAttribute("src") || "";
        groups.push({
          name,
          iconUrl: src ? absUrl(src) || src : void 0
        });
      }
      if (!groups.length) {
        for (const span of body.querySelectorAll("span")) {
          const name = (span.textContent || "").replace(/\s+/g, " ").trim();
          if (!name || name.length > 20 || seenGroup.has(name)) continue;
          if (/会员|管理|版主|游客|访客|禁言|VIP|贵宾/.test(name)) {
            seenGroup.add(name);
            groups.push({ name });
          }
        }
      }
    }
    return {
      summary: summary || void 0,
      users,
      groups
    };
  }
  function parseIndexFeeds(doc) {
    const panel = doc.getElementById("tabswi1_B");
    const switchItems = panel ? [...panel.children].filter((el) => {
      var _a;
      return (_a = el.classList) == null ? void 0 : _a.contains("switchItem");
    }) : [];
    let latestTopics = [];
    let recentReplies = [];
    if (switchItems.length >= 2) {
      latestTopics = parseFeedSwitchItem(switchItems[0]);
      recentReplies = parseFeedSwitchItem(switchItems[1]);
    } else if (switchItems.length === 1) {
      latestTopics = parseFeedSwitchItem(switchItems[0]);
    }
    if (!latestTopics.length) {
      latestTopics = parseLatestThreads(doc).map((t2) => ({
        tid: t2.tid,
        title: t2.title
      }));
    }
    return { latestTopics, recentReplies };
  }
  function parseFeedSwitchItem(el) {
    var _a, _b, _c, _d, _e;
    const items = [];
    const seen = /* @__PURE__ */ new Set();
    const lis = [
      ...el.querySelectorAll(".newHotB li, ul.cc > li, ul li")
    ].filter((li) => li.querySelector('a[href*="read.php?tid="]'));
    const rows = lis.length ? lis : [...el.querySelectorAll("li, tr")];
    for (const row of rows) {
      const forumA = row.querySelector('a[href*="thread.php?fid="]');
      const titleAs = [...row.querySelectorAll('a[href*="read.php?tid="]')];
      const titleA = titleAs.find((a2) => (a2.textContent || "").trim().length > 2) || titleAs[0];
      if (!titleA) continue;
      const tid = Number(((_a = (titleA.getAttribute("href") || "").match(/tid=(\d+)/)) == null ? void 0 : _a[1]) || 0);
      const title = (titleA.textContent || "").replace(/\s+/g, " ").trim();
      if (!tid || !title || seen.has(tid)) continue;
      seen.add(tid);
      const authorA = [...row.querySelectorAll('a[href*="u.php"]')].pop();
      const time = (_b = (row.textContent || "").match(/\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}-\d{2}\s*\d{2}:\d{2}|\d{2}:\d{2}/)) == null ? void 0 : _b[0];
      items.push({
        tid,
        title,
        forumName: ((forumA == null ? void 0 : forumA.textContent) || "").replace(/[【】]/g, "").trim() || void 0,
        fid: Number(((_c = ((forumA == null ? void 0 : forumA.getAttribute("href")) || "").match(/fid=(\d+)/)) == null ? void 0 : _c[1]) || 0) || void 0,
        author: ((_d = authorA == null ? void 0 : authorA.textContent) == null ? void 0 : _d.trim()) || void 0,
        time
      });
      if (items.length >= 30) break;
    }
    if (!items.length) {
      for (const a2 of el.querySelectorAll('dl.newHotA a[href*="read.php?tid="]')) {
        const tid = Number(((_e = (a2.getAttribute("href") || "").match(/tid=(\d+)/)) == null ? void 0 : _e[1]) || 0);
        const title = (a2.textContent || "").trim();
        if (!tid || !title || seen.has(tid)) continue;
        seen.add(tid);
        items.push({ tid, title });
        if (items.length >= 20) break;
      }
    }
    return items;
  }
  function parseLatestThreads(doc) {
    const { latestTopics } = parseIndexFeeds(doc);
    return latestTopics.map((t2) => ({
      tid: t2.tid,
      title: t2.title,
      author: t2.author || "",
      replies: 0,
      hits: 0,
      topped: false,
      digest: false,
      vote: false,
      hasImage: false,
      isNew: false,
      multipage: false
    }));
  }
  function collectBoardsFallback(doc) {
    const map = /* @__PURE__ */ new Map();
    for (const a2 of doc.querySelectorAll('a[id^="fn_"], h2.forumT a[href*="thread.php?fid="]')) {
      const board = parseBoardAnchor(a2, a2.closest("tr") || a2.parentElement || doc.body);
      if (!board || map.has(board.fid)) continue;
      map.set(board.fid, board);
    }
    return [...map.values()];
  }
  function unique(arr) {
    return [...new Set(arr)];
  }
  function parseVerifyhash(html) {
    var _a;
    return ((_a = html.match(/verifyhash\s*=\s*['"]([^'"]+)/i)) == null ? void 0 : _a[1]) || "";
  }
  async function fetchForumIndex() {
    const { html } = await fetchHtml("index.php");
    const doc = parseDocument(html);
    const feeds = parseIndexFeeds(doc);
    return {
      categories: parseIndexForums(doc),
      latestTopics: feeds.latestTopics,
      recentReplies: feeds.recentReplies,
      footer: parseIndexFooter(doc)
    };
  }
  function detectShowMsg(html, doc) {
    const title = (doc == null ? void 0 : doc.title) || match1(html, /<title>([^<]+)/i) || "";
    const tipTitle = /提示信息/.test(title);
    const hardPhrase = /您没有登录或者您没有权限访问此页面|只有注册会员才能进入|暂时不能使用此功能|您没有权限访问此页面|还不是站点会员/.test(
      html
    );
    if (!tipTitle && !hardPhrase) return null;
    const raw = extractTipMessages(doc) || match1(html, /可能有如下几个原因[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i) || match1(html, /class="[^"]*tip[^"]*"[^>]*>([\s\S]*?)<\//i) || "";
    const text = stripTags(raw).replace(/\s+/g, " ").trim() || guessMessage(html);
    const message = text.length > 180 || /会员列表|会员排行|最后登录\d{4}/.test(text) ? guessMessage(html) : text || "无权访问或需要登录";
    const kind = /登录|注册会员|还不是站点会员|没有登录/.test(message) ? "login_required" : /权限/.test(message) ? "permission" : "unknown";
    return { kind, message };
  }
  function extractTipMessages(doc) {
    if (!doc) return "";
    const scopes = [
      ...doc.querySelectorAll(
        ".regIgnore, .regForm-wrap .f14, .f14.mb5, .tip ul, .t .tip, #notice, .tipw, #main .t3, #main .t .f14"
      )
    ];
    if (!scopes.length && /提示信息/.test(doc.title || "")) {
      scopes.push(...doc.querySelectorAll("#main"));
    }
    const items = [];
    for (const scope of scopes) {
      for (const li of scope.querySelectorAll("li")) {
        const t2 = (li.textContent || "").replace(/\s+/g, " ").trim();
        if (t2 && /登录|权限|注册|不能|会员才能|不存在|禁止|非法|错误|关闭|未/.test(t2) && !/会员列表|会员排行|最后登录|注册时间|登录IP/.test(t2)) {
          items.push(t2);
        }
      }
      if (!items.length) {
        const p2 = (scope.textContent || "").replace(/\s+/g, " ").trim();
        if (p2 && /登录|权限|注册|不能|不存在|禁止|非法|错误|关闭|未/.test(p2) && p2.length < 200) {
          items.push(p2);
        }
      }
    }
    return [...new Set(items)].join(" ");
  }
  function guessMessage(html) {
    if (/只有注册会员才能进入/.test(html)) return "本版块为正规版块，只有注册会员才能进入！请先登录。";
    if (/暂时不能使用此功能/.test(html)) return "您还没有登录或注册，暂时不能使用此功能！";
    if (/您没有登录或者您没有权限访问此页面|您没有权限访问此页面/.test(html))
      return "您没有登录或者您没有权限访问此页面。";
    if (/帖子不存在|主题不存在|版块不存在|该帖不存在/.test(html))
      return "主题或版块不存在，或已被删除。";
    if (/非法请求|undefined_action|illegal_request/.test(html))
      return "请求参数无效或已过期，请刷新后重试。";
    if (/没有权限/.test(html) && /提示信息/.test(html)) return "您没有权限访问此页面。";
    return "服务器返回了提示信息。";
  }
  function stripTags(s2) {
    return s2.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  }
  function match1(s2, re) {
    const m2 = s2.match(re);
    return m2 == null ? void 0 : m2[1];
  }
  function parseThreadList(html, doc, fid, page) {
    var _a, _b;
    const err = detectShowMsg(html, doc);
    if (err) {
      return {
        fid,
        forumName: "",
        threads: [],
        page,
        totalPages: 1,
        types: [],
        sideCategories: parseSideForum(doc),
        canPost: false,
        error: err
      };
    }
    const forumName = doc.title.replace(/\s*-?\s*Powered by phpwind.*/i, "").replace(/^方舆\s*-?\s*/, "").trim() || ((_b = (_a = doc.querySelector("#breadCrumb a:last-of-type")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || `版块 ${fid}`;
    const table = doc.getElementById("ajaxtable") || doc.querySelector("table");
    const threads = [];
    const rows = table ? [...table.querySelectorAll("tr.tr3, tr")].filter((tr) => tr.querySelector('a[href*="read.php?tid="]')) : [];
    for (const tr of rows) {
      const item = parseThreadRow(tr);
      if (item) threads.push(item);
    }
    const totalPages = parseMaxPage(doc, `thread.php?fid=${fid}`);
    const types = parseForumTypeTabs(doc, fid);
    const sideCategories = parseSideForum(doc);
    const canPost = !!doc.querySelector('a[href*="post.php?fid="]');
    return {
      fid,
      forumName,
      threads,
      page,
      totalPages,
      types,
      sideCategories,
      canPost
    };
  }
  function parseSideForum(doc) {
    var _a, _b;
    const root = doc.getElementById("sideForum");
    if (!root) return [];
    const categories = [];
    for (const dl of root.querySelectorAll(":scope > dl, dl")) {
      const name = (((_a = dl.querySelector("dt")) == null ? void 0 : _a.textContent) || "").replace(/\s+/g, " ").trim();
      if (!name) continue;
      const boards = [];
      const seen = /* @__PURE__ */ new Set();
      for (const a2 of dl.querySelectorAll('dd a[href*="fid="], ul a[href*="fid="]')) {
        const href = a2.getAttribute("href") || "";
        const boardFid = Number(((_b = href.match(/[?&]fid=(\d+)/)) == null ? void 0 : _b[1]) || 0);
        const boardName = (a2.textContent || "").replace(/\s+/g, " ").trim();
        if (!boardFid || !boardName || seen.has(boardFid)) continue;
        seen.add(boardFid);
        boards.push({
          fid: boardFid,
          name: boardName,
          topics: 0,
          posts: 0,
          moderators: []
        });
      }
      if (boards.length) categories.push({ name, boards });
    }
    return categories;
  }
  function lastQueryParam(href, key) {
    const re = new RegExp(`[?&]${key}=([^&#]*)`, "gi");
    let last;
    let m2;
    while (m2 = re.exec(href)) last = m2[1];
    return last;
  }
  function parseForumTypeTabs(doc, fid) {
    const out = [];
    const seen = /* @__PURE__ */ new Set();
    const normalizeName = (raw) => raw.replace(/[\[\]【】]/g, "").replace(/[▼▽]/g, "").replace(/\s+/g, " ").trim();
    const parseLink = (rawName, href) => {
      const name = normalizeName(rawName);
      if (!name || /^\d+$/.test(name) || name === "--") return null;
      if (/^(全部|最新发帖|最后回复|新窗)$/.test(name)) return null;
      const typeRaw = lastQueryParam(href, "type");
      const specialRaw = lastQueryParam(href, "special");
      const typeId = typeRaw && typeRaw !== "0" ? typeRaw : void 0;
      const specialId = specialRaw && specialRaw !== "0" ? specialRaw : void 0;
      const digest = /[?&]search=digest(?:&|#|$)/i.test(href);
      if (!typeId && !specialId && !digest) return null;
      const id = typeId || specialId || (digest ? "digest" : "");
      if (!id) return null;
      let cleanHref = href;
      if (id === "digest") cleanHref = `thread.php?fid=${fid}&search=digest`;
      else if (specialId && !typeId) cleanHref = `thread.php?fid=${fid}&special=${specialId}`;
      else if (typeId) cleanHref = `thread.php?fid=${fid}&type=${typeId}`;
      return { id, name, href: cleanHref };
    };
    const pushTop = (tab) => {
      if (!tab) return;
      const kind = tab.href.includes("special=") ? "s" : tab.id === "digest" ? "d" : "t";
      const key = `${kind}:${tab.id}`;
      if (seen.has(key) || seen.has(`n:${tab.name}`)) return;
      seen.add(key);
      seen.add(`n:${tab.name}`);
      const childBox = doc.getElementById(`thread_typechild_${tab.id}`);
      if (childBox) {
        const children = [];
        const childSeen = /* @__PURE__ */ new Set();
        for (const a2 of childBox.querySelectorAll('a[href*="type="]')) {
          const child = parseLink(a2.textContent || "", a2.getAttribute("href") || "");
          if (!child || childSeen.has(child.id)) continue;
          childSeen.add(child.id);
          children.push(child);
        }
        if (children.length) tab.children = children;
      }
      out.push(tab);
    };
    const tabLinks = [
      ...doc.querySelectorAll('li[id^="thread_type_"] > a'),
      ...doc.querySelectorAll('a[href*="special=1"][href*="#tabA"]'),
      ...doc.querySelectorAll('a[href*="search=digest"][href*="#tabA"]')
    ];
    for (const a2 of tabLinks) {
      if (a2.classList.contains("view")) continue;
      pushTop(parseLink(a2.textContent || "", a2.getAttribute("href") || ""));
    }
    if (!out.length) {
      for (const a2 of doc.querySelectorAll(`a[href*="thread.php?fid=${fid}"][href*="#tabA"]`)) {
        if (a2.classList.contains("view")) continue;
        const href = a2.getAttribute("href") || "";
        if (!/[?&](?:type|special)=/.test(href) && !/[?&]search=digest/.test(href)) continue;
        pushTop(parseLink(a2.textContent || "", href));
      }
    }
    return out.slice(0, 60);
  }
  function parseThreadRow(tr) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const titleA = tr.querySelector('a.subject_t[href*="read.php?tid="]') || [...tr.querySelectorAll('a[href*="read.php?tid="]')].find((a2) => {
      const t2 = (a2.textContent || "").trim();
      return t2.length > 1 && !/^\d+$/.test(t2) && !a2.classList.contains("view");
    });
    if (!titleA) return null;
    const tid = Number(((_a = (titleA.getAttribute("href") || "").match(/tid=(\d+)/)) == null ? void 0 : _a[1]) || 0);
    if (!tid) return null;
    let title = (titleA.textContent || "").replace(/\s+/g, " ").trim();
    const typeTags = [];
    for (const a2 of tr.querySelectorAll('a.view[href*="type="], a[href*="thread.php"][href*="type="]')) {
      const href = a2.getAttribute("href") || "";
      const name = (a2.textContent || "").replace(/[\[\]【】]/g, "").trim();
      const typeId = (_b = href.match(/[?&]type=(\d+)/)) == null ? void 0 : _b[1];
      if (!name) continue;
      if (!typeTags.some((t2) => t2.name === name)) {
        typeTags.push({ name, typeId, href });
      }
    }
    const split = splitTitleTypes(title);
    for (const t2 of split.typeTags) {
      if (!typeTags.some((x2) => x2.name === t2.name)) typeTags.push(t2);
    }
    if (typeTags.length) title = split.title || title;
    const imgs = [...tr.querySelectorAll("img")];
    const icons = imgs.map((img) => img.getAttribute("src") || "");
    const topped = icons.some((s2) => /headtopic/i.test(s2));
    const digest = icons.some((s2) => /digest/i.test(s2));
    const vote = icons.some((s2) => /vote/i.test(s2));
    const hasImage = icons.some((s2) => /\/img\.gif|image\.gif/i.test(s2));
    const isNew = imgs.some((img) => {
      const src = img.getAttribute("src") || "";
      const tip = `${img.getAttribute("alt") || ""}${img.getAttribute("title") || ""}`;
      return /file\/new\.gif/i.test(src) || /新帖/.test(tip) && /new\.gif/i.test(src);
    });
    const multipage = icons.some((s2) => /multipage/i.test(s2));
    const authorCells = [...tr.querySelectorAll("td.author")];
    const authorCell = authorCells[0];
    const lastCellEl = authorCells.length > 1 ? authorCells[authorCells.length - 1] : void 0;
    const authorLink = (authorCell == null ? void 0 : authorCell.querySelector('a[href*="u.php"]')) || [...tr.querySelectorAll('a[href*="u.php"]')][0];
    const authorInfo = parseUserLink(authorLink);
    const author = authorInfo.name;
    const authorUid = authorInfo.uid;
    const authorUsername = authorInfo.username;
    const lastLink = lastCellEl == null ? void 0 : lastCellEl.querySelector('a[href*="u.php"]');
    const lastInfo = parseUserLink(lastLink);
    const lastAuthor = lastInfo.name || void 0;
    const lastAuthorUid = lastInfo.uid;
    const lastAuthorUsername = lastInfo.username;
    const cells = [...tr.children].map((td) => (td.textContent || "").replace(/\s+/g, " ").trim());
    let replies = 0;
    let hits = 0;
    for (const c2 of cells) {
      const m2 = c2.match(/^(\d+)\s*\/\s*(\d+)$/);
      if (m2) {
        replies = Number(m2[1]);
        hits = Number(m2[2]);
        break;
      }
    }
    const typeName = (_c = typeTags == null ? void 0 : typeTags[typeTags.length - 1]) == null ? void 0 : _c.name;
    const postDate = ((_e = (_d = authorCell == null ? void 0 : authorCell.querySelector("p")) == null ? void 0 : _d.textContent) == null ? void 0 : _e.replace(/\s+/g, " ").trim()) || ((_g = (_f = cells.find((c2) => /\d{4}-\d{2}-\d{2}/.test(c2))) == null ? void 0 : _f.match(/\d{4}-\d{2}-\d{2}/)) == null ? void 0 : _g[0]);
    const lastTimeLink = lastCellEl == null ? void 0 : lastCellEl.querySelector(
      'p a[href*="read.php"], a[href*="read.php"][href*="page=e"]'
    );
    const lastTimeEl = lastTimeLink || (lastCellEl == null ? void 0 : lastCellEl.querySelector("p"));
    const lastTime = (lastTimeLink == null ? void 0 : lastTimeLink.getAttribute("title")) || ((_h = lastTimeEl == null ? void 0 : lastTimeEl.textContent) == null ? void 0 : _h.replace(/\s+/g, " ").trim()) || ((lastCellEl == null ? void 0 : lastCellEl.textContent) || "").replace(lastAuthor || "", "").replace(/\s+/g, " ").trim() || void 0;
    const lastTimeHref = (lastTimeLink == null ? void 0 : lastTimeLink.getAttribute("href")) || void 0;
    return {
      tid,
      title,
      author,
      authorUid,
      authorUsername,
      postDate,
      replies,
      hits,
      lastAuthor,
      lastAuthorUid,
      lastAuthorUsername,
      lastTime,
      lastTimeHref,
      topped,
      digest,
      vote,
      hasImage,
      isNew,
      multipage,
      typeName,
      typeTags: (typeTags == null ? void 0 : typeTags.length) ? typeTags : void 0
    };
  }
  function parseUserLink(a2) {
    var _a, _b;
    if (!a2) return { name: "" };
    const href = a2.getAttribute("href") || "";
    const name = (a2.textContent || "").replace(/\s+/g, " ").trim();
    const uid = Number(((_a = href.match(/[?&]uid=(\d+)/)) == null ? void 0 : _a[1]) || 0) || void 0;
    let username = decodeUriComponentSafe(((_b = href.match(/[?&]username=([^&]+)/)) == null ? void 0 : _b[1]) || "") || a2.getAttribute("data-card-key") || void 0;
    if (username) username = username.trim() || void 0;
    if (!username && name && !uid) username = name;
    return { name, uid, username };
  }
  function decodeUriComponentSafe(s2) {
    if (!s2) return "";
    try {
      return decodeURIComponent(s2.replace(/\+/g, " "));
    } catch {
      return s2;
    }
  }
  function parseMaxPage(doc, hint) {
    var _a, _b;
    let max = 1;
    const fileHint = (hint == null ? void 0 : hint.split("?")[0].replace(/^\//, "")) || "";
    const fidHint = ((_a = hint == null ? void 0 : hint.match(/[?&]fid=(\d+)/)) == null ? void 0 : _a[1]) || "";
    for (const a2 of doc.querySelectorAll('a[href*="page="]')) {
      const href = (a2.getAttribute("href") || "").replace(/&amp;/g, "&");
      if (fileHint && !href.includes(fileHint)) continue;
      if (fidHint && !new RegExp(`[?&]fid=${fidHint}(?:&|#|$)`).test(href)) continue;
      const n2 = Number(((_b = href.match(/[?&]page=(\d+)/)) == null ? void 0 : _b[1]) || 0);
      if (n2 > max) max = n2;
    }
    for (const el of doc.querySelectorAll(".pages, .pages3")) {
      const blob = el.innerHTML || "";
      for (const m2 of blob.matchAll(/value\s*>\s*(\d+)/gi)) {
        const n2 = Number(m2[1]);
        if (n2 > max && n2 < 1e5) max = n2;
      }
    }
    return max;
  }
  function extractPostForm(doc) {
    var _a;
    const form = doc.querySelector('form[action*="post.php"]') || doc.querySelector('form[name="FORM"]') || doc.querySelector("#main form");
    if (!form) return null;
    const fields = {};
    for (const el of Array.from(form.elements)) {
      if (!el.name) continue;
      if (el.type === "checkbox" || el.type === "radio") {
        if (el.checked) fields[el.name] = el.value;
        continue;
      }
      if (el.type === "file" || el.type === "submit" || el.type === "button") continue;
      fields[el.name] = el.value ?? "";
    }
    const action = form.getAttribute("action") || "post.php";
    const verify = parseVerifyhash(doc.documentElement.innerHTML);
    if (verify && !fields.verify) fields.verify = verify;
    const hexie = (_a = doc.documentElement.innerHTML.match(
      /document\.FORM\._hexie\.value\s*=\s*'([^']+)'/i
    )) == null ? void 0 : _a[1];
    if (hexie) fields._hexie = hexie;
    return { action, fields };
  }
  function extractComposeTypes(doc) {
    const items = [];
    for (const li of Array.from(doc.querySelectorAll("#menu_p_type li"))) {
      const onclick = li.getAttribute("onclick") || "";
      const m2 = onclick.match(/selectPtype\('(\d+)'\)/);
      const name = (li.textContent || "").trim();
      if (m2 && name && name !== "--" && m2[1] !== "0" && name !== "选择分类") {
        items.push({ id: m2[1], name });
      }
    }
    if (items.length) return items;
    for (const opt of Array.from(
      doc.querySelectorAll('select[name="p_type"] option, select[name="typeid"] option')
    )) {
      const id = opt.value;
      const name = (opt.textContent || "").trim();
      if (id && name && name !== "--" && name !== "选择分类") items.push({ id, name });
    }
    return items;
  }
  function extractComposeOptionFlags(doc) {
    const anon = doc.querySelector('input[name="atc_anonymous"]');
    const hide = doc.querySelector('input[name="atc_hide"]');
    const sell = doc.querySelector('input[name="atc_requiresell"]');
    const enhide = doc.querySelector('input[name="atc_requireenhide"]');
    return {
      anonymousEnabled: !!anon && !anon.disabled,
      hideEnabled: !!hide && !hide.disabled,
      sellEnabled: !!sell && !sell.disabled,
      enhideEnabled: !!enhide && !enhide.disabled
    };
  }
  function parseThreadDetail(html, doc, tid, page) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const err = detectShowMsg(html, doc);
    const verifyhash = parseVerifyhash(html);
    if (err) {
      return {
        tid,
        fid: 0,
        title: "",
        floors: [],
        page,
        totalPages: 1,
        canReply: false,
        canFavor: false,
        isVote: false,
        verifyhash,
        error: err
      };
    }
    const rawTitle = extractSubjectTitle(doc) || cleanTitle(doc.title) || "";
    const typeTags = [];
    for (const a2 of doc.querySelectorAll(
      '#breadCrumb a[href*="type="], .breadCrumb a[href*="type="], a.view[href*="type="], h1 a[href*="type="], #subject_tpc a[href*="type="]'
    )) {
      const href = a2.getAttribute("href") || "";
      const name = (a2.textContent || "").replace(/[\[\]【】]/g, "").trim();
      const typeId = (_a = href.match(/[?&]type=(\d+)/)) == null ? void 0 : _a[1];
      if (!name || /倒序|收藏|复制/.test(name)) continue;
      if (!typeTags.some((t2) => t2.name === name)) typeTags.push({ name, typeId, href });
    }
    const split = splitTitleTypes(rawTitle);
    for (const t2 of split.typeTags) {
      if (!typeTags.some((x2) => x2.name === t2.name)) typeTags.push(t2);
    }
    let title = typeTags.length ? split.title || rawTitle : rawTitle;
    const crumbForum = [...doc.querySelectorAll("#breadCrumb a, .breadCrumb a")].find((a2) => {
      const href = a2.getAttribute("href") || "";
      return /thread\.php\?[^#]*\bfid=\d+/i.test(href) && !/[?&]type=/.test(href);
    });
    const forumName = ((_b = crumbForum == null ? void 0 : crumbForum.textContent) == null ? void 0 : _b.trim()) || [...doc.querySelectorAll("#breadCrumb a, .breadCrumb a")].map((a2) => {
      var _a2;
      return {
        text: ((_a2 = a2.textContent) == null ? void 0 : _a2.trim()) || "",
        href: a2.getAttribute("href") || ""
      };
    }).filter(
      (t2) => t2.text && t2.text !== "方舆" && !/新帖|精华/.test(t2.text) && !/read\.php\?.*\btid=/i.test(t2.href)
    ).map((t2) => t2.text)[0];
    const fid = Number(
      ((_d = (_c = crumbForum == null ? void 0 : crumbForum.getAttribute("href")) == null ? void 0 : _c.match(/fid=(\d+)/)) == null ? void 0 : _d[1]) || ((_e = html.match(/\bfid\s*=\s*['"]?(\d+)/i)) == null ? void 0 : _e[1]) || ((_h = (_g = (_f = doc.querySelector('a[href*="thread.php?fid="]')) == null ? void 0 : _f.href) == null ? void 0 : _g.match(
        /fid=(\d+)/
      )) == null ? void 0 : _h[1]) || 0
    );
    title = stripForumTitlePrefix(title, forumName);
    const floors = parseFloors(doc);
    const totalPages = parseMaxPage(doc);
    const canReply = !!doc.querySelector(
      'a[href*="post.php"][href*="tid="], textarea[name="atc_content"], #fastpostform'
    );
    const canFavor = /favor|收藏/.test(html);
    const isVote = !!doc.querySelector('form[action*="vote"], .vote');
    const voteEl = doc.querySelector('.vote, form[action*="job.php?action=vote"]');
    const voteHtml = voteEl ? enhanceContentHtml(voteEl.innerHTML) : void 0;
    const replyForm = extractPostForm(doc);
    const fast = doc.querySelector('#fastpostform, form[name="FORM"]');
    let replyFields = replyForm == null ? void 0 : replyForm.fields;
    if (fast) {
      replyFields = {};
      for (const el of Array.from(fast.elements)) {
        if (!el.name || el.type === "file" || el.type === "submit" || el.type === "button") continue;
        if ((el.type === "checkbox" || el.type === "radio") && !el.checked) continue;
        replyFields[el.name] = el.value ?? "";
      }
      if (verifyhash) replyFields.verify = verifyhash;
    }
    const hexie = (_i = html.match(/document\.FORM\._hexie\.value\s*=\s*'([^']+)'/i)) == null ? void 0 : _i[1];
    if (replyFields && hexie) replyFields._hexie = hexie;
    return {
      tid,
      fid,
      title,
      typeTags: typeTags.length ? typeTags : void 0,
      forumName,
      floors,
      page,
      totalPages,
      canReply,
      canFavor,
      isVote,
      voteHtml,
      verifyhash,
      replyAction: (replyForm == null ? void 0 : replyForm.action) || ((fast == null ? void 0 : fast.getAttribute("action")) || void 0),
      replyForm: replyFields
    };
  }
  function cleanTitle(t2) {
    return t2.replace(/\s*-?\s*Powered by phpwind.*/i, "").replace(/^方舆\s*-?\s*/, "").trim();
  }
  function extractSubjectTitle(doc) {
    const el = doc.querySelector("#subject_tpc, span#subject_tpc, h1.read_h1, .read_h1") || doc.querySelector("h1");
    if (!el) return "";
    const clone = el.cloneNode(true);
    for (const n2 of clone.querySelectorAll(
      'a.gray, a[onclick*="copyUrl"], a[title*="复制"], script, style'
    )) {
      n2.remove();
    }
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }
  function parseFloors(doc) {
    const floors = [];
    const blocks = [...doc.querySelectorAll("div.read_t")];
    if (blocks.length) {
      blocks.forEach((el, idx) => {
        const floor = parseReadFloor(el, idx);
        if (floor) floors.push(floor);
      });
      return floors;
    }
    const contents = [...doc.querySelectorAll('.tpc_content, [id^="read_"]:not([id^="read_send"]):not([id^="readFace"]):not([id^="readfloor"])')];
    contents.forEach((c2, idx) => {
      const block = c2.closest("div.read_t, table.floot, .t5") || c2.parentElement;
      if (!block) return;
      const floor = parseReadFloor(block, idx);
      if (floor) floors.push(floor);
    });
    return floors;
  }
  function parseReadFloor(el, idx) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const contentEl = el.querySelector(".tpc_content") || el.querySelector('[id^="read_"]:not([id^="read_send"]):not([id^="readFace"]):not([id^="readfloor"])') || el.querySelector("#read_tpc");
    if (!contentEl) return null;
    const authorA = el.querySelector('.readName a[href*="u.php"]') || el.querySelector('td.floot_left a[href*="u.php?uid="]');
    let author = ((_a = authorA == null ? void 0 : authorA.textContent) == null ? void 0 : _a.replace(/\s+/g, " ").trim()) || "";
    let authorUid = Number(((_b = ((authorA == null ? void 0 : authorA.getAttribute("href")) || "").match(/uid=(\d+)/)) == null ? void 0 : _b[1]) || 0) || void 0;
    const avatarImg = el.querySelector("td.floot_left .readFace a.userCard img.pic") || el.querySelector("td.floot_left .readFace img.pic") || el.querySelector("td.floot_left a.face_img img");
    let avatarUrl = (avatarImg == null ? void 0 : avatarImg.getAttribute("src")) || void 0;
    if (avatarUrl) avatarUrl = absUrl(avatarUrl);
    if (!authorUid && avatarUrl) {
      authorUid = Number(((_c = avatarUrl.match(/\/(\d+)\.(?:png|jpe?g|gif)/i)) == null ? void 0 : _c[1]) || 0) || void 0;
    }
    if (!author && authorUid) author = `用户${authorUid}`;
    if (!author) author = "匿名";
    const floorNumEl = el.querySelector('.tipTop a.s2, .tipTop a[onclick*="copyFloorUrl"]');
    let floor = Number(((floorNumEl == null ? void 0 : floorNumEl.textContent) || "").trim() || 0);
    if (!floor) {
      if (/readfloor_tpc/i.test(el.id) || contentEl.id === "read_tpc") floor = 0;
      else floor = idx;
    }
    const displayFloor = /readfloor_tpc/i.test(el.id) || contentEl.id === "read_tpc" ? 0 : floor || idx;
    const editHref = ((_d = el.querySelector('a[href*="action=modify"]')) == null ? void 0 : _d.getAttribute("href")) || "";
    const quoteHref = ((_e = el.querySelector('a[href*="action=quote"]')) == null ? void 0 : _e.getAttribute("href")) || "";
    const linkPidRaw = ((_f = editHref.match(/[?&]pid=([^&#]+)/)) == null ? void 0 : _f[1]) || ((_g = quoteHref.match(/[?&]pid=([^&#]+)/)) == null ? void 0 : _g[1]) || "";
    const linkPid = /^\d+$/.test(linkPidRaw) ? Number(linkPidRaw) : 0;
    const articleMatch = editHref.match(/[?&]article=(\d+)/) || quoteHref.match(/[?&]article=(\d+)/);
    const articleFromLink = articleMatch ? Number(articleMatch[1]) : void 0;
    const pid = Number(
      linkPid || ((_h = (contentEl.id || "").match(/^read_(\d+)$/)) == null ? void 0 : _h[1]) || ((_i = (el.id || "").match(/readfloor_(\d+)/)) == null ? void 0 : _i[1]) || ((_k = (((_j = el.querySelector('a[name^="post_"]')) == null ? void 0 : _j.getAttribute("name")) || "").match(/post_(\d+)/)) == null ? void 0 : _k[1]) || ((_m = (((_l = el.querySelector('a[name^="a"][name*="ajax"]')) == null ? void 0 : _l.getAttribute("name")) || "").match(/(\d+)/)) == null ? void 0 : _m[1]) || 0
    );
    const pidParam = linkPidRaw || (pid ? String(pid) : "") || (/readfloor_tpc/i.test(el.id) || contentEl.id === "read_tpc" ? "tpc" : "");
    const dateSpan = el.querySelector(".tipTop span[title]");
    const postDate = (dateSpan == null ? void 0 : dateSpan.getAttribute("title")) || ((_o = (((_n = el.querySelector(".tipTop")) == null ? void 0 : _n.textContent) || "").match(
      /\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2}(?::\d{2})?/
    )) == null ? void 0 : _o[0]) || ((_p = (el.textContent || "").match(/发表于[:：]\s*([^\s]+(?:\s+\d{2}:\d{2})?)/)) == null ? void 0 : _p[1]);
    const canEdit = /编辑/.test(el.innerHTML) && !!el.querySelector('a[href*="modify"], a[href*="action=modify"]');
    const canDelete = /删除/.test(el.innerHTML) && !!el.querySelector('a[href*="del"], a[onclick*="del"]');
    const canQuote = /引用|回复/.test(el.innerHTML) || !!el.querySelector('a[href*="quote"], a[onclick*="quote"], a[onclick*="postreply"]');
    const attachments = parseAttachments(contentEl);
    const contentHtml = enhanceContentHtml(wrapWithElementFont(contentEl, contentEl.innerHTML));
    return {
      pid: pid || 0,
      pidParam: pidParam || String(pid || idx + 1),
      floor: displayFloor,
      article: articleFromLink !== void 0 ? articleFromLink : displayFloor > 0 ? displayFloor : void 0,
      author,
      authorUid,
      avatarUrl,
      postDate: postDate || void 0,
      contentHtml,
      canEdit,
      canDelete,
      canQuote,
      attachments
    };
  }
  function parseAttachments(scope) {
    var _a;
    const items = [];
    for (const a2 of scope.querySelectorAll('a[href*="job.php?action=download"], a[href*="attachment/"]')) {
      const href = absUrl(a2.getAttribute("href"));
      const name = (a2.textContent || "").trim() || "附件";
      const aid = Number(((_a = href.match(/aid=(\d+)/)) == null ? void 0 : _a[1]) || 0) || void 0;
      items.push({ aid, name, url: href, isImage: false });
    }
    for (const img of scope.querySelectorAll('img[src*="attachment/"], img[src*="job.php"]')) {
      if (img.closest(".readFace, .floot_left")) continue;
      const src = absUrl(img.getAttribute("src"));
      if (!src) continue;
      items.push({ name: "图片附件", url: src, isImage: true });
    }
    return items;
  }
  async function fetchThreadList(opts) {
    const page = opts.page || 1;
    const path = `thread.php` + qs({
      fid: opts.fid,
      page,
      type: opts.type,
      special: opts.special,
      search: opts.search,
      orderway: opts.orderway,
      asc: opts.orderway ? "DESC" : void 0
    });
    const { html } = await fetchHtml(path);
    const doc = parseDocument(html);
    return parseThreadList(html, doc, opts.fid, page);
  }
  async function fetchThreadDetail(tid, page = 1) {
    const path = `read.php` + qs({ tid, page });
    const { html } = await fetchHtml(path);
    const doc = parseDocument(html);
    return parseThreadDetail(html, doc, tid, page);
  }
  async function loadSession() {
    var _a, _b;
    const { html } = await fetchHtml("index.php", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" }
    });
    let session = parseSessionFromHtml(html);
    if ((/login\.php\?action=quit/i.test(html) || session.uid > 0) && (!session.username || session.username === "已登录" || session.username === "游客")) {
      try {
        const profile = await fetchHtml("u.php", { cache: "no-store" });
        const fromProfile = parseSessionFromHtml(profile.html);
        if (fromProfile.uid > 0) {
          session = {
            ...session,
            uid: fromProfile.uid || session.uid,
            username: fromProfile.username && fromProfile.username !== "游客" ? fromProfile.username : session.username,
            groupid: fromProfile.groupid || session.groupid,
            verifyhash: fromProfile.verifyhash || session.verifyhash,
            loggedIn: true
          };
        }
        if (!session.username || session.username === "已登录") {
          const heading = ((_a = profile.html.match(/id=["']td_userinfomore["'][\s\S]*?<span>([^<]+)<\/span>/i)) == null ? void 0 : _a[1]) || ((_b = profile.html.match(/<img[^>]+alt=["']([^"']+)["']/i)) == null ? void 0 : _b[1]);
          if (heading && !/个人中心|提示信息|登录/.test(heading)) {
            session = { ...session, username: heading.trim(), loggedIn: true };
          }
        }
      } catch {
      }
    }
    return session;
  }
  async function fetchLoginPage() {
    var _a, _b, _c, _d;
    const { html } = await fetchHtml("login.php", { cache: "no-store" });
    const verifyhash = ((_a = html.match(/verifyhash\s*=\s*['"]([^'"]+)/i)) == null ? void 0 : _a[1]) || "";
    const cloudgdcode = /cloudgdcode\s*=\s*1/.test(html) || /cloudcaptchaurl\s*=/.test(html);
    const cloud = ((_b = html.match(/cloudcaptchaurl\s*=\s*["']([^"']+)/i)) == null ? void 0 : _b[1]) || null;
    const sessionid = ((_c = cloud == null ? void 0 : cloud.match(/sessionid=([^&]+)/)) == null ? void 0 : _c[1]) || ((_d = html.match(/cloudcksessionid=([^;"\s]+)/)) == null ? void 0 : _d[1]) || null;
    let captchaUrl = null;
    if (cloud) {
      const base = cloud.replace(/nowtime=\d+/g, "").replace(/&&+/g, "&");
      captchaUrl = `${base}${base.endsWith("&") || base.endsWith("?") ? "" : "&"}nowtime=${Date.now()}&`;
    } else {
      captchaUrl = forumUrl(`ck.php?nowtime=${Date.now()}`);
    }
    return {
      captchaUrl,
      sessionid,
      verifyhash,
      jumpurl: location.href,
      cloudgdcode
    };
  }
  function refreshCaptchaUrl(base) {
    if (!base) return forumUrl(`ck.php?nowtime=${Date.now()}`);
    const cleaned = base.replace(/nowtime=\d+/g, "").replace(/&&+/g, "&");
    const join = cleaned.includes("?") ? cleaned.endsWith("&") || cleaned.endsWith("?") ? "" : "&" : "?";
    return `${cleaned}${join}nowtime=${Date.now()}&`;
  }
  async function login(opts) {
    const data = {
      pwuser: opts.username.trim(),
      pwpwd: opts.password,
      gdcode: opts.gdcode.trim(),
      step: "2",
      lgt: "0",
      jumpurl: opts.jumpurl || forumUrl("index.php"),
      forward: "",
      m: "bbs",
      hideid: opts.hideid,
      cktime: opts.remember === false ? "0" : "31536000"
    };
    const { html, url } = await postForm("login.php?", data);
    const session = await loadSession();
    if (session.uid > 0 || session.loggedIn) {
      if (!session.username || session.username === "已登录" || session.username === "游客") {
        session.username = opts.username.trim();
        session.loggedIn = true;
      }
      return { ok: true, message: "登录成功", session };
    }
    if (/登录成功|欢迎您回来|正在返回|登陆成功/.test(html)) {
      return {
        ok: true,
        message: "登录成功",
        session: {
          uid: 0,
          username: opts.username.trim(),
          groupid: 0,
          verifyhash: "",
          loggedIn: true
        }
      };
    }
    const tipText = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    let msg = "登录失败";
    if (/验证码/.test(tipText)) msg = "验证码错误或已过期，请点击图片刷新后重试";
    else if (/密码|用户名|帐号|账号/.test(tipText)) msg = "用户名或密码错误";
    else if (/提示信息/.test(html)) msg = tipText.slice(0, 160) || msg;
    else msg = `登录失败 (${url})`;
    return { ok: false, message: msg };
  }
  async function logout() {
    try {
      const { html } = await fetchHtml("index.php", { cache: "no-store" });
      const verify = extractQuitVerify(html) || parseSessionFromHtml(html).verifyhash;
      if (verify) {
        await fetchHtml(`login.php?action=quit&verify=${verify}`);
        return;
      }
    } catch {
    }
    await fetchHtml("login.php?action=quit");
  }
  async function loadComposeForm(opts) {
    var _a;
    let path;
    if (opts.editPid && opts.tid) {
      path = `post.php` + qs({
        action: "modify",
        fid: opts.fid || void 0,
        tid: opts.tid,
        pid: opts.editPid,
        article: opts.article
      });
    } else if (opts.tid && opts.quotePid) {
      path = `post.php` + qs({ fid: opts.fid, tid: opts.tid, action: "quote", pid: opts.quotePid, article: opts.article });
    } else if (opts.tid) {
      path = `post.php` + qs({ fid: opts.fid, tid: opts.tid, action: "reply" });
    } else {
      path = `post.php` + qs({ fid: opts.fid });
    }
    const { html } = await fetchHtml(path);
    const doc = parseDocument(html);
    const err = detectShowMsg(html, doc);
    if (err) {
      throw new Error(err.message);
    }
    const extracted = extractPostForm(doc);
    const verifyhash = parseVerifyhash(html) || (extracted == null ? void 0 : extracted.fields.verify) || "";
    const fields = (extracted == null ? void 0 : extracted.fields) || { verify: verifyhash, fid: String(opts.fid) };
    if (opts.tid) fields.tid = String(opts.tid);
    if (!fields.action) fields.action = opts.tid ? "reply" : "new";
    const showTitle = !opts.tid || opts.editPid != null && (opts.article === 0 || opts.article == null);
    const titleRequired = showTitle;
    const imageTabs = (_a = html.match(/imageConfig\s*=\s*\{[\s\S]*?tabs\s*:\s*\[([^\]]*)\]/i)) == null ? void 0 : _a[1];
    const uploadEnabled = imageTabs ? /['"]local['"]/.test(imageTabs) : !!doc.querySelector('input[type="file"], .B_fileIcon, a[title*="附件"]');
    return {
      action: (extracted == null ? void 0 : extracted.action) || path,
      fields,
      verifyhash,
      titleRequired,
      showTitle,
      uploadEnabled,
      types: extractComposeTypes(doc),
      options: extractComposeOptionFlags(doc)
    };
  }
  async function submitPost(opts) {
    var _a;
    const data = { ...opts.fields };
    if (opts.title !== void 0) data.atc_title = opts.title;
    data.atc_content = opts.content;
    if (!data.ajax) data.ajax = "1";
    const actionUrl = opts.action.includes("http") ? opts.action : forumUrl(opts.action);
    const u2 = new URL(actionUrl, forumUrl(""));
    if (!u2.searchParams.has("nowtime")) u2.searchParams.set("nowtime", String(Date.now()));
    if (data.verify && !u2.searchParams.has("verify")) u2.searchParams.set("verify", data.verify);
    let html;
    let url;
    if ((_a = opts.files) == null ? void 0 : _a.length) {
      const fd = new FormData();
      for (const [k2, v2] of Object.entries(data)) fd.append(k2, v2 ?? "");
      opts.files.forEach((f2, i2) => {
        fd.append(`attachment_${i2 + 1}`, f2);
        fd.append("attachment", f2);
      });
      const res = await postMultipart(u2.pathname + u2.search, fd);
      html = res.html;
      url = res.url;
    } else {
      const res = await postForm(u2.pathname.replace(/^\/lt\//, "") + u2.search, data);
      html = res.html;
      url = res.url;
    }
    return interpretPostResponse(html, url);
  }
  function interpretPostResponse(html, url) {
    var _a;
    const parts = html.split("	");
    const first = (parts[0] || "").trim();
    if (first === "success") {
      const target = (parts[1] || "").trim();
      return {
        ok: true,
        message: "发表成功",
        redirect: /read\.php\?tid=/.test(target) ? target : void 0
      };
    }
    if (first === "error") {
      return { ok: false, message: (parts[1] || "提交失败").trim() };
    }
    if (parts.length >= 2 && /jump|reload|nextto/i.test(parts[1])) {
      return {
        ok: true,
        message: parts[0].replace(/<[^>]+>/g, "").trim() || "发表成功",
        redirect: parts[1] === "jump" ? parts[2] : void 0
      };
    }
    if (/发表成功|发帖成功|回复成功|编辑成功|正在返回|read\.php\?tid=/.test(html)) {
      const tid = (_a = html.match(/read\.php\?tid=(\d+)/)) == null ? void 0 : _a[1];
      return {
        ok: true,
        message: "发表成功",
        redirect: tid ? `read.php?tid=${tid}` : url
      };
    }
    const err = detectShowMsg(html, parseDocument(html));
    if (err) return { ok: false, message: err.message };
    const cleaned = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (cleaned.length < 300 && /失败|错误|不能|禁止|验证|权限/.test(cleaned)) {
      return { ok: false, message: cleaned.slice(0, 200) };
    }
    if (/read\.php\?tid=/.test(url)) {
      return { ok: true, message: "已提交", redirect: url };
    }
    return { ok: false, message: cleaned.slice(0, 180) || "提交失败，请检查权限或内容" };
  }
  async function deletePost(opts) {
    const { html, url } = await postForm(`post.php?fid=${opts.fid}`, {
      step: "1",
      action: "modify",
      fid: String(opts.fid),
      tid: String(opts.tid),
      pid: String(opts.pid),
      article: String(opts.article ?? 0),
      verify: opts.verifyhash,
      _hexie: "cn0zz"
    });
    if (/read\.php\?tid=|after_delete|删除成功|已删除/.test(html) || /read\.php\?tid=/.test(url)) {
      return { ok: true, message: "已删除" };
    }
    const err = detectShowMsg(html, parseDocument(html));
    return { ok: false, message: (err == null ? void 0 : err.message) || "删除失败或没有权限" };
  }
  async function favorThread(tid, verifyhash) {
    const path = `apps.php` + qs({
      q: "collection",
      a: "favor",
      type: "postfavor",
      ajax: "1",
      id: tid,
      verify: verifyhash || void 0,
      nowtime: Date.now()
    });
    const { html, status } = await fetchHtml(path);
    const cleaned = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (status >= 400) return { ok: false, message: `收藏失败 (HTTP ${status})` };
    if (/success|收藏成功|已收藏|favor/i.test(html) && !/失败|错误|error/i.test(cleaned)) {
      return { ok: true, message: "收藏成功" };
    }
    const err = detectShowMsg(html, parseDocument(html));
    return { ok: false, message: (err == null ? void 0 : err.message) || cleaned.slice(0, 160) || "收藏失败或已收藏" };
  }
  async function searchForum(opts) {
    if (opts.schTime || opts.digest) {
      const path = `searcher.php` + qs({
        sch_time: opts.schTime,
        digest: opts.digest ? 1 : void 0,
        page: opts.page || 1,
        keyword: opts.keyword || void 0
      });
      const { html: html2 } = await fetchHtml(path);
      return parseSearchResults(html2, opts.page || 1);
    }
    let verify = opts.verifyhash;
    if (!verify) {
      const { html: html2 } = await fetchHtml("index.php");
      verify = parseVerifyhash(html2);
    }
    const { html } = await postForm("searcher.php", {
      verify: verify || "",
      step: "2",
      type: opts.type || "thread",
      keyword: opts.keyword
    });
    return parseSearchResults(html, opts.page || 1);
  }
  function parseSearchResults(html, page) {
    var _a, _b, _c;
    const doc = parseDocument(html);
    const items = [];
    const seen = /* @__PURE__ */ new Set();
    for (const a2 of doc.querySelectorAll('a[href*="read.php?tid="]')) {
      const tid = Number(((_a = (a2.getAttribute("href") || "").match(/tid=(\d+)/)) == null ? void 0 : _a[1]) || 0);
      const title = (a2.textContent || "").trim();
      if (!tid || !title || seen.has(tid)) continue;
      seen.add(tid);
      const row = a2.closest("tr, li, div");
      const author = (_c = (_b = row == null ? void 0 : row.querySelector('a[href*="u.php"]')) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim();
      items.push({ tid, title, author });
      if (items.length >= 50) break;
    }
    if (items.length) return { items, page };
    const err = detectShowMsg(html, doc);
    if (err) return { items: [], error: err.message, page };
    return { items: [], page };
  }
  async function fetchUserProfile(opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const path = `u.php` + qs({
      uid: opts.uid,
      username: opts.username
    });
    const { html } = await fetchHtml(path);
    const doc = parseDocument(html);
    const err = detectShowMsg(html, doc);
    if (err) return { threads: [], error: err.message };
    const username = ((_b = (_a = doc.querySelector(".u-name, .username, h1")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || opts.username || "用户";
    const uid = opts.uid || Number(((_c = html.match(/uid=(\d+)/)) == null ? void 0 : _c[1]) || 0) || Number(((_f = (_e = (_d = doc.querySelector('a[href*="uid="]')) == null ? void 0 : _d.href) == null ? void 0 : _e.match(/uid=(\d+)/)) == null ? void 0 : _f[1]) || 0);
    const avatar = ((_g = doc.querySelector("img.pic, .user-face img, .face img")) == null ? void 0 : _g.src) || void 0;
    const credits = {};
    for (const li of doc.querySelectorAll("li, tr, .u-info span")) {
      const t2 = (li.textContent || "").replace(/\s+/g, " ").trim();
      const m2 = t2.match(/^(发帖|积分|威望|金钱|贡献|精华)[:：\s]+(.+)$/);
      if (m2) credits[m2[1]] = m2[2];
    }
    const groupName = (((_h = html.match(/用户组[:：]\s*([^<\n]+)/)) == null ? void 0 : _h[1]) || "").trim() || ((_j = (_i = doc.querySelector(".group, .level")) == null ? void 0 : _i.textContent) == null ? void 0 : _j.trim());
    const threads = [];
    const seen = /* @__PURE__ */ new Set();
    for (const a2 of doc.querySelectorAll('a[href*="read.php?tid="]')) {
      const tid = Number(((_k = (a2.getAttribute("href") || "").match(/tid=(\d+)/)) == null ? void 0 : _k[1]) || 0);
      const title = (a2.textContent || "").trim();
      if (!tid || !title || seen.has(tid)) continue;
      seen.add(tid);
      threads.push({
        tid,
        title,
        author: username,
        replies: 0,
        hits: 0,
        topped: false,
        digest: false,
        vote: false,
        hasImage: false,
        isNew: false,
        multipage: false
      });
      if (threads.length >= 30) break;
    }
    return {
      profile: {
        uid,
        username,
        groupName,
        credits,
        avatarUrl: avatar ? absUrl(avatar) : void 0,
        signatureHtml: (_l = doc.querySelector(".signature, .sign")) == null ? void 0 : _l.innerHTML
      },
      threads
    };
  }
  async function fetchMessages() {
    var _a, _b, _c;
    const { html } = await fetchHtml("message.php");
    const doc = parseDocument(html);
    const err = detectShowMsg(html, doc);
    if (err) return { items: [], error: err.message };
    const items = [];
    for (const a2 of doc.querySelectorAll('a[href*="message.php"], a[href*="mid="]')) {
      const href = a2.getAttribute("href") || "";
      const title = (a2.textContent || "").trim();
      if (!title || title.length < 1) continue;
      if (!/mid=|type=|action=/.test(href) && !href.includes("message.php")) continue;
      const row = a2.closest("tr, li");
      items.push({
        id: ((_a = href.match(/mid=(\d+)/)) == null ? void 0 : _a[1]) || String(items.length),
        from: ((_c = (_b = row == null ? void 0 : row.querySelector('a[href*="u.php"]')) == null ? void 0 : _b.textContent) == null ? void 0 : _c.trim()) || "",
        title,
        href,
        unread: /new|未读|strong/.test((row == null ? void 0 : row.innerHTML) || "")
      });
      if (items.length >= 50) break;
    }
    if (!items.length) {
      for (const tr of doc.querySelectorAll("tr")) {
        const t2 = (tr.textContent || "").trim();
        if (t2.length < 4) continue;
        const a2 = tr.querySelector("a");
        if (!a2) continue;
        items.push({
          id: String(items.length),
          from: "",
          title: (a2.textContent || t2).trim().slice(0, 80),
          href: a2.getAttribute("href") || "message.php"
        });
        if (items.length >= 30) break;
      }
    }
    return { items };
  }
  async function sendMessage(opts) {
    let verify = opts.verifyhash;
    if (!verify) {
      const { html: html2 } = await fetchHtml("message.php");
      verify = parseVerifyhash(html2);
    }
    const { html } = await postForm("message.php?type=post", {
      verify: verify || "",
      step: "2",
      usernames: opts.to,
      msg_title: opts.title,
      msg_content: opts.content,
      atc_content: opts.content
    });
    if (/成功|已发送/.test(html)) return { ok: true, message: "发送成功" };
    const err = detectShowMsg(html, parseDocument(html));
    return { ok: false, message: (err == null ? void 0 : err.message) || html.replace(/<[^>]+>/g, " ").trim().slice(0, 160) || "发送失败" };
  }
  async function fetchUnreadHint(_verifyhash) {
    try {
      const { html } = await fetchHtml("message.php", { cache: "no-store" });
      if (/提示信息|没有登录/.test(html) && !/条未读消息/.test(html)) return 0;
      const unreadLink = html.match(
        /message\.php\?[^"'<>]*action=unread[^"'<>]*?>[\s\S]*?<b>\s*(\d+)\s*<\/b>\s*条未读/i
      );
      if (unreadLink) return Number(unreadLink[1] || 0);
      const plain = html.match(/<b>\s*(\d+)\s*<\/b>\s*条未读消息/i);
      if (plain) return Number(plain[1] || 0);
      const doc = parseDocument(html);
      let sum = 0;
      for (const em of doc.querySelectorAll('a[href*="message.php?type="] em')) {
        const n2 = Number((em.textContent || "").replace(/\D/g, "") || 0);
        if (n2 > 0) sum += n2;
      }
      return sum;
    } catch {
      return 0;
    }
  }
  async function submitVote(opts) {
    const data = {};
    for (const [k2, v2] of Object.entries(opts.extra || {})) {
      if (/^voteid(\[.*\])?$/.test(k2)) continue;
      data[k2] = v2;
    }
    data.verify = opts.verifyhash;
    data.tid = String(opts.tid);
    data.voteid = opts.selected.join("|");
    const path = `job.php` + qs({ action: "vote", nowtime: Date.now() });
    const { html } = await postForm(path, data);
    const parts = html.split("	");
    const first = (parts[0] || "").trim();
    if (first === "success") return { ok: true, message: "投票成功" };
    if (first === "error") return { ok: false, message: (parts[1] || "投票失败").trim() };
    if (/success|投票成功|谢谢|已投/.test(html)) return { ok: true, message: "投票成功" };
    const err = detectShowMsg(html, parseDocument(html));
    if (err) return { ok: false, message: err.message };
    const cleaned = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return { ok: false, message: cleaned.slice(0, 160) || "投票失败" };
  }
  function UserNameLink(props) {
    var _a, _b;
    const name = (_a = props.name) == null ? void 0 : _a.trim();
    if (!name) return null;
    const uid = props.uid && props.uid > 0 ? props.uid : void 0;
    const username = ((_b = props.username) == null ? void 0 : _b.trim()) || name;
    const href = uid ? `u.php?uid=${uid}` : `u.php?username=${encodeURIComponent(username)}`;
    return /* @__PURE__ */ u$1("a", { href, class: "xzqh-user-link", children: name });
  }
  function HomeFeedList(props) {
    const items = props.items.slice(0, 20);
    if (!items.length) return /* @__PURE__ */ u$1("div", { class: "xzqh-muted", children: "暂无数据" });
    return /* @__PURE__ */ u$1("div", { class: "xzqh-list xzqh-home-feed-list", children: items.map((t2) => /* @__PURE__ */ u$1("div", { class: "xzqh-item", children: /* @__PURE__ */ u$1("div", { class: "xzqh-item-main", children: [
      /* @__PURE__ */ u$1("div", { class: "xzqh-subject-line", children: [
        t2.forumName && /* @__PURE__ */ u$1("span", { class: "xzqh-badges", children: /* @__PURE__ */ u$1(
          "a",
          {
            class: "xzqh-badge",
            href: t2.fid ? `thread.php?fid=${t2.fid}` : void 0,
            onClick: (e2) => {
              if (!t2.fid) return;
              e2.preventDefault();
              navigate({ name: "forum", fid: t2.fid, page: 1 });
            },
            children: t2.forumName
          }
        ) }),
        /* @__PURE__ */ u$1(
          "a",
          {
            class: "title",
            href: `read.php?tid=${t2.tid}`,
            onClick: (e2) => {
              e2.preventDefault();
              navigate({ name: "thread", tid: t2.tid, page: 1 });
            },
            children: t2.title
          }
        )
      ] }),
      (t2.author || t2.time) && /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: [
        t2.author || "",
        t2.time ? ` · ${t2.time}` : ""
      ] })
    ] }) }, `${props.keyPrefix}-${t2.tid}-${t2.title}`)) });
  }
  function HomePage() {
    const [cats, setCats] = d([]);
    const [latestTopics, setLatestTopics] = d([]);
    const [recentReplies, setRecentReplies] = d([]);
    const [footer, setFooter] = d(null);
    const [feedTab, setFeedTab] = d("topics");
    const [err, setErr] = d("");
    const [loading, setLoading] = d(true);
    h(() => {
      let alive = true;
      (async () => {
        try {
          const data = await fetchForumIndex();
          if (!alive) return;
          setCats(data.categories);
          setLatestTopics(data.latestTopics);
          setRecentReplies(data.recentReplies);
          setFooter(data.footer);
          if (!data.latestTopics.length && data.recentReplies.length) setFeedTab("replies");
        } catch (e2) {
          if (alive) setErr(e2 instanceof Error ? e2.message : "加载失败");
        } finally {
          if (alive) setLoading(false);
        }
      })();
      return () => {
        alive = false;
      };
    }, []);
    if (loading) return /* @__PURE__ */ u$1(Loading, {});
    const showFeed = latestTopics.length > 0 || recentReplies.length > 0;
    const showFooter = !!footer && (footer.friendLinks.length > 0 || !!footer.onlineSummary || footer.onlineUsers.length > 0 || footer.memberGroups.length > 0);
    return /* @__PURE__ */ u$1("div", { children: [
      err && /* @__PURE__ */ u$1(Alert, { type: "error", children: err }),
      /* @__PURE__ */ u$1("div", { class: "xzqh-panel xzqh-home-feed", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: "方舆论坛" }),
        showFeed && /* @__PURE__ */ u$1(S, { children: [
          /* @__PURE__ */ u$1("div", { class: "xzqh-types xzqh-home-feed-tabs", children: [
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: feedTab === "topics" ? "active" : "",
                onClick: () => setFeedTab("topics"),
                children: [
                  "最新主题",
                  latestTopics.length ? ` (${latestTopics.length})` : ""
                ]
              }
            ),
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: feedTab === "replies" ? "active" : "",
                onClick: () => setFeedTab("replies"),
                children: [
                  "最近回复",
                  recentReplies.length ? ` (${recentReplies.length})` : ""
                ]
              }
            )
          ] }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-home-feed-cols", children: [
            /* @__PURE__ */ u$1(
              "section",
              {
                class: `xzqh-home-feed-col${feedTab === "topics" ? " is-active" : ""}`,
                "data-feed": "topics",
                children: [
                  /* @__PURE__ */ u$1("h2", { class: "xzqh-home-feed-col-title", children: [
                    "最新主题",
                    latestTopics.length ? ` (${latestTopics.length})` : ""
                  ] }),
                  /* @__PURE__ */ u$1(HomeFeedList, { items: latestTopics, keyPrefix: "topics" })
                ]
              }
            ),
            /* @__PURE__ */ u$1(
              "section",
              {
                class: `xzqh-home-feed-col${feedTab === "replies" ? " is-active" : ""}`,
                "data-feed": "replies",
                children: [
                  /* @__PURE__ */ u$1("h2", { class: "xzqh-home-feed-col-title", children: [
                    "最近回复",
                    recentReplies.length ? ` (${recentReplies.length})` : ""
                  ] }),
                  /* @__PURE__ */ u$1(HomeFeedList, { items: recentReplies, keyPrefix: "replies" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      cats.length === 0 && /* @__PURE__ */ u$1(Alert, { children: "未解析到版块分区，请刷新重试。" }),
      cats.map((c2) => /* @__PURE__ */ u$1("section", { class: "xzqh-cat xzqh-panel", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ u$1("h2", { class: "xzqh-cat-title", children: c2.name }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-grid-boards", children: c2.boards.map((b2) => /* @__PURE__ */ u$1("div", { class: "xzqh-board", children: /* @__PURE__ */ u$1("div", { class: "xzqh-board-main", children: [
          /* @__PURE__ */ u$1("div", { class: "xzqh-board-hd", children: [
            /* @__PURE__ */ u$1(
              "a",
              {
                class: "title",
                href: `thread.php?fid=${b2.fid}`,
                onClick: (e2) => {
                  e2.preventDefault();
                  navigate({ name: "forum", fid: b2.fid, page: 1 });
                },
                children: b2.name
              }
            ),
            b2.description && /* @__PURE__ */ u$1("div", { class: "xzqh-board-desc", children: b2.description })
          ] }),
          b2.lastTitle ? /* @__PURE__ */ u$1("div", { class: "xzqh-board-latest", children: [
            /* @__PURE__ */ u$1("span", { class: "xzqh-board-latest-label", children: "最新" }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-board-latest-body", children: [
              b2.lastTid ? /* @__PURE__ */ u$1(
                "a",
                {
                  class: "xzqh-board-latest-title",
                  href: `read.php?tid=${b2.lastTid}`,
                  onClick: (e2) => {
                    e2.preventDefault();
                    navigate({ name: "thread", tid: b2.lastTid, page: 1 });
                  },
                  children: b2.lastTitle
                }
              ) : /* @__PURE__ */ u$1("span", { class: "xzqh-board-latest-title", children: b2.lastTitle }),
              (b2.lastAuthor || b2.lastTime) && /* @__PURE__ */ u$1("div", { class: "xzqh-board-latest-meta", children: [
                b2.lastAuthor,
                b2.lastAuthor && b2.lastTime ? " · " : "",
                b2.lastTime
              ] })
            ] })
          ] }) : /* @__PURE__ */ u$1("div", { class: "xzqh-board-latest is-empty", children: "暂无新帖" }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-board-ft", children: [
            /* @__PURE__ */ u$1("div", { class: "xzqh-board-ft-meta", children: [
              b2.today != null ? /* @__PURE__ */ u$1("span", { children: [
                "今日 ",
                b2.today
              ] }) : null,
              /* @__PURE__ */ u$1("span", { children: [
                "版主 ",
                b2.moderators.slice(0, 3).join(" ") || "—"
              ] })
            ] }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-stats", children: [
              /* @__PURE__ */ u$1("span", { children: [
                b2.topics,
                " 主题"
              ] }),
              /* @__PURE__ */ u$1("span", { children: [
                b2.posts,
                " 帖子"
              ] })
            ] })
          ] })
        ] }) }, b2.fid)) })
      ] }, c2.name)),
      showFooter && footer && /* @__PURE__ */ u$1("section", { class: "xzqh-panel xzqh-home-footer", "aria-label": "站点信息", children: [
        footer.friendLinks.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-home-footer-block", children: [
          /* @__PURE__ */ u$1("h2", { class: "xzqh-home-footer-title", children: "友情链接" }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-friend-links", children: footer.friendLinks.map((l2) => /* @__PURE__ */ u$1(
            "a",
            {
              href: l2.href,
              target: "_blank",
              rel: "noreferrer noopener",
              title: l2.title || l2.name,
              children: l2.name
            },
            `${l2.href}-${l2.name}`
          )) })
        ] }),
        (footer.onlineSummary || footer.onlineUsers.length > 0) && /* @__PURE__ */ u$1("div", { class: "xzqh-home-footer-block", children: [
          /* @__PURE__ */ u$1("h2", { class: "xzqh-home-footer-title", children: [
            "在线用户",
            footer.onlineSummary ? /* @__PURE__ */ u$1("span", { class: "xzqh-home-footer-sub", children: [
              " — ",
              footer.onlineSummary
            ] }) : null
          ] }),
          footer.onlineUsers.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-online-users", children: footer.onlineUsers.map(
            (u2) => u2.href ? /* @__PURE__ */ u$1("a", { href: u2.href, target: "_blank", rel: "noreferrer", children: u2.name }, u2.name) : /* @__PURE__ */ u$1("span", { children: u2.name }, u2.name)
          ) })
        ] }),
        footer.memberGroups.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-home-footer-block", children: [
          /* @__PURE__ */ u$1("h2", { class: "xzqh-home-footer-title", children: "会员类型" }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-member-groups", children: footer.memberGroups.map((g2) => /* @__PURE__ */ u$1("span", { class: "xzqh-member-group", children: [
            g2.iconUrl ? /* @__PURE__ */ u$1("img", { src: g2.iconUrl, alt: "", width: 16, height: 16 }) : null,
            g2.name
          ] }, g2.name)) })
        ] })
      ] })
    ] });
  }
  function ForumSideNav(props) {
    const [collapsed, setCollapsed] = d({});
    if (!props.categories.length) return null;
    const goBoard = (b2) => {
      props.onClose();
      navigate({ name: "forum", fid: b2.fid, page: 1 });
    };
    return /* @__PURE__ */ u$1(S, { children: [
      props.open && /* @__PURE__ */ u$1("div", { class: "xzqh-board-backdrop", onClick: props.onClose }),
      /* @__PURE__ */ u$1("aside", { class: `xzqh-board-side${props.open ? " open" : ""}`, "aria-label": "其他版块", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-board-side-hd", children: [
          /* @__PURE__ */ u$1("strong", { children: "版块导航" }),
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-board-side-close", onClick: props.onClose, "aria-label": "关闭", children: "×" })
        ] }),
        props.categories.map((c2) => {
          const isCollapsed = !!collapsed[c2.name];
          return /* @__PURE__ */ u$1("div", { class: `xzqh-board-group${isCollapsed ? " collapsed" : ""}`, children: [
            /* @__PURE__ */ u$1(
              "button",
              {
                type: "button",
                class: "xzqh-board-group-title",
                onClick: () => setCollapsed((m2) => ({ ...m2, [c2.name]: !m2[c2.name] })),
                children: c2.name
              }
            ),
            !isCollapsed && /* @__PURE__ */ u$1("ul", { class: "xzqh-board-group-list", children: c2.boards.map((b2) => /* @__PURE__ */ u$1("li", { children: /* @__PURE__ */ u$1(
              "a",
              {
                href: `thread.php?fid=${b2.fid}`,
                class: b2.fid === props.currentFid ? "current" : void 0,
                onClick: (e2) => {
                  e2.preventDefault();
                  goBoard(b2);
                },
                children: b2.name
              }
            ) }, b2.fid)) })
          ] }, c2.name);
        })
      ] })
    ] });
  }
  function ForumPage(props) {
    var _a, _b;
    const [data, setData] = d(null);
    const [loading, setLoading] = d(true);
    const [openTypeId, setOpenTypeId] = d(null);
    const [sideOpen, setSideOpen] = d(false);
    const [sideFallback, setSideFallback] = d([]);
    const [typesCache, setTypesCache] = d(null);
    h(() => {
      let alive = true;
      setLoading(true);
      setOpenTypeId(null);
      setSideOpen(false);
      fetchThreadList({
        fid: props.fid,
        page: props.page,
        type: props.type,
        special: props.special,
        search: props.search
      }).then(async (d2) => {
        var _a2;
        if (!alive) return;
        setData(d2);
        if (d2.types.length) {
          setTypesCache((prev) => {
            if ((prev == null ? void 0 : prev.fid) === props.fid && prev.types.length > d2.types.length) return prev;
            return { fid: props.fid, types: d2.types };
          });
        }
        if (!((_a2 = d2.sideCategories) == null ? void 0 : _a2.length)) {
          try {
            const idx = await fetchForumIndex();
            if (alive) setSideFallback(idx.categories);
          } catch {
            if (alive) setSideFallback([]);
          }
        } else {
          setSideFallback([]);
        }
      }).finally(() => alive && setLoading(false));
      return () => {
        alive = false;
      };
    }, [props.fid, props.page, props.type, props.special, props.search]);
    h(() => {
      if (!openTypeId) return;
      const onDoc = (e2) => {
        var _a2;
        const t2 = e2.target;
        if ((_a2 = t2 == null ? void 0 : t2.closest) == null ? void 0 : _a2.call(t2, ".xzqh-type-dd")) return;
        setOpenTypeId(null);
      };
      document.addEventListener("click", onDoc);
      return () => document.removeEventListener("click", onDoc);
    }, [openTypeId]);
    const sideCategories = ((_a = data == null ? void 0 : data.sideCategories) == null ? void 0 : _a.length) ? data.sideCategories : sideFallback;
    const hasBoardMenu = !loading && !!data && !data.error && sideCategories.length > 0;
    h(() => {
      setBoardMenuAvailable(hasBoardMenu, sideOpen);
      return () => setBoardMenuAvailable(false, false);
    }, [hasBoardMenu, sideOpen]);
    h(() => {
      if (!hasBoardMenu) return;
      const onToggle = () => setSideOpen((v2) => !v2);
      window.addEventListener(BOARD_MENU_TOGGLE_EVENT, onToggle);
      return () => window.removeEventListener(BOARD_MENU_TOGGLE_EVENT, onToggle);
    }, [hasBoardMenu]);
    if (loading) return /* @__PURE__ */ u$1(Loading, {});
    if (!data) return /* @__PURE__ */ u$1(Alert, { type: "error", children: "加载失败" });
    if (data.error) {
      return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
        /* @__PURE__ */ u$1(Alert, { type: "error", children: data.error.message }),
        data.error.kind === "login_required" && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", onClick: () => navigate({ name: "login" }), children: "去登录" })
      ] });
    }
    const goType = (t2) => {
      setOpenTypeId(null);
      const isDigest = t2.id === "digest" || /[?&]search=digest/.test(t2.href);
      navigate({
        name: "forum",
        fid: props.fid,
        page: 1,
        type: !isDigest && /[?&]type=\d+/.test(t2.href) ? t2.id : void 0,
        special: !isDigest && /[?&]special=\d+/.test(t2.href) ? t2.id : void 0,
        search: isDigest ? "digest" : void 0
      });
    };
    const typeActive = (t2) => {
      var _a2;
      if (t2.id === "digest" || t2.href.includes("search=digest")) return props.search === "digest";
      if (t2.href.includes("special=") && props.special === t2.id) return true;
      if (t2.href.includes("type=") && props.type === t2.id) return true;
      return !!((_a2 = t2.children) == null ? void 0 : _a2.some((c2) => c2.id === props.type));
    };
    const typeTabs = (typesCache == null ? void 0 : typesCache.fid) === props.fid && typesCache.types.length > data.types.length ? typesCache.types : data.types;
    return /* @__PURE__ */ u$1("div", { class: "xzqh-forum-layout", children: [
      sideCategories.length > 0 && /* @__PURE__ */ u$1(
        ForumSideNav,
        {
          categories: sideCategories,
          currentFid: props.fid,
          open: sideOpen,
          onClose: () => setSideOpen(false)
        }
      ),
      /* @__PURE__ */ u$1("div", { class: "xzqh-forum-main", children: /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-row", style: { justifyContent: "space-between" }, children: [
          /* @__PURE__ */ u$1("div", { children: /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: data.forumName }) }),
          data.canPost && ((_b = props.user) == null ? void 0 : _b.loggedIn) && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn primary",
              onClick: () => navigate({ name: "compose", fid: props.fid }),
              children: "发帖"
            }
          )
        ] }),
        typeTabs.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-types", children: [
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: !props.type && !props.special && !props.search ? "active" : "",
              onClick: () => navigate({ name: "forum", fid: props.fid, page: 1 }),
              children: "全部"
            }
          ),
          typeTabs.map(
            (t2) => {
              var _a2;
              return ((_a2 = t2.children) == null ? void 0 : _a2.length) ? /* @__PURE__ */ u$1("div", { class: `xzqh-type-dd${openTypeId === t2.id ? " open" : ""}`, children: [
                /* @__PURE__ */ u$1(
                  "button",
                  {
                    type: "button",
                    class: typeActive(t2) ? "active" : "",
                    "aria-expanded": openTypeId === t2.id,
                    onClick: (e2) => {
                      e2.stopPropagation();
                      setOpenTypeId((cur) => cur === t2.id ? null : t2.id);
                    },
                    children: [
                      t2.name,
                      /* @__PURE__ */ u$1("span", { class: "xzqh-type-caret", "aria-hidden": "true", children: "▼" })
                    ]
                  }
                ),
                openTypeId === t2.id && /* @__PURE__ */ u$1("div", { class: "xzqh-type-menu", role: "menu", children: [
                  /* @__PURE__ */ u$1("button", { type: "button", role: "menuitem", onClick: () => goType(t2), children: [
                    t2.name,
                    "（全部）"
                  ] }),
                  t2.children.map((c2) => /* @__PURE__ */ u$1(
                    "button",
                    {
                      type: "button",
                      role: "menuitem",
                      class: props.type === c2.id ? "active" : "",
                      onClick: () => goType(c2),
                      children: c2.name
                    },
                    c2.id
                  ))
                ] })
              ] }, `${t2.id}-${t2.name}`) : /* @__PURE__ */ u$1(
                "button",
                {
                  type: "button",
                  class: typeActive(t2) ? "active" : "",
                  onClick: () => goType(t2),
                  children: t2.name
                },
                `${t2.id}-${t2.name}`
              );
            }
          )
        ] }),
        /* @__PURE__ */ u$1(
          Pager,
          {
            page: data.page,
            totalPages: data.totalPages,
            onChange: (p2) => navigate({
              name: "forum",
              fid: props.fid,
              page: p2,
              type: props.type,
              special: props.special,
              search: props.search
            })
          }
        ),
        /* @__PURE__ */ u$1(MasonryList, { layoutKey: `${data.fid}-${data.page}-${props.type || ""}-${props.special || ""}-${data.threads.map((t2) => t2.tid).join(",")}`, children: data.threads.map((t2) => {
          var _a2, _b2;
          return /* @__PURE__ */ u$1("div", { class: `xzqh-item${t2.topped ? " topped" : ""}`, children: [
            /* @__PURE__ */ u$1("div", { class: "xzqh-item-main", children: [
              /* @__PURE__ */ u$1("div", { class: "xzqh-subject-line", children: [
                /* @__PURE__ */ u$1("div", { class: "xzqh-card-tags", children: [
                  (t2.topped || t2.digest || t2.vote || t2.hasImage || t2.isNew) && /* @__PURE__ */ u$1("span", { class: "xzqh-badges", children: [
                    t2.topped && /* @__PURE__ */ u$1("span", { class: "xzqh-badge xzqh-badge--top", children: "置顶" }),
                    t2.digest && /* @__PURE__ */ u$1("span", { class: "xzqh-badge xzqh-badge--digest", children: "精华" }),
                    t2.vote && /* @__PURE__ */ u$1("span", { class: "xzqh-badge xzqh-badge--vote", children: "投票" }),
                    t2.hasImage && /* @__PURE__ */ u$1("span", { class: "xzqh-badge xzqh-badge--img", children: "图" }),
                    t2.isNew && /* @__PURE__ */ u$1("span", { class: "xzqh-badge xzqh-badge--new", children: "NEW" })
                  ] }),
                  /* @__PURE__ */ u$1(
                    TypeTags,
                    {
                      tags: ((_a2 = t2.typeTags) == null ? void 0 : _a2.length) ? t2.typeTags : splitTitleTypes(t2.title).typeTags,
                      fid: data.fid
                    }
                  )
                ] }),
                /* @__PURE__ */ u$1(
                  "a",
                  {
                    class: "title",
                    href: `read.php?tid=${t2.tid}`,
                    onClick: (e2) => {
                      e2.preventDefault();
                      navigate({ name: "thread", tid: t2.tid, page: 1 });
                    },
                    children: ((_b2 = t2.typeTags) == null ? void 0 : _b2.length) ? t2.title : splitTitleTypes(t2.title).title || t2.title
                  }
                )
              ] }),
              /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: [
                /* @__PURE__ */ u$1("div", { class: "xzqh-meta-row", children: [
                  /* @__PURE__ */ u$1(
                    UserNameLink,
                    {
                      name: t2.author,
                      uid: t2.authorUid,
                      username: t2.authorUsername || t2.author
                    }
                  ),
                  t2.postDate ? ` · ${t2.postDate}` : ""
                ] }),
                (t2.lastAuthor || t2.lastTime) && /* @__PURE__ */ u$1("div", { class: "xzqh-meta-row", children: [
                  "最后",
                  " ",
                  t2.lastAuthor ? /* @__PURE__ */ u$1(
                    UserNameLink,
                    {
                      name: t2.lastAuthor,
                      uid: t2.lastAuthorUid,
                      username: t2.lastAuthorUsername || t2.lastAuthor
                    }
                  ) : null,
                  t2.lastTime ? /* @__PURE__ */ u$1(S, { children: [
                    " ",
                    /* @__PURE__ */ u$1(
                      "a",
                      {
                        class: "xzqh-last-time",
                        href: t2.lastTimeHref || `read.php?tid=${t2.tid}&page=e#a`,
                        title: "跳到最后回复",
                        onClick: (e2) => {
                          e2.preventDefault();
                          navigate({ name: "thread", tid: t2.tid, page: 9999 });
                        },
                        children: t2.lastTime
                      }
                    )
                  ] }) : null
                ] })
              ] })
            ] }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-stats", children: [
              /* @__PURE__ */ u$1("div", { children: [
                t2.replies,
                " 回复"
              ] }),
              /* @__PURE__ */ u$1("div", { children: [
                t2.hits,
                " 浏览"
              ] })
            ] })
          ] }, t2.tid);
        }) }),
        /* @__PURE__ */ u$1(
          Pager,
          {
            page: data.page,
            totalPages: data.totalPages,
            onChange: (p2) => navigate({
              name: "forum",
              fid: props.fid,
              page: p2,
              type: props.type,
              special: props.special,
              search: props.search
            })
          }
        )
      ] }) })
    ] });
  }
  function ThreadPage(props) {
    var _a, _b, _c, _d;
    const [data, setData] = d(null);
    const [loading, setLoading] = d(true);
    const [reply, setReply] = d("");
    const [replyFlashAtts, setReplyFlashAtts] = d([]);
    const [replyFocusToken, setReplyFocusToken] = d(0);
    const [msg, setMsg] = d("");
    const [busy, setBusy] = d(false);
    const voteBox = A(null);
    const replyDraftKey = `xzqh_draft_reply_${props.tid}`;
    const reload = async (page = props.page) => {
      setLoading(true);
      try {
        let p2 = page;
        const d2 = await fetchThreadDetail(props.tid, p2 === 9999 ? 1 : p2);
        if (page === 9999 && d2.totalPages > 1) {
          const last = await fetchThreadDetail(props.tid, d2.totalPages);
          setData(last);
        } else setData(d2);
      } finally {
        setLoading(false);
      }
    };
    h(() => {
      reload(props.page);
    }, [props.tid, props.page]);
    h(() => {
      if (!data || loading) return;
      if (props.page < 9999 && location.hash !== "#a") return;
      const last = document.querySelector(".xzqh-floor:last-of-type");
      last == null ? void 0 : last.scrollIntoView({ block: "start" });
    }, [data, loading, props.page]);
    h(() => {
      const el = voteBox.current;
      if (!el || !data) return;
      el.querySelectorAll('button, input[type="button"], input[type="radio"], input[type="checkbox"]').forEach(
        (node) => {
          node.removeAttribute("onclick");
        }
      );
      const voteBot = el.querySelector(".vote_Bot");
      if (voteBot) {
        const old = voteBot.querySelector('button, input[type="button"]');
        const label = ((old == null ? void 0 : old.textContent) || (old == null ? void 0 : old.value) || "投票").trim() || "投票";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "xzqh-vote-submit";
        btn.textContent = label;
        voteBot.replaceChildren(btn);
      }
      const collect = () => {
        const selected = [
          ...el.querySelectorAll(
            "input[name*=vote]:checked, input[type=radio]:checked, input[type=checkbox]:checked"
          )
        ].map((node) => node.value).filter(Boolean);
        const extra = {};
        for (const input of Array.from(el.querySelectorAll("input, select"))) {
          if (!input.name || input.type === "submit" || input.type === "button") continue;
          if ((input.type === "checkbox" || input.type === "radio") && !input.checked) continue;
          extra[input.name] = input.value;
        }
        return { selected, extra };
      };
      const doVote = async () => {
        if (!data) return;
        const { selected, extra } = collect();
        if (!selected.length) {
          setMsg("请先选择投票选项");
          return;
        }
        const r2 = await submitVote({
          tid: data.tid,
          selected,
          verifyhash: data.verifyhash,
          extra
        });
        setMsg(r2.message);
        if (r2.ok) reload(data.page);
      };
      const toggleVoters = (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        const on = el.classList.toggle("xzqh-vote--show-voters");
        const link = el.querySelector("#viewVoters");
        if (link) link.textContent = on ? "收起参与人员" : "查看参与人员";
      };
      const onClick = (e2) => {
        var _a2, _b2;
        const target = e2.target;
        const votersLink = (_a2 = target == null ? void 0 : target.closest) == null ? void 0 : _a2.call(target, "#viewVoters, a.fn, a.s4");
        if (votersLink && /参与人员|收起/.test(votersLink.textContent || "")) {
          toggleVoters(e2);
          return;
        }
        const btn = (_b2 = target == null ? void 0 : target.closest) == null ? void 0 : _b2.call(target, 'button, input[type="button"]');
        if (!btn) return;
        const text = (btn.textContent || "").trim() || btn.value || "";
        if (!/^\s*投票\s*$/.test(text)) return;
        e2.preventDefault();
        void doVote();
      };
      const onSubmit = (e2) => {
        e2.preventDefault();
        void doVote();
      };
      el.addEventListener("click", onClick);
      el.addEventListener("submit", onSubmit);
      return () => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("submit", onSubmit);
      };
    }, [data == null ? void 0 : data.tid, data == null ? void 0 : data.voteHtml, data == null ? void 0 : data.verifyhash]);
    if (loading) return /* @__PURE__ */ u$1(Loading, {});
    if (!data) return /* @__PURE__ */ u$1(Alert, { type: "error", children: "加载失败" });
    if (data.error) {
      return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
        /* @__PURE__ */ u$1(Alert, { type: "error", children: data.error.message }),
        data.error.kind === "login_required" && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", onClick: () => navigate({ name: "login" }), children: "去登录" })
      ] });
    }
    const focusQuickReply = () => setReplyFocusToken((n2) => n2 + 1);
    const onReply = async () => {
      if (!reply.trim()) {
        setMsg("请填写回复内容");
        focusQuickReply();
        return;
      }
      setBusy(true);
      setMsg("");
      try {
        const form = await loadComposeForm({ fid: data.fid, tid: data.tid });
        const res = await submitPost({
          action: form.action,
          fields: {
            ...form.fields,
            ...data.replyForm || {},
            ...flashAttFields(replyFlashAtts)
          },
          content: reply
        });
        setMsg(res.message);
        if (res.ok) {
          setReply("");
          setReplyFlashAtts([]);
          try {
            localStorage.removeItem(replyDraftKey);
          } catch {
          }
          await reload(data.totalPages || props.page);
        }
      } catch (e2) {
        setMsg(e2 instanceof Error ? e2.message : "回复失败");
      } finally {
        setBusy(false);
      }
    };
    return /* @__PURE__ */ u$1("div", { children: [
      /* @__PURE__ */ u$1("div", { class: "xzqh-panel", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-toolbar", children: [
          data.fid > 0 && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: () => navigate({ name: "forum", fid: data.fid, page: 1 }),
              children: "返回版块"
            }
          ),
          data.canReply && ((_a = props.user) == null ? void 0 : _a.loggedIn) && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn primary",
              onClick: () => navigate({ name: "compose", fid: data.fid, tid: data.tid }),
              children: "完整回复"
            }
          ),
          data.canFavor && ((_b = props.user) == null ? void 0 : _b.loggedIn) && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: async () => {
                var _a2;
                const r2 = await favorThread(data.tid, data.verifyhash || ((_a2 = props.user) == null ? void 0 : _a2.verifyhash) || "");
                setMsg(r2.message);
              },
              children: "收藏"
            }
          )
        ] }),
        /* @__PURE__ */ u$1(
          TitleWithTypes,
          {
            as: "h1",
            title: data.title,
            typeTags: data.typeTags,
            fid: data.fid || void 0,
            forumName: data.forumName
          }
        ),
        msg && /* @__PURE__ */ u$1(Alert, { type: /成功|收藏成功/.test(msg) ? "ok" : "warn", children: msg }),
        /* @__PURE__ */ u$1(
          Pager,
          {
            page: data.page,
            totalPages: data.totalPages,
            onChange: (p2) => navigate({ name: "thread", tid: data.tid, page: p2 })
          }
        )
      ] }),
      data.isVote && data.voteHtml && /* @__PURE__ */ u$1("div", { class: "xzqh-panel xzqh-vote-panel", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ u$1("h2", { style: { marginTop: 0, fontSize: "1.1rem" }, children: "投票" }),
        /* @__PURE__ */ u$1(
          "div",
          {
            class: "xzqh-vote",
            ref: voteBox,
            dangerouslySetInnerHTML: { __html: data.voteHtml }
          }
        )
      ] }),
      data.floors.map((f2) => /* @__PURE__ */ u$1(
        FloorCard,
        {
          floor: f2,
          tid: data.tid,
          fid: data.fid,
          verifyhash: data.verifyhash,
          onQuote: () => {
            setReply((prev) => wrapQuote(f2.author, f2.contentHtml) + prev);
            focusQuickReply();
          },
          onDeleted: () => reload(data.page)
        },
        `${f2.pidParam}-${f2.floor}`
      )),
      data.canReply && ((_c = props.user) == null ? void 0 : _c.loggedIn) && /* @__PURE__ */ u$1("div", { class: "xzqh-panel", id: "xzqh-quick-reply", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-row", style: { justifyContent: "space-between", marginBottom: 8 }, children: [
          /* @__PURE__ */ u$1("h2", { style: { margin: 0, fontSize: "1.05rem" }, children: "快速回复" }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: () => navigate({ name: "compose", fid: data.fid, tid: data.tid }),
              children: "完整回复"
            }
          )
        ] }),
        msg && /请填写|失败|错误|不能|禁止|验证|权限/.test(msg) && !/成功|收藏/.test(msg) && /* @__PURE__ */ u$1(Alert, { type: "error", children: msg }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-form", children: [
          /* @__PURE__ */ u$1(
            WindEditor,
            {
              value: reply,
              onChange: setReply,
              compact: true,
              minRows: 6,
              draftKey: replyDraftKey,
              placeholder: "支持 Wind Code；可点「完整」展开全部工具栏",
              fid: data.fid || void 0,
              verifyhash: data.verifyhash || ((_d = props.user) == null ? void 0 : _d.verifyhash) || void 0,
              flashAtts: replyFlashAtts,
              onFlashAttsChange: setReplyFlashAtts,
              focusToken: replyFocusToken
            }
          ),
          replyFlashAtts.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: [
            "已上传 ",
            replyFlashAtts.length,
            " 个附件/图片，将随回复提交"
          ] }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", disabled: busy, onClick: onReply, children: busy ? "提交中…" : "发表回复" }) })
        ] })
      ] })
    ] });
  }
  function FloorCard(props) {
    const { floor: f2 } = props;
    const floorLabel = f2.floor === 0 ? "楼主" : `${f2.floor} 楼`;
    return /* @__PURE__ */ u$1("article", { class: "xzqh-floor", id: `pid${f2.pidParam || f2.pid}`, children: [
      /* @__PURE__ */ u$1("div", { class: "xzqh-floor-hd", children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-floor-user", children: [
          f2.avatarUrl ? /* @__PURE__ */ u$1("img", { class: "xzqh-avatar", src: f2.avatarUrl, alt: "", width: 40, height: 40, loading: "lazy" }) : /* @__PURE__ */ u$1("div", { class: "xzqh-avatar xzqh-avatar-fallback", "aria-hidden": "true", children: (f2.author || "?").slice(0, 1) }),
          /* @__PURE__ */ u$1("div", { children: [
            /* @__PURE__ */ u$1("strong", { children: /* @__PURE__ */ u$1(
              "a",
              {
                href: f2.authorUid ? `u.php?uid=${f2.authorUid}` : `u.php?username=${encodeURIComponent(f2.author)}`,
                children: f2.author
              }
            ) }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-muted", children: f2.postDate || "" })
          ] })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-muted", children: floorLabel })
      ] }),
      /* @__PURE__ */ u$1("div", { class: "xzqh-floor-bd", dangerouslySetInnerHTML: { __html: f2.contentHtml } }),
      f2.attachments.length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-attach-list", style: { padding: "0 16px 8px" }, children: f2.attachments.map((a2, i2) => /* @__PURE__ */ u$1("a", { href: a2.url, target: "_blank", rel: "noreferrer", children: [
        a2.isImage ? "图片" : "附件",
        "：",
        a2.name
      ] }, i2)) }),
      /* @__PURE__ */ u$1("div", { class: "xzqh-floor-ft", children: [
        f2.canQuote && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: props.onQuote, children: "引用" }),
        f2.canEdit && /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: "xzqh-btn ghost",
            onClick: () => navigate({
              name: "compose",
              fid: props.fid,
              tid: props.tid,
              editPid: f2.pidParam,
              article: f2.article
            }),
            children: "编辑"
          }
        ),
        f2.canDelete && /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: "xzqh-btn danger",
            onClick: async () => {
              if (!confirm("确认删除该楼层？")) return;
              const r2 = await deletePost({
                fid: props.fid,
                tid: props.tid,
                pid: f2.pidParam,
                article: f2.article,
                verifyhash: props.verifyhash
              });
              alert(r2.message);
              if (r2.ok) props.onDeleted();
            },
            children: "删除"
          }
        )
      ] })
    ] });
  }
  function LoginPage(props) {
    const [username, setUsername] = d("");
    const [password, setPassword] = d("");
    const [gdcode, setGdcode] = d("");
    const [captcha, setCaptcha] = d(null);
    const [remember, setRemember] = d(true);
    const [hideid, setHideid] = d(false);
    const [msg, setMsg] = d("");
    const [busy, setBusy] = d(false);
    const reloadCaptcha = async () => {
      const info = await fetchLoginPage();
      setCaptcha(info.captchaUrl ? refreshCaptchaUrl(info.captchaUrl) : null);
      setGdcode("");
    };
    h(() => {
      reloadCaptcha();
    }, []);
    const onSubmit = async (e2) => {
      e2.preventDefault();
      if (!username.trim() || !password || !gdcode.trim()) {
        setMsg("请填写用户名、密码和验证码");
        return;
      }
      setBusy(true);
      setMsg("");
      try {
        const res = await login({
          username,
          password,
          gdcode,
          remember,
          hideid: hideid ? "1" : "0",
          jumpurl: forumUrlSafe()
        });
        setMsg(res.message);
        if (res.ok) props.onSuccess(res.session);
        else await reloadCaptcha();
      } catch (err) {
        setMsg(err instanceof Error ? err.message : "登录失败");
        await reloadCaptcha();
      } finally {
        setBusy(false);
      }
    };
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", style: { maxWidth: 460, margin: "0 auto" }, children: [
      /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: "登录方舆" }),
      msg && /* @__PURE__ */ u$1(Alert, { type: /成功/.test(msg) ? "ok" : "error", children: msg }),
      /* @__PURE__ */ u$1("form", { class: "xzqh-form", onSubmit, children: [
        /* @__PURE__ */ u$1("label", { children: [
          "用户名",
          /* @__PURE__ */ u$1(
            "input",
            {
              name: "pwuser",
              value: username,
              onInput: (e2) => setUsername(e2.target.value),
              autocomplete: "username",
              maxlength: 60
            }
          )
        ] }),
        /* @__PURE__ */ u$1("label", { children: [
          "密码",
          /* @__PURE__ */ u$1(
            "input",
            {
              name: "pwpwd",
              type: "password",
              value: password,
              onInput: (e2) => setPassword(e2.target.value),
              autocomplete: "current-password",
              maxlength: 20
            }
          )
        ] }),
        /* @__PURE__ */ u$1("label", { children: [
          "验证码",
          /* @__PURE__ */ u$1("div", { class: "xzqh-captcha", children: [
            /* @__PURE__ */ u$1(
              "input",
              {
                name: "gdcode",
                id: "gdcode",
                value: gdcode,
                onInput: (e2) => setGdcode(e2.target.value),
                onFocus: () => {
                  if (!captcha) reloadCaptcha();
                },
                autocomplete: "off"
              }
            ),
            captcha ? /* @__PURE__ */ u$1(
              "img",
              {
                src: captcha,
                alt: "验证码",
                title: "看不清？点击换一张",
                onClick: () => reloadCaptcha()
              }
            ) : /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: () => reloadCaptcha(), children: "加载验证码" })
          ] })
        ] }),
        /* @__PURE__ */ u$1("label", { style: { flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ u$1(
            "input",
            {
              type: "checkbox",
              checked: remember,
              onChange: (e2) => setRemember(e2.target.checked)
            }
          ),
          "下次自动登录"
        ] }),
        /* @__PURE__ */ u$1("label", { style: { flexDirection: "row", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ u$1(
            "input",
            {
              type: "checkbox",
              checked: hideid,
              onChange: (e2) => setHideid(e2.target.checked)
            }
          ),
          "隐身登录"
        ] }),
        /* @__PURE__ */ u$1("button", { type: "submit", class: "xzqh-btn primary", disabled: busy, children: busy ? "登录中…" : "登录" })
      ] })
    ] });
  }
  function forumUrlSafe() {
    try {
      return location.href.includes("/lt/") ? location.href : "http://xzqh.info/lt/index.php";
    } catch {
      return "http://xzqh.info/lt/index.php";
    }
  }
  function ComposePage(props) {
    const [title, setTitle] = d("");
    const [content, setContent] = d("");
    const [msg, setMsg] = d("");
    const [busy, setBusy] = d(false);
    const [meta, setMeta] = d(null);
    const [files, setFiles] = d([]);
    const [uploadMsg, setUploadMsg] = d("");
    const [flashAtts, setFlashAtts] = d([]);
    const [attachBusy, setAttachBusy] = d(false);
    const [ptype, setPtype] = d("");
    const [settingsTab, setSettingsTab] = d("common");
    const [atcNewrp, setAtcNewrp] = d(false);
    const [atcAnonymous, setAtcAnonymous] = d(false);
    const [atcHide, setAtcHide] = d(false);
    const [usernames, setUsernames] = d("");
    const [tags, setTags] = d("");
    const [requireSell, setRequireSell] = d(false);
    const [sellMoney, setSellMoney] = d("0");
    const [requireEnhide, setRequireEnhide] = d(false);
    const [enhideRvrc, setEnhideRvrc] = d("0");
    const [useSign, setUseSign] = d(true);
    const [autoUrl, setAutoUrl] = d(true);
    const [convert, setConvert] = d(true);
    const draftKey = `xzqh_draft_compose_${props.fid}_${props.tid || 0}_${props.editPid || 0}`;
    h(() => {
      loadComposeForm(props).then((m2) => {
        setMeta(m2);
        if (m2.fields.atc_title) setTitle(m2.fields.atc_title);
        if (m2.fields.atc_content) setContent(m2.fields.atc_content);
        if (m2.fields.p_type) setPtype(m2.fields.p_type);
        if (m2.fields.atc_tags) setTags(m2.fields.atc_tags);
        if (m2.fields.usernames) setUsernames(m2.fields.usernames);
        if (m2.fields.atc_money) setSellMoney(m2.fields.atc_money);
        if (m2.fields.atc_rvrc) setEnhideRvrc(m2.fields.atc_rvrc);
        setAtcNewrp(m2.fields.atc_newrp === "1");
        setAtcAnonymous(m2.fields.atc_anonymous === "1");
        setAtcHide(m2.fields.atc_hide === "1");
        setRequireSell(m2.fields.atc_requiresell === "1");
        setRequireEnhide(m2.fields.atc_requireenhide === "1");
        setUseSign(m2.fields.atc_usesign !== "0");
        setAutoUrl(m2.fields.atc_autourl !== "0");
        setConvert(m2.fields.atc_convert !== "0");
      }).catch((e2) => setMsg(e2 instanceof Error ? e2.message : "无法打开编辑器"));
    }, [props.fid, props.tid, props.quotePid, props.editPid, props.article]);
    const buildFields = () => {
      if (!meta) return {};
      const fields = { ...meta.fields };
      if (ptype) fields.p_type = ptype;
      else delete fields.p_type;
      const setFlag = (name, on) => {
        if (on) fields[name] = "1";
        else delete fields[name];
      };
      setFlag("atc_newrp", atcNewrp);
      setFlag("atc_anonymous", atcAnonymous && !!meta.options.anonymousEnabled);
      setFlag("atc_hide", atcHide && !!meta.options.hideEnabled);
      setFlag("atc_requiresell", requireSell && !!meta.options.sellEnabled);
      setFlag("atc_requireenhide", requireEnhide && !!meta.options.enhideEnabled);
      setFlag("atc_usesign", useSign);
      setFlag("atc_autourl", autoUrl);
      setFlag("atc_convert", convert);
      fields.usernames = usernames.trim();
      fields.atc_tags = tags.trim();
      fields.atc_money = sellMoney || "0";
      fields.atc_rvrc = enhideRvrc || "0";
      Object.assign(fields, flashAttFields(flashAtts));
      return fields;
    };
    const goAfterSuccess = (redirect) => {
      if (redirect && /tid=(\d+)/.test(redirect)) {
        const tid = Number(redirect.match(/tid=(\d+)/)[1]);
        navigate({ name: "thread", tid, page: 9999 });
      } else if (props.tid) {
        navigate({ name: "thread", tid: props.tid, page: 9999 });
      } else {
        navigate({ name: "forum", fid: props.fid, page: 1 });
      }
    };
    const onSubmit = async () => {
      if (!meta) return;
      if (meta.titleRequired && !title.trim()) {
        setMsg("请填写标题");
        return;
      }
      if (!content.trim()) {
        setMsg("请填写内容");
        return;
      }
      setBusy(true);
      setMsg("");
      try {
        const res = await submitPost({
          action: meta.action,
          fields: buildFields(),
          title: meta.showTitle ? title : void 0,
          content,
          files: files.length ? files : void 0
        });
        setMsg(res.message);
        if (res.ok) {
          try {
            localStorage.removeItem(draftKey);
          } catch {
          }
          setFlashAtts([]);
          goAfterSuccess(res.redirect);
        }
      } catch (e2) {
        setMsg(e2 instanceof Error ? e2.message : "提交失败");
      } finally {
        setBusy(false);
      }
    };
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel xzqh-compose", children: [
      /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: props.editPid ? "编辑帖子" : props.tid ? "回复主题" : "发表主题" }),
      msg && /* @__PURE__ */ u$1(Alert, { type: /成功|已提交/.test(msg) ? "ok" : "error", children: msg }),
      !meta && !msg && /* @__PURE__ */ u$1(Loading, {}),
      meta && /* @__PURE__ */ u$1("div", { class: "xzqh-form", children: [
        meta.showTitle && /* @__PURE__ */ u$1("div", { class: "xzqh-compose-title", children: [
          meta.types.length > 0 && /* @__PURE__ */ u$1(
            "select",
            {
              class: "xzqh-compose-type",
              value: ptype,
              onChange: (e2) => setPtype(e2.target.value),
              title: "选择分类",
              children: [
                /* @__PURE__ */ u$1("option", { value: "", children: "选择分类" }),
                meta.types.map((t2) => /* @__PURE__ */ u$1("option", { value: t2.id, children: t2.name }, t2.id))
              ]
            }
          ),
          /* @__PURE__ */ u$1(
            "input",
            {
              class: "xzqh-compose-title-input",
              value: title,
              placeholder: "请输入标题",
              onInput: (e2) => setTitle(e2.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ u$1(
          WindEditor,
          {
            value: content,
            onChange: setContent,
            draftKey,
            minRows: 16,
            placeholder: "在此输入正文，支持完整 Wind Code",
            fid: props.fid,
            verifyhash: meta.verifyhash,
            uploadEnabled: meta.uploadEnabled,
            flashAtts,
            onFlashAttsChange: setFlashAtts
          }
        ),
        meta.uploadEnabled && /* @__PURE__ */ u$1("div", { class: "xzqh-compose-attach", children: [
          /* @__PURE__ */ u$1("div", { class: "xzqh-compose-attach-hd", children: [
            /* @__PURE__ */ u$1("strong", { children: "附件" }),
            /* @__PURE__ */ u$1("span", { class: "xzqh-muted", children: "对应原站「插入附件」（任意允许类型）；图片请优先用编辑器「图片」" })
          ] }),
          /* @__PURE__ */ u$1(
            "input",
            {
              type: "file",
              multiple: true,
              onChange: (e2) => setFiles(Array.from(e2.target.files || []))
            }
          ),
          files.length > 0 && /* @__PURE__ */ u$1("ul", { class: "xzqh-attach-list", children: files.map((f2) => /* @__PURE__ */ u$1("li", { children: [
            f2.name,
            " · ",
            (f2.size / 1024).toFixed(1),
            " KB",
            isImageFile(f2) ? " · 图片" : ""
          ] }, f2.name + f2.size)) }),
          files.length > 0 && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              disabled: attachBusy,
              onClick: async () => {
                setAttachBusy(true);
                setUploadMsg("");
                const uploaded = [...flashAtts];
                for (const file of files) {
                  const r2 = await uploadMutiFile({
                    file,
                    verifyhash: meta.verifyhash,
                    fid: props.fid,
                    onProgress: (p2) => setUploadMsg(`${file.name} ${p2}%`)
                  });
                  if (!r2.ok || !r2.aid) {
                    setUploadMsg(r2.message || `${file.name} 上传失败`);
                    continue;
                  }
                  const item = {
                    aid: r2.aid,
                    name: file.name,
                    path: r2.path || r2.url || "",
                    kind: isImageFile(file) ? "image" : "file"
                  };
                  const i2 = uploaded.findIndex((x2) => x2.aid === item.aid);
                  if (i2 >= 0) uploaded[i2] = item;
                  else uploaded.push(item);
                  setContent(
                    (c2) => `${c2}${c2 && !/\n$/.test(c2) ? "\n" : ""}[attachment=${r2.aid}]
`
                  );
                }
                setFlashAtts(uploaded);
                setFiles([]);
                setUploadMsg(`已上传并插入 ${uploaded.length} 个附件`);
                setAttachBusy(false);
              },
              children: attachBusy ? "上传中…" : "上传所选附件并插入"
            }
          ),
          flashAtts.length > 0 && /* @__PURE__ */ u$1("ul", { class: "xzqh-attach-list", children: flashAtts.map((a2) => /* @__PURE__ */ u$1("li", { children: [
            a2.kind === "image" ? "图片" : "附件",
            " #",
            a2.aid,
            " · ",
            a2.name
          ] }, a2.aid)) }),
          uploadMsg && /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: uploadMsg })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-compose-settings", children: [
          /* @__PURE__ */ u$1("div", { class: "xzqh-compose-tabs", role: "tablist", children: [
            ["common", "常用设置"],
            ["tags", "主题标签"],
            ["sell", "售密设置"],
            ["advanced", "高级"]
          ].map(([id, label]) => /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              role: "tab",
              class: `xzqh-compose-tab${settingsTab === id ? " active" : ""}`,
              "aria-selected": settingsTab === id,
              onClick: () => setSettingsTab(id),
              children: label
            },
            id
          )) }),
          /* @__PURE__ */ u$1("div", { class: "xzqh-compose-tabpanel", children: [
            settingsTab === "common" && /* @__PURE__ */ u$1(S, { children: [
              /* @__PURE__ */ u$1("label", { class: "xzqh-check", children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    checked: atcNewrp,
                    onChange: (e2) => setAtcNewrp(e2.target.checked)
                  }
                ),
                "回复站内短信提醒"
              ] }),
              /* @__PURE__ */ u$1("label", { class: `xzqh-check${meta.options.anonymousEnabled ? "" : " is-disabled"}`, children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !meta.options.anonymousEnabled,
                    checked: atcAnonymous,
                    onChange: (e2) => setAtcAnonymous(e2.target.checked)
                  }
                ),
                "匿名帖"
              ] }),
              /* @__PURE__ */ u$1("label", { class: `xzqh-check${meta.options.hideEnabled ? "" : " is-disabled"}`, children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !meta.options.hideEnabled,
                    checked: atcHide,
                    onChange: (e2) => setAtcHide(e2.target.checked)
                  }
                ),
                "隐藏此帖（回复可见）"
              ] }),
              /* @__PURE__ */ u$1("label", { children: [
                "提到某人",
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    value: usernames,
                    placeholder: "用户名，多个用空格或逗号分隔",
                    onInput: (e2) => setUsernames(e2.target.value)
                  }
                )
              ] })
            ] }),
            settingsTab === "tags" && /* @__PURE__ */ u$1("label", { children: [
              "主题标签",
              /* @__PURE__ */ u$1(
                "input",
                {
                  value: tags,
                  placeholder: "多个标签用空格分隔",
                  onInput: (e2) => setTags(e2.target.value)
                }
              )
            ] }),
            settingsTab === "sell" && /* @__PURE__ */ u$1(S, { children: [
              /* @__PURE__ */ u$1("label", { class: `xzqh-check${meta.options.sellEnabled ? "" : " is-disabled"}`, children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !meta.options.sellEnabled,
                    checked: requireSell,
                    onChange: (e2) => setRequireSell(e2.target.checked)
                  }
                ),
                "出售帖"
              ] }),
              /* @__PURE__ */ u$1("label", { children: [
                "出售：货币",
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    value: sellMoney,
                    disabled: !meta.options.sellEnabled,
                    onInput: (e2) => setSellMoney(e2.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ u$1("label", { class: `xzqh-check${meta.options.enhideEnabled ? "" : " is-disabled"}`, children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !meta.options.enhideEnabled,
                    checked: requireEnhide,
                    onChange: (e2) => setRequireEnhide(e2.target.checked)
                  }
                ),
                "加密浏览"
              ] }),
              /* @__PURE__ */ u$1("label", { children: [
                "加密：威望以上才能浏览",
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    value: enhideRvrc,
                    disabled: !meta.options.enhideEnabled,
                    onInput: (e2) => setEnhideRvrc(e2.target.value)
                  }
                )
              ] }),
              !meta.options.sellEnabled && !meta.options.enhideEnabled && /* @__PURE__ */ u$1("p", { class: "xzqh-muted", children: "当前用户组不可用售密设置（与原站一致）。" })
            ] }),
            settingsTab === "advanced" && /* @__PURE__ */ u$1(S, { children: [
              /* @__PURE__ */ u$1("label", { class: "xzqh-check", children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    checked: useSign,
                    onChange: (e2) => setUseSign(e2.target.checked)
                  }
                ),
                "使用帖子签名"
              ] }),
              /* @__PURE__ */ u$1("label", { class: "xzqh-check", children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    checked: autoUrl,
                    onChange: (e2) => setAutoUrl(e2.target.checked)
                  }
                ),
                "自动解析链接 URL"
              ] }),
              /* @__PURE__ */ u$1("label", { class: "xzqh-check", children: [
                /* @__PURE__ */ u$1(
                  "input",
                  {
                    type: "checkbox",
                    checked: convert,
                    onChange: (e2) => setConvert(e2.target.checked)
                  }
                ),
                "WindCode 转换"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-row xzqh-compose-actions", children: [
          /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary xzqh-btn-lg", disabled: busy, onClick: onSubmit, children: busy ? "提交中…" : "发布" }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: () => {
                try {
                  localStorage.setItem(
                    draftKey,
                    JSON.stringify({ content, title, savedAt: Date.now() })
                  );
                  setMsg("已存为本地草稿");
                } catch {
                  setMsg("草稿保存失败");
                }
              },
              children: "存为草稿"
            }
          ),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: () => props.tid ? navigate({ name: "thread", tid: props.tid, page: 1 }) : navigate({ name: "forum", fid: props.fid, page: 1 }),
              children: "取消"
            }
          )
        ] })
      ] })
    ] });
  }
  function SearchPage(props) {
    const [keyword, setKeyword] = d(props.keyword || "");
    const [items, setItems] = d([]);
    const [err, setErr] = d("");
    const [loading, setLoading] = d(false);
    const run = async (kw = keyword) => {
      setLoading(true);
      setErr("");
      try {
        const res = await searchForum({
          keyword: kw,
          digest: props.digest,
          schTime: props.schTime
        });
        if (res.error) setErr(res.error);
        setItems(res.items);
      } catch (e2) {
        setErr(e2 instanceof Error ? e2.message : "搜索失败");
      } finally {
        setLoading(false);
      }
    };
    h(() => {
      if (props.keyword || props.digest || props.schTime) run(props.keyword || "");
    }, [props.keyword, props.digest, props.schTime]);
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
      /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: "搜索" }),
      /* @__PURE__ */ u$1(
        "form",
        {
          class: "xzqh-form",
          onSubmit: (e2) => {
            e2.preventDefault();
            const kw = keyword.trim();
            if (!kw) {
              setErr("请输入搜索关键词");
              return;
            }
            const sameQuery = (props.keyword || "") === kw && !props.digest && !props.schTime;
            navigate({ name: "search", keyword: kw });
            if (sameQuery) run(kw);
          },
          children: [
            /* @__PURE__ */ u$1("label", { children: [
              "关键词",
              /* @__PURE__ */ u$1("input", { value: keyword, onInput: (e2) => setKeyword(e2.target.value) })
            ] }),
            /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: [
              /* @__PURE__ */ u$1("button", { type: "submit", class: "xzqh-btn primary", children: "搜索" }),
              /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: () => navigate({ name: "search", schTime: "newatc" }), children: "新帖" }),
              /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn ghost", onClick: () => navigate({ name: "search", digest: true }), children: "精华" })
            ] })
          ]
        }
      ),
      loading && /* @__PURE__ */ u$1(Loading, {}),
      err && /* @__PURE__ */ u$1(Alert, { type: "error", children: err }),
      /* @__PURE__ */ u$1(
        MasonryList,
        {
          style: { marginTop: 12 },
          layoutKey: items.map((t2) => t2.tid).join(","),
          children: items.map((t2) => /* @__PURE__ */ u$1("div", { class: "xzqh-item", children: [
            /* @__PURE__ */ u$1(
              "a",
              {
                class: "title",
                href: `read.php?tid=${t2.tid}`,
                onClick: (e2) => {
                  e2.preventDefault();
                  navigate({ name: "thread", tid: t2.tid, page: 1 });
                },
                children: t2.title
              }
            ),
            /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: t2.author || "" })
          ] }, t2.tid))
        }
      )
    ] });
  }
  function UserPage(props) {
    const [profile, setProfile] = d();
    const [threads, setThreads] = d([]);
    const [err, setErr] = d("");
    const [loading, setLoading] = d(true);
    h(() => {
      setLoading(true);
      fetchUserProfile(props).then((r2) => {
        setProfile(r2.profile);
        setThreads(r2.threads);
        setErr(r2.error || "");
      }).finally(() => setLoading(false));
    }, [props.uid, props.username]);
    if (loading) return /* @__PURE__ */ u$1(Loading, {});
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
      err && /* @__PURE__ */ u$1(Alert, { type: "error", children: err }),
      profile && /* @__PURE__ */ u$1(S, { children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: [
          profile.avatarUrl && /* @__PURE__ */ u$1("img", { src: profile.avatarUrl, alt: "", width: 64, height: 64, style: { borderRadius: 12 } }),
          /* @__PURE__ */ u$1("div", { children: [
            /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: profile.username }),
            /* @__PURE__ */ u$1("p", { class: "xzqh-sub", children: [
              "uid=",
              profile.uid,
              profile.groupName ? ` · ${profile.groupName}` : ""
            ] })
          ] })
        ] }),
        profile.credits && Object.keys(profile.credits).length > 0 && /* @__PURE__ */ u$1("div", { class: "xzqh-meta", style: { marginBottom: 12 }, children: Object.entries(profile.credits).map(([k2, v2]) => /* @__PURE__ */ u$1("span", { style: { marginRight: 12 }, children: [
          k2,
          ": ",
          v2
        ] }, k2)) })
      ] }),
      /* @__PURE__ */ u$1("h2", { style: { fontSize: "1rem" }, children: "相关帖子" }),
      /* @__PURE__ */ u$1("div", { class: "xzqh-list", children: threads.map((t2) => /* @__PURE__ */ u$1("div", { class: "xzqh-item", children: /* @__PURE__ */ u$1(
        "a",
        {
          class: "title",
          href: `read.php?tid=${t2.tid}`,
          onClick: (e2) => {
            e2.preventDefault();
            navigate({ name: "thread", tid: t2.tid, page: 1 });
          },
          children: t2.title
        }
      ) }, t2.tid)) })
    ] });
  }
  function MessagesPage() {
    const [items, setItems] = d([]);
    const [err, setErr] = d("");
    const [to, setTo] = d("");
    const [title, setTitle] = d("");
    const [content, setContent] = d("");
    const [msg, setMsg] = d("");
    const reload = () => fetchMessages().then((r2) => {
      setItems(r2.items);
      setErr(r2.error || "");
    });
    h(() => {
      reload();
    }, []);
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
      /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: "私信" }),
      err && /* @__PURE__ */ u$1(S, { children: [
        /* @__PURE__ */ u$1(Alert, { type: "error", children: err }),
        /登录/.test(err) && /* @__PURE__ */ u$1("button", { type: "button", class: "xzqh-btn primary", onClick: () => navigate({ name: "login" }), children: "去登录" })
      ] }),
      !err && /* @__PURE__ */ u$1(S, { children: [
        /* @__PURE__ */ u$1("div", { class: "xzqh-list", style: { marginBottom: 16 }, children: [
          items.map((m2) => /* @__PURE__ */ u$1("div", { class: "xzqh-item", children: [
            /* @__PURE__ */ u$1("div", { children: [
              /* @__PURE__ */ u$1("div", { class: "title", children: m2.title }),
              /* @__PURE__ */ u$1("div", { class: "xzqh-meta", children: [
                m2.from,
                m2.unread ? " · 未读" : ""
              ] })
            ] }),
            /* @__PURE__ */ u$1("a", { href: m2.href, target: "_blank", rel: "noreferrer", children: "原页" })
          ] }, m2.id + m2.title)),
          !items.length && /* @__PURE__ */ u$1("div", { class: "xzqh-muted", children: "暂无私信" })
        ] }),
        /* @__PURE__ */ u$1("h2", { style: { fontSize: "1rem" }, children: "发送私信" }),
        msg && /* @__PURE__ */ u$1(Alert, { type: /成功/.test(msg) ? "ok" : "error", children: msg }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-form", children: [
          /* @__PURE__ */ u$1("label", { children: [
            "收件人",
            /* @__PURE__ */ u$1("input", { value: to, onInput: (e2) => setTo(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1("label", { children: [
            "标题",
            /* @__PURE__ */ u$1("input", { value: title, onInput: (e2) => setTitle(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1("label", { children: [
            "内容",
            /* @__PURE__ */ u$1("textarea", { value: content, onInput: (e2) => setContent(e2.target.value) })
          ] }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn primary",
              onClick: async () => {
                const r2 = await sendMessage({ to, title, content });
                setMsg(r2.message);
                if (r2.ok) {
                  setContent("");
                  reload();
                }
              },
              children: "发送"
            }
          )
        ] })
      ] })
    ] });
  }
  function SettingsPage() {
    const [prefs, setPrefs] = d(() => loadPrefs());
    return /* @__PURE__ */ u$1("div", { class: "xzqh-panel", children: [
      /* @__PURE__ */ u$1("h1", { class: "xzqh-h1", children: "客户端设置" }),
      /* @__PURE__ */ u$1("section", { class: "xzqh-settings-block", children: [
        /* @__PURE__ */ u$1("h2", { class: "xzqh-settings-title", children: "配色主题" }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-theme-grid", children: THEME_OPTIONS.map((t2) => /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: `xzqh-theme-card${prefs.theme === t2.id ? " active" : ""}`,
            "data-theme-preview": t2.id,
            onClick: () => setPrefs(savePrefs({ theme: t2.id })),
            children: [
              /* @__PURE__ */ u$1("span", { class: "xzqh-theme-swatch", "aria-hidden": "true", children: [
                /* @__PURE__ */ u$1("i", {}),
                /* @__PURE__ */ u$1("i", {}),
                /* @__PURE__ */ u$1("i", {})
              ] }),
              /* @__PURE__ */ u$1("strong", { children: t2.name }),
              /* @__PURE__ */ u$1("span", { children: t2.desc })
            ]
          },
          t2.id
        )) })
      ] }),
      /* @__PURE__ */ u$1("section", { class: "xzqh-settings-block xzqh-settings-liststyle", children: [
        /* @__PURE__ */ u$1("h2", { class: "xzqh-settings-title", children: "列表样式" }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-seg", children: LIST_STYLE_OPTIONS.map((opt) => /* @__PURE__ */ u$1(
          "button",
          {
            type: "button",
            class: prefs.listStyle === opt.id ? "active" : "",
            onClick: () => setPrefs(savePrefs({ listStyle: opt.id })),
            children: [
              /* @__PURE__ */ u$1("strong", { children: opt.name }),
              /* @__PURE__ */ u$1("span", { children: opt.desc })
            ]
          },
          opt.id
        )) })
      ] }),
      /* @__PURE__ */ u$1("section", { class: "xzqh-settings-block xzqh-settings-fontsize", children: [
        /* @__PURE__ */ u$1("h2", { class: "xzqh-settings-title", children: "显示字号" }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-font-scale", children: [
          /* @__PURE__ */ u$1("span", { class: "xzqh-font-scale-edge", children: "-100%" }),
          /* @__PURE__ */ u$1(
            "input",
            {
              class: "xzqh-font-scale-range",
              type: "range",
              min: -100,
              max: 100,
              step: 1,
              value: prefs.fontScale,
              "aria-label": "显示字号",
              onInput: (e2) => setPrefs(savePrefs({ fontScale: Number(e2.target.value) }))
            }
          ),
          /* @__PURE__ */ u$1("span", { class: "xzqh-font-scale-edge", children: "+100%" })
        ] }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-font-scale-readout", children: [
          prefs.fontScale > 0 ? "+" : "",
          prefs.fontScale,
          "% · 约 ",
          fontScaleToPx(prefs.fontScale),
          "px",
          prefs.fontScale !== 0 && /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              style: { marginLeft: 8, padding: "2px 8px" },
              onClick: () => setPrefs(savePrefs({ fontScale: 0 })),
              children: "复位"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u$1("section", { class: "xzqh-settings-block", children: [
        /* @__PURE__ */ u$1("h2", { class: "xzqh-settings-title", children: "原界面" }),
        /* @__PURE__ */ u$1("div", { class: "xzqh-row", children: [
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn danger",
              onClick: () => {
                setClientDisabled(true);
                teardownClient();
                location.reload();
              },
              children: "禁用客户端并恢复原界面"
            }
          ),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              class: "xzqh-btn ghost",
              onClick: () => {
                setClientDisabled(false);
                alert("已启用。刷新后生效。");
                location.reload();
              },
              children: "重新启用客户端"
            }
          )
        ] })
      ] })
    ] });
  }
  function App() {
    const [route, setRoute] = d(() => parseLocation());
    const [user, setUser] = d(null);
    const [unread, setUnread] = d(0);
    const refreshSession = async () => {
      const s2 = await loadSession();
      setUser(s2);
      if (s2.loggedIn) {
        try {
          const n2 = await fetchUnreadHint(s2.verifyhash);
          setUnread(n2);
        } catch {
          setUnread(0);
        }
      } else setUnread(0);
      return s2;
    };
    h(() => {
      refreshSession();
      const onPop = () => setRoute(parseLocation());
      window.addEventListener("popstate", onPop);
      document.addEventListener("click", linkClickHandler);
      return () => {
        window.removeEventListener("popstate", onPop);
        document.removeEventListener("click", linkClickHandler);
      };
    }, []);
    const body = (() => {
      switch (route.name) {
        case "home":
          return /* @__PURE__ */ u$1(HomePage, {});
        case "forum":
          return /* @__PURE__ */ u$1(
            ForumPage,
            {
              fid: route.fid,
              page: route.page,
              type: route.type,
              special: route.special,
              search: route.search,
              user
            }
          );
        case "thread":
          return /* @__PURE__ */ u$1(ThreadPage, { tid: route.tid, page: route.page, user });
        case "compose":
          return /* @__PURE__ */ u$1(
            ComposePage,
            {
              fid: route.fid,
              tid: route.tid,
              quotePid: route.quotePid,
              editPid: route.editPid,
              article: route.article
            }
          );
        case "login":
          return /* @__PURE__ */ u$1(
            LoginPage,
            {
              onSuccess: async (session) => {
                if (session == null ? void 0 : session.loggedIn) setUser(session);
                const s2 = await refreshSession();
                if (s2.loggedIn) setUser(s2);
                setRoute({ name: "home" });
                history.pushState({ xzqh: true }, "", "index.php");
              }
            }
          );
        case "search":
          return /* @__PURE__ */ u$1(SearchPage, { keyword: route.keyword, digest: route.digest, schTime: route.schTime });
        case "user":
          return /* @__PURE__ */ u$1(UserPage, { uid: route.uid, username: route.username });
        case "messages":
          return /* @__PURE__ */ u$1(MessagesPage, {});
        case "settings":
          return /* @__PURE__ */ u$1(SettingsPage, {});
      }
    })();
    const searchFid = route.name === "forum" || route.name === "compose" ? route.fid || void 0 : void 0;
    return /* @__PURE__ */ u$1(
      Layout,
      {
        user,
        unread,
        showListStyle: route.name !== "thread",
        settingsOpen: route.name === "settings",
        searchFid,
        onLogout: async () => {
          await logout();
          await refreshSession();
          setRoute({ name: "home" });
          history.pushState({ xzqh: true }, "", "index.php");
        },
        children: body
      }
    );
  }
  class ClientErrorBoundary extends C$1 {
    constructor() {
      super(...arguments);
      this.state = { failed: false };
    }
    componentDidCatch(err) {
      console.error("XZQH client render error", err);
      this.setState({ failed: true });
    }
    render() {
      if (this.state.failed) {
        return /* @__PURE__ */ u$1("div", { style: { padding: "32px 16px", font: "14px/1.6 sans-serif", color: "#333" }, children: [
          /* @__PURE__ */ u$1("h2", { style: { margin: "0 0 12px" }, children: "方舆客户端加载失败" }),
          /* @__PURE__ */ u$1("p", { style: { margin: "0 0 16px", color: "#666" }, children: "页面没有正常渲染。可以尝试刷新，或暂时恢复原论坛界面。" }),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              style: { marginRight: 8, padding: "8px 14px" },
              onClick: () => location.reload(),
              children: "刷新重试"
            }
          ),
          /* @__PURE__ */ u$1(
            "button",
            {
              type: "button",
              style: { padding: "8px 14px" },
              onClick: () => {
                setClientDisabled(true);
                location.reload();
              },
              children: "恢复原界面"
            }
          )
        ] });
      }
      return this.props.children;
    }
  }
  function boot() {
    if (!shouldActivate()) {
      if (isClientDisabled()) {
        const ready = () => {
          if (document.getElementById("xzqh-reenable")) return;
          const btn = document.createElement("button");
          btn.id = "xzqh-reenable";
          btn.textContent = "启用方舆客户端";
          btn.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:2147483647;padding:8px 12px;border-radius:999px;border:0;background:#0f6a5a;color:#fff;cursor:pointer;font:14px/1.2 sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.2)";
          btn.onclick = () => {
            try {
              localStorage.removeItem("xzqh_client_disabled");
            } catch {
            }
            location.reload();
          };
          document.body.appendChild(btn);
        };
        if (document.body) ready();
        else document.addEventListener("DOMContentLoaded", ready, { once: true });
      }
      return;
    }
    installEarlyMask();
    const root = ensureRoot();
    const mount = () => {
      R(
        /* @__PURE__ */ u$1(ClientErrorBoundary, { children: /* @__PURE__ */ u$1(App, {}) }),
        root
      );
    };
    if (document.body) mount();
    else document.addEventListener("DOMContentLoaded", mount, { once: true });
  }
  boot();

})();