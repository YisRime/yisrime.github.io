import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// 应用基础主题配置
const applyBaseTheme = () => {
  document.documentElement.style.setProperty('--transition-normal', '0.3s ease-out')
}

// 初始化鼠标跟踪
const initMouseCursor = () => {
  // 移动端不需要自定义光标
  if (window.innerWidth <= 768) return
  
  let cursor = null
  
  // 创建光标元素
  const createCursor = () => {
    if (cursor) return cursor
    
    cursor = document.createElement('div')
    cursor.className = 'cursor'
    document.body.appendChild(cursor)
    return cursor
  }
  
  // 检查是否为可交互元素
  const isInteractiveElement = (target) => {
    return target.closest('a, button, .avatar, .social-link, .rss-item, .item-link')
  }
  
  // 事件监听器
  const handlers = {
    mousemove: (e) => {
      const c = cursor || createCursor()
      c.style.left = e.clientX + 'px'
      c.style.top = e.clientY + 'px'
    },
    
    mouseover: (e) => {
      const c = cursor || createCursor()
      if (isInteractiveElement(e.target)) {
        c.classList.add('link-hover')
      }
    },
    
    mouseout: (e) => {
      if (cursor && isInteractiveElement(e.target)) {
        cursor.classList.remove('link-hover')
      }
    },
    
    mousedown: () => {
      const c = cursor || createCursor()
      c.style.transform = 'translate(-50%, -50%) scale(0.8)'
    },
    
    mouseup: () => {
      const c = cursor || createCursor()
      c.style.transform = 'translate(-50%, -50%) scale(1)'
    },
    
    mouseleave: () => cursor && (cursor.style.opacity = '0'),
    mouseenter: () => {
      const c = cursor || createCursor()
      c.style.opacity = '1'
    }
  }
  
  // 注册事件监听器
  Object.entries(handlers).forEach(([event, handler]) => {
    document.addEventListener(event, handler)
  })
}

applyBaseTheme()

// 确保页面完全加载后再初始化鼠标
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMouseCursor)
} else {
  // 使用 setTimeout 确保 Vue 应用挂载完成
  setTimeout(initMouseCursor, 100)
}

createApp(App).mount('#app')
