<template>
  <div class="profile-card-container" :class="deviceClass">
    <ProfileHeader />
    <AboutSection />
    <SkillsSection />
    <MusicPlayer />
    <SocialLinks />
    <ContactForm />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProfileHeader from './ProfileHeader.vue'
import AboutSection from './AboutSection.vue'
import SkillsSection from './SkillsSection.vue'
import MusicPlayer from './MusicPlayer.vue'
import SocialLinks from './SocialLinks.vue'
import ContactForm from './ContactForm.vue'
import { useResponsive } from '../composables/useResponsive.js'

const { getDeviceClass, deviceType, orientation, screenSize } = useResponsive()

const deviceClass = ref('')

const updateDeviceClass = () => {
  deviceClass.value = getDeviceClass()
}

// 计算属性用于获取布局信息
const layoutInfo = computed(() => {
  return {
    device: deviceType.value,
    orientation: orientation.value,
    screenSize: screenSize.value,
    class: deviceClass.value
  }
})

onMounted(() => {
  updateDeviceClass()
  window.addEventListener('resize', updateDeviceClass)
  window.addEventListener('orientationchange', () => {
    setTimeout(updateDeviceClass, 100)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDeviceClass)
  window.removeEventListener('orientationchange', updateDeviceClass)
})
</script>

<style scoped>
.profile-card-container {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  padding: 1rem;
  transition: all var(--transition-normal);
}

/* 手机端 - 单列垂直布局 */
.profile-card-container.mobile {
  max-width: 100vw;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0.5rem;
  grid-template-areas: 
    "header"
    "about"
    "skills"
    "music"
    "social"
    "contact";
}

/* 平板端 - 两列布局 */
.profile-card-container.tablet {
  max-width: 768px;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  padding: 1rem;
  grid-template-areas: 
    "header header"
    "about skills"
    "music music"
    "social contact";
}

/* 竖屏布局 - 窄屏优化 */
.profile-card-container.portrait {
  max-width: 600px;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem;
  grid-template-areas: 
    "header"
    "about"
    "skills"
    "music"
    "social"
    "contact";
}

/* 横屏布局 - 宽屏优化 */
.profile-card-container.landscape {
  max-width: 1400px;
  grid-template-columns: 300px 1fr 1fr 300px;
  gap: 2rem;
  padding: 2rem;
  grid-template-areas: 
    "header about skills social"
    "header music music contact";
}

/* 桌面端 - 三列布局 */
.profile-card-container.desktop {
  max-width: 1200px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  padding: 2rem;
  grid-template-areas: 
    "header header skills"
    "about music music"
    "social contact contact";
}

/* 响应式媒体查询作为后备 */
@media (max-width: 480px) {
  .profile-card-container {
    max-width: 100vw;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0.5rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .profile-card-container {
    max-width: 768px;
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
}

@media (min-width: 769px) and (orientation: portrait) {
  .profile-card-container {
    max-width: 600px;
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (orientation: landscape) and (min-aspect-ratio: 3/2) {
  .profile-card-container {
    max-width: 1400px;
    grid-template-columns: 300px 1fr 1fr 300px;
    gap: 2rem;
  }
}

@media (min-width: 1200px) {
  .profile-card-container {
    max-width: 1200px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* 动画过渡 */
@media (prefers-reduced-motion: no-preference) {
  .profile-card-container {
    transition: grid-template-columns 0.3s ease, gap 0.3s ease, max-width 0.3s ease;
  }
}
</style>