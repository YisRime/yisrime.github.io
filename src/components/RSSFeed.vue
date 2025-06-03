<script setup>
import { ref, onMounted } from 'vue'

const rssItems = ref([])
const isLoading = ref(true)
const error = ref('')

// RSS源配置
const rssFeeds = [
  {
    name: '阮一峰的网络日志',
    url: 'https://www.ruanyifeng.com/blog/atom.xml'
  },
  {
    name: 'Vue.js 官方博客',
    url: 'https://blog.vuejs.org/feed.rss'
  }
]

const fetchRSSFeed = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    // 使用RSS到JSON的API服务
    const feedUrl = rssFeeds[0].url
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=5`
    
    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('获取RSS失败')
    }
    
    const data = await response.json()
    
    if (data.status === 'ok') {
      rssItems.value = data.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString('zh-CN'),
        description: item.description?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
      }))
    } else {
      throw new Error('RSS解析失败')
    }
  } catch (err) {
    console.error('RSS获取失败:', err)
    error.value = '暂时无法获取RSS内容'
    // 显示示例数据
    rssItems.value = [
      {
        title: '示例文章标题',
        link: '#',
        pubDate: '2024-01-01',
        description: '这是一个示例文章描述...'
      }
    ]
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRSSFeed()
})
</script>

<template>
  <div class="rss-feed">
    <div class="section-header">
      <h3>最新文章</h3>
      <button @click="fetchRSSFeed" class="refresh-btn" :disabled="isLoading">
        <i class="fas fa-sync-alt" :class="{ spinning: isLoading }"></i>
      </button>
    </div>
    
    <div class="rss-content">
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner"></div>
        <span>加载中...</span>
      </div>
      
      <div v-else-if="error" class="error">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ error }}</span>
      </div>
      
      <div v-else class="rss-items">
        <a 
          v-for="item in rssItems" 
          :key="item.link"
          :href="item.link"
          target="_blank"
          class="rss-item"
        >
          <div class="item-content">
            <h4 class="item-title">{{ item.title }}</h4>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-meta">
              <span class="item-date">{{ item.pubDate }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rss-feed {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.rss-feed::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.rss-feed:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-color: rgba(99, 102, 241, 0.3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.refresh-btn {
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

.rss-content {
  min-height: 200px;
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

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error {
  color: #ef4444;
}

.rss-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rss-item {
  display: block;
  text-decoration: none;
  color: inherit;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
}

.rss-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .rss-feed {
    padding: 1.5rem;
  }
  
  .item-title {
    font-size: 0.95rem;
  }
  
  .item-description {
    font-size: 0.8rem;
  }
}
</style>