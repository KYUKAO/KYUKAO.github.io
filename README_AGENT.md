# Agent Reference — KYUKAO Portfolio

> 给下一个接手此项目的前端 Agent 看的速查文档。省去阅读全部源码的时间。

---

## 项目概述

**类型**：纯静态作品集网站 + 配套可视化内容编辑器
**技术栈**：Vanilla HTML/CSS/JavaScript（无框架，无构建步骤）
**特殊点**：简历页（`index.html`）额外引入了 Tailwind CSS CDN

---

## 文件结构与职责

```
kyukao-portfolio/
├── index.html          # 简历页，Tailwind CSS 页面
├── home.html           # 主页，CSS变量 + 自定义CSS
├── portfolio.html      # 作品集，卡片过滤功能
├── about.html          # 关于页
│
├── config.js           # ★ 唯一数据源，所有内容在此定义
│
├── js/
│   ├── content.js      # 读取CONFIG，构建CONTENT对象（双语分离）
│   ├── i18n.js         # 语言切换，渲染动态DOM
│   └── typography.js   # 排版配置，运行时注入<style>标签
│
├── tools/
│   ├── editor.html     # 可视化编辑器（独立SPA）
│   └── editor.js       # 编辑器全部逻辑（~1800行）
│
└── assets/
    ├── photo.jpg
    └── works/          # 作品图片
```

---

## 核心数据流

```
config.js (CONFIG对象)
    └→ content.js       → 构建 window.CONTENT = { zh:{...}, en:{...}, works:{...}, ... }
        └→ i18n.js      → 读取CONTENT，更新[data-i18n]元素，渲染动态卡片/列表
            └→ typography.js → 注入CSS字符串到<style>

脚本加载顺序（所有页面一致）：
  1. typography.js  2. config.js  3. content.js  4. i18n.js
  ⚠️ 顺序不可改变，每个文件依赖前一个暴露的全局变量
```

---

## config.js 数据结构

```javascript
window.CONFIG = {
  // §1 基本信息
  name: { en: 'Hanqing Li', zh: '李含青', alias: 'KYUKAO' },
  role: { en: '...', zh: '...' },
  contact: { email, github, linkedin, tel },
  languages: [...],

  // §2 主页
  home: {
    subtitle: { en, zh },
    about: { en, zh },       // 支持 <span style="..."> 内联HTML
    stats: [{ num, label:{en,zh} }],
    skills: ['HLSL', ...]    // 纯字符串数组（无需双语）
  },

  // §3 关于页
  about: {
    bio: { en, zh },
    description: { en, zh },
    photo: 'assets/photo.jpg',
    interests: [{ icon, title:{en,zh}, description:{en,zh} }]
  },

  // §4 作品集
  works: [{
    category: 'shader'|'vfx'|'tool'|'render'|'code',
    image: 'assets/works/xxx.jpg',  // 或外链URL
    title: { en, zh },
    description: { en, zh },
    tags: ['Tag1'],                 // 纯字符串
    links: [{ label:{en,zh}, href }]
  }],

  // §5 教育
  education: [{
    school: { en, zh },
    degree: { en, zh },
    major: { en, zh },
    period: '2019-2023',
    awards: [{ en, zh }]
  }],

  // §6 工作经历
  workExp: [{
    company: { en, zh },
    role: { en, zh },
    period: { en, zh },
    bullets: [{ en, zh }]   // 工作描述要点，数组
  }],

  // §7 独立项目
  indieProjects: [{
    name: { en, zh },
    role: { en, zh },
    period: { en, zh },
    description: { en, zh },
    links: [{ label:{en,zh}, href }]
  }]
}
```

**双语字段统一规范**：`{ en: '...', zh: '...' }`
**t() 解析函数**（在 content.js 中定义）：
```javascript
function t(field, lang) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field['en'] || '';
}
```

---

## content.js 输出结构

```javascript
window.CONTENT = {
  zh: { /* 扁平化的UI文案字符串 */ },
  en: { /* 同上 */ },
  works:         { zh: [...], en: [...] },
  education:     { zh: [...], en: [...] },
  workExp:       { zh: [...], en: [...] },
  indieProjects: { zh: [...], en: [...] },
  interests:     { zh: [...], en: [...] }
}
```

