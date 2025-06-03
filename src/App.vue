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
    <div class="background" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    
    <main class="main-content">
      <TimeDisplay />
      <ProfileCard />
      <SocialLinks />
      <HitokotoDisplay />
      <MusicPlayer />
    </main>
    
    <aside class="side-content">
      <RSSFeed />
    </aside>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  padding: 2rem;
}

.background {
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

.background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.15);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1;
}

.side-content {
  height: 100vh;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 1;
}

@media (max-width: 1200px) {
  #app {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    max-width: 500px;
    margin: 0 auto;
    gap: 1rem;
  }
  
  .main-content {
    max-width: none;
    gap: 1.5rem;
  }
  
  .side-content {
    height: auto;
    position: relative;
  }
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
    gap: 1rem;
  }
  
  .main-content {
    gap: 1rem;
  }
}
</style>
