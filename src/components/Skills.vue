<template>
  <section id="skills" class="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">技能专长</h2>
        <p class="section-subtitle">这些是我熟练掌握的技术栈和工具</p>
      </div>
      
      <div class="skills-content">
        <div class="skills-categories">
          <div class="category">
            <h3 class="category-title">前端开发</h3>
            <div class="skills-grid">
              <div class="skill-item" v-for="skill in frontendSkills" :key="skill.name">
                <div class="skill-icon">{{ skill.icon }}</div>
                <div class="skill-info">
                  <h4>{{ skill.name }}</h4>
                  <div class="skill-bar">
                    <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="category">
            <h3 class="category-title">后端开发</h3>
            <div class="skills-grid">
              <div class="skill-item" v-for="skill in backendSkills" :key="skill.name">
                <div class="skill-icon">{{ skill.icon }}</div>
                <div class="skill-info">
                  <h4>{{ skill.name }}</h4>
                  <div class="skill-bar">
                    <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="category">
            <h3 class="category-title">工具 & 其他</h3>
            <div class="skills-grid">
              <div class="skill-item" v-for="skill in toolsSkills" :key="skill.name">
                <div class="skill-icon">{{ skill.icon }}</div>
                <div class="skill-info">
                  <h4>{{ skill.name }}</h4>
                  <div class="skill-bar">
                    <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="skills-summary">
          <div class="summary-card">
            <h3>核心优势</h3>
            <ul>
              <li>🚀 快速学习新技术的能力</li>
              <li>💡 创新思维和问题解决能力</li>
              <li>🤝 良好的团队协作精神</li>
              <li>📱 响应式设计和移动优先开发</li>
              <li>🔧 代码质量和性能优化</li>
            </ul>
          </div>
          
          <div class="experience-timeline">
            <h3>学习历程</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2021</h4>
                  <p>开始学习前端开发</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2022</h4>
                  <p>掌握Vue.js和React</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2023</h4>
                  <p>深入后端开发</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>2024</h4>
                  <p>全栈开发专家</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const frontendSkills = ref([
  { name: 'HTML/CSS', icon: '🌐', level: 95 },
  { name: 'JavaScript', icon: '⚡', level: 90 },
  { name: 'Vue.js', icon: '💚', level: 88 },
  { name: 'React', icon: '⚛️', level: 85 },
  { name: 'TypeScript', icon: '📘', level: 80 },
  { name: 'Sass/SCSS', icon: '🎨', level: 85 }
])

const backendSkills = ref([
  { name: 'Node.js', icon: '🟢', level: 82 },
  { name: 'Python', icon: '🐍', level: 78 },
  { name: 'Express.js', icon: '🚀', level: 80 },
  { name: 'MongoDB', icon: '🍃', level: 75 },
  { name: 'MySQL', icon: '🐬', level: 70 },
  { name: 'REST API', icon: '🔌', level: 85 }
])

const toolsSkills = ref([
  { name: 'Git', icon: '📝', level: 88 },
  { name: 'Docker', icon: '🐳', level: 70 },
  { name: 'Webpack', icon: '📦', level: 75 },
  { name: 'Vite', icon: '⚡', level: 85 },
  { name: 'Figma', icon: '🎨', level: 72 },
  { name: 'VS Code', icon: '💻', level: 95 }
])
</script>

<style scoped>
.skills {
  padding: 6rem 0;
  background: white;
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

.skills-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #e9ecef;
}

.category-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.skill-item {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.skill-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 10px;
  color: white;
}

.skill-info {
  flex: 1;
}

.skill-info h4 {
  font-size: 1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.skill-percentage {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 600;
}

.skills-summary {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary-card,
.experience-timeline {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #e9ecef;
}

.summary-card h3,
.experience-timeline h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.summary-card ul {
  list-style: none;
  padding: 0;
}

.summary-card li {
  margin-bottom: 0.8rem;
  color: #555;
  line-height: 1.5;
}

.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -8px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #3498db;
  border-radius: 50%;
}

.timeline-content h4 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.timeline-content p {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .skills-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skill-item {
    flex-direction: column;
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (prefers-color-scheme: dark) {
  .skills {
    background: #1a1a1a;
  }

  .section-title {
    color: #ffffff;
  }

  .section-subtitle {
    color: #cccccc;
  }

  .category,
  .summary-card,
  .experience-timeline {
    background: #2a2a2a;
    border: 1px solid #333;
  }

  .category-title,
  .summary-card h3,
  .experience-timeline h3 {
    color: #ffffff;
  }

  .skill-item {
    background: #333;
  }

  .skill-info h4 {
    color: #ffffff;
  }

  .skill-bar {
    background: #444;
  }

  .summary-card li,
  .timeline-content p {
    color: #cccccc;
  }

  .timeline-content h4 {
    color: #ffffff;
  }

  .timeline-dot {
    background: #2a2a2a;
  }
}
</style>