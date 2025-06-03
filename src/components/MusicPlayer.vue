<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { musicConfig } from '@/config'

const metingPlayer = ref(null)
const isPlaying = ref(false)
const currentSong = ref({
  title: '加载中...',
  artist: '',
  cover: ''
})

let metingInstance = null

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
    
    metingPlayer.value.appendChild(metingElement)
    
    // 等待播放器初始化
    const checkPlayer = () => {
      const aplayerElement = metingPlayer.value?.querySelector('.aplayer')
      if (aplayerElement && window.aplayers && window.aplayers.length > 0) {
        metingInstance = window.aplayers[window.aplayers.length - 1]
        setupPlayerEvents()
        updateSongInfo()
      } else {
        setTimeout(checkPlayer, 500)
      }
    }
    
    setTimeout(checkPlayer, 1000)
  } catch (error) {
    console.error('音乐播放器初始化失败:', error)
    currentSong.value = {
      title: '播放器加载失败',
      artist: '',
      cover: ''
    }
  }
}

const setupPlayerEvents = () => {
  if (!metingInstance) return

  metingInstance.on('play', () => {
    isPlaying.value = true
  })

  metingInstance.on('pause', () => {
    isPlaying.value = false
  })

  metingInstance.on('loadeddata', updateSongInfo)
  metingInstance.on('listswitch', updateSongInfo)
}

const updateSongInfo = () => {
  if (!metingInstance || !metingInstance.list || !metingInstance.list.audios) return
  
  const current = metingInstance.list.audios[metingInstance.list.index]
  if (current) {
    currentSong.value = {
      title: current.name || '未知歌曲',
      artist: current.artist || '未知艺术家',
      cover: current.cover || ''
    }
  }
}

const togglePlay = () => {
  if (!metingInstance) return
  metingInstance.toggle()
}

const nextSong = () => {
  if (!metingInstance) return
  metingInstance.skipForward()
}

const prevSong = () => {
  if (!metingInstance) return
  metingInstance.skipBack()
}

onMounted(() => {
  initMeting()
})

onUnmounted(() => {
  if (metingInstance) {
    metingInstance.destroy()
  }
})
</script>

<template>
  <div class="music-section">
    <div class="section-header">
      <h3>音乐播放器</h3>
    </div>
    
    <div class="custom-player">
      <!-- 歌曲信息 -->
      <div class="song-info">
        <div class="song-cover">
          <img :src="currentSong.cover || '/default-cover.jpg'" :alt="currentSong.title" />
          <div class="play-overlay" :class="{ active: isPlaying }">
            <div class="equalizer" v-if="isPlaying">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
            <i v-else class="fas fa-music"></i>
          </div>
        </div>
        <div class="song-details">
          <div class="song-title">{{ currentSong.title }}</div>
          <div class="song-artist">{{ currentSong.artist }}</div>
        </div>
      </div>
      
      <!-- 控制按钮 -->
      <div class="player-controls">
        <button @click="prevSong" class="control-btn">
          <i class="fas fa-step-backward"></i>
        </button>
        <button @click="togglePlay" class="control-btn play-btn">
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button @click="nextSong" class="control-btn">
          <i class="fas fa-step-forward"></i>
        </button>
      </div>
    </div>
    
    <!-- 隐藏的原始播放器 -->
    <div class="hidden-player">
      <div id="meting-player" ref="metingPlayer"></div>
    </div>
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

.custom-player {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.song-cover {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.song-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: 0;
  transition: all 0.3s ease;
}

.play-overlay.active {
  opacity: 1;
}

.equalizer {
  display: flex;
  gap: 2px;
  align-items: end;
  height: 20px;
}

.equalizer .bar {
  width: 3px;
  background: var(--primary-color);
  border-radius: 2px;
  animation: equalizer 1s infinite ease-in-out;
  box-shadow: 0 0 8px var(--primary-color);
}

.equalizer .bar:nth-child(1) { animation-delay: 0.1s; }
.equalizer .bar:nth-child(2) { animation-delay: 0.2s; }
.equalizer .bar:nth-child(3) { animation-delay: 0.3s; }
.equalizer .bar:nth-child(4) { animation-delay: 0.4s; }

@keyframes equalizer {
  0%, 100% { height: 4px; }
  50% { height: 20px; }
}

.song-details {
  flex: 1;
  min-width: 0;
}

.song-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.song-artist {
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.play-btn {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  font-size: 1.4rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.play-btn:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
}

.hidden-player {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .music-section {
    padding: 1.5rem;
  }
  
  .song-cover {
    width: 70px;
    height: 70px;
    border-radius: 12px;
  }
  
  .control-btn {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
  
  .play-btn {
    width: 55px;
    height: 55px;
    font-size: 1.2rem;
  }
}

/* 完全隐藏原始播放器样式 */
:deep(.aplayer) {
  display: none !important;
}
</style>