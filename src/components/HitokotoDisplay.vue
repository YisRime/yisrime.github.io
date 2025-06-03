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
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 
    0 15px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.hitokoto-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.hitokoto-display:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(99, 102, 241, 0.3);
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