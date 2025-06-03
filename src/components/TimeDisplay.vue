<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
const separatorBlink = ref(true)
let timeInterval = null

// 七段数码管的数字映射
const segmentMapping = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1]
}

const timeDigits = computed(() => {
  const time = currentTime.value.split(':')
  const hour = time[0] || '00'
  const minute = time[1] || '00'
  const second = time[2] || '00'
  
  return {
    hour: [
      { index: 0, value: parseInt(hour[0]) },
      { index: 1, value: parseInt(hour[1]) }
    ],
    minute: [
      { index: 0, value: parseInt(minute[0]) },
      { index: 1, value: parseInt(minute[1]) }
    ],
    second: [
      { index: 0, value: parseInt(second[0]) },
      { index: 1, value: parseInt(second[1]) }
    ]
  }
})

const getSegmentClass = (digit, segment) => {
  const isActive = segmentMapping[digit] && segmentMapping[digit][segment - 1]
  return {
    [`segment-${segment}`]: true,
    'active': isActive
  }
}

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
  
  separatorBlink.value = !separatorBlink.value
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
    <div class="digital-clock">
      <div class="time-section">
        <div class="digital-numbers">
          <span class="digit-group">
            <span class="digit" v-for="digit in timeDigits.hour" :key="`h${digit.index}`" :data-digit="digit.value">
              <span class="segment" v-for="segment in 7" :key="segment" :class="getSegmentClass(digit.value, segment)"></span>
            </span>
          </span>
          <span class="separator" :class="{ blink: separatorBlink }">:</span>
          <span class="digit-group">
            <span class="digit" v-for="digit in timeDigits.minute" :key="`m${digit.index}`" :data-digit="digit.value">
              <span class="segment" v-for="segment in 7" :key="segment" :class="getSegmentClass(digit.value, segment)"></span>
            </span>
          </span>
          <span class="separator" :class="{ blink: separatorBlink }">:</span>
          <span class="digit-group">
            <span class="digit" v-for="digit in timeDigits.second" :key="`s${digit.index}`" :data-digit="digit.value">
              <span class="segment" v-for="segment in 7" :key="segment" :class="getSegmentClass(digit.value, segment)"></span>
            </span>
          </span>
        </div>
      </div>
      <div class="date-section">
        <div class="current-date">{{ currentDate }}</div>
      </div>
    </div>
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
  position: relative;
  overflow: hidden;
}

.time-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.time-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
}

.digital-clock {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.time-section {
  padding: 0.5rem 0;
}

.digital-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Courier New', monospace;
}

.digit-group {
  display: flex;
  gap: 0.2rem;
}

.digit {
  position: relative;
  width: 35px;
  height: 50px;
  display: inline-block;
}

.segment {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.segment.active {
  background: var(--primary-color);
  box-shadow: 0 0 10px var(--primary-color);
}

/* 七段数码管样式 */
.segment-1 { /* 顶部 */
  top: 0;
  left: 4px;
  width: 26px;
  height: 4px;
}

.segment-2 { /* 右上 */
  top: 2px;
  right: 0;
  width: 4px;
  height: 20px;
}

.segment-3 { /* 右下 */
  bottom: 2px;
  right: 0;
  width: 4px;
  height: 20px;
}

.segment-4 { /* 底部 */
  bottom: 0;
  left: 4px;
  width: 26px;
  height: 4px;
}

.segment-5 { /* 左下 */
  bottom: 2px;
  left: 0;
  width: 4px;
  height: 20px;
}

.segment-6 { /* 左上 */
  top: 2px;
  left: 0;
  width: 4px;
  height: 20px;
}

.segment-7 { /* 中间 */
  top: 50%;
  left: 4px;
  width: 26px;
  height: 4px;
  transform: translateY(-50%);
}

.separator {
  font-size: 2rem;
  color: var(--primary-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  text-shadow: 0 0 10px var(--primary-color);
  transition: opacity 0.3s ease;
}

.separator.blink {
  opacity: 0.3;
}

.date-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.current-date {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .time-display {
    padding: 1.2rem;
  }
  
  .digit {
    width: 28px;
    height: 40px;
  }
  
  .segment-1, .segment-4, .segment-7 {
    width: 20px;
    left: 3px;
  }
  
  .segment-2, .segment-3, .segment-5, .segment-6 {
    width: 3px;
  }
  
  .segment-2, .segment-3 {
    height: 16px;
  }
  
  .segment-5, .segment-6 {
    height: 16px;
  }
  
  .separator {
    font-size: 1.5rem;
  }
  
  .current-date {
    font-size: 0.8rem;
  }
}
</style>