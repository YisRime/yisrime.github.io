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
  categories: [], // 空数组表示所有分类，可指定如 ['a', 'b', 'c']
  fallbackText: '网络请求失败，请稍后再试',
  fallbackAuthor: ''
}

// RSS配置
export const rssConfig = {
  feedUrl: 'https://blog.yisrime.link/?feed=rss',
  apiUrl: 'https://rss2json.com/api.json',
  maxItems: 10,
  enableRefresh: true,
  autoRefreshInterval: 300000, // 5分钟自动刷新
  fallbackItems: [
    {
      title: '欢迎访问我的博客',
      link: 'https://blog.yisrime.link',
      description: '这里会显示最新的博客文章，目前RSS服务暂时不可用...'
    }
  ]
}

// 背景图片配置
export const backgroundConfig = {
  apiUrls: {
    desktop: 'https://api.fuukei.org/random-img/default/pc.php',
    mobile: 'https://api.fuukei.org/random-img/default/mobile.php'
  },
  fallbackImages: {
    desktop: '/bg-desktop.jpg',
    mobile: '/bg-mobile.jpg'
  },
  enableBlur: true,
  blurAmount: '0.5px',
  overlayOpacity: 0.15,
  overlayColor: 'rgba(15, 23, 42, 0.15)'
}

// 应用布局配置
export const layoutConfig = {
  leftContentWidth: {
    desktop: '40%',
    tablet: '35%'
  },
  rightContentWidth: {
    desktop: '55%',
    tablet: '55%'
  },
  gap: '1.5rem',
  padding: {
    desktop: '2rem',
    mobile: '1rem'
  },
  breakpoints: {
    mobile: 768,
    tablet: 1023,
    desktop: 1200
  }
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

// 播放器样式配置
export const playerStyleConfig = {
  width: '60%',
  background: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
  blur: '30px',
  minHeight: '120px',
  padding: '12px',
  gap: '12px'
}

// 时间显示样式配置
export const timeStyleConfig = {
  maxWidth: '280px',
  digitWidth: '28px',
  digitHeight: '40px',
  segmentHeight: '3px',
  segmentWidth: '20px',
  separatorSize: '1.8rem',
  dateSize: '0.85rem',
  mobile: {
    maxWidth: '240px',
    digitWidth: '16px',
    digitHeight: '24px',
    segmentWidth: '12px',
    separatorSize: '1rem',
    dateSize: '0.6rem'
  }
}

// RSS样式配置
export const rssStyleConfig = {
  padding: '2rem',
  itemPadding: '1.2rem',
  titleSize: '1rem',
  descriptionSize: '0.85rem',
  dateSize: '0.75rem',
  headerSize: '1.3rem',
  refreshButtonSize: '32px'
}