<script setup>
import { onMounted } from 'vue'
import { socialLinksConfig } from '@/config'

const loadedAssets = new Set()

const loadFontAwesome = () => {
  if (loadedAssets.has('fontawesome') || document.querySelector('link[href*="font-awesome"]')) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    link.onload = () => {
      loadedAssets.add('fontawesome')
      resolve()
    }
    document.head.appendChild(link)
  })
}

onMounted(() => {
  loadFontAwesome()
})
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
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-link:hover {
  transform: translateY(-2px) scale(1.05);
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
}

@media (max-width: 768px) {
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
</style>