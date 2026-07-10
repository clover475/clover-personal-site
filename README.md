# Clover Personal Site

个人网站的第一版视觉原型与交互实验。

## 当前结构

- `index.html`：首页长图式视觉原型，包含 Hero、About、Projects、Thinking、Contact
- `about.html`：独立 About Me 页面原型
- `styles.css` / `app.js`：覆盖层交互、光标、夜猫子模式、彩色烟花与小彩蛋
- `assets/`：当前 UI 参考图资产
- `assets/hero-art.png`：高分辨率独立 Hero 插画资产

## 设计约定

- 首页、Projects、Thinking、Contact 按长页面组织
- About Me 独立成页
- 静态漫画世界以黑白为主，动效元素使用少量彩色
- Hero 已从低清长图中独立出来，使用高分辨率插画与 SVG 变形 `hello`
- Contact 使用“点火器 hover 引导 → 点击后 Canvas 烟花”的交互
- 后续开发重点：把 Projects / Thinking 从长图底稿逐段拆成真实 DOM UI

## 当前状态

这是“视觉确认稿”，目前使用本地参考图作为视觉底稿，并叠加可点击热点与状态交互。下一阶段再把确认后的视觉拆成真正的 HTML/CSS/Canvas/WebGL 组件。

## 本地查看

可直接打开 `index.html` 或 `about.html`。如果需要通过本地服务器查看，可使用任意静态文件服务器。
