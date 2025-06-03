<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { musicConfig } from '@/config'

const metingPlayer = ref(null)
const isPlaying = ref(false)

let metingInstance = null

const loadMetingJS = () => {
  return new Promise((resolve) => {
    // 检查是否已经加载
    if (document.querySelector('script[src*="aplayer"]')) {
      resolve()
      return
    }

    // 添加 APlayer CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
    document.head.appendChild(link)
    
    // 添加 APlayer Script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
    script.onload = () => {
      const metingScript = document.createElement('script')
      metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
      metingScript.onload = resolve
      document.head.appendChild(metingScript)
    }
    document.head.appendChild(script)
  })
}

const initMeting = async () => {
  await loadMetingJS()
  
  const metingElement = document.createElement('meting-js')
  Object.entries(musicConfig).forEach(([key, value]) => {
    metingElement.setAttribute(key, value)
  })
  
  metingPlayer.value.appendChild(metingElement)
  
  // 等待 MetingJS 初始化完成
  setTimeout(() => {
    const aplayerElement = metingPlayer.value.querySelector('.aplayer')
    if (aplayerElement && window.aplayers && window.aplayers.length > 0) {
      metingInstance = window.aplayers[window.aplayers.length - 1]
      setupPlayerEvents()
    }
  }, 2000)
}

const setupPlayerEvents = () => {
  if (!metingInstance) return

  metingInstance.on('play', () => {
    isPlaying.value = true
  })

  metingInstance.on('pause', () => {
    isPlaying.value = false
  })
}

const cleanup = () => {
  if (metingInstance) {
    metingInstance.destroy()
    metingInstance = null
  }
}

onMounted(() => {
  initMeting()
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div class="music-section">
    <div class="section-header">
      <h3>音乐播放器</h3>
    </div>
    
    <div class="player-container">
      <div id="meting-player" ref="metingPlayer"></div>
    </div>
  </div>
</template>

<style scoped>
.music-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.music-section:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
}

.section-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

@media (max-width: 768px) {
  .music-section {
    padding: 1.5rem;
  }
}

/* 隐藏默认的 APlayer 样式 */
:deep(.aplayer) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
}
</style>