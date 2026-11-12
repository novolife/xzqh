import { defineConfig, type Plugin } from 'vite';
import preact from '@preact/preset-vite';
import monkey from 'vite-plugin-monkey';
import path from 'node:path';
import fs from 'node:fs';
import pkg from './package.json';

/** GitHub 发布页 / raw 地址，供 Tampermonkey 安装与自动更新 */
const GH_USER = 'novolife';
const GH_REPO = 'xzqh';
const USERSCRIPT_FILE = 'xzqh-forum.user.js';
const DOWNLOAD_URL = `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/gh-pages/${USERSCRIPT_FILE}`;
const UPDATE_URL = DOWNLOAD_URL;

function resolveUserscriptVersion(): string {
  // 版本唯一来源：package.json；CI 升版后油猴按 @version 自动更新
  const override = process.env.USERSCRIPT_VERSION?.trim();
  if (override) return override;
  return String(pkg.version || '1.0.0');
}

/** 本地构建带「（测试）」；GitHub Actions 设置 USERSCRIPT_RELEASE=1 后用正式名。 */
function resolveUserscriptName(): string {
  const base = '方舆论坛客户端';
  if (process.env.USERSCRIPT_RELEASE === '1') return base;
  return `${base}（测试）`;
}

/** changelog.md 里最新一版（文件中第一个 ## x.y.z）→ 多行 `// @changelog`。 */
function loadChangelogEntries(): [string, string][] {
  const file = path.resolve(__dirname, 'changelog.md');
  const text = fs.readFileSync(file, 'utf8');
  const entries: [string, string][] = [];
  let version = '';
  for (const line of text.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(\d+\.\d+\.\d+)\s*$/);
    if (heading) {
      if (version) break;
      version = heading[1];
      continue;
    }
    const note = line.match(/^[-*]\s+(.+)$/)?.[1]?.trim();
    if (version && note) entries.push(['changelog', `${version} ${note.replace(/\s+/g, ' ')}`]);
  }
  if (!entries.length) throw new Error(`changelog.md 最新版本没有可用条目：${file}`);
  return entries;
}

/** document-start 时 head 可能尚未创建，把 CSS 注入改为落到 documentElement。 */
function patchCssInjectHead(): Plugin {
  return {
    name: 'xzqh-patch-css-inject-head',
    writeBundle(_opts, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type !== 'chunk' && item.type !== 'asset') continue;
        const fileName = item.fileName;
        if (!fileName.endsWith('.user.js')) continue;
        const full = path.resolve(__dirname, 'dist', fileName);
        if (!fs.existsSync(full)) continue;
        let code = fs.readFileSync(full, 'utf8');
        const next = code
          .replace(
            /document\.head\.append\((a|e)\)/g,
            '(document.head||document.documentElement).append($1)',
          )
          .replace(
            /document\.head\.appendChild\((a|e)\)/g,
            '(document.head||document.documentElement).appendChild($1)',
          );
        if (next !== code) fs.writeFileSync(full, next, 'utf8');
      }
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: resolveUserscriptName(),
        namespace: 'http://xzqh.info/lt/',
        version: resolveUserscriptVersion(),
        description:
          '方舆论坛（xzqh.info/lt）第三方前端：现代化浏览、登录、发帖/回复；账号与权限仍走原站，不改服务器。安装后打开论坛即可使用；设置页可换主题、调字号或一键恢复原界面。',
        author: 'XZQH Client',
        license: 'MIT',
        homepageURL: `https://github.com/${GH_USER}/${GH_REPO}`,
        supportURL: `https://github.com/${GH_USER}/${GH_REPO}/issues`,
        match: [
          'http://xzqh.info/lt/*',
          'https://xzqh.info/lt/*',
          'http://www.xzqh.info/lt/*',
          'https://www.xzqh.info/lt/*',
        ],
        icon: 'http://xzqh.info/lt/images/wind/logo.png',
        downloadURL: DOWNLOAD_URL,
        updateURL: UPDATE_URL,
        // document-start：赶在原站 post.js onReady / PwFace.init 之前补齐 defaultface
        'run-at': 'document-start',
        grant: 'none',
        connect: ['pin.aliyun.com', 'xzqh.info'],
        $extra: loadChangelogEntries(),
      },
      build: {
        fileName: USERSCRIPT_FILE,
      },
    }),
    patchCssInjectHead(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Greasy Fork 禁止压缩/混淆；保留可读源码以便审核与同步
    minify: false,
  },
});
