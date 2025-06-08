<script setup>
import { ref, onMounted } from 'vue'
import configData from '@/config.json'
import imageOptimizer from '@/utils/imageOptimizer.js'

const emit = defineEmits(['avatar-click'])
const iconsLoaded = ref(false)
const avatarLoaded = ref(false)
const avatarError = ref(false)

const handleAvatarClick = () => {
  emit('avatar-click')
}

const handleAvatarLoad = () => {
  avatarLoaded.value = true
}

const handleAvatarError = () => {
  avatarError.value = true
  console.warn('头像加载失败，使用默认占位符')
}

// 预加载头像
const preloadAvatar = async () => {
  try {
    await imageOptimizer.preloadImage(configData.profile.avatar, {
      timeout: 8000 // 移动端给更长的超时时间
    })
    if (!avatarLoaded.value) {
      handleAvatarLoad()
    }
  } catch (error) {
    console.warn('头像预加载失败:', error)
    handleAvatarError()
  }
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
  preloadAvatar()
})
</script>

<template>  <div class="profile-simple">
    <div class="avatar" @click="handleAvatarClick" :class="{ 'loading': !avatarLoaded && !avatarError }">
      <!-- 头像加载占位符 -->
      <div v-if="!avatarLoaded && !avatarError" class="avatar-placeholder">
        <span class="placeholder-text">{{ configData.profile.name.charAt(0) }}</span>
      </div>
      
      <!-- 实际头像图片 -->
      <img 
        v-show="avatarLoaded"
        :src="configData.profile.avatar" 
        :alt="configData.profile.name" 
        loading="eager"
        fetchpriority="high"
        @load="handleAvatarLoad"
        @error="handleAvatarError"
      />
      
      <!-- 错误占位符 -->
      <div v-if="avatarError" class="avatar-error">
        <span class="error-text">{{ configData.profile.name.charAt(0) }}</span>
      </div>
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
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
}

.avatar.loading {
  background: linear-gradient(45deg, var(--bg-primary), var(--primary-color));
  background-size: 200% 200%;
  animation: gradientShift 1.5s ease-in-out infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar img[style*="display: block"], 
.avatar img:not([style*="display: none"]) {
  opacity: 1;
}

.avatar-placeholder,
.avatar-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
}

.avatar-error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.placeholder-text,
.error-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
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
  .avatar {
    width: 100px;
    height: 100px;
    border-width: 2px;
  }
  
  .placeholder-text,
  .error-text {
    font-size: 2rem;
  }
  
  .name {
    font-size: 2.5rem;
  }
  
  .social-link {
    font-size: 1.1rem;
  }
}
</style>