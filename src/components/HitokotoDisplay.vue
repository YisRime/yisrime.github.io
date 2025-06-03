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
  </div>
</template>

<style scoped>
.hitokoto-display {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.hitokoto-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.hitokoto-content {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-style: italic;
  quotes: '"' '"';
}

.hitokoto-content::before {
  content: open-quote;
}

.hitokoto-content::after {
  content: close-quote;
}

.hitokoto-from {
  font-size: 0.9rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

.loading {
  color: var(--text-secondary);
  font-style: italic;
}

.error {
  color: #ef4444;
}

.refresh-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: var(--primary-color);
  color: var(--primary-color);
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
  text-align: right;
  margin-top: 0.5rem;
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