<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProfileCard from './components/ProfileCard.vue'
import SocialLinks from './components/SocialLinks.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import HitokotoDisplay from './components/HitokotoDisplay.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import RSSFeed from './components/RSSFeed.vue'

// 响应式功能
const deviceType = ref('')
const isMobile = ref(false)
const backgroundImage = ref('')

const updateResponsiveData = () => {
  const width = window.innerWidth
  
  if (width <= 480) {
    deviceType.value = 'mobile'
    isMobile.value = true
  } else if (width <= 768) {
    deviceType.value = 'tablet'
    isMobile.value = false
  } else {
    deviceType.value = 'desktop'
    isMobile.value = false
  }
}

const loadRandomBackground = () => {
  const isMobileDevice = window.innerWidth <= 768
  const apiUrl = isMobileDevice 
    ? 'https://api.fuukei.org/random-img/default/mobile.php'
    : 'https://api.fuukei.org/random-img/default/pc.php'
  
  backgroundImage.value = apiUrl
}

onMounted(() => {
  updateResponsiveData()
  loadRandomBackground()
  window.addEventListener('resize', updateResponsiveData)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsiveData)
})
</script>

<template>
  <div id="app">
    <div class="background-image" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    <div class="background-overlay"></div>
    
    <div class="main-container">
      <!-- 左侧内容 -->
      <div class="left-content">
        <!-- 时间显示 -->
        <div class="time-corner">
          <TimeDisplay />
        </div>
        
        <!-- 中央主要内容 -->
        <div class="center-content">
          <!-- 头像和昵称 -->
          <ProfileCard />
          
          <!-- 介绍文字 -->
          <div class="intro-text">天山云水 上下一白</div>
          
          <!-- 社交链接 -->
          <SocialLinks />
        </div>
        
        <!-- 下方一言 -->
        <div class="bottom-content">
          <HitokotoDisplay />
        </div>
        
        <!-- 音乐播放器 -->
        <div class="music-section">
          <MusicPlayer />
        </div>
      </div>
      
      <!-- 右侧RSS -->
      <div class="right-content">
        <RSSFeed />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 2rem;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: blur(3px);
  z-index: -2;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: -1;
}

.main-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: stretch;
}

.left-content {
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 80vh;
  align-self: stretch;
}

.time-corner {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 4rem;
}

.intro-text {
  font-size: 1.2rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0.9;
}

.bottom-content {
  margin-top: auto;
}

.music-section {
  margin-top: 1rem;
}

@media (max-width: 1023px) {
  .main-container {
    flex-direction: column;
    max-width: 500px;
  }
  
  .left-content {
    flex: none;
    width: 100%;
    position: relative;
  }
  
  .time-corner {
    position: relative;
    top: auto;
    left: auto;
  }
  
  .center-content {
    padding-top: 2rem;
  }
  
  .right-content {
    width: 100%;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  .main-container {
    gap: 1rem;
  }
  
  .left-content {
    gap: 1rem;
  }
  
  .intro-text {
    font-size: 1.1rem;
  }
}
</style>
