<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ProfileCard from './components/ProfileCard.vue'
import IntroCard from './components/IntroCard.vue'
import SocialLinks from './components/SocialLinks.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import HitokotoDisplay from './components/HitokotoDisplay.vue'
import MusicPlayer from './components/MusicPlayer.vue'

// 响应式功能
const deviceType = ref('')
const isMobile = ref(false)

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

onMounted(() => {
  updateResponsiveData()
  window.addEventListener('resize', updateResponsiveData)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateResponsiveData)
})
</script>

<template>
  <div id="app">
    <div class="background-image"></div>
    <div class="background-overlay"></div>
    
    <div class="profile-container" :class="`device-${deviceType}`">
      <!-- 左侧主要内容 -->
      <div class="left-content">
        <!-- 头像和昵称 -->
        <ProfileCard />
        
        <!-- 介绍卡片 -->
        <IntroCard />
        
        <!-- 社交链接 -->
        <SocialLinks />
      </div>
      
      <!-- 右侧内容（在大屏幕时显示） -->
      <div class="right-content" :class="{ 'mobile-stack': isMobile }">
        <!-- 时间和一言 -->
        <div class="info-section" :class="{ 'mobile-layout': isMobile }">
          <TimeDisplay />
          <HitokotoDisplay />
        </div>
        
        <!-- 音乐播放器 -->
        <MusicPlayer />
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/wallpaper.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: blur(2px);
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

.profile-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.left-content {
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 时间和一言部分 */
.info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.info-section.mobile-layout {
  grid-template-columns: 1fr;
  gap: 1rem;
}


/* 桌面端布局 */
@media (min-width: 1024px) {
  .profile-container.device-desktop {
    flex-direction: row;
  }
}

/* 平板端布局 */
@media (max-width: 1023px) {
  .profile-container {
    flex-direction: column;
    max-width: 500px;
  }
  
  .left-content {
    flex: none;
    width: 100%;
  }
  
  .right-content {
    width: 100%;
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  .profile-container {
    max-width: 100%;
    gap: 1rem;
  }
  
  .left-content {
    gap: 1rem;
  }
  
  .right-content {
    gap: 1rem;
  }
}
</style>