---

## i18n.js 工作机制

- **静态文本**：通过 `[data-i18n="key"]` 属性声明，`applyLang()` 批量更新 `innerHTML`
- **动态列表**：`renderPortfolioCards()` / `renderResumeEntries()` 清空容器后重新生成DOM
- **语言持久化**：`localStorage.setItem('lang', 'zh'|'en')`
- **初始化**：`DOMContentLoaded` 时自动执行，默认语言为 `'en'`

---

## typography.js 工作机制

- 定义 `window.TYPOGRAPHY` 对象（字体名、字号、行高等50+变量）
- 构建 CSS 字符串，注入到 `document.head` 的 `<style id="typo-style">` 标签
- 包含 Google Fonts `@import` URL
- 对外暴露 `window.applyTypography()` 可手动重新触发
- 简历页（index.html）有独立的 CSS 变量集合，与其他页面区分

---

## editor.js 架构

```
全局状态：window.S = { ...镜像CONFIG的结构... }

关键函数：
  loadConfig()      → fetch('../config.js') → 解析字符串 → 填充S
  snapshot()        → 推送到undoStack（最多50条）
  exportConfig()    → 将S序列化为config.js文件格式
  saveToFile()      → showSaveFilePicker() API（Chrome/Edge限定）
  uploadToGitHub()  → GitHub REST API，上传到Releases资源

自动备份：setInterval(30000) → localStorage.setItem('editorState', JSON.stringify(S))
```

编辑器是**独立运行**的 SPA，与主站不共享任何运行时状态，只通过 `config.js` 文件交换数据。

---

## CSS 变量（主站主题）

```css
:root {
  --pink:       #ff2d75;   /* 主强调色 */
  --pink-glow:  0 0 18px #ff2d7888;
  --bg:         #080808;   /* 背景色 */
  --text:       #f0f0f0;   /* 主文字 */
  --text-dim:   #888;
  --border:     #222;
}
```

---

## 常见修改场景

### 新增作品分类过滤器
1. 在 `portfolio.html` 找到 `.filter-btn` 按钮组，添加新按钮
2. 在 `config.js` 的 `works[].category` 使用新分类名
3. 过滤逻辑在 `i18n.js` 的 `renderPortfolioCards()` 中，检查 `data-category` 属性

### 新增 config.js 字段
1. 在 `config.js` 添加字段（`{ en, zh }` 格式）
2. 在 `content.js` 的对应 `buildXxx(lang)` 函数中读取并加入 CONTENT 对象
3. 在对应 HTML 中添加 `data-i18n` 属性或在 `i18n.js` 中手动绑定
4. 如需编辑器支持，在 `editor.html` 添加表单字段，在 `editor.js` 的 `exportConfig()` 中加入序列化逻辑

### 修改简历页样式
- 简历页使用 **Tailwind CSS**，直接修改 HTML 中的 class 即可
- 自定义样式在 `<style>` 块或 typography.js 的简历专属变量区

### 添加新页面
1. 新建 HTML 文件，按顺序引入 4 个 JS 文件
2. 在 `config.js` 中添加对应内容区块
3. 在 `content.js` 中添加 `buildXxx()` 函数并挂载到 CONTENT
4. 在各页面导航栏 HTML 中添加链接

---

## 注意事项

- **无 `console.log` 调试**：项目不含任何日志，调试时自行添加
- **无测试框架**：无单元测试，修改后手动刷新页面验证
- **跨域限制**：`editor.js` 用 `fetch('../config.js')` 加载配置，直接双击 `editor.html` 会因 `file://` 协议报错，必须通过本地服务器访问
- **`saveToFile()` 仅支持 Chrome/Edge**：依赖 `window.showSaveFilePicker` API，Firefox/Safari 降级为普通下载
- **Tailwind 仅在 index.html 使用**：其他页面不加载 Tailwind，勿混用
- **`config.js` 是普通 JS 文件**：不是 JSON，可以写注释，但 `editor.js` 解析时用了字符串替换技巧，修改格式时需小心
