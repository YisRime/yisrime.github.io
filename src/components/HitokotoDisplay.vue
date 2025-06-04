<script setup>
import { ref, onMounted } from 'vue'

const quote = ref({ text: '加载中...', author: '', who: '' })
const isLoading = ref(true)

// 备用API列表
const apiList = [
  'https://v1.hitokoto.cn/',
  'https://api.ixiaowai.cn/api/api.php',
  'https://api.uomg.com/api/rand.qinghua?format=json'
]

const fetchHitokoto = async (retryCount = 0) => {
  if (retryCount === 0) {
    isLoading.value = true
  }
  
  try {
    const apiUrl = apiList[retryCount % apiList.length]
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // 根据不同API格式处理数据
    let text = ''
    let author = ''
    let who = ''
    
    if (data.hitokoto) {
      // 标准一言API
      text = data.hitokoto
      author = data.from || ''
      who = data.from_who || ''
    } else if (data.data) {
      // 其他API格式
      text = data.data
      author = ''
      who = ''
    } else if (data.content) {
      // 另一种API格式
      text = data.content
      author = data.source || ''
      who = ''
    } else {
      throw new Error('无法解析API响应')    }
    
    quote.value = { text, author, who }
    
  } catch (err) {
    console.error(`获取一言失败 (尝试 ${retryCount + 1}):`, err)
    
    // 如果还有重试机会且不是手动中止
    if (retryCount < apiList.length - 1 && err.name !== 'AbortError') {
      return fetchHitokoto(retryCount + 1)
    }
      // 所有API都失败，使用备用内容
    quote.value = { 
      text: '天与山与云与水 上下一白', 
      author: '湖心亭看雪',
      who: ''
    }  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchHitokoto()
})
</script>

<template>  <div class="hitokoto-display">
    <div class="quote-content" :class="{ loading: isLoading }">
      <div class="quote-text">{{ quote.text }}</div>
      <div class="quote-attribution" v-if="quote.author || quote.who">
        —— {{ quote.who }}《{{ quote.author }}》
      </div>
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
  font-weight: 500;
}

.quote-attribution {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.quote-author {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: right;
}

.quote-who {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: right;
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 0.9rem;
  }
  
  .quote-author {
    font-size: 0.75rem;
  }
  
  .quote-who {
    font-size: 0.7rem;
  }
}
</style>