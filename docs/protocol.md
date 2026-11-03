# 方舆论坛（xzqh.info/lt）实测协议

基于 phpwind v8.7 (20111111) 对本站的实际探测结果。所有客户端实现必须以本文件为准。

## 基本信息

| 项 | 值 |
| --- | --- |
| 根路径 | `http://xzqh.info/lt/` |
| 版本 | phpwind v8.7 (20111111) |
| 字符集 | **GBK** |
| Cookie 前缀 | `5e062_` |
| 登录 Cookie | `5e062_winduser` |
| CSRF | 页面全局 `verifyhash`，请求附带 `verify=` |
| AJAX | `js/pw_ajax.js`，iframe 回传文本，常为 `\t` 分隔 |
| 默认风格 | phpwind `wind`（页内联 CSS + `images/pw_core.css`） |

## 原站配色（默认主题依据）

来自首页内联 `wind` 样式实测，客户端默认主题「方舆」对齐下列色值：

| 角色 | 色值 | 来源 |
| --- | --- | --- |
| 页面背景 | `#e6f3f9` | `body`（另有 `bg.jpg` 顶栏渐变） |
| 正文 | `#333333` | `body` / 链接默认 |
| 次要文字 | `#666666` / `#999999` | 列表头、分页等 |
| 表格边框 | `#a6cbe7` | `.t`、分页边框 |
| 浅分隔 | `#e4eff5` / `#d6e8f4` | `.tr3`、标题栏边 |
| 卡片/表体 | `#ffffff` | `.t`、`.f_one` |
| 斑马行 | `#f3f9fb` | `.f_two` |
| 栏头底 | `#f0f9ff` | `.h` |
| 栏头字/链 | `#1b72af` | `.h` |
| 主导航条 | `#176eac` | `#navA` |
| 深链/强调蓝 | `#014c90` | 多处标题强调 |
| 主按钮 | `#ff8800` / 边 `#ff5500` | `.btn` |
| 分页悬停 | `#72b0d7` | `.pages a:hover` |

## URL 一览

| 功能 | URL |
| --- | --- |
| 首页 | `index.php` |
| 版块列表 | `thread.php?fid={fid}&page={n}` |
| 帖子阅读 | `read.php?tid={tid}&page={n}` |
| 发新帖 | `post.php?fid={fid}` |
| 回复 | `post.php?fid={fid}&tid={tid}` 或读帖页快速回复 |
| 编辑 | `post.php?action=modify&tid={tid}&pid={pid}` |
| 登录 | `login.php` |
| 退出 | `login.php?action=quit` |
| 搜索 | `searcher.php` |
| 用户 | `u.php?uid=` / `u.php?username=` |
| 私信 | `message.php` |
| 注册 | `xzqh_register.php`（本站定制） |
| 验证码图 | 阿里云：`pin.aliyun.com/get_img?identity=xzqh.info&kjtype=default&sessionid=...` |
| 本机验证码 | `ck.php?nowtime=`（本站启用云验证码时不用） |
| 附件下载 | `job.php?action=download&aid=` |
| 收藏 | `pw_ajax.php?action=favor` 等 ajax 入口 |
| 投票 | `job.php?action=vote` |

## 登录

### 表单字段（`POST login.php`）

- `pwuser` 用户名
- `pwpwd` 密码
- `gdcode` 验证码
- `step` = `2`
- `lgt` = `0`（用户名登录）
- `cktime` = `31536000`（记住登录）
- `jumpurl` / `forward` 回跳
- `hideid` 隐身（0/1）
- 首页快捷登录可带 `ajax=1`

### 验证码

本站 `cloudgdcode = 1`，登录页内嵌：

```js
var cloudcaptchaurl = "http://pin.aliyun.com/get_img?identity=xzqh.info&kjtype=default&sessionid=...";
```

聚焦 `#gdcode` 时调用 `showgd()` 显示图片；用户输入写入 `gdcode`。

### 登录态识别

