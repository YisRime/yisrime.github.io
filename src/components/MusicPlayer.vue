<template>
  <div class="music-player">
    <div class="section-header">
      <h2>音乐播放器</h2>
      <div class="header-line"></div>
    </div>
    <div id="meting-player" ref="metingPlayer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const metingPlayer = ref(null)

onMounted(() => {
  loadMetingJS()
})

const loadMetingJS = () => {
  // 添加 MetingJS CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  document.head.appendChild(link)
  
  // 添加 MetingJS Script
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
  script.onload = () => {
    const metingScript = document.createElement('script')
    metingScript.src = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
    metingScript.onload = initMeting
    document.head.appendChild(metingScript)
  }
  document.head.appendChild(script)
}

const initMeting = () => {
  const metingElement = document.createElement('meting-js')
  metingElement.setAttribute('server', 'netease')
  metingElement.setAttribute('type', 'playlist')
  metingElement.setAttribute('id', '9167231423')
  metingElement.setAttribute('fixed', 'false')
  metingElement.setAttribute('autoplay', 'false')
  metingElement.setAttribute('theme', '#6366f1')
  metingElement.setAttribute('loop', 'all')
  metingElement.setAttribute('order', 'random')
  metingElement.setAttribute('preload', 'auto')
  metingElement.setAttribute('volume', '0.7')
  metingElement.setAttribute('mutex', 'true')
  
  metingPlayer.value.appendChild(metingElement)
}
</script>

<style scoped>
.music-player {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.music-player:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.header-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}

@media (max-width: 768px) {
  .music-player {
    padding: 1.5rem;
  }
}

/* 隐藏默认的 APlayer 样式 */
:deep(.aplayer) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.aplayer-body) {
  background: transparent !important;
}
</style>