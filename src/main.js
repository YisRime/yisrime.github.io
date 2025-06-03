import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// 预加载Font Awesome
const loadFontAwesome = () => {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    document.head.appendChild(link)
  }
}

// 应用基础主题配置
const applyBaseTheme = () => {
  const root = document.documentElement
  root.style.setProperty('--transition-normal', '0.3s ease-out')
}

loadFontAwesome()
applyBaseTheme()

createApp(App).mount('#app')
