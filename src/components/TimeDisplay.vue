<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
let timeInterval = null

const updateTime = () => {
  const now = new Date()
  
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
}

onMounted(() => {
  updateTime()
  if (!timeInterval) {
    timeInterval = setInterval(updateTime, 1000)
  }
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
})
</script>

<template>
  <div class="time-display">
    <div class="current-time">{{ currentTime }}</div>
    <div class="current-date">{{ currentDate }}</div>
  </div>
</template>

<style scoped>
.time-display {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.time-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
}

.current-time {
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff00;
  font-family: 'Courier New', 'Monaco', 'Lucida Console', monospace;
  margin-bottom: 0.5rem;
  background: #000;
  padding: 0.5rem;
  border-radius: 8px;
  border: 2px solid #333;
  box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.3);
  text-shadow: 0 0 10px #00ff00;
  letter-spacing: 2px;
}

.current-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .current-time {
    font-size: 1.5rem;
    padding: 0.4rem;
  }
}
</style>