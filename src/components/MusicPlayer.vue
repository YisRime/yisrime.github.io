<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'

const metingContainer = ref(null)

const loadMeting = () => {
  return new Promise((resolve) => {
    if (window.MetingJSElement) return resolve()

    const loadScript = (src) => {
      return new Promise((scriptResolve, scriptReject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => scriptResolve()
        script.onerror = () => scriptReject()
        document.head.appendChild(script)
      })
    }

    const loadCSS = (href) => {
      if (!document.querySelector(`link[href*="aplayer"]`)) {
        const css = document.createElement('link')
        css.rel = 'stylesheet'
        css.href = href
        document.head.appendChild(css)
      }
    }

    // 立即加载资源
    loadCSS('https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css')
    
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js')
    ]).then(() => {
      setTimeout(resolve, 100)
    }).catch(() => resolve())
  })
}

const initMeting = async () => {
  try {
    await loadMeting()
    
    if (metingContainer.value) {
      const metingElement = document.createElement('meting-js')
      Object.entries({
        server: configData.music.server,
        type: configData.music.type,
        id: configData.music.id,
        order: configData.music.order,
        loop: configData.music.loop,
        preload: configData.music.preload,
        autoplay: configData.music.autoplay,
        volume: configData.music.volume,
        mutex: configData.music.mutex,
        listfolded: configData.music.listfolded
      }).forEach(([key, value]) => metingElement.setAttribute(key, value))
      
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
  width: 55%;
  min-width: 400px;
}

/* 播放器主容器 */
:deep(.aplayer) {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  min-height: 120px;
  overflow: hidden;
}

/* 播放器主体 */
:deep(.aplayer-body) {
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 12px;
}

:deep(.aplayer-body::before),
:deep(.aplayer-body::after) {
  display: none;
}

/* 专辑封面 */
:deep(.aplayer-pic) {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

:deep(.aplayer-pic .aplayer-button) {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.3s ease;
}

:deep(.aplayer-pic:hover .aplayer-button) {
  opacity: 1;
  transform: scale(1.1);
}

/* 歌曲信息 */
:deep(.aplayer-info) {
  flex: 1;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none !important;
  margin-left: 0 !important;
  padding: 0 !important;
  overflow: hidden;
}

:deep(.aplayer-music) {
  text-align: center;
}

:deep(.aplayer-title) {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.aplayer-author) {
  color: var(--text-secondary);
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 控制器 */
:deep(.aplayer-controller) {
  padding: 12px 16px 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 进度条 */
:deep(.aplayer-loaded) {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}

:deep(.aplayer-played) {
  background: linear-gradient(90deg, var(--primary-color), rgba(99, 102, 241, 0.8));
  border-radius: 6px;
}

:deep(.aplayer-thumb) {
  width: 16px !important;
  height: 16px !important;
  border-radius: 50% !important;
  top: 200% !important;
  transform: translateY(-50%) !important;
  transition: all 0.3s ease !important;
}

:deep(.aplayer-thumb:hover) {
  transform: translateY(-50%) scale(1.2) !important;
}

:deep(.aplayer-thumb:before) {
  display: none !important;
}

/* 音量条和时间 */
:deep(.aplayer-volume-bar) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-volume) {
  background: var(--primary-color) !important;
}

:deep(.aplayer-time) {
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 500;
}

:deep(.aplayer-ptime) {
  color: var(--primary-color);
  font-weight: 600;
}

/* 控制按钮 */
:deep(.aplayer-icon) {
  color: var(--text-primary);
  transition: all 0.3s ease;
  opacity: 0.8;
}

:deep(.aplayer-icon:hover) {
  color: var(--primary-color);
  opacity: 1;
  transform: scale(1.1);
}

:deep(.aplayer-icon-play),
:deep(.aplayer-icon-pause) {
  font-size: 1.2rem;
}

/* 播放列表和歌词 */
:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  max-height: 120px;
  overflow-y: auto;
  display: none;
}

:deep(.aplayer-withlist .aplayer-list) {
  display: block;
}

:deep(.aplayer-lrc::before),
:deep(.aplayer-lrc::after) {
  display: none !important;
}

:deep(.aplayer-lrc p) {
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 2px 0;
  transition: all 0.4s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.aplayer-lrc p.aplayer-lrc-current) {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 0.85rem;
  text-shadow: 0 0 10px var(--segment-glow);
  transform: scale(1.05);
}

/* 隐藏滚动条 */
:deep(.aplayer-lrc::-webkit-scrollbar),
:deep(.aplayer-list::-webkit-scrollbar) {
  display: none;
}

:deep(.aplayer-lrc),
:deep(.aplayer-list) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 响应式 */
@media (max-width: 768px) {
  .music-player {
    min-width: 300px;
  }
  
  :deep(.aplayer-body) {
    flex-direction: column;
    text-align: center;
  }
  
  :deep(.aplayer-info) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :deep(.aplayer-lrc),
  :deep(.aplayer-list) {
    max-height: 100px;
  }
}
</style>