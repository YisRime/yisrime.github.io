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
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.3rem;
  cursor: pointer;
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  border-color: #6366f1;
}

@media (max-width: 768px) {
  .social-link {
    width: 45px;
    height: 45px;
    font-size: 1.1rem;
  }
}
</style>