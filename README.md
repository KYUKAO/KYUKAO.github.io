# KYUKAO Portfolio

一个极简风格的个人作品集网站，内置可视化编辑器，无需编写代码即可更新所有内容。

---

## 快速开始

### 查看网站

直接用浏览器打开以下任意页面：

| 页面 | 文件 |
|------|------|
| 简历（首页入口） | `index.html` |
| 主页 | `home.html` |
| 作品集 | `portfolio.html` |
| 关于我 | `about.html` |

> **提示**：推荐使用 VS Code 的 [Live Server 插件](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 启动本地服务器，右键 `home.html` → "Open with Live Server"，以避免浏览器跨域限制。

---

## 编辑内容

所有内容都通过内置的**可视化编辑器**管理，无需手动修改任何代码。

### 打开编辑器

用本地服务器访问：`http://localhost:端口号/tools/editor.html`

### 编辑流程

```
1. 在编辑器各板块中修改内容
2. 点击右上角「⬇ 导出 config.js」
3. 选择「直接保存」（Chrome/Edge）或下载后替换项目根目录的 config.js
4. 刷新浏览器页面，查看效果
```

### 编辑器功能

| 功能 | 说明 |
|------|------|
| **§0 字体排版** | 修改字体、字号、行高等 |
| **§1 基本信息** | 姓名、职位、联系方式、社交链接 |
| **§2 主页** | 副标题、简介、数据统计、技能标签 |
| **§3 关于我** | 个人简介、照片、兴趣方向 |
| **§4 作品集** | 项目卡片（图片、标题、标签、链接） |
| **§5 教育经历** | 学校、专业、学历、荣誉 |
| **§6 工作经历** | 公司、职位、工作描述 |
| **§7 独立项目** | 个人/Game Jam 项目 |
| **§8 媒体上传** | 上传图片到 GitHub Releases 获取外链 |

### 快捷键

- `Ctrl+Z` — 撤销
- `Ctrl+Y` — 重做

> **自动备份**：编辑器每 30 秒自动保存到浏览器本地存储，关闭页面后再次打开会自动恢复。

---

## 上传作品图片

编辑器内置了 **GitHub Releases 媒体上传**功能（免费图床，单文件最大 2GB）：

1. 打开编辑器 → §8 媒体上传
2. 填入你的 GitHub 用户名、仓库名和 [Personal Access Token](https://github.com/settings/tokens)（需要 `repo` 权限）
3. 点击「检查/创建 Release」，然后拖入图片/视频文件上传
4. 点击列表中的文件，直链自动复制到剪贴板
5. 粘贴到对应作品的「图片路径」或「链接」字段

本地图片也可以直接放入 `assets/works/` 文件夹，路径填写 `assets/works/文件名.jpg`。

---

## 中英文切换

网站内置中英双语支持：

- 网页右上角有语言切换按钮（`EN / 中`）
- 用户选择的语言会保存在浏览器，下次访问自动恢复
- 编辑器中每个文本字段都有独立的中文和英文输入框

---

## 发布到 GitHub Pages

```
1. 将项目推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Branch 选择 main，文件夹选择 / (root)，保存
4. 访问 https://<用户名>.github.io/<仓库名>/
```

入口页面默认是**简历页**（`index.html`）。

---

## 文件说明

```
kyukao-portfolio/
├── index.html          # 简历页（GitHub Pages 入口）
├── home.html           # 主页
├── portfolio.html      # 作品集页
├── about.html          # 关于我页
├── config.js           # ⭐ 所有内容的唯一数据源（由编辑器生成）
├── js/
│   ├── content.js      # 将 config.js 转换为页面可用的数据
│   ├── i18n.js         # 中英文切换逻辑
│   └── typography.js   # 字体排版配置
├── tools/
│   ├── editor.html     # 可视化编辑器界面
│   └── editor.js       # 编辑器逻辑
└── assets/
    ├── photo.jpg        # 个人照片（可替换）
    └── works/           # 作品缩略图
```

---

## 常见问题

**Q：编辑器导出后，页面没有变化？**
A：确认 `config.js` 文件已被替换，然后强制刷新页面（`Ctrl+Shift+R`）。

**Q：编辑器打开后内容是空的？**
A：请通过本地服务器访问（如 Live Server），而非直接双击打开 `editor.html`。

**Q：图片无法显示？**
A：检查图片路径是否正确，本地图片建议放在 `assets/works/` 目录下。

**Q：语言切换后部分文字没有变化？**
A：检查 `config.js` 中对应字段是否填写了中英文两个版本。
