export const socialLinksConfig = [
  {
    name: 'GitHub',
    url: 'https://github.com/yisrime',
    icon: 'fab fa-github',
    color: '#333'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'fas fa-envelope',
    color: '#ea4335'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yisrime',
    icon: 'fab fa-twitter',
    color: '#1da1f2'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yisrime',
    icon: 'fab fa-linkedin',
    color: '#0077b5'
  },
  {
    name: 'Blog',
    url: 'https://blog.yisrime.com',
    icon: 'fas fa-blog',
    color: '#ff6b6b'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/yisrime',
    icon: 'fab fa-discord',
    color: '#5865f2'
  }
]

export const profileConfig = {
  name: '苡淞',
  avatar: '/avatar.webp',
  intro: '天山云水 上下一白'
}

export const musicConfig = {
  server: 'netease',
  type: 'playlist',
  id: '9167231423',
  theme: '#6366f1',
  autoplay: false,
  loop: 'all',
  order: 'random',
  volume: 0.7
}

// 时间显示配置
export const timeDisplayConfig = {
  showSeconds: true,
  blinkSeparator: true,
  updateInterval: 1000,
  locale: 'zh-CN',
  dateFormat: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  },
  timeFormat: {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
}

// 一言配置
export const hitokotoConfig = {
  apiUrl: 'https://v1.hitokoto.cn/',
  enableRefresh: true,
  autoRefreshInterval: 30000, // 30秒自动刷新
  categories: [] // 空数组表示所有分类，可指定如 ['a', 'b', 'c']
}

// RSS配置
export const rssConfig = {
  feedUrl: 'https://blog.yisrime.link/?feed=rss',
  apiUrl: 'https://rss2json.com/api.json',
  enableRefresh: true,
  autoRefreshInterval: 300000 // 5分钟自动刷新
}

// 背景图片配置
export const backgroundConfig = {
  apiUrls: {
    desktop: 'https://api.fuukei.org/random-img/default/pc.php',
    mobile: 'https://api.fuukei.org/random-img/default/mobile.php'
  },
  enableBlur: true,
  blurAmount: '0.5px',
  overlayOpacity: 0.15,
  overlayColor: 'rgba(15, 23, 42, 0.15)'
}

// 字体配置
export const fontConfig = {
  enableGoogleFonts: true,
  googleFonts: [
    'Inter:wght@400;500;600;700'
  ],
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  cdnUrls: {
    fontAwesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
  }
}

// 主题配置
export const themeConfig = {
  primaryColor: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#a5b4fc',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#64748b',
  bgPrimary: '#0f172a',
  gradientBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  transitionNormal: '0.3s ease-out',
  // 社交链接悬停颜色
  socialHoverGlow: 'rgba(99, 102, 241, 0.3)',
  socialHoverShadow: 'rgba(99, 102, 241, 0.4)',
  // 头像相关颜色
  avatarBorder: '#6366f1',
  avatarShadow: 'rgba(99, 102, 241, 0.3)',
  avatarShadowHover: 'rgba(99, 102, 241, 0.4)',
  // 数码管相关颜色
  segmentGlow: 'rgba(99, 102, 241, 0.6)',
  segmentShadow: 'rgba(99, 102, 241, 0.4)'
}