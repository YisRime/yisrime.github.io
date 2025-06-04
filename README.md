# Yis_Rime's Homepage

🌸 Yis_Rime の一隅之地 - 天山云水 上下一白

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/) [![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/) [![License](https://img.shields.io/badge/License-AGPLv3-blue?style=flat-square)](./LICENSE)

💫 **如果这个项目对你有帮助，请给个 Star ⭐**

> 📌 **使用须知**：如果您基于本项目修改制作自己的主页，请在页面中添加一个指向本项目的超链接，以表示对原项目的致谢。

## ✨ 功能特性

- 🎨 **动态主题** - 基于背景图像自动提取颜色生成主题配色
- ⏰ **数字时钟** - 七段数码管风格的实时时间显示
- 🎵 **音乐播放器** - 集成网易云音乐播放器
- 📝 **一言显示** - 打字机效果的诗词名句展示
- 📰 **RSS订阅** - 多源RSS内容聚合阅读
- 🖱️ **自定义光标** - 炫酷的鼠标跟踪效果
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌅 **动态背景** - 随机更换高质量风景壁纸

## 🛠️ 相关技术栈

- **前端框架**: [Vue.js](https://vuejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **字体图标**: [Font Awesome 6](https://fontawesome.com/)
- **打字机效果**: [Typed.js](https://mattboldt.com/demos/typed-js/)
- **音乐播放**: [APlayer](https://aplayer.js.org/) + [MetingJS](https://github.com/metowolf/MetingJS)
- **一言API**: [一言API](https://hitokoto.cn/)

## 🎯 核心功能实现

### 动态主题颜色

使用Canvas API分析背景图像，提取主要颜色并生成协调的配色方案。

### 七段数码管时钟

纯CSS实现的数码管效果，支持秒表闪烁动画。

### 打字机一言效果

使用Typed.js实现诗词名句的动态打字显示。

### RSS内容聚合

通过代理API获取多个RSS源内容，支持懒加载和无限滚动。

## 📱 响应式设计

- **桌面端** (1200px+): 左右分栏布局
- **平板端** (768px-1200px): 自适应布局
- **移动端** (<768px): 单栏垂直布局

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 预览构建结果

```bash
npm run preview
# 或
yarn preview
```

## 📁 项目结构

```text
src/
├── components/          # 组件目录
│   ├── ProfileCard.vue     # 个人信息卡片
│   ├── TimeDisplay.vue     # 数字时钟显示
│   ├── HitokotoDisplay.vue # 一言展示
│   ├── MusicPlayer.vue     # 音乐播放器
│   └── RSSFeed.vue         # RSS订阅组件
├── utils/               # 工具函数
│   └── colorExtractor.js   # 颜色提取工具
├── assets/              # 静态资源
│   └── main.css           # 全局样式
├── config.json          # 配置文件
├── App.vue             # 根组件
└── main.js             # 入口文件
```

## ⚙️ 配置说明

所有配置都在 `src/config.json` 文件中，你可以根据需要修改：

### 个人信息配置

```json
{
  "profile": {
    "name": "你的名字",
    "avatar": "头像URL"
  }
}
```

### 社交链接配置

```json
{
  "socialLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "fab fa-github"
    }
  ]
}
```

### 音乐播放器配置

```json
{
  "music": {
    "server": "netease",
    "type": "playlist",
    "id": "歌单ID",
    "autoplay": "true",
    "volume": "0.25"
  }
}
```

### RSS订阅配置

```json
{
  "rss": {
    "feeds": [
      {
        "name": "RSS源名称",
        "url": "RSS订阅链接"
      }
    ]
  }
}
```
