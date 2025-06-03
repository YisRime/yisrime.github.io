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
      metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
      metingScript.onload = () => {
        window.MetingJSElement = true
        resolve()
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
      // 清空容器
      metingContainer.value.innerHTML = ''
      
      // 创建meting元素
      const metingEl = document.createElement('meting-js')
      metingEl.setAttribute('server', musicConfig.server)
      metingEl.setAttribute('type', musicConfig.type)
      metingEl.setAttribute('id', musicConfig.id)
      metingEl.setAttribute('theme', musicConfig.theme)
      metingEl.setAttribute('autoplay', musicConfig.autoplay)
      metingEl.setAttribute('loop', musicConfig.loop)
      metingEl.setAttribute('order', musicConfig.order)
      metingEl.setAttribute('volume', musicConfig.volume)
      metingEl.setAttribute('lrc-type', '3')
      
      metingContainer.value.appendChild(metingEl)
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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
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
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  order: 1 !important;
}

:deep(.aplayer-pic) {
  width: 80px !important;
  height: 80px !important;
  margin: 16px auto !important;
  border-radius: 50% !important;
  position: relative !important;
  z-index: 2 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
}

:deep(.aplayer-pic .aplayer-button) {
  width: 24px !important;
  height: 24px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.9) !important;
  opacity: 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-pic:hover .aplayer-button) {
  opacity: 1 !important;
}

:deep(.aplayer-info) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  padding: 16px !important;
  text-align: center !important;
}

:deep(.aplayer-music) {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 4px !important;
  margin-bottom: 12px !important;
}

:deep(.aplayer-title) {
  color: var(--text-primary) !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  margin: 0 !important;
}

:deep(.aplayer-author) {
  color: var(--text-secondary) !important;
  font-size: 0.85rem !important;
  margin: 0 !important;
}

:deep(.aplayer-controller) {
  background: transparent !important;
  padding: 16px 20px !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  order: 3 !important;
}

:deep(.aplayer-bar-wrap) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px !important;
  height: 6px !important;
  margin: 0 0 12px 0 !important;
  cursor: pointer !important;
}

:deep(.aplayer-bar) {
  height: 6px !important;
  border-radius: 6px !important;
  position: relative !important;
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

:deep(.aplayer-time) {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  color: var(--text-secondary) !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
}

:deep(.aplayer-time-inner) {
  color: var(--text-secondary) !important;
  margin: 0 8px !important;
}

:deep(.aplayer-ptime) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
}

:deep(.aplayer-dtime) {
  color: var(--text-muted) !important;
}

:deep(.aplayer-icon) {
  color: var(--text-primary) !important;
  transition: all 0.3s ease !important;
  opacity: 0.8 !important;
  cursor: pointer !important;
  padding: 4px !important;
  border-radius: 4px !important;
}

:deep(.aplayer-icon:hover) {
  color: var(--primary-color) !important;
  opacity: 1 !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-icon-play),
:deep(.aplayer-icon-pause) {
  font-size: 1.2rem !important;
}

:deep(.aplayer-volume-wrap) {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

:deep(.aplayer-volume-bar-wrap) {
  width: 60px !important;
  height: 6px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 3px !important;
}

:deep(.aplayer-volume-bar) {
  height: 100% !important;
  border-radius: 3px !important;
}

:deep(.aplayer-volume) {
  background: var(--primary-color) !important;
  border-radius: 3px !important;
  height: 100% !important;
}

/* 歌词样式 */
:deep(.aplayer-lrc) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 120px !important;
  padding: 16px !important;
  order: 2 !important;
  overflow-y: auto !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar) {
  display: none !important;
}

:deep(.aplayer-lrc p) {
  color: var(--text-secondary) !important;
  font-size: 0.85rem !important;
  line-height: 1.6 !important;
  margin: 4px 0 !important;
  transition: all 0.3s ease !important;
  text-align: center !important;
}

:deep(.aplayer-lrc p.aplayer-lrc-current) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(99, 102, 241, 0.3) !important;
  transform: scale(1.05) !important;
}

/* 播放列表样式 */
:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 200px !important;
  overflow-y: auto !important;
  order: 4 !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}

:deep(.aplayer-list::-webkit-scrollbar) {
  display: none !important;
}

:deep(.aplayer-list ol) {
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.aplayer-list li) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  color: var(--text-secondary) !important;
  padding: 8px 16px !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
}

:deep(.aplayer-list li:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: var(--text-primary) !important;
}

:deep(.aplayer-list li.aplayer-list-light) {
  background: rgba(99, 102, 241, 0.2) !important;
  color: var(--text-primary) !important;
}

:deep(.aplayer-list-index) {
  color: var(--text-muted) !important;
  font-size: 0.75rem !important;
  min-width: 20px !important;
}

:deep(.aplayer-list-title) {
  color: var(--text-primary) !important;
  font-weight: 500 !important;
  flex: 1 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

:deep(.aplayer-list-author) {
  color: var(--text-muted) !important;
  font-size: 0.8rem !important;
  margin-left: auto !important;
}

:deep(.aplayer-list-cur) {
  width: 3px !important;
  height: 16px !important;
  border-radius: 2px !important;
  margin-right: 4px !important;
}

/* 隐藏不需要的元素 */
:deep(.aplayer-notice),
:deep(.aplayer-miniswitcher) {
  display: none !important;
}

@media (max-width: 768px) {
  .music-player {
    max-width: 100%;
  }
  
  :deep(.aplayer-pic) {
    width: 60px !important;
    height: 60px !important;
    margin: 12px auto !important;
  }
  
  :deep(.aplayer-info) {
    padding: 12px !important;
  }
  
  :deep(.aplayer-title) {
    font-size: 0.9rem !important;
  }
  
  :deep(.aplayer-author) {
    font-size: 0.8rem !important;
  }
  
  :deep(.aplayer-controller) {
    padding: 12px 16px !important;
  }
  
  :deep(.aplayer-lrc) {
    max-height: 100px !important;
    padding: 12px !important;
  }
  
  :deep(.aplayer-lrc p) {
    font-size: 0.8rem !important;
  }
  
  :deep(.aplayer-list) {
    max-height: 150px !important;
  }
}
</style>