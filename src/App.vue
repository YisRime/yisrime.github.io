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

/* 手机端背景优化 */
@media (max-width: 480px) {
  #app {
    padding: 0.5rem;
  }
  
  #app::before {
    background: 
      radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 60%);
  }
}

/* 平板端背景优化 */
@media (min-width: 481px) and (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  #app::before {
    background: 
      radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.09) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.09) 0%, transparent 50%);
  }
}

/* 横屏布局背景 */
@media (min-width: 769px) and (orientation: landscape) {
  #app::before {
    background: 
      radial-gradient(circle at 10% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 90% 30%, rgba(168, 85, 247, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
  }
}

/* 竖屏布局背景 */
@media (min-width: 769px) and (orientation: portrait) {
  #app::before {
    background: 
      radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 30% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
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

/* 设备特定的动画和交互 */
@media (hover: hover) {
  #app::before {
    transition: all 0.5s ease;
  }
}

/* 减少动画对于偏好设置 */
@media (prefers-reduced-motion: reduce) {
  #app::before {
    transition: none;
  }
}
</style>
