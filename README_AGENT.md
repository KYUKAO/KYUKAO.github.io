# Agent Reference - KYUKAO Portfolio

给接手本项目的前端 Agent 使用的速查文档。项目是纯静态站点，没有构建步骤。

---

## 项目概览

- 类型：个人作品集网站 + 本地可视化编辑器
- 技术栈：Vanilla HTML/CSS/JavaScript
- 部署：GitHub Pages root
- 主要数据源：`config.js`
- 主要排版配置：`js/typography.js`
- 动态渲染：`js/content.js` + `js/i18n.js`
- 特例：`resume.html` 使用 Tailwind CDN

---

## 文件职责

```text
index.html                    # 开场入口，使用 4K opening 视频
menu.html                     # 跳过开场后的快速菜单
home.html                     # 主页，使用 depth-of-field Canvas 背景
portfolio.html                # 作品集，动态渲染作品卡片
resume.html                   # 简历，动态渲染教育/工作/项目经历
contact.html                  # 联系，动态渲染个人信息/联系方式
contact.html                  # 联系，动态读取 CONFIG.contact
config.js                     # 内容数据源
js/content.js                 # 构建 window.CONTENT
js/i18n.js                    # 语言切换、动态 DOM 渲染
js/typography.js              # 注入全站排版 CSS
js/depth-of-field-bg.js       # home.html 背景 Canvas
assets/entry/                 # 入口页与场景背景资源
assets/uploads/               # 作品媒体资源
local-editor/index.html       # 编辑器界面
local-editor/editor.js        # 编辑器逻辑
```

---

## 数据流与加载顺序

```text
config.js
  -> content.js    # 读取 CONFIG，构建 CONTENT
  -> i18n.js       # 读取 CONTENT，更新 data-i18n 与动态列表

typography.js      # 读取 TYPOGRAPHY，注入 CSS
```

动态内容页的脚本顺序：

```html
<script src="config.js"></script>
<script src="js/typography.js"></script>
<script src="js/content.js"></script>
<script src="js/i18n.js"></script>
```

`content.js` 依赖 `CONFIG`，`i18n.js` 依赖 `CONTENT`。`typography.js` 不依赖内容数据，但建议保持在 `content.js` 之前加载。

---

## config.js 结构要点

`config.js` 声明全局 `CONFIG` 常量：

```javascript
const CONFIG = {
  name: { en: 'Hanqing Li', zh: '李涵清', alias: 'KYUKAO' },
  role: { en: 'Technical Artist · Game Creator', zh: '技术美术师 · 游戏创作者' },
  location: { en: 'Shanghai, China', zh: '中国 · 上海' },
  contact: { email, github, artstation, linkedin, tel },
  home: { subtitle, about, stats, skills },
  about: { bio, desc, interests },
  works: [{ group, category, image, hasVideo, title, desc, tags, links }],
  education: [{ school, period, degree, detail, award }],
  workExp: [{ company, period, role, projectUrl, bullets }],
  indieProjects: [{ title, period, role, projectUrl, award, bullets }]
};
```

双语字段使用 `{ en, zh }`。纯技术标签、URL、文件路径通常保持字符串即可。

---

## 动态渲染入口

`i18n.js` 暴露并自动调用：

- `window.applyLang(lang)`
- `window.toggleLang()`
- `window.renderFeaturedWorks(lang)`
- `window.renderPortfolioCards(lang)`
- `window.renderResumeEntries(lang)`
- `window.renderAboutInterests(lang)`
- `window.renderContactButtons(lang)`
- `window.renderContactPage(lang)`

静态文本通过 HTML 的 `data-i18n="key"` 更新。作品、简历、兴趣、联系按钮等列表由上述函数重建 DOM。

默认语言从 `localStorage.lang` 读取；没有缓存时默认英文。

---

## 入口页资源

`index.html` 当前使用：

```text
assets/entry/video/opening-1-ui.mp4
assets/entry/video/opening-2-ui.mp4
assets/entry/frames/*.webp
assets/entry/previews/*.webp
```

`menu.html` 使用：

```text
assets/entry/small-garden-4k.webp
assets/entry/frames/*.webp
assets/entry/previews/*.webp
```

内容页统一使用：

```text
assets/entry/scene-pages.css
assets/entry/scene-background.js
assets/entry/universal-bg-4k.webp
```

---

## 常见修改

### 新增作品

1. 在 `config.js` 的 `works` 数组中增加条目。
2. 媒体文件放入 `assets/uploads/`，或使用外链。
3. `group` 可用 `project` 或 `art`。
4. `category` 会用于作品过滤。

### 新增可翻译文案

1. 在 `js/content.js` 的 `buildStrings(lang)` 中增加 key。
2. 在 HTML 中添加 `data-i18n="new.key"`。
3. 如需动态列表，优先扩展 `i18n.js` 的现有 render 函数。

### 修改联系信息

优先改 `config.js` 的 `contact` 对象，`contact.html` 会读取它。

### 修改背景

- `home.html`：`js/depth-of-field-bg.js`
- 内容页：`assets/entry/scene-pages.css` 中的 `universal-bg-4k.webp`
- 入口页：`assets/entry/video/`、`assets/entry/frames/`、`assets/entry/previews/`

---

## 注意事项

- 没有测试框架，改动后需要用浏览器手动验证关键页面。
- `local-editor/editor.js` 会解析 `config.js` 字符串，调整 `config.js` 顶层格式时要谨慎。
- `showSaveFilePicker` 只在部分现代浏览器可用，其他浏览器会降级为下载文件。
- 不要把临时日志提交进仓库；`.gitignore` 已忽略 `*.log`。
