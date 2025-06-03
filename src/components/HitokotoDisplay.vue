<script setup>
import { ref, onMounted } from 'vue'

const quote = ref({
  text: '加载中...',
  author: ''
})

const isLoading = ref(true)

const fetchHitokoto = async () => {
  isLoading.value = true
  
  try {
    const response = await fetch('https://v1.hitokoto.cn/', {
      timeout: 5000
    })
    
    if (!response.ok) {
      throw new Error('网络请求失败')
    }
    
    const data = await response.json()
    quote.value = {
      text: data.hitokoto,
      author: data.from || '未知'
    }  } catch (error) {
    console.log('获取一言失败:', error)
    quote.value = {
      text: '网络请求失败，请稍后再试',
      author: ''
    }
  } finally {
    isLoading.value = false
  }
}

const refreshQuote = () => {
  fetchHitokoto()
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<template>
  <div class="hitokoto-display">
    <div class="quote-content" :class="{ loading: isLoading }">
      <div class="quote-text">{{ quote.text }}</div>
      <div class="quote-author" v-if="quote.author">—— {{ quote.author }}</div>
    </div>
    <button @click="refreshQuote" class="refresh-btn" :disabled="isLoading">
      <i class="fas fa-sync-alt" :class="{ spinning: isLoading }"></i>
    </button>
  </div>
</template>

<style scoped>
.hitokoto-display {
  padding: 1.5rem;
  position: relative;
  text-align: center;
}

.hitokoto-display::before {
  display: none;
}

.hitokoto-display:hover {
  transform: none;
  box-shadow: none;
  background: transparent;
  border-color: transparent;
}

.quote-content {
  text-align: center;
  margin-bottom: 1rem;
  transition: opacity 0.3s ease;
}

.quote-content.loading {
  opacity: 0.6;
}

.quote-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 0.8rem;
  font-style: italic;
  min-height: 1.5em;
  font-weight: 500;
}

.quote-author {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.refresh-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  transform: scale(1.1);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.refresh-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 0.9rem;
  }
  
  .quote-author {
    font-size: 0.75rem;
  }
}
</style>