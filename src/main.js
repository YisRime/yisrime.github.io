import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { themeConfig } from '@/config'

// 动态应用主题配置到 CSS 变量
const applyThemeConfig = () => {
  const root = document.documentElement
  root.style.setProperty('--primary-color', themeConfig.primaryColor)
  root.style.setProperty('--primary-dark', themeConfig.primaryDark)
  root.style.setProperty('--primary-light', themeConfig.primaryLight)
  root.style.setProperty('--text-primary', themeConfig.textPrimary)
  root.style.setProperty('--text-secondary', themeConfig.textSecondary)
  root.style.setProperty('--text-muted', themeConfig.textMuted)
  root.style.setProperty('--bg-primary', themeConfig.bgPrimary)
  root.style.setProperty('--gradient-bg', themeConfig.gradientBg)
  root.style.setProperty('--transition-normal', themeConfig.transitionNormal)
  root.style.setProperty('--avatar-shadow', themeConfig.avatarShadow)
  root.style.setProperty('--avatar-shadow-hover', themeConfig.avatarShadowHover)
  root.style.setProperty('--segment-glow', themeConfig.segmentGlow)
}

// 应用主题配置
applyThemeConfig()

createApp(App).mount('#app')
