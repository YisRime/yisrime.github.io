<script setup>
import configData from '@/config.json'

const emit = defineEmits(['avatar-click'])

const handleAvatarClick = () => {
  emit('avatar-click')
}
</script>

<template>
  <div class="profile-simple">
    <div class="avatar" @click="handleAvatarClick">
      <img :src="configData.profile.avatar" :alt="configData.profile.name" />
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
  cursor: pointer;
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