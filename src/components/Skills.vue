<template>
  <section id="skills" class="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">技能专长</h2>
        <p class="section-subtitle">我在以下技术领域拥有丰富的经验和深入的理解</p>
      </div>

      <div class="skills-container">
        <!-- 技能分类标签 -->
        <div class="skill-tabs">
          <button 
            v-for="category in skillCategories" 
            :key="category.id"
            :class="['tab-button', { active: activeCategory === category.id }]"
            @click="activeCategory = category.id"
          >
            <span class="tab-icon">{{ category.icon }}</span>
            <span class="tab-label">{{ category.name }}</span>
          </button>
        </div>

        <!-- 技能内容展示 -->
        <div class="skills-content">
          <transition name="fade" mode="out-in">
            <div :key="activeCategory" class="skill-category-content">
              <div class="skills-grid">
                <div 
                  v-for="skill in currentSkills" 
                  :key="skill.name"
                  class="skill-card"
                  @mouseenter="skill.isHovered = true"
                  @mouseleave="skill.isHovered = false"
                >
                  <div class="skill-header">
                    <div class="skill-icon">{{ skill.icon }}</div>
                    <div class="skill-info">
                      <h3 class="skill-name">{{ skill.name }}</h3>
                      <p class="skill-level">{{ skill.level }}</p>
                    </div>
                  </div>
                  
                  <div class="skill-progress">
                    <div class="progress-bar">
                      <div 
                        class="progress-fill" 
                        :style="{ width: skill.percentage + '%' }"
                      ></div>
                    </div>
                    <span class="progress-text">{{ skill.percentage }}%</span>
                  </div>
                  
                  <p class="skill-description">{{ skill.description }}</p>
                  
                  <div class="skill-tags">
                    <span 
                      v-for="tag in skill.tags" 
                      :key="tag"
                      class="skill-tag"
                    >{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 技能总结卡片 -->
        <div class="skills-summary">
          <div class="summary-card">
            <div class="summary-header">
              <div class="summary-icon">📊</div>
              <h3>技能概览</h3>
            </div>
            <div class="summary-content">
              <div class="summary-stats">
                <div class="stat-item">
                  <div class="stat-number">5+</div>
                  <div class="stat-label">年开发经验</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">15+</div>
                  <div class="stat-label">掌握技术</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">完成项目</div>
                </div>
              </div>
              <div class="summary-text">
                <p>持续学习和实践各种前沿技术，专注于构建高质量、可维护的代码。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('frontend')

const skillCategories = [
  { id: 'frontend', name: '前端开发', icon: '🎨' },
  { id: 'backend', name: '后端开发', icon: '⚙️' },
  { id: 'tools', name: '工具 & 部署', icon: '🔧' },
  { id: 'design', name: '设计 & UI', icon: '✨' }
]

const skills = {
  frontend: [
    {
      name: 'Vue.js',
      icon: '💚',
      level: '高级',
      percentage: 90,
      description: '精通Vue.js生态系统，包括Vue Router、Vuex/Pinia等',
      tags: ['组件化', '响应式', 'Composition API'],
      isHovered: false
    },
    {
      name: 'React',
      icon: '⚛️',
      level: '高级',
      percentage: 85,
      description: '熟练使用React及其生态系统开发现代Web应用',
      tags: ['Hooks', 'Context', 'Redux'],
      isHovered: false
    },
    {
      name: 'TypeScript',
      icon: '🔷',
      level: '高级',
      percentage: 88,
      description: '使用TypeScript提高代码质量和开发效率',
      tags: ['类型安全', '接口', '泛型'],
      isHovered: false
    },
    {
      name: 'CSS/Sass',
      icon: '🎭',
      level: '高级',
      percentage: 85,
      description: '现代CSS技术和预处理器，响应式设计专家',
      tags: ['Flexbox', 'Grid', 'Animation'],
      isHovered: false
    }
  ],
  backend: [
    {
      name: 'Node.js',
      icon: '🟢',
      level: '高级',
      percentage: 85,
      description: '使用Node.js构建高性能的服务端应用',
      tags: ['Express', 'Koa', 'API设计'],
      isHovered: false
    },
    {
      name: 'Python',
      icon: '🐍',
      level: '中级',
      percentage: 75,
      description: 'Python web开发和数据处理',
      tags: ['Django', 'Flask', '数据分析'],
      isHovered: false
    },
    {
      name: 'MongoDB',
      icon: '🍃',
      level: '中级',
      percentage: 78,
      description: 'NoSQL数据库设计和优化',
      tags: ['聚合', '索引', '复制集'],
      isHovered: false
    },
    {
      name: 'MySQL',
      icon: '🐬',
      level: '中级',
      percentage: 72,
      description: '关系型数据库设计和查询优化',
      tags: ['索引优化', '事务', '存储过程'],
      isHovered: false
    }
  ],
  tools: [
    {
      name: 'Git',
      icon: '📝',
      level: '高级',
      percentage: 90,
      description: '版本控制和团队协作工具使用专家',
      tags: ['分支管理', '合并策略', 'CI/CD'],
      isHovered: false
    },
    {
      name: 'Docker',
      icon: '🐳',
      level: '中级',
      percentage: 75,
      description: '容器化部署和微服务架构',
      tags: ['容器编排', '镜像优化', 'Docker Compose'],
      isHovered: false
    },
    {
      name: 'Webpack',
      icon: '📦',
      level: '中级',
      percentage: 80,
      description: '模块打包和构建优化工具',
      tags: ['代码分割', '热更新', '性能优化'],
      isHovered: false
    },
    {
      name: 'AWS',
      icon: '☁️',
      level: '初级',
      percentage: 65,
      description: '云服务平台部署和运维',
      tags: ['EC2', 'S3', 'Lambda'],
      isHovered: false
    }
  ],
  design: [
    {
      name: 'UI设计',
      icon: '🎨',
      level: '中级',
      percentage: 75,
      description: '用户界面设计和用户体验优化',
      tags: ['Figma', '原型设计', '设计系统'],
      isHovered: false
    },
    {
      name: '响应式设计',
      icon: '📱',
      level: '高级',
      percentage: 88,
      description: '跨设备和平台的自适应设计',
      tags: ['移动优先', '断点设计', '流式布局'],
      isHovered: false
    },
    {
      name: '动画效果',
      icon: '⚡',
      level: '中级',
      percentage: 70,
      description: 'CSS和JavaScript动画效果制作',
      tags: ['CSS Animation', 'GSAP', '微交互'],
      isHovered: false
    },
    {
      name: '可访问性',
      icon: '♿',
      level: '中级',
      percentage: 72,
      description: 'Web可访问性标准和最佳实践',
      tags: ['ARIA', '键盘导航', '屏幕阅读器'],
      isHovered: false
    }
  ]
}

const currentSkills = computed(() => skills[activeCategory.value] || [])
</script>

<style scoped>
.skills {
  padding: 5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

.skills-container {
  display: grid;
  gap: 3rem;
}

/* 技能分类标签 */
.skill-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.tab-button.active {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-label {
  font-weight: 600;
}

/* 技能内容 */
.skills-content {
  min-height: 600px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skill-icon {
  font-size: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.skill-info {
  flex: 1;
}

.skill-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.3rem 0;
}

.skill-level {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
  margin: 0;
}

.skill-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.progress-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #667eea;
  min-width: 40px;
}

.skill-description {
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

/* 技能总结 */
.skills-summary {
  display: flex;
  justify-content: center;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  width: 100%;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-icon {
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.summary-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 500;
}

.summary-text p {
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.5;
  text-align: center;
  margin: 0;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .skills {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .skill-card,
  .summary-card {
    padding: 1.5rem;
  }
  
  .skill-tabs {
    gap: 0.5rem;
  }
  
  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .summary-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .skill-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-button {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
  
  .skill-header {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
  
  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .skill-card,
  .summary-card {
    background: rgba(45, 55, 72, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .skill-name,
  .summary-header h3 {
    color: #ffffff;
  }
  
  .skill-description,
  .summary-text p {
    color: #a8b3c5;
  }
  
  .stat-label {
    color: #b8c6db;
  }
  
  .skill-tag {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
}
</style>