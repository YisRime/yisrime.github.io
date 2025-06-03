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

/* 隐藏APlayer外观 */
:deep(.aplayer) {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-family: inherit !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
}

:deep(.aplayer-info) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
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
}

:deep(.aplayer-bar-wrap) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px !important;
}

:deep(.aplayer-played) {
  background: var(--primary-color) !important;
}

:deep(.aplayer-thumb) {
  background: var(--primary-color) !important;
  border: 2px solid #fff !important;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.3) !important;
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
}

:deep(.aplayer-icon) {
  color: var(--text-primary) !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-icon:hover) {
  color: var(--primary-color) !important;
}

:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 200px !important;
  overflow-y: auto !important;
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
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 150px !important;
  padding: 1rem !important;
}

:deep(.aplayer-lrc p) {
  color: var(--text-secondary) !important;
  font-size: 0.85rem !important;
  line-height: 1.5 !important;
  margin: 4px 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-lrc p.aplayer-lrc-current) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(99, 102, 241, 0.3) !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar) {
  width: 4px !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar-track) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar-thumb) {
  background: var(--primary-color) !important;
  border-radius: 2px !important;
}

@media (max-width: 768px) {
  :deep(.aplayer-info) {
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
}

:deep(.aplayer-body) {
  background: transparent !important;
}

:deep(.aplayer-info) {
  background: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
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
}

:deep(.aplayer-bar-wrap) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px !important;
}

:deep(.aplayer-played) {
  background: var(--primary-color) !important;
}

:deep(.aplayer-thumb) {
  background: var(--primary-color) !important;
  border: 2px solid #fff !important;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.3) !important;
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
}

:deep(.aplayer-icon) {
  color: var(--text-primary) !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-icon:hover) {
  color: var(--primary-color) !important;
}

:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 200px !important;
  overflow-y: auto !important;
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
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  max-height: 150px !important;
  padding: 1rem !important;
}

:deep(.aplayer-lrc p) {
  color: var(--text-secondary) !important;
  font-size: 0.85rem !important;
  line-height: 1.5 !important;
  margin: 4px 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-lrc p.aplayer-lrc-current) {
  color: var(--primary-color) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 8px rgba(99, 102, 241, 0.3) !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar) {
  width: 4px !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar-track) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-lrc::-webkit-scrollbar-thumb) {
  background: var(--primary-color) !important;
  border-radius: 2px !important;
}

@media (max-width: 768px) {
  :deep(.aplayer-info) {
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