<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'

const currentTime = ref('')
const currentDate = ref('')
const separatorBlink = ref(true)
let timeInterval = null

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
    hour: [hour[0] || '0', hour[1] || '0'].map((char, index) => ({ value: parseInt(char), index })),
    minute: [minute[0] || '0', minute[1] || '0'].map((char, index) => ({ value: parseInt(char), index })),
    second: [second[0] || '0', second[1] || '0'].map((char, index) => ({ value: parseInt(char), index }))
  }
})

const getSegmentClass = (digit, segment) => ({
  [`segment-${segment}`]: true,
  'active': segmentMapping[digit]?.[segment - 1]
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour12: configData.time.hour12,
    hour: '2-digit',
    minute: '2-digit',
    second: configData.time.showSeconds ? '2-digit' : undefined
  }).replace(/上午|下午/g, '')
    currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
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
        <div class="digital-numbers">          <span class="digit-group">
            <span class="digit" v-for="digit in timeDigits.hour" :key="`h${digit.index}`" :data-digit="digit.value">
              <span class="segment" v-for="segment in 7" :key="segment" :class="getSegmentClass(digit.value, segment)"></span>
            </span>
          </span>
          <span class="separator">:</span>
          <span class="digit-group">
            <span class="digit" v-for="digit in timeDigits.minute" :key="`m${digit.index}`" :data-digit="digit.value">
              <span class="segment" v-for="segment in 7" :key="segment" :class="getSegmentClass(digit.value, segment)"></span>
            </span>
          </span>
          <span class="separator">:</span>
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
  max-width: 280px;
  margin: 0 auto;
}

.digital-clock {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time-section {
  padding: 0.3rem 0;
}

.digital-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-family: 'Courier New', monospace;
}

.digit-group {
  display: flex;
  gap: 0.2rem;
}

.digit {
  position: relative;
  width: 28px;
  height: 40px;
  margin: 0 2px;
  border-radius: 4px;
}

.segment {
  position: absolute;
  background: transparent;
  transition: all 0.4s ease;
  border-radius: 2px;
}

.segment.active {
  background: var(--primary-color);
  box-shadow: 
    0 0 8px var(--primary-color),
    0 0 16px var(--segment-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* 七段数码管样式 */
.segment-1 { /* 顶部 */
  top: 2px;
  left: 4px;
  width: 20px;
  height: 4px;
}

.segment-2 { /* 右上 */
  top: 4px;
  right: 2px;
  width: 4px;
  height: 15px;
}

.segment-3 { /* 右下 */
  bottom: 4px;
  right: 2px;
  width: 4px;
  height: 15px;
}

.segment-4 { /* 底部 */
  bottom: 2px;
  left: 4px;
  width: 20px;
  height: 4px;
}

.segment-5 { /* 左下 */
  bottom: 4px;
  left: 2px;
  width: 4px;
  height: 15px;
}

.segment-6 { /* 左上 */
  top: 4px;
  left: 2px;
  width: 4px;
  height: 15px;
}

.segment-7 { /* 中间 */
  top: 50%;
  left: 4px;
  width: 20px;
  height: 4px;
  transform: translateY(-50%);
}

.separator {
  font-size: 1.8rem;
  color: var(--primary-color);
  font-weight: 900;
  display: flex;
  align-items: center;
  text-shadow: 
    0 0 8px var(--primary-color),
    0 0 16px var(--segment-glow);
  line-height: 1;
}

.date-section {
  padding-top: 0.3rem;
  margin-top: 0.5rem;
}

.current-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .time-display {
    padding: 0.6rem;
    max-width: 240px;
  }
  
  .digit {
    width: 16px;
    height: 24px;
  }

  .segment-1, .segment-4, .segment-7 {
    width: 12px;
    left: 2px;
    height: 3px;
  }
  
  .segment-2, .segment-3, .segment-5, .segment-6 {
    width: 3px;
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