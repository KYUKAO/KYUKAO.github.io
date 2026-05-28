# 作品集入口页设计方案

## 当前方向

`index` 页面采用“全程视频背景 + 前端 UI 叠层”的方案。

视频负责：

- 整体氛围
- 开场与入场感
- 相机进入门框的运镜
- 场景从剧场/门洞进入作品集世界的连续感

视频不负责：

- 最终四个入口按钮
- 栏目文字
- 可点击区域
- hover 动效

当视频播放到四个入口应该出现的位置时，页面改由前端叠加真实 UI：四个门框 PNG、四张栏目预览图、文字标签和点击热区。

## 交互流程

1. 初始状态
   - 视频全屏铺满浏览器窗口。
   - 作者名字和岗位名可以叠在视频上层。
   - 如果浏览器限制自动播放，等待用户点击后再播放。
   - 视频默认静音，除非后续明确加入声音设计。

2. 开场 1
   - 播放第一个开场视频。
   - 开场 1 负责第一段氛围和进入感。
   - 开场 1 的最后一帧必须能够无缝接到开场 2 的第一帧。

3. 开场 2
   - 开场 1 结束后立即切到开场 2。
   - 开场 2 负责门框入场/镜头推进动画。
   - 开场 2 里只保留背景和运镜，不烙入最终 UI 文案。
   - 开场 2 的最后一帧必须停在最终入口构图上，作为四个入口 UI 出现的承接画面。

4. UI 渐显
   - 开场 2 播放结束后，四个入口 UI 作为透明 PNG 层淡入。
   - 每个门框 UI 放在视频中对应的位置上。
   - 四张预览图填充在门框内部。
   - 出现方式采用透明渐变，不要硬切。

5. 最终可交互状态
   - 背景停在开场 2 的最后一帧，或者切到同构图的最终静帧。
   - 如果后续有干净循环背景，也可以在 UI 出现后切到轻循环。
   - 四个入口保持可见并可点击。
   - 四个栏目为：
     - Resume
     - Portfolio
     - About
     - Contact

## 图层结构

页面视觉层级从底到顶：

```text
Layer 1: 全屏背景视频序列（开场 1 -> 开场 2 -> 最终帧）
Layer 2: 可选的调色/暗角/柔光覆盖层
Layer 3: 四张栏目预览图
Layer 4: 四个门框 PNG
Layer 5: 栏目文字与透明点击热区
Layer 6: 点击栏目后的过渡遮罩
```

## 入口 UI 素材

当前实现使用的仓库内素材目录：

```text
assets/entry/
```

当前入口页使用的网页优化视频文件：

```text
assets/entry/video/opening-1-ui.mp4
assets/entry/video/opening-2-ui.mp4
```

四个门框文件：

```text
assets/entry/frames/resume-frame.webp
assets/entry/frames/portfolio-frame.webp
assets/entry/frames/about-frame.webp
assets/entry/frames/contact-frame.webp
```

当前未使用中央大拱和底部按钮。四个入口均由 HTML 链接、预览图和门框 PNG 叠加实现。

## 每个入口的结构

每个入口作为一个独立前端组件：

```text
entry item
  preview image
  frame PNG
  text label
  invisible link / button
```

预览图在底层，门框 PNG 在上层。这样门框保持质感，预览图可以随时替换。

如果第一版实现不想做复杂异形裁切，可以先用 CSS 的圆角/拱形 mask 近似裁切预览图。后续再用 SVG mask 或 alpha mask 做更贴合门洞形状的裁切。

当前预览图命名：

```text
assets/entry/previews/preview-resume.webp
assets/entry/previews/preview-portfolio.webp
assets/entry/previews/preview-about.webp
assets/entry/previews/preview-contact.webp
```

这四张目前是临时填充图，等最终预览图确认后直接替换同名文件即可。

## UI 渐显动画

视频到达指定时间点后触发：

```text
opacity: 0 -> 1
translateY: 18px -> 0
scale: 0.96 -> 1
filter: blur(6px) -> blur(0)
duration: 900-1200ms
stagger: 100-180ms
```

目标感觉：四个入口像从场景里浮现出来，而不是像普通网页按钮突然贴上去。

## 视频衔接规则

首页使用两个连续视频：

```text
开场 1 -> 开场 2 -> UI 渐显
```

衔接要求：

```text
开场 1 最后一帧 = 开场 2 第一帧的视觉承接
开场 2 最后一帧 = 四个入口 UI 出现时的背景构图
```

实现时优先使用两个 `<video>` 元素预加载：

```text
videoA: 开场 1
videoB: 开场 2
```

`videoA` 结束前确保 `videoB` 已经加载到可播放状态。`videoA` 结束时立即隐藏 `videoA` 并播放 `videoB`。如果切换时出现黑帧，需要改成双视频重叠交叉切换，或者在两段视频之间插入开场 1 最后一帧静帧作为保险层。

开场 2 结束后触发 UI 渐显，不再让视频里的 UI 承担交互功能。

## Hover 动效

鼠标悬停某个入口时：

```text
门框：轻微放大
预览图：轻微 zoom in
门洞内部：暖色光晕增强
文字：亮度或透明度提高
鼠标：pointer
```

动效要克制，不能抢走背景视频的视觉中心。

## 点击过渡

点击某个入口后：

1. 锁定交互，防止重复点击。
2. 被点击的入口轻微放大。
3. 其他入口淡出。
4. 叠加暖光或暗色遮罩。
5. 跳转到对应页面。

后续可升级：点击不同入口时播放不同的 AI 转场视频，再进入具体页面。

## 实现原则

- 视频不要烙入最终栏目文字。
- 栏目名用真实 HTML 文本，方便改字和适配。
- 点击区域用真实链接或按钮，不只依赖图片。
- 四个入口的位置写进 CSS 变量或 JS 配置，方便反复微调。
- 桌面端优先还原宽屏构图。
- 移动端可能需要单独布局，不建议直接把宽屏画面等比缩小。

## 待补素材

后续还需要确认：

```text
1. Resume / Portfolio / About / Contact 四张最终预览图
2. 四个门框在开场 2 最后一帧上的精确位置微调
3. 开场 2 结束后是否暂停在最后一帧，还是切同构图静帧
4. 是否需要为每个入口做单独点击转场视频
```
