import { defineConfig, type Plugin } from 'vite';
import preact from '@preact/preset-vite';
import monkey from 'vite-plugin-monkey';
import path from 'node:path';
import fs from 'node:fs';

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
        name: 'XZQH Forum Client / 方舆论坛客户端',
        namespace: 'http://xzqh.info/lt/',
        version: '1.0.0',
        description: '方舆论坛美化',
        author: 'XZQH Client',
        match: [
          'http://xzqh.info/lt/*',
          'https://xzqh.info/lt/*',
          'http://www.xzqh.info/lt/*',
          'https://www.xzqh.info/lt/*',
        ],
        icon: 'http://xzqh.info/lt/images/wind/logo.png',
        // document-start：赶在原站 post.js onReady / PwFace.init 之前补齐 defaultface
        'run-at': 'document-start',
        grant: 'none',
        connect: ['pin.aliyun.com', 'xzqh.info'],
      },
      build: {
        fileName: 'xzqh-forum.user.js',
      },
    }),
    patchCssInjectHead(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
