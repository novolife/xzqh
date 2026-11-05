import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren, JSX } from 'preact';
import { uploadEditorImage, type MutiUploadResult } from '@/api/attach';
import { absUrl } from '@/lib/http';
import {
  countWindcodeChars,
  stripWindcodeStyles,
  windcodeToHtml,
} from '@/windcode';

export type EditorPanel = null | 'smile' | 'color' | 'backcolor' | 'image' | 'link' | 'table' | 'sell' | 'hide';

export interface EditorFlashAtt {
  aid: number;
  name: string;
  path: string;
  desc?: string;
  kind: 'image' | 'file';
}

const FONTS = [
  '宋体',
  '新宋体',
  '楷体_GB2312',
  '黑体',
  '微软雅黑',
  'Arial',
  'Courier New',
  'Georgia',
  'Tahoma',
  'Times New Roman',
  'Verdana',
  'impact',
];

const COLORS = [
  '#000000',
  '#333333',
  '#666666',
  '#999999',
  '#cccccc',
  '#ffffff',
  '#ff0000',
  '#ff8800',
  '#ffcc00',
  '#008800',
  '#00aaaa',
  '#1b72af',
  '#0000ff',
  '#8800ff',
  '#ff00aa',
  '#a52a2a',
];

const SMILE_COUNT = 14;

type HistoryState = { value: string; start: number; end: number };

export interface WindEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  /** compact = 快速回复等精简工具栏 */
  compact?: boolean;
  draftKey?: string;
  className?: string;
  /** 本地图片/附件 mutiupload 所需 */
  fid?: number;
  verifyhash?: string;
  /** 服务端 imageConfig.tabs 是否包含 local；false 时隐藏本地上传入口 */
  uploadEnabled?: boolean;
  /** 已上传待随帖提交的 flashatt（由父组件持有） */
  flashAtts?: EditorFlashAtt[];
  onFlashAttsChange?: (items: EditorFlashAtt[]) => void;
  /** 变化时聚焦并滚入视口（用于引用后跳到快速回复） */
  focusToken?: number;
}

