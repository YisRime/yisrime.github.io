<script setup>
import ProfileCard from './components/ProfileCard.vue'
</script>

<template>
  <div id="app">
    <ProfileCard />
  </div>
</template>

<style scoped>
/* App组件特定样式 */
#app {
  position: relative;
}

#app::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: light) {
  #app::before {
    background: 
      radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  }
}
</style>
