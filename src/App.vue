<script setup>
import ProfileCard from './components/ProfileCard.vue'
</script>

<template>
  <div id="app">
    <ProfileCard />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  overflow: hidden;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  #app {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
}
</style>
