<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Typed from 'typed.js'

const quote = ref({ text: '加载中...', author: '', who: '' })
const isLoading = ref(true)
const typedInstance = ref(null)
const quoteTextRef = ref(null)

const apiList = [
  'https://v1.hitokoto.cn/',
  'https://api.ixiaowai.cn/api/api.php',
  'https://api.uomg.com/api/rand.qinghua?format=json'
]

const fallbackQuote = { 
  text: '天与山与云与水 上下一白', 
  author: '湖心亭看雪',
  who: '张岱'
}

const parseApiResponse = (data) => {
  if (data.hitokoto) {
    return { text: data.hitokoto, author: data.from || '', who: data.from_who || '' }
  }
  if (data.data) {
    return { text: data.data, author: '', who: '' }
  }
  if (data.content) {
    return { text: data.content, author: data.source || '', who: '' }
  }
  throw new Error('无法解析API响应')
}

const createTypedEffect = async (quoteData) => {
  await nextTick()
  if (typedInstance.value) {
    typedInstance.value.destroy()
  }
  
  const { text, author, who } = quoteData
  const displayWho = (who && author && who === author) ? '' : who
  const attribution = (author || displayWho) ? `<br><span class="attribution">—— ${displayWho}${author ? `《${author}》` : ''}</span>` : ''
  const fullText = `${text}${attribution}`
  
  typedInstance.value = new Typed(quoteTextRef.value, {
    strings: [fullText],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 3000,
    startDelay: 1000,
    loop: true
  })
}

const fetchHitokoto = async (retryCount = 0) => {
  if (retryCount === 0) isLoading.value = true
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(apiList[retryCount % apiList.length], {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    const parsedQuote = parseApiResponse(data)
    
    quote.value = parsedQuote
    await createTypedEffect(parsedQuote)
    
  } catch (err) {
    console.error(`获取一言失败 (尝试 ${retryCount + 1}):`, err)
    
    if (retryCount < apiList.length - 1 && err.name !== 'AbortError') {
      return fetchHitokoto(retryCount + 1)
    }
    
    quote.value = fallbackQuote
    await createTypedEffect(fallbackQuote)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchHitokoto)
</script>

<template>
  <div class="hitokoto-display">
    <div class="quote-content" :class="{ loading: isLoading }">
      <div class="quote-text" ref="quoteTextRef"></div>
    </div>
  </div>
</template>

<style scoped>
.hitokoto-display {
  padding: 0.5rem;
  text-align: center;
}

.quote-content {
  margin-bottom: 0.5rem;
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

.attribution {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 400;
  text-align: right;
  margin-top: 0.5rem;
  display: block;
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 0.9rem;
  }
}

.typed-cursor {
  display: none !important;
}

</style>