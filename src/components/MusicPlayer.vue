<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'

const { musicConfig } = configData
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
      metingElement.setAttribute('server', musicConfig.server)
      metingElement.setAttribute('type', musicConfig.type)
      metingElement.setAttribute('id', musicConfig.id)
      metingElement.setAttribute('theme', musicConfig.theme)
      metingElement.setAttribute('auto', musicConfig.auto || 'https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r')
      metingElement.setAttribute('mutex', 'true')
      metingElement.setAttribute('preload', 'auto')
      metingElement.setAttribute('order', musicConfig.order)
      metingElement.setAttribute('volume', musicConfig.volume)
      
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
  width: 60%;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0) !important;
  margin-left: 0 !important;
  padding: 0 !important;
  overflow: hidden;
}

:deep(.aplayer-music) {
  text-align: center;
}

:deep(.aplayer-title) {
  color: var(--text-primary);
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
  position: absolute !important;
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

/* 音量条 */
:deep(.aplayer-volume-bar) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.aplayer-volume) {
  background: var(--primary-color) !important;
}

/* 时间显示 */
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

/* 播放列表 */
:deep(.aplayer-list) {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  max-height: 120px;
  overflow-y: auto;
  display: none; /* 默认隐藏播放列表 */
}

:deep(.aplayer-withlist .aplayer-list) {
  display: block; /* 展开时显示播放列表 */
}

/* 歌词 */
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