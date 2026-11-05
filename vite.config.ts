import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey from 'vite-plugin-monkey';
import path from 'node:path';

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
        // document-end：避开 Tampermonkey document-start 阶段 document.head 尚未创建
        // 导致插件自动注入 CSS 时报 null 的问题；页面解析完成后再接管界面。
        'run-at': 'document-end',
        grant: 'none',
        connect: ['pin.aliyun.com', 'xzqh.info'],
      },
      build: {
        fileName: 'xzqh-forum.user.js',
      },
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
