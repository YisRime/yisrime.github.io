import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// 应用基础主题配置
const applyBaseTheme = () => {
  document.documentElement.style.setProperty('--transition-normal', '0.3s ease-out')
}

applyBaseTheme()

createApp(App).mount('#app')
