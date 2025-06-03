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
  const follower = document.createElement('div')
  
  cursor.className = 'cursor'
  follower.className = 'cursor-follower'
  
  document.body.appendChild(cursor)
  document.body.appendChild(follower)
  
  // 鼠标移动事件
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
    
    // 光标跟随效果，增加一点延迟
    setTimeout(() => {
      follower.style.left = e.clientX + 'px'
      follower.style.top = e.clientY + 'px'
    }, 50)
  })
  
  // 链接悬停效果
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.classList.contains('avatar') ||
        e.target.parentElement.tagName.toLowerCase() === 'a') {
      cursor.classList.add('link-hover')
      follower.classList.add('link-hover')
    }
  })
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.classList.contains('avatar') ||
        e.target.parentElement.tagName.toLowerCase() === 'a') {
      cursor.classList.remove('link-hover')
      follower.classList.remove('link-hover')
    }
  })
  
  // 鼠标按下效果
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'
    follower.style.transform = 'translate(-50%, -50%) scale(0.6)'
  })
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    follower.style.transform = 'translate(-50%, -50%) scale(1)'
  })
  
  // 当鼠标离开窗口时隐藏光标
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
    follower.style.opacity = '0'
  })
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'
    follower.style.opacity = '0.5'
  })
}

applyBaseTheme()
initMouseCursor()

createApp(App).mount('#app')
