# XZQH Forum Client（方舆论坛第三方前端）

基于 Tampermonkey 的 phpwind 8.7 第三方前端客户端。访问 [http://xzqh.info/lt/](http://xzqh.info/lt/) 时接管页面，用现代化界面完成浏览、登录、发帖等操作；**账号、权限、数据全部走原论坛**，不修改服务器。

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)
2. **推荐（GitHub 自动构建）**：打开安装地址，由油猴导入并支持后续自动更新：  
   [https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js](https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js)
3. 或本地构建：执行下方 `npm run build`，再打开 / 拖入 [`dist/xzqh-forum.user.js`](dist/xzqh-forum.user.js)
4. 访问 `http://xzqh.info/lt/`

> `master` 推送到 GitHub 后，Actions 会构建脚本并发布到 `gh-pages` 分支。首次使用需在仓库 Settings → Pages 中允许从 `gh-pages` 分支发布（raw 链接一般推送后即可用）。

## 开发

需要 Node.js 18+。

```bash
# Windows PowerShell 示例（若使用仓库自带便携 Node）
$env:PATH = "d:\xzqh\.tools\node-v22.21.0-win-x64;$env:PATH"

npm install
npm run build
```

开发调试：

```bash
npm run dev
```

Vite + `vite-plugin-monkey` 会生成可安装的 userscript；请在目标论坛域名下验证同域 Cookie。

## 功能概览

- 版块导航、帖子列表、帖子阅读（读帖权限以原论坛服务器为准）
- 登录 / 退出（兼容阿里云图验 `gdcode`）
- 发帖、回复、引用、编辑（含楼主首楼 `pid=tpc` 编辑）、删除入口（按服务器返回的权限显示）
- 搜索、投票、收藏（按原论坛真实入口；写操作仍由服务器校验）
- 用户主页、私信保持原站页面（不接管，避免与原站脚本冲突）
- 附件选择与上传尝试（限制以原论坛用户组为准）
- 配色主题切换（默认「方舆」对齐原站蓝橙；另有青绿 / 墨玉 / 澄湖 / 沙洲 / 夜航）与列表样式切换（列表式 / 卡片式）
- 设置页可一键禁用客户端并恢复原界面

## 回退原界面

- 客户端内：设置 →「禁用客户端并恢复原界面」
- 或控制台：`localStorage.setItem('xzqh_client_disabled','1')` 后刷新
- 右下角会出现「启用方舆客户端」按钮；清除该键即可恢复

## 协议说明

详见 [docs/protocol.md](docs/protocol.md)。实现以本站实测 HTML/表单为准，不虚构 REST API，不绕过权限。

## 免责声明

本项目仅供个人改善阅读与操作体验，不构成对论坛的任何未授权访问。请遵守论坛规则与当地法律法规。
