# 方舆论坛客户端

面向 [方舆论坛](http://xzqh.info/lt/)（phpwind 8.7）的第三方 Tampermonkey 前端：在不改服务器的前提下，用更清晰的界面完成浏览、登录、发帖、回复等操作。账号、权限与数据仍全部走原论坛。

## 安装

1. 安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/)
2. 在本页点击 **安装此脚本**
3. 打开 [http://xzqh.info/lt/](http://xzqh.info/lt/) ，页面应由客户端接管

也可从 GitHub 安装（支持油猴自动更新）：

- [gh-pages 安装地址](https://raw.githubusercontent.com/novolife/xzqh/gh-pages/xzqh-forum.user.js)
- [项目仓库](https://github.com/novolife/xzqh) / [Releases](https://github.com/novolife/xzqh/releases)

## 使用说明

- **浏览**：首页版块、帖子列表、读帖；主题与列表样式（列表 / 卡片）可在「设置」中切换
- **账号**：登录 / 退出（含原站图验）；未登录时的权限与原站一致
- **发帖与回复**：发帖、回复、引用、编辑（含楼主首楼）、删除入口按服务器返回的权限显示
- **其它**：搜索、投票、收藏；附件选择与上传受原论坛用户组限制
- **不接管的页面**：用户主页、个人资料、私信、搜索页等会回到原站页面，避免与原站脚本冲突

## 恢复原界面

若暂时不想使用客户端：

1. 打开客户端内 **设置** → **禁用客户端并恢复原界面**
2. 或在控制台执行：`localStorage.setItem('xzqh_client_disabled','1')` 后刷新

右下角会出现「启用方舆客户端」按钮；清除该键或点启用即可恢复。

## 字号与主题

设置页可调节字号（约 −100%～+100%），并切换配色主题（方舆 / 青绿 / 墨玉 / 澄湖 / 沙洲 / 夜航 / 高对比等）。

## 反馈与源码

- 问题反馈：[GitHub Issues](https://github.com/novolife/xzqh/issues)
- 源码与构建说明：[github.com/novolife/xzqh](https://github.com/novolife/xzqh)

## 免责声明

本脚本仅供改善个人阅读与操作体验，不修改论坛服务器，不绕过权限。请遵守论坛规则与当地法律法规。协议为 MIT。
