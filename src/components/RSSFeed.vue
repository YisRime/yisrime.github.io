<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import configData from '@/config.json'

const allRssItems = ref([])
const isLoading = ref(true)
const error = ref('')
const loadingProgress = ref(0)
const totalFeeds = ref(configData.rss.feeds.length)
const currentFeedIndex = ref(0)

const fetchRSSFeed = async (feedUrl) => {
  try {
    const response = await fetch(`${configData.rss.apiUrl}?rss_url=${encodeURIComponent(feedUrl)}&count=50`)
    if (!response.ok) throw new Error('网络请求失败')
    
    const data = await response.json()
    if (data.status !== 'ok' || !data.items) throw new Error('RSS解析失败')
    
    return data.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate).toLocaleDateString('zh-CN'),
      description: item.description?.replace(/<[^>]*>/g, ''),
      source: data.feed?.title || '未知来源'
    }))
  } catch (err) {
    console.error('RSS获取失败:', err)
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
  border: none;
  border-radius: 0;
  padding: 2rem;
  box-shadow: none;
  transition: none;
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.item-link {
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
  }
  
  .item-title {
    font-size: 1.05rem;
  }
  
  .item-description {
    font-size: 0.85rem;
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