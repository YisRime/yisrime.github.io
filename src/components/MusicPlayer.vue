<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { musicConfig } from '@/config'

const playerContainer = ref(null)
let aplayerInstance = null

const loadAPlayer = () => {
  return new Promise((resolve) => {
    if (window.APlayer) {
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
      setTimeout(resolve, 100)
    }
    document.head.appendChild(script)
  })
}

const initAPlayer = async () => {
  try {
    await loadAPlayer()
    
    if (aplayerInstance) {
      aplayerInstance.destroy()
    }
    
    // 示例音乐数据
    const musicList = [
      {
        name: '示例歌曲1',
        artist: '示例歌手1',
        url: 'https://music.163.com/song/media/outer/url?id=447925558.mp3',
        cover: 'https://p1.music.126.net/KuuqkdTs4pUCRPOhW8a2hA==/109951163071280170.jpg',
        lrc: '[00:00.00]暂无歌词'
      },
      {
        name: '示例歌曲2',
        artist: '示例歌手2',
        url: 'https://music.163.com/song/media/outer/url?id=5308751.mp3',
        cover: 'https://p1.music.126.net/KuuqkdTs4pUCRPOhW8a2hA==/109951163071280170.jpg',
        lrc: '[00:00.00]暂无歌词'
      }
    ]
    
    aplayerInstance = new window.APlayer({
      container: playerContainer.value,
      theme: musicConfig.theme || '#6366f1',
      autoplay: musicConfig.autoplay || false,
      loop: musicConfig.loop || 'all',
      order: musicConfig.order || 'random',
      volume: musicConfig.volume || 0.7,
      audio: musicList,
      lrcType: 1,
      listFolded: false,
      listMaxHeight: '200px'
    })
  } catch (error) {
    console.error('音乐播放器初始化失败:', error)
  }
}

onMounted(() => {
  initAPlayer()
})

onUnmounted(() => {
  if (aplayerInstance) {
    aplayerInstance.destroy()
    aplayerInstance = null
  }
})
</script>

<template>
  <div class="music-player">
    <div ref="playerContainer"></div>
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