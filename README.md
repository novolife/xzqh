# XZQH Forum Client（方舆论坛第三方前端）

基于 Tampermonkey 的 phpwind 8.7 第三方前端客户端。访问 [http://xzqh.info/lt/](http://xzqh.info/lt/) 时接管页面，用现代化界面完成浏览、登录、发帖等操作；**账号、权限、数据全部走原论坛**，不修改服务器。

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)
2. **推荐（GitHub 自动构建）**：打开安装地址，由油猴导入并支持后续自动更新：  
   [https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js](https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js)
3. 或从 [Releases](https://github.com/novolife/xzqh/releases) 下载对应版本的 `xzqh-forum.user.js`
4. 或本地构建：执行下方 `npm run build`，再打开 / 拖入 [`dist/xzqh-forum.user.js`](dist/xzqh-forum.user.js)
5. 访问 `http://xzqh.info/lt/`

### 自动发版

版本号以根目录 [`package.json`](package.json) 的 `version` 为准（写入脚本 `@version`）。

1. 修改 `package.json` 的 `version`（如 `1.0.0` → `1.0.1`）并推送到 GitHub 的 `master` / `main`
2. Actions 会：构建脚本 → 发布到 `gh-pages`（油猴安装/更新地址）→ 更新 `greasyfork` 同步分支 → 若 `vX.Y.Z` 尚未发布则打 tag 并创建 GitHub Release（附带 `.user.js`）
3. 油猴根据 `@version` 变化自动提示更新

首次使用需在仓库 Settings → Pages 中允许从 `gh-pages` 分支发布。

### 同步到 Greasy Fork

Greasy Fork **没有**可供 Actions 直接上传的发布 API，官方做法是「从 GitHub raw URL 同步」+（可选）Webhook 即时更新。

1. 等 Actions 跑完，确认存在分支 [`greasyfork`](https://github.com/novolife/xzqh/tree/greasyfork) 与文件 `xzqh-forum.user.js`
2. 打开 [Greasy Fork](https://greasyfork.org/) 登录 → **发布脚本** → **从 URL 导入**，填：  
   `https://raw.githubusercontent.com/novolife/xzqh/greasyfork/xzqh-forum.user.js`
3. 勾选「将此脚本设置为从 URL 同步」；同步类型选自动或 Webhook
4. **附加信息（详细说明）**：打开脚本管理页 → **同步** / 管理，在「附加信息」同步里填：  
   `https://raw.githubusercontent.com/novolife/xzqh/greasyfork/ADDITIONAL_INFO.md`  
   格式选 **Markdown**，勾选作为默认语言；保存后点「更新并同步」。文案源文件为 [`docs/greasyfork-additional-info.md`](docs/greasyfork-additional-info.md)。
5. **即时更新（推荐）**：打开 [Webhook 说明](https://greasyfork.org/zh-CN/users/webhook-info) 生成密钥；在 GitHub 仓库 **Settings → Webhooks → Add webhook**：
   - Payload URL：页面上给你的 `https://greasyfork.org/.../webhook`
   - Content type：`application/json`
   - Secret：刚才生成的密钥
   - 事件：Just the push event
6. 之后只要升 `package.json` 的 `version` 并推送 `master`，Actions 会改 `greasyfork` 分支上的脚本与附加信息；Webhook 通知 Greasy Fork 拉取（代码更新需 `@version` 升高）

注意：Greasy Fork 禁止压缩/混淆代码，本仓库生产构建已关闭 minify，并带有 `@license MIT`。

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
