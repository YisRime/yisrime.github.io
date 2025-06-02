<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">精选项目</h2>
        <p class="section-subtitle">以下是我参与开发的一些代表性项目，展示了我的技术能力和创意思维</p>
      </div>

      <!-- 项目筛选 -->
      <div class="project-filters">
        <button 
          v-for="filter in filters" 
          :key="filter"
          :class="['filter-button', { active: activeFilter === filter }]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <!-- 项目网格 -->
      <div class="projects-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card"
          @mouseenter="project.isHovered = true"
          @mouseleave="project.isHovered = false"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-actions">
                <a 
                  v-if="project.liveUrl" 
                  :href="project.liveUrl" 
                  target="_blank" 
                  class="action-button"
                  title="查看在线演示"
                >
                  <span class="action-icon">🔗</span>
                  <span class="action-text">在线演示</span>
                </a>
                <a 
                  v-if="project.githubUrl" 
                  :href="project.githubUrl" 
                  target="_blank" 
                  class="action-button"
                  title="查看源代码"
                >
                  <span class="action-icon">💻</span>
                  <span class="action-text">源代码</span>
                </a>
              </div>
            </div>
          </div>
          
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-category">{{ project.category }}</div>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-features">
              <h4>主要功能</h4>
              <ul>
                <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="project-tech">
              <h4>技术栈</h4>
              <div class="tech-tags">
                <span 
                  v-for="tech in project.technologies" 
                  :key="tech"
                  class="tech-tag"
                >{{ tech }}</span>
              </div>
            </div>
            
            <div class="project-stats">
              <div class="stat-item">
                <span class="stat-label">开发时间</span>
                <span class="stat-value">{{ project.duration }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">团队规模</span>
                <span class="stat-value">{{ project.teamSize }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">我的角色</span>
                <span class="stat-value">{{ project.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 项目统计 -->
      <div class="projects-summary">
        <div class="summary-container">
          <div class="summary-item">
            <div class="summary-number">{{ totalProjects }}</div>
            <div class="summary-label">完成项目</div>
          </div>
          <div class="summary-item">
            <div class="summary-number">{{ collaborativeProjects }}</div>
            <div class="summary-label">团队项目</div>
          </div>
          <div class="summary-item">
            <div class="summary-number">{{ openSourceProjects }}</div>
            <div class="summary-label">开源项目</div>
          </div>
          <div class="summary-item">
            <div class="summary-number">{{ totalTechnologies }}</div>
            <div class="summary-label">使用技术</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('全部')

const filters = ['全部', 'Web应用', '移动应用', '工具库', '个人项目']

const projects = ref([
  {
    id: 1,
    title: '电商管理系统',
    category: 'Web应用',
    description: '一个功能完整的电商后台管理系统，支持商品管理、订单处理、用户管理等功能。采用现代化的前端技术栈，提供优秀的用户体验。',
    image: '/api/placeholder/400/250',
    features: [
      '商品信息管理和库存跟踪',
      '订单处理和状态管理',
      '用户权限和角色管理',
      '数据可视化报表',
      '实时通知系统'
    ],
    technologies: ['Vue.js', 'Element Plus', 'Node.js', 'MongoDB', 'Socket.io'],
    duration: '3个月',
    teamSize: '4人',
    role: '前端负责人',
    liveUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/project',
    isHovered: false
  },
  {
    id: 2,
    title: '任务管理应用',
    category: '移动应用',
    description: '一款跨平台的任务管理应用，帮助用户高效管理个人和团队任务，支持实时协作和进度跟踪。',
    image: '/api/placeholder/400/250',
    features: [
      '任务创建和分配',
      '团队协作和评论',
      '进度跟踪和报告',
      '文件附件管理',
      '离线同步功能'
    ],
    technologies: ['React Native', 'Redux', 'Firebase', 'TypeScript'],
    duration: '4个月',
    teamSize: '3人',
    role: '全栈开发',
    liveUrl: 'https://app.example.com',
    githubUrl: 'https://github.com/example/task-app',
    isHovered: false
  },
  {
    id: 3,
    title: 'UI组件库',
    category: '工具库',
    description: '一套企业级的Vue.js UI组件库，提供丰富的组件和完善的文档，帮助开发团队快速构建一致性的用户界面。',
    image: '/api/placeholder/400/250',
    features: [
      '50+ 高质量组件',
      'TypeScript 类型支持',
      '主题定制系统',
      '响应式设计',
      '完整的单元测试'
    ],
    technologies: ['Vue.js', 'TypeScript', 'Vite', 'Jest', 'Storybook'],
    duration: '6个月',
    teamSize: '2人',
    role: '核心开发者',
    liveUrl: 'https://ui.example.com',
    githubUrl: 'https://github.com/example/ui-library',
    isHovered: false
  },
  {
    id: 4,
    title: '个人博客系统',
    category: '个人项目',
    description: '基于现代技术栈构建的个人博客系统，支持Markdown编辑、标签分类、评论系统等功能。',
    image: '/api/placeholder/400/250',
    features: [
      'Markdown 文章编辑',
      '标签和分类管理',
      '搜索和筛选功能',
      '评论和互动系统',
      'SEO 优化'
    ],
    technologies: ['Nuxt.js', 'Tailwind CSS', 'Strapi', 'PostgreSQL'],
    duration: '2个月',
    teamSize: '1人',
    role: '独立开发',
    liveUrl: 'https://blog.example.com',
    githubUrl: 'https://github.com/example/blog',
    isHovered: false
  },
  {
    id: 5,
    title: '数据可视化平台',
    category: 'Web应用',
    description: '企业级数据可视化平台，支持多种图表类型、实时数据更新和交互式仪表板。',
    image: '/api/placeholder/400/250',
    features: [
      '多种图表类型支持',
      '实时数据更新',
      '交互式仪表板',
      '数据导出功能',
      '权限控制系统'
    ],
    technologies: ['React', 'D3.js', 'Express.js', 'Redis', 'WebSocket'],
    duration: '5个月',
    teamSize: '5人',
    role: '前端架构师',
    liveUrl: 'https://dashboard.example.com',
    githubUrl: 'https://github.com/example/dashboard',
    isHovered: false
  },
  {
    id: 6,
    title: '开发者工具插件',
    category: '工具库',
    description: 'VS Code扩展插件，为前端开发者提供代码片段、智能提示和项目模板等实用功能。',
    image: '/api/placeholder/400/250',
    features: [
      '智能代码片段',
      '项目模板生成',
      '代码质量检查',
      '快捷命令面板',
      '主题和配置同步'
    ],
    technologies: ['TypeScript', 'VS Code API', 'Node.js', 'Webpack'],
    duration: '2个月',
    teamSize: '1人',
    role: '独立开发',
    liveUrl: 'https://marketplace.visualstudio.com/items?itemName=example',
    githubUrl: 'https://github.com/example/vscode-extension',
    isHovered: false
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === '全部') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeFilter.value)
})

const totalProjects = computed(() => projects.value.length)
const collaborativeProjects = computed(() => projects.value.filter(p => parseInt(p.teamSize) > 1).length)
const openSourceProjects = computed(() => projects.value.filter(p => p.githubUrl).length)
const totalTechnologies = computed(() => {
  const allTech = projects.value.flatMap(p => p.technologies)
  return new Set(allTech).size
})
</script>

<style scoped>
.projects {
  padding: 5rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
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
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 项目筛选 */
.project-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-button {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.filter-button:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
}

.filter-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* 项目网格 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.action-button:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.action-icon {
  font-size: 1rem;
}

.project-content {
  padding: 2rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.project-category {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.project-description {
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.project-features h4,
.project-tech h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.project-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.project-features li {
  color: #5a6c7d;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 0.4rem;
  position: relative;
  padding-left: 1.2rem;
}

.project-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(118, 75, 162, 0.1);
  color: #764ba2;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid rgba(118, 75, 162, 0.2);
}

.project-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.7rem;
  color: #7f8c8d;
  margin-bottom: 0.3rem;
}

.stat-value {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
}

/* 项目统计 */
.projects-summary {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.summary-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.summary-item {
  text-align: center;
}

.summary-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.summary-label {
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .projects {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-content {
    padding: 1.5rem;
  }
  
  .project-header {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .project-stats {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .summary-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .summary-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .project-filters {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }
  
  .filter-button {
    width: 100%;
    max-width: 200px;
  }
  
  .project-actions {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .summary-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .projects {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
  }
  
  .project-card,
  .projects-summary {
    background: rgba(45, 55, 72, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .section-title {
    color: #ffffff;
  }
  
  .section-subtitle {
    color: #b8c6db;
  }
  
  .project-title,
  .project-features h4,
  .project-tech h4 {
    color: #ffffff;
  }
  
  .project-description,
  .project-features li {
    color: #a8b3c5;
  }
  
  .stat-label,
  .summary-label {
    color: #b8c6db;
  }
  
  .stat-value {
    color: #ffffff;
  }
  
  .filter-button {
    background: rgba(45, 55, 72, 0.8);
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  .project-category,
  .tech-tag {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
}
</style>