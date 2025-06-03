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
        <!-- 中央主要内容 -->
        <div class="center-content">
          <!-- 时间显示 -->
          <div class="time-section">
            <TimeDisplay />
          </div>

          <!-- 头像和昵称 -->
          <ProfileCard />
          
          <!-- 社交链接 -->
          <SocialLinks />
          
          <!-- 一言 -->
          <div class="hitokoto-section">
            <HitokotoDisplay />
          </div>
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
  width: 100%;
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
  filter: blur(0.5px);
  z-index: -2;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: -1;
}

.main-container {
  max-width: 1400px;
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

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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
}
</style>
