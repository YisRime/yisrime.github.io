<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { musicConfig } from '@/config'

const metingContainer = ref(null)

const loadMeting = () => {
  return new Promise((resolve) => {
    if (window.MetingJSElement) {
      resolve()
      return
    }

    // 加载 CSS
    if (!document.querySelector('link[href*="meting"]')) {
      const css = document.createElement('link')
      css.rel = 'stylesheet'
      css.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
      document.head.appendChild(css)
    }

    // 加载 APlayer
    const aplayerScript = document.createElement('script')
    aplayerScript.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
    aplayerScript.onload = () => {
      // 加载 MetingJS
      const metingScript = document.createElement('script')
      metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js'
      metingScript.onload = () => {
        setTimeout(resolve, 100)
      }
      document.head.appendChild(metingScript)
    }
    document.head.appendChild(aplayerScript)
  })
}

const initMeting = async () => {
  try {
    await loadMeting()
    
    if (metingContainer.value) {
      // 创建 meting-js 元素
      const metingElement = document.createElement('meting-js')
      metingElement.setAttribute('server', musicConfig.server || 'netease')
      metingElement.setAttribute('type', musicConfig.type || 'playlist')
      metingElement.setAttribute('id', musicConfig.id || '9167231423')
      metingElement.setAttribute('theme', musicConfig.theme || '#6366f1')
      metingElement.setAttribute('auto', musicConfig.auto || 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r')
      metingElement.setAttribute('mutex', 'true')
      metingElement.setAttribute('preload', 'auto')
      metingElement.setAttribute('order', musicConfig.order || 'random')
      metingElement.setAttribute('volume', musicConfig.volume || '0.7')
      
      metingContainer.value.appendChild(metingElement)
    }
  } catch (error) {
    console.error('MetingJS 初始化失败:', error)
  }
}

onMounted(() => {
  initMeting()
})

onUnmounted(() => {
  if (metingContainer.value) {
    metingContainer.value.innerHTML = ''
  }
})
</script>

<template>
  <div class="music-player">
    <div ref="metingContainer"></div>
  </div>
</template>

<style scoped>
.music-player {
  margin-top: 1rem;
}

/* 自定义APlayer样式 */
:deep(.aplayer) {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  font-family: inherit !important;
  min-height: 500px !important;
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: row !important;
  position: relative !important;
  z-index: 1 !important;
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
  overflow: hidden !important;
  align-items: stretch !important;
}

:deep(.aplayer-body::before),
:deep(.aplayer-body::after) {
  display: none !important;
  content: none !important;
}

:deep(.aplayer-pic) {
  position: relative !important;
  z-index: 2 !important;
  width: 200px !important;
  min-width: 200px !important;
  height: 200px !important;
  flex-shrink: 0 !important;
}

:deep(.aplayer-info) {
  background: transparent !important;
  border-bottom: none !important;
  border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 16px 20px 12px !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

:deep(.aplayer-music) {
  color: var(--text-primary) !important;
}

:deep(.aplayer-title) {
  color: var(--text-primary) !important;
  font-weight: 600 !important;
}

:deep(.aplayer-author) {
  color: var(--text-secondary) !important;
}

:deep(.aplayer-controller) {
  background: transparent !important;
  padding: 20px 24px 16px 24px !important;
  position: relative !important;
  z-index: 20 !important;
  order: 10 !important;
  margin-top: auto !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-bar-wrap) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
  height: 6px !important;
  margin: 8px 0 12px 0 !important;
  position: relative !important;
  width: 100% !important;
}

:deep(.aplayer-bar) {
  height: 6px !important;
  border-radius: 6px !important;
  position: relative !important;
  width: 100% !important;
}

:deep(.aplayer-loaded) {
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 6px !important;
  height: 100% !important;
}

:deep(.aplayer-played) {
  background: linear-gradient(90deg, var(--primary-color), rgba(99, 102, 241, 0.8)) !important;
  border-radius: 6px !important;
  height: 100% !important;
  position: relative !important;
}

:deep(.aplayer-thumb) {
  background: var(--primary-color) !important;
  border: 3px solid #fff !important;
  width: 16px !important;
  height: 16px !important;
  border-radius: 50% !important;
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.5), 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  margin-top: -5px !important;
  position: absolute !important;
  right: -8px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  transition: all 0.2s ease !important;
}

