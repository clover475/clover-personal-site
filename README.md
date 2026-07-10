# Clover Personal Site

个人网站的 DOM UI 与交互实验。

## 当前结构

- `index.html`：独立 Hero 页面，水彩场景与独立 SVG 水/泡沫 `hello`
- `about.html`：About Me DOM dossier 页面
- `projects.html`：Projects DOM 卡片与 Thinking 入口
- `contact.html`：Contact DOM 页面、湖面涟漪、联系方式和动物小彩蛋
- `styles.css` / `app.js`：页面状态、滚动曲面反馈、涟漪、花瓣、夜猫子模式
- `assets/`：页面位图资产与 `assets/references/` UI 参考图

## 设计约定

- 首页、Projects、Thinking、Contact 按长页面组织
- About Me 独立成页
- 静态漫画世界以黑白为主，动效元素使用少量彩色
- Hero 使用高分辨率水彩插画与独立 SVG 水/泡沫 `hello`
- Contact 使用湖面点击涟漪、联系方式 hover 花瓣、`kind` 发光和水獭/猫微反应
- 所有可读文字、卡片、按钮、导航均由 DOM/CSS 渲染，不再使用整页截图作为 UI

## 当前状态

这是“视觉确认稿”，目前使用本地参考图作为视觉底稿，并叠加可点击热点与状态交互。下一阶段再把确认后的视觉拆成真正的 HTML/CSS/Canvas/WebGL 组件。

## 本地查看

可直接打开 `index.html` 或 `about.html`。如果需要通过本地服务器查看，可使用任意静态文件服务器。
