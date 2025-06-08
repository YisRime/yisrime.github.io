<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'

const allRssItems = ref([])
const isLoading = ref(true)
const error = ref('')
const loadingProgress = ref(0)
const totalFeeds = ref(configData.rss.feeds.length)
const currentFeedIndex = ref(0)

// 清理 HTML 标签和特殊字符的函数
const cleanHtmlText = (text) => {
  if (!text) return ''
  
  return text
    // 移除所有 HTML 标签
    .replace(/<[^>]*>/g, '')
    // 解码常见的 HTML 实体
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // 移除其他 HTML 实体
    .replace(/&[a-zA-Z0-9#]+;/g, '')
    // 移除多余的空白字符
    .replace(/\s+/g, ' ')
    .trim()
}

// RSS API 备选列表
const rssApis = [
  'https://api.rss2json.com/v1/api.json',
  'https://rss2json.com/api.json',
  'https://feed2json.org/convert',
  'https://api.allorigins.win/get'
]

const fetchRSSFeed = async (feedUrl, retryCount = 0) => {
  // 如果所有API都失败，返回空数组
  if (retryCount >= rssApis.length) {
    console.warn('所有RSS API都失败，跳过此源')
    return []
  }

  const currentApi = rssApis[retryCount]
  
  try {
    let response, data
    
    // 根据不同API构造请求URL
    if (currentApi.includes('allorigins')) {
      const proxyUrl = `${currentApi}?url=${encodeURIComponent(feedUrl)}`
      response = await fetch(proxyUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      })
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      const proxyData = await response.json()
      if (!proxyData.contents) throw new Error('代理API返回无效数据')
      
      // 简单的RSS解析（仅作为最后的备用方案）
      const rssText = proxyData.contents
      return parseRSSText(rssText, feedUrl)
      
    } else {
      // 标准RSS2JSON API
      const apiUrl = `${currentApi}?rss_url=${encodeURIComponent(feedUrl)}&count=10`
      response = await fetch(apiUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(10000)
      })
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      
      data = await response.json()
      if (data.status !== 'ok' || !data.items) throw new Error('RSS解析失败')
      
      return data.items.slice(0, 10).map(item => ({
        title: cleanHtmlText(item.title),
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString('zh-CN'),
        description: cleanHtmlText(item.description || item.content),
        source: data.feed?.title || '未知来源'
      }))
    }
    
  } catch (err) {
    console.error(`RSS API ${retryCount + 1} 失败:`, err.message)
    
    // 尝试下一个API
    return fetchRSSFeed(feedUrl, retryCount + 1)
  }
}

// 简单的RSS文本解析器（备用方案）
const parseRSSText = (rssText, feedUrl) => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(rssText, 'text/xml')
    
    const items = xmlDoc.querySelectorAll('item')
    const feedTitle = xmlDoc.querySelector('channel > title')?.textContent || '未知来源'
    
    return Array.from(items).slice(0, 10).map(item => ({
      title: cleanHtmlText(item.querySelector('title')?.textContent || '无标题'),
      link: item.querySelector('link')?.textContent || feedUrl,
      pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()).toLocaleDateString('zh-CN'),
      description: cleanHtmlText(item.querySelector('description')?.textContent || ''),
      source: feedTitle
    }))
  } catch (err) {
    console.error('RSS文本解析失败:', err)
    return []
  }
}

// 检查元素是否进入视口
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  return rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1
}

// 滚动时检查并添加动画，以及检查是否需要加载更多
const handleScroll = () => {
  const items = document.querySelectorAll('.rss-item')
  
  items.forEach((item) => {
    if (isInViewport(item)) {
      item.classList.add('fly-in')
    } else {
      // 元素离开视口时移除动画类，允许重复触发
      item.classList.remove('fly-in')
    }
  })
  
  // 检查是否滚动到底部，如果是则加载更多内容
  if (!isLoading.value && currentFeedIndex.value < configData.rss.feeds.length - 1) {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight
    
    // 当滚动到距离底部100px以内时加载更多内容
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      loadNextFeed()
    }
  }
}

