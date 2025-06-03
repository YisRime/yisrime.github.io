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
  const [hour = '00', minute = '00', second = '00'] = currentTime.value.split(':')
  return {
    hour: [parseInt(hour[0]), parseInt(hour[1])],
    minute: [parseInt(minute[0]), parseInt(minute[1])],
    second: [parseInt(second[0]), parseInt(second[1])]
  }
})

const getSegmentClass = (digit, segment) => ({
  [`segment-${segment}`]: true,
  'active': segmentMapping[digit]?.[segment - 1]
})

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
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
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
  text-align: center;
  max-width: 200px;
  margin: 0 auto;
}

.digital-clock {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time-section {
  padding: 0.2rem 0;
}

.digital-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-family: 'Courier New', monospace;
}

.digit-group {
  display: flex;
  gap: 0.1rem;
}

.digit {
  position: relative;
  width: 20px;
  height: 30px;
  display: inline-block;
}

.segment {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border-radius: 1px;
}

.segment.active {
  background: var(--primary-color);
  box-shadow: 0 0 6px var(--primary-color);
}

/* 七段数码管样式 */
.segment-1 { /* 顶部 */
  top: 0;
  left: 2px;
  width: 16px;
  height: 2px;
}

.segment-2 { /* 右上 */
  top: 1px;
  right: 0;
  width: 2px;
  height: 12px;
}

.segment-3 { /* 右下 */
  bottom: 1px;
  right: 0;
  width: 2px;
  height: 12px;
}

.segment-4 { /* 底部 */
  bottom: 0;
  left: 2px;
  width: 16px;
  height: 2px;
}

.segment-5 { /* 左下 */
  bottom: 1px;
  left: 0;
  width: 2px;
  height: 12px;
}

.segment-6 { /* 左上 */
  top: 1px;
  left: 0;
  width: 2px;
  height: 12px;
}

.segment-7 { /* 中间 */
  top: 50%;
  left: 2px;
  width: 16px;
  height: 2px;
  transform: translateY(-50%);
}

.separator {
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  text-shadow: 0 0 6px var(--primary-color);
  transition: opacity 0.3s ease;
}

.separator.blink {
  opacity: 0.3;
}

.date-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.5rem;
}

.current-date {
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.3px;
}

@media (max-width: 768px) {
  .time-display {
    padding: 0.6rem;
    max-width: 160px;
  }
  
  .digit {
    width: 16px;
    height: 24px;
  }
  
  .segment-1, .segment-4, .segment-7 {
    width: 12px;
    left: 2px;
  }
  
  .segment-2, .segment-3, .segment-5, .segment-6 {
    width: 2px;
  }
  
  .segment-2, .segment-3 {
    height: 10px;
  }
  
  .segment-5, .segment-6 {
    height: 10px;
  }
  
  .separator {
    font-size: 1rem;
  }
  
  .current-date {
    font-size: 0.6rem;
  }
}
</style>