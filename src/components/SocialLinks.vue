<script setup>
import { socialLinksConfig } from '@/config'

// 检查并加载Font Awesome
if (!document.querySelector('link[href*="font-awesome"]')) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
  document.head.appendChild(link)
}
</script>

<template>  <div class="social-links">
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
</template>

<style scoped>
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
  transition: all 0.3s ease;
  font-size: 1.5rem;
  cursor: pointer;
}

.social-link:hover {
  color: var(--primary-color);
  transform: scale(1.2);
  text-shadow: 0 0 10px var(--primary-color);
}

@media (max-width: 768px) {
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
</style>