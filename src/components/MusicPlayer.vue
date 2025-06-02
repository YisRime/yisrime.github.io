<template>
  <div class="music-player">
    <div class="section-header">
      <h2>音乐播放器</h2>
      <div class="header-line"></div>
    </div>
    <div class="player-container">
      <!-- MetingJS 播放器 -->
      <div id="meting-player" ref="metingPlayer"></div>
      
      <!-- 自定义播放器控件 -->
      <div class="custom-controls">
        <div class="now-playing">
          <div class="song-info">
            <div class="song-title">{{ currentSong.title }}</div>
            <div class="song-artist">{{ currentSong.artist }}</div>
          </div>
          <div class="album-art">
            <img :src="currentSong.cover" :alt="currentSong.title" />
          </div>
        </div>
        
        <div class="player-controls">
          <button class="control-btn" @click="previousSong">
            <i class="icon">⏮</i>
          </button>
          <button class="control-btn play-pause" @click="togglePlay">
            <i class="icon">{{ isPlaying ? '⏸' : '▶' }}</i>
          </button>
          <button class="control-btn" @click="nextSong">
            <i class="icon">⏭</i>
          </button>
        </div>
        
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="time-info">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const metingPlayer = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

const currentSong = ref({
  title: '加载中...',
  artist: '未知艺术家',
  cover: '/default-cover.jpg'
})

let metingInstance = null
let progressInterval = null

onMounted(() => {
  // 动态加载 MetingJS
  loadMetingJS()
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})

const loadMetingJS = () => {
  // 添加 MetingJS CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  document.head.appendChild(link)
  
  // 添加 MetingJS Script
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
  script.onload = () => {
    const metingScript = document.createElement('script')
    metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
    metingScript.onload = initMeting
    document.head.appendChild(metingScript)
  }
  document.head.appendChild(script)
}

const initMeting = () => {
  // 初始化 APlayer
  metingInstance = new APlayer({
    container: metingPlayer.value,
    fixed: false,
    autoplay: false,
    theme: '#6366f1',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0.7,
    mutex: true,
    audio: [
      {
        name: 'Sample Song 1',
        artist: 'Sample Artist',
        url: 'https://music.163.com/song/media/outer/url?id=1901371647',
        cover: '/default-cover.jpg'
      },
      {
        name: 'Sample Song 2',
        artist: 'Sample Artist 2',
        url: 'https://music.163.com/song/media/outer/url?id=1901371648',
        cover: '/default-cover.jpg'
      }
    ]
  })

  // 监听播放事件
  metingInstance.on('play', () => {
    isPlaying.value = true
    startProgressUpdate()
  })

  metingInstance.on('pause', () => {
    isPlaying.value = false
    stopProgressUpdate()
  })

  metingInstance.on('loadedmetadata', () => {
    duration.value = metingInstance.audio.duration
    updateCurrentSong()
  })

  metingInstance.on('timeupdate', () => {
    currentTime.value = metingInstance.audio.currentTime
    progress.value = (currentTime.value / duration.value) * 100
  })
}

const togglePlay = () => {
  if (metingInstance) {
    if (isPlaying.value) {
      metingInstance.pause()
    } else {
      metingInstance.play()
    }
  }
}

const previousSong = () => {
  if (metingInstance) {
    metingInstance.skipBack()
  }
}

const nextSong = () => {
  if (metingInstance) {
    metingInstance.skipForward()
  }
}

const startProgressUpdate = () => {
  progressInterval = setInterval(() => {
    if (metingInstance && metingInstance.audio) {
      currentTime.value = metingInstance.audio.currentTime
      progress.value = (currentTime.value / duration.value) * 100
    }
  }, 1000)
}

const stopProgressUpdate = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

const updateCurrentSong = () => {
  if (metingInstance && metingInstance.list && metingInstance.list.audios[metingInstance.list.index]) {
    const current = metingInstance.list.audios[metingInstance.list.index]
    currentSong.value = {
      title: current.name,
      artist: current.artist,
      cover: current.cover
    }
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.music-player {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: music;
}

.music-player:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  background: rgba(255, 255, 255, 0.08);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.header-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}

.player-container {
  position: relative;
}

#meting-player {
  margin-bottom: 1rem;
}

.custom-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.now-playing {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.song-info {
  flex: 1;
}

.song-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 0.9rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-art {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.play-pause {
  width: 50px;
  height: 50px;
  background: var(--primary-color);
}

.play-pause:hover {
  background: var(--primary-dark);
}

.icon {
  font-size: 1.2rem;
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
  transition: width 0.1s ease;
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .music-player {
    padding: 1.5rem;
  }
  
  .now-playing {
    padding: 0.8rem;
  }
  
  .control-btn {
    width: 35px;
    height: 35px;
  }
  
  .play-pause {
    width: 45px;
    height: 45px;
  }
}

/* 隐藏默认的 APlayer 样式，使用自定义样式 */
:deep(.aplayer) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
}
</style>