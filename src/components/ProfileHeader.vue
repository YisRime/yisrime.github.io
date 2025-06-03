<script setup>
import { profileConfig } from '@/config'
</script>

<template>  <div class="profile-header">
    <div class="avatar">
      <img :src="profileConfig.avatar" :alt="profileConfig.name" />
    </div>
    <h1 class="name">{{ profileConfig.name }}</h1>
  </div>
</template>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.profile-header:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, var(--primary-color), var(--primary-dark));
  padding: 3px;
  flex-shrink: 0;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: var(--primary-color);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .name {
    font-size: 1.8rem;
  }
}

@media (min-width: 769px) and (orientation: landscape) {
  .profile-header {
    justify-content: flex-start;
  }
}
</style>