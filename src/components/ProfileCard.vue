<template>
  <div class="profile-container">
    <!-- 左侧个人信息 -->
    <div class="left-panel">
      <div class="avatar-section">
        <div class="avatar">
          <img src="/avatar.webp" alt="Yis_Rime" />
          <div class="status-indicator"></div>
        </div>
        <h1 class="name">Yis_Rime</h1>
        <p class="description">热爱编程，专注于现代Web技术开发 ✨</p>
      </div>
      
      <div class="social-links">
        <a 
          v-for="link in socialLinks" 
          :key="link.name"
          :href="link.url" 
          target="_blank" 
          class="social-link"
          :title="link.name"
        >
          <i>{{ link.icon }}</i>
          <span>{{ link.name }}</span>
        </a>
      </div>
    </div>

    <!-- 右侧功能区 -->
    <div class="right-panel">
      <!-- 时间和一言 -->
      <div class="info-section">
        <div class="time-display">
          <div class="current-time">{{ currentTime }}</div>
          <div class="current-date">{{ currentDate }}</div>
        </div>
        
        <div class="quote-section">
          <div class="quote-text">{{ quote.text }}</div>
          <div class="quote-author">—— {{ quote.author }}</div>
        </div>
      </div>
      
      <!-- 音乐播放器 -->
      <div class="music-section">
        <div class="section-header">
          <h3>音乐播放器</h3>
        </div>
        
        <div class="player-container">
          <div id="meting-player" ref="metingPlayer"></div>
          
          <div class="custom-controls">
            <div class="now-playing">
              <div class="album-art">
                <img :src="currentSong.cover" :alt="currentSong.title" />
              </div>
              <div class="song-info">
                <div class="song-title">{{ currentSong.title }}</div>
                <div class="song-artist">{{ currentSong.artist }}</div>
              </div>
            </div>
            
            <div class="player-controls">
              <button class="control-btn" @click="previousSong">
                <i>⏮</i>
              </button>
              <button class="control-btn play-pause" @click="togglePlay">
                <i>{{ isPlaying ? '⏸' : '▶' }}</i>
              </button>
              <button class="control-btn" @click="nextSong">
                <i>⏭</i>
              </button>
            </div>
            
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <div class="time-info">
                <span>{{ formatTime(currentTimeMusic) }}</span>
                <span>{{ formatTime(duration) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const socialLinks = ref([
  {
    name: 'GitHub',
    url: 'https://github.com/yisrime',
    icon: '🚀'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: '📧'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yisrime',
    icon: '🐦'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yisrime',
    icon: '💼'
  },
  {
    name: 'Blog',
    url: 'https://blog.yisrime.com',
    icon: '📝'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/yisrime',
    icon: '🎮'
  }
])

// 时间相关
const currentTime = ref('')
const currentDate = ref('')

// 一言相关
const quote = ref({
  text: '生活就像一盒巧克力，你永远不知道下一个会是什么味道。',
  author: '阿甘正传'
})

// 音乐播放器相关
const metingPlayer = ref(null)
const isPlaying = ref(false)
const currentTimeMusic = ref(0)
const duration = ref(0)
const progress = ref(0)

const currentSong = ref({
  title: '加载中...',
  artist: '未知艺术家',
  cover: '/default-cover.jpg'
})

let metingInstance = null
let progressInterval = null
let timeInterval = null

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

// 获取一言
const fetchQuote = async () => {
  try {
    const response = await fetch('https://v1.hitokoto.cn/')
    const data = await response.json()
    quote.value = {
      text: data.hitokoto,
      author: data.from
    }
  } catch (error) {
    console.log('获取一言失败:', error)
    quote.value = {
      text: '代码是诗，开发者是诗人。',
      author: '程序员格言'
    }
  }
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  fetchQuote()
  loadMetingJS()
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// 音乐播放器相关函数
const loadMetingJS = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  document.head.appendChild(link)
  
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
  const metingElement = document.createElement('meting-js')
  metingElement.setAttribute('server', 'netease')
  metingElement.setAttribute('type', 'playlist')
  metingElement.setAttribute('id', '9167231423')
  metingElement.setAttribute('fixed', 'false')
  metingElement.setAttribute('autoplay', 'false')
  metingElement.setAttribute('theme', '#6366f1')
  metingElement.setAttribute('loop', 'all')
  metingElement.setAttribute('order', 'random')
  metingElement.setAttribute('preload', 'auto')
  metingElement.setAttribute('volume', '0.7')
  metingElement.setAttribute('mutex', 'true')
  
  metingPlayer.value.appendChild(metingElement)
  
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
    currentTimeMusic.value = metingInstance.audio.currentTime
    progress.value = (currentTimeMusic.value / duration.value) * 100
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
      currentTimeMusic.value = metingInstance.audio.currentTime
      progress.value = (currentTimeMusic.value / duration.value) * 100
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
.profile-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 80vh;
  align-items: start;
}

/* 左侧面板 */
.left-panel {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.left-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
}

.avatar-section {
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, var(--primary-color), var(--primary-dark));
  padding: 3px;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: var(--primary-color);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.name {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.2);
}

.social-link i {
  font-size: 1.3rem;
  width: 35px;
  display: flex;
  justify-content: center;
}

.social-link span {
  font-size: 1rem;
  font-weight: 500;
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.info-section:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
}

.time-display {
  text-align: center;
  margin-bottom: 2rem;
}

.current-time {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  font-family: 'Courier New', monospace;
  margin-bottom: 0.5rem;
}

.current-date {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.quote-section {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.quote-text {
  font-size: 1.1rem;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}

.quote-author {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

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
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.album-art {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.song-info {
  flex: 1;
  min-width: 0;
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

.player-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.play-pause {
  width: 55px;
  height: 55px;
  background: var(--primary-color);
  font-size: 1.4rem;
}

.play-pause:hover {
  background: var(--primary-dark);
}

.progress-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 3px;
  transition: width 0.1s ease;
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: auto;
  }
  
  .left-panel {
    padding: 2rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .name {
    font-size: 1.8rem;
  }
  
  .current-time {
    font-size: 2rem;
  }
  
  .social-link {
    padding: 0.8rem;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
  }
  
  .play-pause {
    width: 50px;
    height: 50px;
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