// 加载下一个RSS源
const loadNextFeed = async () => {
  if (isLoading.value || currentFeedIndex.value >= configData.rss.feeds.length - 1) return
  
  isLoading.value = true
  currentFeedIndex.value += 1
  const feed = configData.rss.feeds[currentFeedIndex.value]
  
  try {
    const items = await fetchRSSFeed(feed.url)
    
    if (items.length > 0) {
      // 为每个item添加来源信息和唯一ID
      const itemsWithSource = items.map((item, index) => ({
        ...item,
        source: feed.name,
        uniqueId: `${feed.name}-${index}-${Date.now()}`
      }))
      
      // 添加到显示列表中
      allRssItems.value.push(...itemsWithSource)
    }
  } catch (err) {
    console.error(`获取RSS失败 (${feed.name}):`, err)
  }
  
  // 更新进度
  loadingProgress.value = currentFeedIndex.value + 1
  isLoading.value = false
}

const fetchAllFeeds = async () => {
  isLoading.value = true
  error.value = ''
  allRssItems.value = []
  loadingProgress.value = 0
  currentFeedIndex.value = 0
  
  // 只加载第一个RSS源
  if (configData.rss.feeds.length > 0) {
    const feed = configData.rss.feeds[0]
    
    try {
      const items = await fetchRSSFeed(feed.url)
      
      if (items.length > 0) {
        // 为每个item添加来源信息和唯一ID
        const itemsWithSource = items.map((item, index) => ({
          ...item,
          source: feed.name,
          uniqueId: `${feed.name}-${index}-${Date.now()}`
        }))
        
        // 实时添加到显示列表中
        allRssItems.value.push(...itemsWithSource)
      }
    } catch (err) {
      console.error(`获取RSS失败 (${feed.name}):`, err)
    }
    
    // 更新进度
    loadingProgress.value = 1
  }
  
  if (allRssItems.value.length === 0) {
    error.value = '暂时无法获取RSS内容'
  }
  
  isLoading.value = false
}

onMounted(() => {
  fetchAllFeeds()
  window.addEventListener('scroll', handleScroll)
  setTimeout(handleScroll, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="rss-feed">
    <div v-if="isLoading && allRssItems.length === 0" class="loading">
      <span>正在加载RSS内容...</span>
    </div>
    
    <div v-else-if="error && allRssItems.length === 0" class="error">
      <i class="fas fa-exclamation-triangle"></i>
      <span>{{ error }}</span>
    </div>
    
    <div 
      v-for="(item, index) in allRssItems" 
      :key="item.uniqueId || item.link"
      class="rss-item"
    >
      <a 
        :href="item.link"
        target="_blank"
        class="item-link"
      >
        <div class="item-header">
          <span class="item-source">{{ item.source }}</span>
          <span class="item-separator">/</span>
          <span class="item-date">{{ item.pubDate }}</span>
        </div>
        <h4 class="item-title">{{ item.title }}</h4>
        <p class="item-description">{{ item.description }}</p>
      </a>
    </div>
    
    <div v-if="isLoading && allRssItems.length > 0" class="loading-more">
      <span>加载更多内容中... ({{ loadingProgress }}/{{ totalFeeds }})</span>
    </div>
  </div>
</template>

<style scoped>
.rss-feed {
  background: transparent;
  padding: 2rem;
  position: relative;
  width: 100%;
}

.loading, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  height: 200px;
}

.error {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 1rem;
}

.rss-item {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.5s ease;
  margin-bottom: 0.8rem;
}

.item-link {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 0.8rem 0;
  transition: all 0.3s ease;
  position: relative;
}

.item-link:hover {
  transform: translateX(10px);
  padding-left: 10px;
}

.item-link:hover::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: var(--primary-color);
  border-radius: 8px;
}

.item-link:hover .item-title {
  color: var(--primary-color);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}

.item-source {
  font-size: 0.8rem;
  color: var(--primary-color);
  font-weight: 600;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-separator {
  font-size: 0.8rem;
  color: var(--text-muted);
  opacity: 0.6;
}

.item-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .rss-feed {
    padding: 1.5rem;
    margin: 0 auto;
    max-width: 100%;
  }
  
  .item-title {
    font-size: 1.05rem;
  }
  
  .item-description {
    font-size: 0.85rem;
  }
  
  .item-link:hover {
    transform: none;
    padding-left: 0.8rem;
  }
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  padding: 1rem;
  margin-top: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes flyIn {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fly-in {
  animation: flyIn 0.3s ease forwards;
}
</style>