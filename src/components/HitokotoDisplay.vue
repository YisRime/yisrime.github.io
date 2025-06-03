<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { hitokotoConfig } from '@/config'

const quote = ref({ text: '加载中...', author: '' })
const isLoading = ref(true)
let autoRefreshInterval = null

const fetchHitokoto = async () => {
  isLoading.value = true
  try {
    const response = await fetch(hitokotoConfig.apiUrl)
    const data = await response.json()
    quote.value = { text: data.hitokoto, author: data.from || '未知' }
  } catch {
    quote.value = { text: hitokotoConfig.fallbackText, author: hitokotoConfig.fallbackAuthor }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHitokoto()
  if (hitokotoConfig.enableRefresh && hitokotoConfig.autoRefreshInterval > 0) {
    autoRefreshInterval = setInterval(fetchHitokoto, hitokotoConfig.autoRefreshInterval)
  }
})

onUnmounted(() => {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval)
  }
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
  padding: 1.5rem;
  text-align: center;
}

.quote-content {
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
  font-weight: 500;
}

.quote-author {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: right;
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