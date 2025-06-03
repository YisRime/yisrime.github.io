<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { musicConfig } from '@/config'

const metingPlayer = ref(null)

const loadMetingJS = () => {
  return new Promise((resolve) => {
    if (window.APlayer && window.MetingJSElement) {
      resolve()
      return
    }

    // 加载CSS
    if (!document.querySelector('link[href*="aplayer"]')) {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
      document.head.appendChild(css)
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
    script.onload = () => {
      const metingScript = document.createElement('script')
      metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
      metingScript.onload = () => {
        setTimeout(resolve, 100)
      }
      document.head.appendChild(metingScript)
    }
    document.head.appendChild(script)
  })
}

const initMeting = async () => {
  try {
    await loadMetingJS()
    
    const metingElement = document.createElement('meting-js')
    Object.entries(musicConfig).forEach(([key, value]) => {
      metingElement.setAttribute(key, value)
    })
    
    // 设置为mini模式
    metingElement.setAttribute('mini', 'true')
    
    metingPlayer.value.appendChild(metingElement)
  } catch (error) {
    console.error('音乐播放器初始化失败:', error)
  }
}

onMounted(() => {
  initMeting()
})
</script>

<template>
  <div class="music-section">
    <div class="section-header">
      <h3>音乐播放器</h3>
    </div>
    
    <div ref="metingPlayer"></div>
  </div>
</template>

<style scoped>
.music-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.06) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.music-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.music-section:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(99, 102, 241, 0.3);
}

.section-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .music-section {
    padding: 1.5rem;
  }
}
</style>