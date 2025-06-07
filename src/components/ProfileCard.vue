<script setup>
import { ref, onMounted } from 'vue'
import configData from '@/config.json'

const emit = defineEmits(['avatar-click'])
const iconsLoaded = ref(false)

const handleAvatarClick = () => {
  emit('avatar-click')
}

// 检测字体图标是否加载完成
const checkIconsLoaded = () => {
  const checkInterval = setInterval(() => {
    const testIcon = document.createElement('i')
    testIcon.className = 'fas fa-blog'
    testIcon.style.position = 'absolute'
    testIcon.style.visibility = 'hidden'
    document.body.appendChild(testIcon)
    
    const computedStyle = window.getComputedStyle(testIcon)
    const fontFamily = computedStyle.getPropertyValue('font-family')
    
    document.body.removeChild(testIcon)
    
    if (fontFamily.includes('Font Awesome') || fontFamily.includes('FontAwesome')) {
      iconsLoaded.value = true
      clearInterval(checkInterval)
    }
  }, 100)
  
  // 5秒后停止检测
  setTimeout(() => {
    clearInterval(checkInterval)
    iconsLoaded.value = true
  }, 5000)
}

onMounted(() => {
  checkIconsLoaded()
})
</script>

<template>
  <div class="profile-simple">
    <div class="avatar" @click="handleAvatarClick">
      <img 
        :src="configData.profile.avatar" 
        :alt="configData.profile.name" 
        loading="eager"
        fetchpriority="high"
      />
    </div>
    <h1 class="name">{{ configData.profile.name }}</h1>
      <!-- 社交链接 -->
    <div class="social-links">
      <a 
        v-for="link in configData.socialLinks" 
        :key="link.name"
        :href="link.url" 
        target="_blank" 
        class="social-link"
        :title="link.name"
      >
        <i v-if="iconsLoaded" :class="link.icon"></i>
        <span v-else class="icon-placeholder">{{ link.name.charAt(0) }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.profile-simple {
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 0.8rem;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  box-shadow: 0 8px 24px var(--avatar-shadow);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px var(--avatar-shadow-hover);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.name {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
  letter-spacing: 0.5px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: all var(--transition-normal);
  font-size: 1.5rem;
}

.social-link:hover {
  color: var(--primary-color);
  transform: scale(1.2);
  text-shadow: 0 0 10px var(--primary-color);
}

.icon-placeholder {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .name {
    font-size: 2.5rem;
  }
  
  .social-link {
    font-size: 1.1rem;
  }
}
</style>