- Cookie `5e062_winduser` 为 **HttpOnly**（`document.cookie` 读不到），客户端必须以页面为准
- 登录后页面全局：`winduid` / `windid` / `groupid` / `verifyhash`（实测示例：uid + 用户名）
- 顶栏：`dl.login` → `#td_userinfomore span` 用户名；头像 `attachment/upload/small/.../{uid}.png`
- 退出：`login.php?action=quit&verify=...`（verify 与页面 verifyhash 可能不同，以退出链接为准）
- 游客无有效 `winduid`，读帖与私信会落到「提示信息」页

## 权限提示页

标题含 `提示信息`，正文常见：

- `只有注册会员才能进入`
- `您还没有登录或注册，暂时不能使用此功能`
- `您没有权限`

客户端必须识别该页并引导登录或展示服务器原文，不得伪造内容。

## 版块首页

- 分区标题（如「区划地名区」「区划相关区」）
- 版块行：`thread.php?fid=`、主题数/帖数 `topics/posts`、版主 `u.php`、最后回复
- 实测主要版块 fid：3,9,14,15,20,21,24,25,26,27,28,32,39,44 …

## 帖子列表 `thread.php`

- 表格 `#ajaxtable`，主题行 `tr.tr3`
- 列大致：图标 | 标题(`read.php?tid=`) | 作者/发帖时间 | 回复/浏览 | 最后发表
- 图标：`headtopic_*.gif` 置顶、`digest_*.gif` 精华、`vote.gif` 投票、`img.gif` 图帖、`multipage.gif` 多页
- 分页：`thread.php?fid=&page=`
- 分类：`type=`；投票等：`special=1`
- 发帖入口：`post.php?fid=#breadCrumb`

## 读帖 `read.php`（需登录）

游客访问返回登录提示。登录后预期：

- 主题标题、版块面包屑
- 楼层块（作者、uid、时间、楼层号、正文 HTML/Wind Code 渲染结果）
- 操作：回复、引用、编辑、删除（按权限出现）
- 分页：`read.php?tid=&page=`；`page=e` 末页
- 快速回复表单字段通常含：`atc_content`、`tid`、`fid`、`verify`、`ajax` 等
- 附件链接指向 `job.php?action=download&aid=` 或 `attachment/` 路径

## 发帖 / 回复 `post.php`

### 常见字段

- `atc_title` 标题（新主题）
- `atc_content` 正文（Wind Code）
- `verify` = 页面 `verifyhash`
- `ajax` = `1`（若走 ajax）
- `fid` / `tid` / `pid`（编辑时）
- `cyid`、`magicname`、`magicid`、`atc_tags` 等可选
- `nowtime` 查询参数防缓存

### 提交流程

1. `GET post.php?...` 取表单与 `verifyhash`
2. `POST` 原字段（multipart 或 urlencoded，以页面为准）
3. 解析响应：成功跳转/`jump`/`reload` 文本；失败展示服务器错误

## 上传

phpwind 8.7 常见入口（以登录后表单实测为准）：

- 发帖页附件字段 / Flash/HTML5 上传
- `job.php?action=mutiupload` 等多文件上传
- `pweditor` 相关图片上传

限制由服务器按用户组返回；客户端只展示错误、不绕过。

## 搜索 `searcher.php`

- `POST`/`GET`：`keyword`、`type`、`step`、`verify`
- 快捷：`sch_time=newatc|today`、`digest=1`

## 用户 / 私信 / 收藏

- 用户空间：`u.php`
- 私信：`message.php`（未登录提示）
- 收藏：读帖操作区 ajax / `pw_ajax.php`
- 投票：`job.php?action=vote`

## 客户端约定

1. 读请求：同域 `fetch`，`credentials: 'include'`
2. 响应一律 `arrayBuffer` + `TextDecoder('gbk')`
3. 写请求：隐藏 `form` + `iframe`，`accept-charset=GBK`（对齐原站 `pw_ajax.js` 思路）
4. 写操作必须刷新 `verifyhash`
5. 不假设标准 REST；解析本站 HTML
6. 不以隐藏按钮代替权限校验
7. 可用 `localStorage.xzqh_client_disabled=1` 回退原界面
