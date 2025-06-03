<script setup>
import ProfileCard from './components/ProfileCard.vue'
</script>

<template>
  <div id="app">
    <div class="background-image"></div>
    <div class="background-overlay"></div>
    <ProfileCard />
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/wallpaper.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: blur(2px);
  z-index: -2;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  backdrop-filter: blur(3px);
  z-index: -1;
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
}
</style>
