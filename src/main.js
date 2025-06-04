import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// 应用基础主题配置
const applyBaseTheme = () => {
  document.documentElement.style.setProperty('--transition-normal', '0.3s ease-out')
}

// 初始化鼠标跟踪
const initMouseCursor = () => {
  // 创建光标元素
  const cursor = document.createElement('div')
  
  cursor.className = 'cursor'
  
  document.body.appendChild(cursor)
  
  // 鼠标移动事件
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
  })
  
  // 链接悬停效果
  document.addEventListener('mouseover', (e) => {
    const target = e.target
    if (target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('avatar') ||
        target.classList.contains('social-link') ||
        target.classList.contains('rss-item') ||
        target.classList.contains('item-link') ||
        target.parentElement?.tagName.toLowerCase() === 'a' ||
        target.parentElement?.classList.contains('social-link') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.social-link') ||
        target.closest('.avatar')) {
      cursor.classList.add('link-hover')
    }
  })
  
  document.addEventListener('mouseout', (e) => {
    const target = e.target
    if (target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.classList.contains('avatar') ||
        target.classList.contains('social-link') ||
        target.classList.contains('rss-item') ||
        target.classList.contains('item-link') ||
        target.parentElement?.tagName.toLowerCase() === 'a' ||
        target.parentElement?.classList.contains('social-link') ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.social-link') ||
        target.closest('.avatar')) {
      cursor.classList.remove('link-hover')
    }
  })
  
  // 鼠标按下效果
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'
  })
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)'
  })
  
  // 当鼠标离开窗口时隐藏光标
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
  })
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'
  })
}

applyBaseTheme()
initMouseCursor()

createApp(App).mount('#app')
