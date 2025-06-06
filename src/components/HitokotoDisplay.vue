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
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 3000,
    startDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  })
}

const fetchHitokoto = async (retryCount = 0) => {
  if (retryCount === 0) isLoading.value = true
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
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
  text-align: center;
  min-height: 80px;
}

.quote-content.loading {
  opacity: 0.6;
}

.quote-text {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.6;
  font-weight: 500;
  white-space: normal;
  max-width: 100%;
  display: inline-block;
}

:deep(.typed-cursor) {
  display: inline !important;
  color: var(--primary-color);
  animation: typewriter-cursor 1s infinite;
  vertical-align: baseline;
  margin-left: 0 !important;
}

@keyframes typewriter-cursor {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

:deep(.attribution) {
  font-size: 0.9rem;
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

</style>