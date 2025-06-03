<script setup>
import configData from '@/config.json'

const { profileConfig, socialLinksConfig, fontConfig } = configData

// 检查并加载Font Awesome
if (!document.querySelector('link[href*="font-awesome"]')) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fontConfig.cdnUrls.fontAwesome
  document.head.appendChild(link)
}
</script>

<template>
  <div class="profile-simple">
    <div class="avatar">
      <img :src="profileConfig.avatar" :alt="profileConfig.name" />
    </div>
    <h1 class="name">{{ profileConfig.name }}</h1>
    
    <!-- 社交链接 -->
    <div class="social-links">
      <a 
        v-for="link in socialLinksConfig" 
        :key="link.name"
        :href="link.url" 
        target="_blank" 
        class="social-link"
        :title="link.name"
      >
        <i :class="link.icon"></i>
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
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
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
  cursor: pointer;
}

.social-link:hover {
  color: var(--primary-color);
  transform: scale(1.2);
  text-shadow: 0 0 10px var(--primary-color);
}

@media (max-width: 768px) {
  .name {
    font-size: 2.5rem;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
</style>