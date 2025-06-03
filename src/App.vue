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
        <TimeDisplay />

        <!-- 头像和昵称 -->
        <ProfileCard />
        
        <!-- 社交链接 -->
        <SocialLinks />
        
        <!-- 一言 -->
        <HitokotoDisplay />
        
        <!-- 音乐播放器 -->
        <MusicPlayer />
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
  max-width: none;
  width: 95%;
  display: flex;
  gap: 3rem;
  align-items: stretch;
  min-height: 85vh;
}

.left-content {
  flex: 0 0 35%;
  max-width: 380px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

.right-content {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  align-self: stretch;
  margin-left: 2rem;
}

@media (max-width: 1200px) {
  .main-container {
    width: 95%;
    gap: 2rem;
  }
  
  .left-content {
    flex: 0 0 45%;
    max-width: 400px;
    min-width: 320px;
  }
}

@media (max-width: 1023px) {
  .main-container {
    flex-direction: column;
    width: 95%;
    gap: 2rem;
  }
  
  .left-content {
    flex: none;
    width: 100%;
    min-width: unset;
    max-width: none;
    position: relative;
  }
  
  .right-content {
    width: 100%;
    min-height: 50vh;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  .main-container {
    gap: 1.5rem;
    width: 98%;
  }
  
  .left-content {
    gap: 1rem;
  }
}
</style>
