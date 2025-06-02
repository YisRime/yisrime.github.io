<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">我的项目</h2>
        <p class="section-subtitle">这里展示了我最近的一些作品和项目</p>
      </div>
      
      <div class="projects-filter">
        <button 
          v-for="category in categories" 
          :key="category"
          :class="['filter-btn', { active: activeFilter === category }]"
          @click="setActiveFilter(category)"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-image">
            <div class="image-placeholder">
              <span class="project-icon">{{ project.icon }}</span>
            </div>
            <div class="project-overlay">
              <div class="overlay-content">
                <button class="btn-view">查看详情</button>
                <a :href="project.github" target="_blank" class="btn-github" @click.stop>
                  📂 GitHub
                </a>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-tech">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
            <div class="project-meta">
              <span class="project-status" :class="project.status">
                {{ getStatusText(project.status) }}
              </span>
              <span class="project-date">{{ project.date }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="more-projects">
        <a href="https://github.com/yisrime" target="_blank" class="btn-more">
          查看更多项目 →
        </a>
      </div>
    </div>
    
    <!-- 项目详情模态框 -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeProject">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeProject">×</button>
        <div class="modal-header">
          <h2>{{ selectedProject.title }}</h2>
          <div class="modal-links">
            <a :href="selectedProject.demo" target="_blank" class="btn btn-primary">
              🚀 在线演示
            </a>
            <a :href="selectedProject.github" target="_blank" class="btn btn-outline">
              📂 GitHub
            </a>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="project-details">
            <h3>项目描述</h3>
            <p>{{ selectedProject.fullDescription }}</p>
            
            <h3>主要功能</h3>
            <ul>
              <li v-for="feature in selectedProject.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
            
            <h3>技术栈</h3>
            <div class="tech-stack">
              <span 
                v-for="tech in selectedProject.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            
            <h3>开发亮点</h3>
            <ul>
              <li v-for="highlight in selectedProject.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('全部')
const selectedProject = ref(null)

const categories = ['全部', '前端', '全栈', '工具']

const projects = ref([
  {
    id: 1,
    title: '响应式个人作品集',
    description: '使用Vue.js构建的现代化个人作品集网站，具有响应式设计和流畅的动画效果。',
    fullDescription: '这是一个完全响应式的个人作品集网站，采用现代化的设计理念和用户体验。网站使用Vue.js构建，具有流畅的页面切换动画、暗黑模式支持和多语言功能。',
    icon: '🌐',
    category: '前端',
    technologies: ['Vue.js', 'CSS3', 'JavaScript', 'Vite'],
    status: 'completed',
    date: '2024-01',
    github: 'https://github.com/yisrime/portfolio',
    demo: 'https://yisrime.github.io',
    features: [
      '响应式设计，支持所有设备',
      '流畅的页面切换动画',
      '暗黑模式切换',
      '项目展示和技能图表',
      '联系表单集成'
    ],
    highlights: [
      '使用CSS Grid和Flexbox实现复杂布局',
      '优化了页面加载性能',
      '实现了无障碍访问标准',
      'SEO友好的结构设计'
    ]
  },
  {
    id: 2,
    title: '任务管理应用',
    description: '功能完整的任务管理应用，支持项目分组、优先级设置和团队协作。',
    fullDescription: '一个功能强大的任务管理应用，帮助个人和团队更好地组织和跟踪工作进度。应用支持多项目管理、任务优先级、截止日期提醒等功能。',
    icon: '📋',
    category: '全栈',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    status: 'in-progress',
    date: '2024-02',
    github: 'https://github.com/yisrime/task-manager',
    demo: 'https://task-app-demo.com',
    features: [
      '项目和任务管理',
      '优先级和标签系统',
      '团队协作功能',
      '实时通知',
      '数据可视化面板'
    ],
    highlights: [
      '实现了实时数据同步',
      '用户友好的拖拽界面',
      '高效的数据库查询优化',
      '完整的用户认证系统'
    ]
  },
  {
    id: 3,
    title: '天气预报小程序',
    description: '基于微信小程序开发的天气预报应用，提供详细的天气信息和预警。',
    fullDescription: '一个功能丰富的天气预报小程序，提供当前天气、7天预报、空气质量指数、天气预警等功能。界面简洁美观，操作流畅。',
    icon: '🌤️',
    category: '前端',
    technologies: ['微信小程序', 'JavaScript', 'CSS3'],
    status: 'completed',
    date: '2023-12',
    github: 'https://github.com/yisrime/weather-app',
    demo: '#',
    features: [
      '实时天气信息',
      '7天天气预报',
      '空气质量监测',
      '天气预警通知',
      '城市搜索和定位'
    ],
    highlights: [
      '集成了多个天气API',
      '优化了小程序性能',
      '实现了离线数据缓存',
      '支持地理位置自动获取'
    ]
  },
  {
    id: 4,
    title: '代码片段管理器',
    description: '为开发者设计的代码片段管理工具，支持语法高亮和分类整理。',
    fullDescription: '一个专为开发者设计的代码片段管理工具，帮助开发者收集、整理和快速使用常用的代码片段。支持多种编程语言的语法高亮。',
    icon: '💻',
    category: '工具',
    technologies: ['Electron', 'Vue.js', 'SQLite'],
    status: 'completed',
    date: '2023-10',
    github: 'https://github.com/yisrime/code-snippets',
    demo: 'https://code-snippets-demo.com',
    features: [
      '多语言语法高亮',
      '标签和分类管理',
      '快速搜索功能',
      '导入导出功能',
      '快捷键支持'
    ],
    highlights: [
      '使用Electron构建跨平台应用',
      '实现了高效的搜索算法',
      '支持自定义主题',
      '本地数据存储和同步'
    ]
  },
  {
    id: 5,
    title: '在线图片编辑器',
    description: '基于Canvas的在线图片编辑工具，支持基础的图片处理和滤镜效果。',
    fullDescription: '一个基于HTML5 Canvas的在线图片编辑器，提供基础的图片编辑功能，包括裁剪、旋转、滤镜、文字添加等功能。',
    icon: '🎨',
    category: '前端',
    technologies: ['Canvas', 'JavaScript', 'CSS3'],
    status: 'planning',
    date: '2024-03',
    github: 'https://github.com/yisrime/image-editor',
    demo: '#',
    features: [
      '图片裁剪和旋转',
      '多种滤镜效果',
      '文字和贴纸添加',
      '撤销重做功能',
      '多格式导出'
    ],
    highlights: [
      '使用Canvas API实现图片处理',
      '优化了大图片的处理性能',
      '实现了复杂的滤镜算法',
      '响应式的操作界面'
    ]
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeFilter.value)
})

const setActiveFilter = (category) => {
  activeFilter.value = category
}

const openProject = (project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

const getStatusText = (status) => {
  const statusMap = {
    'completed': '已完成',
    'in-progress': '进行中',
    'planning': '计划中'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.projects {
  padding: 6rem 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  position: relative;
}

.section-title::after {
  content: '';
  width: 60px;
  height: 4px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.projects-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  color: #6c757d;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: #3498db;
  background: #3498db;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-icon {
  font-size: 4rem;
  color: white;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  gap: 1rem;
}

.btn-view,
.btn-github {
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-view {
  background: #3498db;
  color: white;
}

.btn-github {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.project-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-status {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-status.completed {
  background: #d4edda;
  color: #155724;
}

.project-status.in-progress {
  background: #fff3cd;
  color: #856404;
}

.project-status.planning {
  background: #d1ecf1;
  color: #0c5460;
}

.project-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.more-projects {
  text-align: center;
}

.btn-more {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-more:hover {
  transform: translateY(-2px);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background: #e9ecef;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.modal-links {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.modal-body {
  padding: 2rem;
}

.project-details h3 {
  color: #2c3e50;
  margin: 1.5rem 0 0.8rem 0;
}

.project-details h3:first-child {
  margin-top: 0;
}

.project-details p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-details ul {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-header {
    padding: 1.5rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .overlay-content {
    flex-direction: column;
  }
}

@media (prefers-color-scheme: dark) {
  .projects {
    background: #1a1a1a;
  }

  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: #cccccc;
  }

  .filter-btn {
    background: #2a2a2a;
    border-color: #444;
    color: #cccccc;
  }

  .project-card {
    background: #2a2a2a;
  }

  .project-title {
    color: #ffffff;
  }

  .project-description {
    color: #cccccc;
  }

  .tech-tag {
    background: #444;
    color: #cccccc;
  }

  .project-date {
    color: #999;
  }

  .modal-content {
    background: #2a2a2a;
  }

  .modal-header {
    border-bottom-color: #444;
  }

  .modal-header h2 {
    color: #ffffff;
  }

  .modal-close {
    background: #444;
    color: #ffffff;
  }

  .project-details h3 {
    color: #ffffff;
  }

  .project-details p,
  .project-details ul {
    color: #cccccc;
  }
}
</style>