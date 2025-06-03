<script setup>
import { ref, onMounted } from 'vue'
import { rssConfig } from '@/config'

const rssItems = ref([])
const isLoading = ref(true)
const error = ref('')

const fetchRSSFeed = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await fetch(`${rssConfig.apiUrl}?rss_url=${encodeURIComponent(rssConfig.feedUrl)}`)
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'ok' && data.items) {
        rssItems.value = data.items.slice(0, rssConfig.maxItems).map(item => ({
          title: item.title,
          link: item.link,
          pubDate: new Date(item.pubDate).toLocaleDateString('zh-CN'),
          description: item.description?.replace(/<[^>]*>/g, '') + '...'
        }))
      } else {
        throw new Error('RSS解析失败')
      }
    } else {
      throw new Error('网络请求失败')
    }
  } catch (err) {
    console.error('RSS获取失败:', err)
    error.value = '暂时无法获取RSS内容'
    // 显示示例数据
    rssItems.value = rssConfig.fallbackItems
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchRSSFeed)
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
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 2rem;
  box-shadow: none;
  transition: none;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  box-shadow: 0 4px 12px var(--avatar-shadow);
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
  flex: 1;
  overflow: visible;
  display: flex;
  flex-direction: column;
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
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 1.2rem;
  transition: all 0.3s ease;
}

.rss-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: none;
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