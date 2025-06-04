<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'
import ColorExtractor from '@/utils/colorExtractor.js'
import ProfileCard from './components/ProfileCard.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import HitokotoDisplay from './components/HitokotoDisplay.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import RSSFeed from './components/RSSFeed.vue'

const MOBILE_BREAKPOINT = 768
const isMobile = ref(false)
const backgroundImage = ref('')
const colorExtractor = new ColorExtractor()
const showTimeAndMusic = ref(false)

const updateResponsiveData = () => {
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT
  loadRandomBackground()
}

const loadRandomBackground = async () => {
  const apiUrl = isMobile.value ? configData.background.mobile : configData.background.desktop
  backgroundImage.value = apiUrl
  
  if (configData.theme.enableDynamicColors) {
    try {
      await extractAndApplyColors(apiUrl)
    } catch (error) {
      console.warn('颜色提取失败，使用备用颜色:', error)
      applyFallbackColors()
    }
  }
}

const extractAndApplyColors = async (imageUrl) => {
  try {
    const colors = await colorExtractor.extractColorsFromImage(imageUrl)
    applyThemeColors(colors)
  } catch (error) {
    console.warn('无法提取颜色，使用备用方案:', error)
    applyFallbackColors()
  }
}

const applyThemeColors = (colors) => {
  const root = document.documentElement
  
  root.style.setProperty('--primary-color', colors.primaryColor)
  root.style.setProperty('--primary-dark', colors.primaryDark)
  root.style.setProperty('--primary-light', colors.primaryLight)
  root.style.setProperty('--text-primary', colors.textPrimary)
  root.style.setProperty('--text-secondary', colors.textSecondary)
  root.style.setProperty('--text-muted', colors.textMuted)
  root.style.setProperty('--bg-primary', colors.bgPrimary)
  root.style.setProperty('--gradient-bg', colors.gradientBg)
  root.style.setProperty('--avatar-shadow', colors.avatarShadow)
  root.style.setProperty('--avatar-shadow-hover', colors.avatarShadowHover)
  root.style.setProperty('--segment-glow', colors.segmentGlow)
}

const applyFallbackColors = () => {
  const root = document.documentElement
  
  root.style.setProperty('--primary-color', '#5DADE2')
  root.style.setProperty('--primary-dark', '#3498DB')
  root.style.setProperty('--primary-light', '#85C1E9')
  root.style.setProperty('--text-primary', '#f8fafc')
  root.style.setProperty('--text-secondary', '#cbd5e1')
  root.style.setProperty('--text-muted', '#64748b')
  root.style.setProperty('--bg-primary', '#0f172a')
  root.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)')
  root.style.setProperty('--avatar-shadow', 'rgba(93, 173, 226, 0.3)')
  root.style.setProperty('--avatar-shadow-hover', 'rgba(93, 173, 226, 0.4)')
  root.style.setProperty('--segment-glow', 'rgba(93, 173, 226, 0.6)')
}

const toggleTimeAndMusic = () => {
  showTimeAndMusic.value = !showTimeAndMusic.value
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
    <div class="background-image" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    <div class="background-overlay"></div>
      <div class="main-container">
      <!-- 左侧内容 -->
      <div class="left-content">
        <!-- 顶部区域 -->
        <div class="top-section">
          <TimeDisplay v-show="showTimeAndMusic" />
        </div>
        
        <!-- 中心区域 -->
        <div class="center-section">
          <ProfileCard @avatar-click="toggleTimeAndMusic" />
          <HitokotoDisplay />
        </div>
        
        <!-- 底部区域 -->
        <div class="bottom-section">
          <MusicPlayer v-show="showTimeAndMusic" />
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
  background: rgba(22, 22, 22, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
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
  padding: 2rem;
  overflow-y: auto;
  z-index: 10;
}

.top-section {
  position: absolute;
  top: 2rem;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-section {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.right-content {
  margin-left: 40%;
  width: 55%;
  display: flex;
  flex-direction: column;
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
  
  .top-section {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin-bottom: 1rem;
  }
  
  .bottom-section {
    position: relative;
    bottom: auto;
    left: auto;
    transform: none;
    margin-top: 1rem;
  }
  
  .right-content {
    margin-left: 0;
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
  }
  
  .left-content {
    gap: 1rem;
    padding: 1.5rem;
  }
}
</style>