:deep(.aplayer-thumb:hover) {
  transform: translateY(-50%) scale(1.2) !important;
  box-shadow: 0 0 16px rgba(99, 102, 241, 0.7), 0 2px 12px rgba(0, 0, 0, 0.3) !important;
}

:deep(.aplayer-thumb:before) {
  display: none !important;
}

:deep(.aplayer-volume-bar) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-volume) {
  background: var(--primary-color) !important;
}

:deep(.aplayer-time) {
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
}

:deep(.aplayer-time .aplayer-time-inner) {
  color: var(--text-secondary) !important;
  margin: 0 2px !important;
}

:deep(.aplayer-dtime) {
  color: var(--text-muted) !important;
  font-size: 0.8rem !important;
}

:deep(.aplayer-ptime) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
}

:deep(.aplayer-icon) {
  color: var(--text-primary) !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  opacity: 0.8 !important;
}

:deep(.aplayer-icon:hover) {
  color: var(--primary-color) !important;
  opacity: 1 !important;
  transform: scale(1.1) !important;
}

:deep(.aplayer-icon-play),
:deep(.aplayer-icon-pause) {
  font-size: 1.2rem !important;
}

:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 160px !important;
  overflow-y: auto !important;
  position: relative !important;
  z-index: 5 !important;
  order: 8 !important;
}

:deep(.aplayer-list ol) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.aplayer-list li) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  color: var(--text-secondary) !important;
  padding: 8px 12px !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-list li:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: var(--text-primary) !important;
}

:deep(.aplayer-list li.aplayer-list-light) {
  background: rgba(99, 102, 241, 0.2) !important;
  color: var(--text-primary) !important;
}

:deep(.aplayer-list-title) {
  color: var(--text-primary) !important;
  font-weight: 500 !important;
}

:deep(.aplayer-list-author) {
  color: var(--text-muted) !important;
  font-size: 0.8rem !important;
}

:deep(.aplayer-lrc) {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  max-height: 120px !important;
  padding: 0.8rem 1rem !important;
  position: relative !important;
  z-index: 6 !important;
  order: 7 !important;
  flex: 0 0 auto !important;
  overflow-y: auto !important;
  text-align: center !important;
}

:deep(.aplayer-lrc p) {
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
  line-height: 1.6 !important;
  margin: 2px 0 !important;
  padding: 2px 0 !important;
  transition: all 0.4s ease !important;
  text-align: center !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

:deep(.aplayer-lrc p.aplayer-lrc-current) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
  font-size: 0.85rem !important;
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.4) !important;
  transform: scale(1.05) !important;
}

/* 确保控制器始终在最底部 */
:deep(.aplayer .aplayer-controller) {
  order: 99 !important;
  flex-shrink: 0 !important;
}

/* 调整播放列表和歌词的顺序 */
:deep(.aplayer .aplayer-lrc) {
  order: 5 !important;
}

:deep(.aplayer .aplayer-list) {
  order: 6 !important;
}

/* 隐藏所有滚动条 */
:deep(.aplayer-lrc::-webkit-scrollbar),
:deep(.aplayer-list::-webkit-scrollbar) {
  display: none !important;
}

:deep(.aplayer-lrc),
:deep(.aplayer-list) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

@media (max-width: 768px) {
  :deep(.aplayer-body) {
    flex-direction: column !important;
  }
  
  :deep(.aplayer-pic) {
    width: 100% !important;
    height: 150px !important;
  }
  
  :deep(.aplayer-info) {
    border-left: none !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 8px 12px !important;
  }
  
  :deep(.aplayer-title) {
    font-size: 0.9rem !important;
  }
    :deep(.aplayer-author) {
    font-size: 0.8rem !important;
  }
  
  :deep(.aplayer-lrc) {
    max-height: 120px !important;
    padding: 0.8rem !important;
  }
  
  :deep(.aplayer-lrc p) {
    font-size: 0.8rem !important;
  }
}
</style>