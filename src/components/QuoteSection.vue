<script setup>
import { ref, onMounted } from 'vue'

const quote = ref({
  text: '生活就像一盒巧克力，你永远不知道下一个会是什么味道。',
  author: '阿甘正传'
})

const isLoading = ref(false)

const fetchQuote = async () => {
  isLoading.value = true
  
  try {
    const response = await fetch('https://v1.hitokoto.cn/', {
      timeout: 5000
    })
    
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    
    const data = await response.json()
    quote.value = {
      text: data.hitokoto,
      author: data.from || '未知'
    }
  } catch (error) {
    console.log('获取一言失败:', error)
    // 使用备用名言
    const fallbackQuotes = [
      { text: '代码是诗，开发者是诗人。', author: '程序员格言' },
      { text: '简洁是智慧的灵魂。', author: '莎士比亚' },
      { text: '设计不仅仅是外观和感觉，设计是产品如何工作。', author: '乔布斯' },
      { text: '先让它工作，然后让它正确，最后让它快速。', author: 'Kent Beck' },
      { text: '优秀的程序员编写人能读懂的代码。', author: 'Martin Fowler' }
    ]
    
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
    quote.value = randomQuote
  } finally {
    isLoading.value = false
  }
}

const refreshQuote = () => {
  fetchQuote()
}

onMounted(() => {
  fetchQuote()
})
</script>

<template>
  <div class="quote-section">
    <div class="quote-text">{{ quote.text }}</div>
    <div class="quote-author">—— {{ quote.author }}</div>
  </div>
</template>

<style scoped>
.quote-section {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quote-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.12);
}

.quote-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 0.8rem;
  font-style: italic;
}

.quote-author {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}
</style>