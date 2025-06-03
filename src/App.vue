<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'
import ProfileCard from './components/ProfileCard.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import HitokotoDisplay from './components/HitokotoDisplay.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import RSSFeed from './components/RSSFeed.vue'

const { backgroundConfig } = configData

// 内联布局配置
const MOBILE_BREAKPOINT = 768

const isMobile = ref(false)
const backgroundImage = ref('')

const updateResponsiveData = () => {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT
}

const loadRandomBackground = () => {
  const apiUrl = window.innerWidth <= MOBILE_BREAKPOINT
    ? backgroundConfig.apiUrls.mobile
    : backgroundConfig.apiUrls.desktop
  
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
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 0;
  align-items: stretch;
  min-height: 100vh;
}

.left-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 40%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  overflow-y: auto;
  z-index: 10;
}

.right-content {
  margin-left: 40%;
  width: 55%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
}

@media (max-width: 1200px) {
  .left-content {
    width: 35%;
  }
  
  .right-content {
    margin-left: 40%;
    width: 55%;
  }
}

@media (max-width: 1023px) {
  .main-container {
    flex-direction: column;
  }
  
  .left-content {
    position: relative;
    width: 100%;
    height: auto;
    flex: none;
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
    width: 100%;
  }
  
  .left-content {
    gap: 1rem;
    padding: 1.5rem;
  }
}
</style>
