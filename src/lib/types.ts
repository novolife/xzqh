export interface SessionUser {
  uid: number;
  username: string;
  groupid: number;
  groupName?: string;
  verifyhash: string;
  loggedIn: boolean;
}

export interface ForumCategory {
  name: string;
  boards: ForumBoard[];
}

export interface ForumBoard {
  fid: number;
  name: string;
  description?: string;
  topics: number;
  posts: number;
  moderators: string[];
  lastAuthor?: string;
  lastTitle?: string;
  lastTime?: string;
  lastTid?: number;
  today?: number;
}

export interface ThreadTypeTag {
  name: string;
  typeId?: string;
  href?: string;
}

export interface ThreadItem {
  tid: number;
  title: string;
  author: string;
  authorUid?: number;
  /** When uid missing, link via u.php?username= */
  authorUsername?: string;
  postDate?: string;
  replies: number;
  hits: number;
  lastAuthor?: string;
  lastAuthorUid?: number;
  lastAuthorUsername?: string;
  lastTime?: string;
  /** Original last-reply jump, usually read.php?tid=&page=e#a */
  lastTimeHref?: string;
  topped: boolean;
  digest: boolean;
  vote: boolean;
  hasImage: boolean;
  /** Original forum `file/new.gif` “新帖” marker */
  isNew: boolean;
  multipage: boolean;
  /** Legacy single type name */
  typeName?: string;
  /** Thread category tags like [欧洲] [欧洲其他] */
  typeTags?: ThreadTypeTag[];
}

/** Homepage 最新主题 / 最近回复 feed item */
export interface IndexFeedItem {
  tid: number;
  title: string;
  forumName?: string;
  fid?: number;
  author?: string;
  time?: string;
}

export interface ForumTypeTab {
  id: string;
  name: string;
  href: string;
  /** Child type tabs from `#thread_typechild_{id}` */
  children?: ForumTypeTab[];
}

export interface ThreadListResult {
  fid: number;
  forumName: string;
  threads: ThreadItem[];
  page: number;
  totalPages: number;
  types: ForumTypeTab[];
  /** Other boards from original `#sideForum` */
  sideCategories: ForumCategory[];
  canPost: boolean;
  error?: ForumError;
}

export interface PostFloor {
  pid: number;
  /** 原站 pid 参数；楼主为 'tpc'，与原站编辑/删除链接一致 */
  pidParam: string;
  floor: number;
  /** 原站编辑链接 article=，通常等于显示楼层号；楼主为 0 */
  article?: number;
  author: string;
  authorUid?: number;
  avatarUrl?: string;
  postDate?: string;
  contentHtml: string;
  contentRaw?: string;
  canEdit: boolean;
  canDelete: boolean;
  canQuote: boolean;
  attachments: AttachmentItem[];
}

export interface AttachmentItem {
  aid?: number;
  name: string;
  url: string;
  size?: string;
  isImage: boolean;
}

export interface ThreadDetail {
  tid: number;
  fid: number;
  title: string;
  /** Category tags stripped from title / page, e.g. 欧洲其他 */
  typeTags?: ThreadTypeTag[];
  forumName?: string;
  floors: PostFloor[];
  page: number;
  totalPages: number;
  canReply: boolean;
  canFavor: boolean;
  isVote: boolean;
  voteHtml?: string;
  verifyhash: string;
  /** 读帖页快速回复表单的 action（通常 post.php?fid=...） */
  replyAction?: string;
  replyForm?: Record<string, string>;
  error?: ForumError;
}

export interface ForumError {
  kind: 'login_required' | 'permission' | 'not_found' | 'unknown';
  message: string;
}

export interface SearchResultItem {
  tid: number;
  title: string;
  author?: string;
  forumName?: string;
  snippet?: string;
  time?: string;
}

export interface UserProfile {
  uid: number;
  username: string;
  groupName?: string;
  posts?: string;
  credits?: Record<string, string>;
  registerDate?: string;
  signatureHtml?: string;
  avatarUrl?: string;
}

export interface MessageItem {
  id: string;
  from: string;
  title: string;
  time?: string;
  unread?: boolean;
  href: string;
}

export interface ComposeTypeOption {
  id: string;
  name: string;
}

export interface PostFormMeta {
  action: string;
  fields: Record<string, string>;
  verifyhash: string;
  /** 新主题必须填写标题 */
  titleRequired: boolean;
  /** 是否显示标题编辑框（新主题/编辑主题首楼） */
  showTitle: boolean;
  uploadEnabled: boolean;
  types: ComposeTypeOption[];
  options: {
    anonymousEnabled: boolean;
    hideEnabled: boolean;
    sellEnabled: boolean;
    enhideEnabled: boolean;
  };
}

export type Route =
  | { name: 'home' }
  | { name: 'forum'; fid: number; page: number; type?: string; special?: string; search?: string }
  | { name: 'thread'; tid: number; page: number }
  | {
      name: 'compose';
      fid: number;
      tid?: number;
      /** 原站 pid 参数；楼主为 'tpc' */
      quotePid?: number | string;
      /** 原站 pid 参数；楼主为 'tpc' */
      editPid?: number | string;
      article?: number;
    }
  | { name: 'search'; keyword?: string; digest?: boolean; schTime?: string }
  | { name: 'user'; uid?: number; username?: string }
  | { name: 'messages' }
  | { name: 'login' }
  | { name: 'settings' };
