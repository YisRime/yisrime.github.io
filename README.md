# Yis_Rime's Homepage

这是 Yis_Rime 的个人主页，使用 Vue.js 强力驱动。

## 功能

- 个人信息展示
- 联系方式

## 项目架构

### 技术栈

- **前端框架**: Vue.js 3
- **构建工具**: Vite
- **样式**: CSS3 / SCSS
- **部署**: GitHub Pages

### 目录结构

```text
yisrime.github.io/
├── public/                 # 静态资源目录
│   ├── favicon.ico         # 网站图标
│   └── index.html          # HTML 模板
├── src/                    # 源代码目录
│   ├── components/         # Vue 组件
│   │   ├── Header.vue      # 页面头部组件
│   │   ├── About.vue       # 关于我组件
│   │   ├── Contact.vue     # 联系方式组件
│   │   └── Footer.vue      # 页面底部组件
│   ├── assets/             # 静态资源
│   │   ├── images/         # 图片资源
│   │   ├── styles/         # 样式文件
│   │   │   ├── main.css    # 主样式文件
│   │   │   └── components/ # 组件样式
│   │   └── fonts/          # 字体文件
│   ├── views/              # 页面视图
│   │   └── Home.vue        # 主页视图
│   ├── router/             # 路由配置
│   │   └── index.js        # 路由定义
│   ├── App.vue             # 根组件
│   └── main.js             # 应用入口文件
├── dist/                   # 构建输出目录
├── node_modules/           # 依赖包目录
├── package.json            # 项目配置文件
├── vite.config.js          # Vite 配置文件
├── .gitignore              # Git 忽略文件
└── README.md               # 项目说明文档
```

### 组件架构

```text
App.vue (根组件)
├── Header.vue (导航栏)
├── Home.vue (主页内容)
│   ├── About.vue (个人介绍)
│   └── Contact.vue (联系信息)
└── Footer.vue (页脚)
```

### 开发指南

#### 安装依赖

```bash
npm install
```

#### 启动开发服务器

```bash
npm run dev
```

#### 构建生产版本

```bash
npm run build
```

#### 预览构建结果

```bash
npm run preview
```

### 部署说明

项目配置为自动部署到 GitHub Pages：

1. 代码推送到 `main` 分支
2. GitHub Actions 自动构建
3. 部署到 `gh-pages` 分支
4. 通过 `https://yisrime.github.io` 访问