export function WindEditor(props: WindEditorProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const localFileRef = useRef<HTMLInputElement>(null);
  const [panel, setPanel] = useState<EditorPanel>(null);
  const [preview, setPreview] = useState(false);
  const [simple, setSimple] = useState(!!props.compact);
  const [fullscreen, setFullscreen] = useState(false);
  const [msg, setMsg] = useState('');
  const [linkUrl, setLinkUrl] = useState('https://');
  const [linkText, setLinkText] = useState('');
  const [imgUrl, setImgUrl] = useState('https://');
  const [imgTab, setImgTab] = useState<'local' | 'network'>(() =>
    props.uploadEnabled === false ? 'network' : 'local',
  );
  const [imgBusy, setImgBusy] = useState(false);
  const [imgProgress, setImgProgress] = useState('');
  const [tableRows, setTableRows] = useState(2);
  const [tableCols, setTableCols] = useState(2);
  const [sellPrice, setSellPrice] = useState('1');
  const history = useRef<HistoryState[]>([]);
  const histIdx = useRef(-1);
  const applyingHistory = useRef(false);
  const sel = useRef({ start: 0, end: 0 });

  const flashAtts = props.flashAtts || [];
  const uploadEnabled = props.uploadEnabled !== false;
  const counts = useMemo(() => countWindcodeChars(props.value), [props.value]);
  const attachPreviewMap = useMemo(() => {
    const m: Record<number, string> = {};
    for (const a of flashAtts) {
      if (a.path) m[a.aid] = a.path;
    }
    return m;
  }, [flashAtts]);

  const addFlashAtt = (item: EditorFlashAtt) => {
    const next = [...flashAtts.filter((x) => x.aid !== item.aid), item];
    props.onFlashAttsChange?.(next);
  };

  useEffect(() => {
    // compact 页面默认精简；非 compact 保持完整
    setSimple(!!props.compact);
  }, [props.compact]);

  useEffect(() => {
    // 0 / undefined = 未请求聚焦；避免挂载时把页面滚到快速回复框
    if (props.focusToken == null || props.focusToken <= 0) return;
    const el = taRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    requestAnimationFrame(() => {
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
      sel.current = { start: len, end: len };
    });
  }, [props.focusToken]);

  const handleLocalImage = async (file: File) => {
    if (!uploadEnabled) {
      setMsg('当前用户组/版块未开启本地图片上传');
      return;
    }
    setImgBusy(true);
    setImgProgress('获取上传凭证…');
    const r: MutiUploadResult = await uploadEditorImage({
      file,
      fid: props.fid,
      onProgress: (p) => setImgProgress(p < 5 ? '准备上传…' : `上传 ${p}%`),
    });
    setImgBusy(false);
    setImgProgress('');
    if (!r.ok || !r.aid) {
      setMsg(r.message || '图片上传失败');
      return;
    }
    const path = r.path || r.url || '';
    addFlashAtt({
      aid: r.aid,
      name: file.name,
      path,
      kind: 'image',
    });
    // 对齐原站：本地图片插入 [attachment=aid]
    insert(`[attachment=${r.aid}]`);
    setMsg(`已上传并插入图片：${file.name}`);
  };

  const pushHistory = (value: string, start: number, end: number) => {
    if (applyingHistory.current) return;
    const cur = history.current[histIdx.current];
    if (cur && cur.value === value) return;
    history.current = history.current.slice(0, histIdx.current + 1);
    history.current.push({ value, start, end });
    if (history.current.length > 80) history.current.shift();
    histIdx.current = history.current.length - 1;
  };

  useEffect(() => {
    if (!props.value && histIdx.current < 0) {
      pushHistory('', 0, 0);
    }
  }, []);

  useEffect(() => {
    if (!props.draftKey) return;
    const id = window.setInterval(() => {
      try {
        if (props.value.trim()) {
          localStorage.setItem(
            props.draftKey!,
            JSON.stringify({ content: props.value, savedAt: Date.now() }),
          );
        }
      } catch {
        /* ignore */
      }
    }, 8000);
    return () => clearInterval(id);
  }, [props.draftKey, props.value]);

  const rememberSel = () => {
    const el = taRef.current;
    if (!el) return;
    sel.current = { start: el.selectionStart, end: el.selectionEnd };
  };

  const focusRestore = (start: number, end: number) => {
    requestAnimationFrame(() => {
      const el = taRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(start, end);
      sel.current = { start, end };
    });
  };

  const setValue = (next: string, cursorStart: number, cursorEnd = cursorStart) => {
    pushHistory(next, cursorStart, cursorEnd);
    props.onChange(next);
    focusRestore(cursorStart, cursorEnd);
  };

  const wrap = (before: string, after: string, placeholder = '') => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
    const value = props.value;
    const selected = value.slice(start, end);
    const inner = selected || placeholder;
    const next = value.slice(0, start) + before + inner + after + value.slice(end);
    const c0 = start + before.length;
    const c1 = c0 + inner.length;
    setValue(next, selected ? c0 : c0, selected ? c1 : c0 + inner.length);
    if (!selected && placeholder) focusRestore(c0, c0 + placeholder.length);
  };

  const insert = (text: string) => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
    const value = props.value;
    const next = value.slice(0, start) + text + value.slice(end);
    const pos = start + text.length;
    setValue(next, pos);
  };

  const undo = () => {
    if (histIdx.current <= 0) return;
    histIdx.current -= 1;
    const st = history.current[histIdx.current];
    applyingHistory.current = true;
    props.onChange(st.value);
    focusRestore(st.start, st.end);
    applyingHistory.current = false;
  };

  const redo = () => {
    if (histIdx.current >= history.current.length - 1) return;
    histIdx.current += 1;
    const st = history.current[histIdx.current];
    applyingHistory.current = true;
    props.onChange(st.value);
    focusRestore(st.start, st.end);
    applyingHistory.current = false;
  };

  const unlink = () => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
    const value = props.value;
    const selected = value.slice(start, end);
    const plain = selected
      .replace(/\[url(?:=[^\]]+)?\]([\s\S]*?)\[\/url\]/gi, '$1')
      .replace(/\[url\]([\s\S]*?)\[\/url\]/gi, '$1');
    const next = value.slice(0, start) + plain + value.slice(end);
    setValue(next, start, start + plain.length);
  };

  const outdent = () => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
    const value = props.value;
    const selected = value.slice(start, end);
    const target = selected || value;
    const plain = target
      .replace(/\[blockquote\]([\s\S]*?)\[\/blockquote\]/gi, '$1')
      .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, '$1');
    if (!selected) {
      setValue(plain, 0, 0);
      return;
    }
    const next = value.slice(0, start) + plain + value.slice(end);
    setValue(next, start, start + plain.length);
  };

  const clearStyle = () => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
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

  const insertList = (ordered: boolean) => {
    const el = taRef.current;
    const start = el?.selectionStart ?? sel.current.start;
    const end = el?.selectionEnd ?? sel.current.end;
    const value = props.value;
    const selected = value.slice(start, end) || '列表项';
    const items = selected
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `[li]${l}[/li]`)
      .join('\n');
    const block = `[list${ordered ? '=1' : ''}]\n${items}\n[/list]`;
    const next = value.slice(0, start) + block + value.slice(end);
    setValue(next, start + block.length);
  };

  const insertTable = () => {
    const rows = Math.min(10, Math.max(1, tableRows));
    const cols = Math.min(10, Math.max(1, tableCols));
    const lines: string[] = ['[table]'];
    for (let r = 0; r < rows; r++) {
      lines.push('[tr]');
      for (let c = 0; c < cols; c++) lines.push(`[td]内容${r + 1}-${c + 1}[/td]`);
      lines.push('[/tr]');
    }
    lines.push('[/table]');
    insert(lines.join('\n'));
    setPanel(null);
  };

  const restoreDraft = () => {
    if (!props.draftKey) {
      setMsg('当前页面未启用草稿');
      return;
    }
    try {
      const raw = localStorage.getItem(props.draftKey);
      if (!raw) {
        setMsg('没有可恢复的草稿');
        return;
      }
      const data = JSON.parse(raw) as { content?: string };
      if (!data.content) {
        setMsg('草稿为空');
        return;
      }
      setValue(data.content, data.content.length);
      setMsg('已恢复本地草稿');
    } catch {
      setMsg('草稿读取失败');
    }
  };

  const saveDraft = () => {
    if (!props.draftKey) {
      setMsg('当前页面未启用草稿');
      return;
    }
    try {
      localStorage.setItem(
        props.draftKey,
        JSON.stringify({ content: props.value, savedAt: Date.now() }),
      );
      setMsg('已存入本地草稿箱');
    } catch {
      setMsg('草稿保存失败');
    }
  };

  const checkWords = () => {
    const { chars, bytesApprox } = countWindcodeChars(props.value);
    setMsg(`字数检查：约 ${chars} 字 / ${bytesApprox} 字节（不含标签）`);
  };

  const onKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    const k = e.key.toLowerCase();
    if (k === 'b') {
      e.preventDefault();
      wrap('[b]', '[/b]', '粗体');
    } else if (k === 'i') {
      e.preventDefault();
      wrap('[i]', '[/i]', '斜体');
    } else if (k === 'u') {
      e.preventDefault();
      wrap('[u]', '[/u]', '下划线');
    } else if (k === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if (k === 'y' || (k === 'z' && e.shiftKey)) {
      e.preventDefault();
      redo();
    }
  };

  const togglePanel = (p: EditorPanel) => {
    rememberSel();
    setPanel((cur) => (cur === p ? null : p));
  };

  const ToolBtn = (p: {
    title: string;
    onClick: () => void;
    children: ComponentChildren;
    active?: boolean;
    className?: string;
  }) => (
    <button
      type="button"
      class={`xzqh-ed-btn${p.active ? ' active' : ''}${p.className ? ` ${p.className}` : ''}`}
      title={p.title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        rememberSel();
        p.onClick();
      }}
    >
      {p.children}
    </button>
  );

  return (
    <div class={`xzqh-editor${fullscreen ? ' is-full' : ''}${props.className ? ` ${props.className}` : ''}`}>
      <div class="xzqh-ed-toolbar">
        <div class="xzqh-ed-row">
          {!simple && (
            <>
              <select
                class="xzqh-ed-select"
                title="字体"
                defaultValue=""
                onChange={(e) => {
                  const v = (e.target as HTMLSelectElement).value;
                  (e.target as HTMLSelectElement).value = '';
                  if (v) wrap(`[font=${v}]`, '[/font]', '文字');
                }}
              >
                <option value="" disabled>
                  字体
                </option>
                {FONTS.map((f) => (
                  <option key={f} value={f} style={{ fontFamily: f }}>
                    {f}
                  </option>
                ))}
              </select>
              <select
                class="xzqh-ed-select xzqh-ed-select-sm"
                title="字号"
                defaultValue=""
                onChange={(e) => {
                  const v = (e.target as HTMLSelectElement).value;
                  (e.target as HTMLSelectElement).value = '';
                  if (v) wrap(`[size=${v}]`, '[/size]', '文字');
                }}
              >
                <option value="" disabled>
                  号
                </option>
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </>
          )}
          <ToolBtn title="粗体 (Ctrl+B)" onClick={() => wrap('[b]', '[/b]', '粗体')}>
            <b>B</b>
          </ToolBtn>
          <ToolBtn title="斜体 (Ctrl+I)" onClick={() => wrap('[i]', '[/i]', '斜体')}>
            <i>I</i>
          </ToolBtn>
          <ToolBtn title="下划线 (Ctrl+U)" onClick={() => wrap('[u]', '[/u]', '下划线')}>
            <span style={{ textDecoration: 'underline' }}>U</span>
          </ToolBtn>
          <ToolBtn title="删除线" onClick={() => wrap('[strike]', '[/strike]', '删除线')}>
            <s>S</s>
          </ToolBtn>
          {/* 精简模式也保留回复常用项 */}
          {simple && (
            <>
              <ToolBtn title="插入链接" active={panel === 'link'} onClick={() => togglePanel('link')}>
                链
              </ToolBtn>
              <ToolBtn title="插入引用" onClick={() => wrap('[quote]', '[/quote]', '引用内容')}>
                “”
              </ToolBtn>
              <ToolBtn title="撤销 (Ctrl+Z)" onClick={undo}>
                ↶
              </ToolBtn>
              <ToolBtn title="恢复 (Ctrl+Y)" onClick={redo}>
                ↷
              </ToolBtn>
            </>
          )}
          {!simple && (
            <>
              <ToolBtn title="文字颜色" active={panel === 'color'} onClick={() => togglePanel('color')}>
                <span class="xzqh-ed-a">
                  A<span class="xzqh-ed-a-bar" style={{ background: '#e11' }} />
                </span>
              </ToolBtn>
              <ToolBtn
                title="背景色"
                active={panel === 'backcolor'}
                onClick={() => togglePanel('backcolor')}
              >
                <span class="xzqh-ed-a">
                  A<span class="xzqh-ed-a-bar" style={{ background: '#fd0' }} />
                </span>
              </ToolBtn>
              <ToolBtn title="清除样式" onClick={clearStyle}>
                Tx
              </ToolBtn>
              <span class="xzqh-ed-sep" />
              <ToolBtn title="左对齐" onClick={() => wrap('[align=left]', '[/align]', '左对齐')}>
                左
              </ToolBtn>
              <ToolBtn title="居中对齐" onClick={() => wrap('[align=center]', '[/align]', '居中')}>
                中
              </ToolBtn>
              <ToolBtn title="右对齐" onClick={() => wrap('[align=right]', '[/align]', '右对齐')}>
                右
              </ToolBtn>
              <ToolBtn title="段落化" onClick={() => wrap('[paragraph]', '[/paragraph]', '段落')}>
                ¶
              </ToolBtn>
              <span class="xzqh-ed-sep" />
              <ToolBtn title="编号" onClick={() => insertList(true)}>
                1.
              </ToolBtn>
              <ToolBtn title="项目符号" onClick={() => insertList(false)}>
                •
              </ToolBtn>
              <ToolBtn title="缩进" onClick={() => wrap('[blockquote]', '[/blockquote]', '缩进内容')}>
                »»
              </ToolBtn>
              <ToolBtn title="取消缩进" onClick={outdent}>
                ««
              </ToolBtn>
              <span class="xzqh-ed-sep" />
              <ToolBtn title="分隔线" onClick={() => insert('[hr]\n')}>
                ―
              </ToolBtn>
              <ToolBtn title="插入引用" onClick={() => wrap('[quote]', '[/quote]', '引用内容')}>
                “”
              </ToolBtn>
              <ToolBtn title="插入代码" onClick={() => wrap('[code]', '[/code]', '代码')}>
                {'</>'}
              </ToolBtn>
              <ToolBtn title="插入出售" active={panel === 'sell'} onClick={() => togglePanel('sell')}>
                $
              </ToolBtn>
              <ToolBtn title="插入隐藏" active={panel === 'hide'} onClick={() => togglePanel('hide')}>
                隐
              </ToolBtn>
              <ToolBtn title="插入链接" active={panel === 'link'} onClick={() => togglePanel('link')}>
                链
              </ToolBtn>
              <ToolBtn title="取消链接" onClick={unlink}>
                断
              </ToolBtn>
              <ToolBtn title="插入表格" active={panel === 'table'} onClick={() => togglePanel('table')}>
                表
              </ToolBtn>
              <span class="xzqh-ed-sep" />
              <ToolBtn title="撤销 (Ctrl+Z)" onClick={undo}>
                ↶
              </ToolBtn>
              <ToolBtn title="恢复 (Ctrl+Y)" onClick={redo}>
                ↷
              </ToolBtn>
            </>
          )}
          <span class="xzqh-ed-sep" />
          <ToolBtn title="表情" active={panel === 'smile'} onClick={() => togglePanel('smile')} className="xzqh-ed-btn-lg">
            表情
          </ToolBtn>
          <ToolBtn title="图片" active={panel === 'image'} onClick={() => togglePanel('image')} className="xzqh-ed-btn-lg">
            图片
          </ToolBtn>
          <div class="xzqh-ed-spacer" />
          <ToolBtn title="简单/完整工具栏" active={simple} onClick={() => setSimple((v) => !v)}>
            {simple ? '完整' : '简单'}
          </ToolBtn>
          <ToolBtn title="全屏" active={fullscreen} onClick={() => setFullscreen((v) => !v)}>
            {fullscreen ? '退出' : '全屏'}
          </ToolBtn>
          <ToolBtn title="预览" active={preview} onClick={() => setPreview((v) => !v)}>
            {preview ? '编辑' : '预览'}
          </ToolBtn>
        </div>

        {panel === 'color' && (
          <div class="xzqh-ed-panel">
            <div class="xzqh-ed-swatches">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  class="xzqh-ed-swatch"
                  style={{ background: c }}
                  title={c}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    wrap(`[color=${c}]`, '[/color]', '文字');
                    setPanel(null);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {panel === 'backcolor' && (
          <div class="xzqh-ed-panel">
            <div class="xzqh-ed-swatches">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  class="xzqh-ed-swatch"
                  style={{ background: c }}
                  title={c}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    wrap(`[backcolor=${c}]`, '[/backcolor]', '文字');
                    setPanel(null);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {panel === 'smile' && (
          <div class="xzqh-ed-panel">
            <div class="xzqh-ed-smiles">
              {Array.from({ length: SMILE_COUNT }, (_, i) => i + 1).map((n) => (
                <button
                  type="button"
                  key={n}
                  class="xzqh-ed-smile"
                  title={`表情 ${n}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    insert(`[s:${n}]`);
                    setPanel(null);
                  }}
                >
                  <img src={`images/post/smile/default/${n}.gif`} alt="" width={22} height={22} />
                </button>
              ))}
            </div>
          </div>
        )}
        {panel === 'image' && (
          <div class="xzqh-ed-panel xzqh-ed-image-panel">
            <div class="xzqh-ed-subtabs" role="tablist">
              {uploadEnabled && (
                <button
                  type="button"
                  role="tab"
                  class={`xzqh-ed-subtab${imgTab === 'local' ? ' active' : ''}`}
                  onClick={() => setImgTab('local')}
                >
                  本地图片
                </button>
              )}
              <button
                type="button"
                role="tab"
                class={`xzqh-ed-subtab${imgTab === 'network' ? ' active' : ''}`}
                onClick={() => setImgTab('network')}
              >
                网络图片
              </button>
            </div>

            {uploadEnabled && imgTab === 'local' && (
              <div class="xzqh-ed-form-panel">
                <p class="xzqh-muted" style={{ margin: 0 }}>
                  上传 jpg / gif / png，插入正文（对齐原站图片对话框；与下方「附件」入口分开）。
                </p>
                <input
                  ref={localFileRef}
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.bmp,image/*"
                  multiple
                  hidden
                  onChange={async (e) => {
                    const list = Array.from((e.target as HTMLInputElement).files || []);
                    (e.target as HTMLInputElement).value = '';
                    for (const f of list) await handleLocalImage(f);
                  }}
                />
                <div class="xzqh-row">
                  <button
                    type="button"
                    class="xzqh-btn primary"
                    disabled={imgBusy}
                    onClick={() => localFileRef.current?.click()}
                  >
                    {imgBusy ? '上传中…' : '选择并上传图片'}
                  </button>
                  {imgProgress && <span class="xzqh-muted">{imgProgress}</span>}
                </div>
                {flashAtts.filter((a) => a.kind === 'image').length > 0 && (
                  <div class="xzqh-ed-img-thumbs">
                    {flashAtts
                      .filter((a) => a.kind === 'image')
                      .map((a) => (
                        <button
                          type="button"
                          key={a.aid}
                          class="xzqh-ed-img-thumb"
                          title={`再次插入 ${a.name}`}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => insert(`[attachment=${a.aid}]`)}
                        >
                          {a.path ? (
                            <img src={absUrl(a.path)} alt={a.name} />
                          ) : (
                            <span>#{a.aid}</span>
                          )}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}

            {imgTab === 'network' && (
              <div class="xzqh-ed-form-panel">
                <label>
                  图片地址
                  <input
                    value={imgUrl}
                    onInput={(e) => setImgUrl((e.target as HTMLInputElement).value)}
                  />
                </label>
                <button
                  type="button"
                  class="xzqh-btn primary"
                  onClick={() => {
                    const u = imgUrl.trim();
                    if (!/^https?:\/\//i.test(u)) {
                      setMsg('请输入以 http(s):// 开头的图片地址');
                      return;
                    }
                    insert(`[img]${u}[/img]`);
                    setPanel(null);
                  }}
                >
                  插入网络图片
                </button>
              </div>
            )}
          </div>
        )}
        {panel === 'link' && (
          <div class="xzqh-ed-panel xzqh-ed-form-panel">
            <label>
              链接地址
              <input value={linkUrl} onInput={(e) => setLinkUrl((e.target as HTMLInputElement).value)} />
            </label>
            <label>
              链接文字（可选）
              <input value={linkText} onInput={(e) => setLinkText((e.target as HTMLInputElement).value)} />
            </label>
            <button
              type="button"
              class="xzqh-btn primary"
              onClick={() => {
                if (!/^https?:\/\//i.test(linkUrl)) {
                  setMsg('请输入以 http(s):// 开头的链接');
                  return;
                }
                const el = taRef.current;
                const start = el?.selectionStart ?? sel.current.start;
                const end = el?.selectionEnd ?? sel.current.end;
                const selected = props.value.slice(start, end);
                const text = (linkText || selected || linkUrl).trim() || linkUrl;
                const tag = `[url=${linkUrl.trim()}]${text}[/url]`;
                const next = props.value.slice(0, start) + tag + props.value.slice(end);
                setValue(next, start + tag.length);
                setPanel(null);
              }}
            >
              插入链接
            </button>
          </div>
        )}
        {panel === 'table' && (
          <div class="xzqh-ed-panel xzqh-ed-form-panel xzqh-ed-inline-form">
            <label>
              行
              <input
                type="number"
                min={1}
                max={10}
                value={tableRows}
                onInput={(e) => setTableRows(Number((e.target as HTMLInputElement).value) || 1)}
              />
            </label>
            <label>
              列
              <input
                type="number"
                min={1}
                max={10}
                value={tableCols}
                onInput={(e) => setTableCols(Number((e.target as HTMLInputElement).value) || 1)}
              />
            </label>
            <button type="button" class="xzqh-btn primary" onClick={insertTable}>
              插入表格
            </button>
          </div>
        )}
        {panel === 'sell' && (
          <div class="xzqh-ed-panel xzqh-ed-form-panel xzqh-ed-inline-form">
            <label>
              售价
              <input value={sellPrice} onInput={(e) => setSellPrice((e.target as HTMLInputElement).value)} />
            </label>
            <button
              type="button"
              class="xzqh-btn primary"
              onClick={() => {
                wrap(`[sell=${sellPrice || '1'}]`, '[/sell]', '出售内容');
                setPanel(null);
              }}
            >
              插入出售
            </button>
          </div>
        )}
        {panel === 'hide' && (
          <div class="xzqh-ed-panel xzqh-ed-form-panel">
            <p class="xzqh-muted" style={{ margin: 0 }}>
              插入隐藏标签，浏览者需满足条件后可见（以论坛权限为准）。
            </p>
            <div class="xzqh-row">
              <button
                type="button"
                class="xzqh-btn primary"
                onClick={() => {
                  wrap('[hide]', '[/hide]', '隐藏内容');
                  setPanel(null);
                }}
              >
                插入 [hide]
              </button>
              <button
                type="button"
                class="xzqh-btn ghost"
                onClick={() => {
                  wrap('[post]', '[/post]', '隐藏内容');
                  setPanel(null);
                }}
              >
                插入 [post]
              </button>
            </div>
          </div>
        )}
      </div>

      {preview ? (
        <div
          class="xzqh-preview xzqh-ed-preview"
          dangerouslySetInnerHTML={{
            __html: windcodeToHtml(props.value, { attachments: attachPreviewMap }),
          }}
        />
      ) : (
        <textarea
          ref={taRef}
          class="xzqh-ed-textarea"
          value={props.value}
          placeholder={props.placeholder || '支持 Wind Code，可使用上方工具栏插入格式'}
          rows={props.minRows || (props.compact ? 6 : 14)}
          onSelect={rememberSel}
          onClick={rememberSel}
          onKeyUp={rememberSel}
          onKeyDown={onKeyDown}
          onInput={(e) => {
            const el = e.target as HTMLTextAreaElement;
            pushHistory(el.value, el.selectionStart, el.selectionEnd);
            props.onChange(el.value);
          }}
        />
      )}

      <div class="xzqh-ed-footer">
        <div class="xzqh-ed-footer-links">
          <button type="button" class="xzqh-linkish" onClick={restoreDraft}>
            恢复数据
          </button>
          <button type="button" class="xzqh-linkish" onClick={saveDraft}>
            草稿箱
          </button>
          <button type="button" class="xzqh-linkish" onClick={checkWords}>
            字数检查
          </button>
        </div>
        <div class="xzqh-ed-footer-meta">
          {counts.chars} 字 · Wind Code
        </div>
      </div>
      {msg && (
        <div class="xzqh-ed-toast" role="status">
          {msg}
          <button type="button" class="xzqh-linkish" onClick={() => setMsg('')}>
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
