<template>
  <div class="profile-container" :class="layoutClass">
    <!-- 主要信息区块 -->
    <section class="main-section">
      <div class="profile-header">
        <div class="avatar-container">
          <div class="avatar">
            <img src="/avatar.webp" alt="Yis_Rime" />
            <div class="status-indicator"></div>
          </div>
        </div>
        <div class="profile-info">
          <h1 class="name text-gradient">Yis_Rime</h1>
          <p class="title">全栈开发者</p>
          <div class="location">
            <i class="location-icon">📍</i>
            <span>中国 • 在线</span>
          </div>
        </div>
      </div>
      
      <div class="about-content">
        <p class="bio">
          热爱编程，专注于现代Web技术开发。
          擅长 Vue.js、React、Node.js 等技术栈，
          致力于创造优雅高效的用户体验。
        </p>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">3+</span>
            <span class="stat-label">年经验</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">50+</span>
            <span class="stat-label">项目</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">1000+</span>
            <span class="stat-label">提交</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能和联系区块 -->
    <section class="secondary-section">
      <div class="skills-section">
        <h2>技能专长</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3>前端</h3>
            <div class="skills-list">
              <div class="skill-item" v-for="skill in frontendSkills" :key="skill.name">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="skill-category">
            <h3>后端</h3>
            <div class="skills-list">
              <div class="skill-item" v-for="skill in backendSkills" :key="skill.name">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: skill.level + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-section">
        <h2>联系方式</h2>
        <div class="social-links">
          <a 
            v-for="link in socialLinks" 
            :key="link.name"
            :href="link.url" 
            target="_blank" 
            class="icon-btn"
            :title="link.name"
          >
            <i>{{ link.icon }}</i>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const frontendSkills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'CSS/SCSS', level: 88 }
])

const backendSkills = ref([
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'MongoDB', level: 75 },
  { name: 'PostgreSQL', level: 70 }
])

const socialLinks = ref([
  {
    name: 'GitHub',
    url: 'https://github.com/yisrime',
    icon: '🚀'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: '📧'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yisrime',
    icon: '🐦'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yisrime',
    icon: '💼'
  },
  {
    name: 'Blog',
    url: 'https://blog.yisrime.com',
    icon: '📝'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/yisrime',
    icon: '🎮'
  }
])

const layoutClass = ref('desktop-horizontal')

const updateLayout = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  const ratio = width / height

  if (width <= 768) {
    layoutClass.value = 'mobile-vertical'
  } else if (ratio > 1.2) {
    layoutClass.value = 'desktop-horizontal'
  } else {
    layoutClass.value = 'desktop-vertical'
  }
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
  window.addEventListener('orientationchange', () => {
    setTimeout(updateLayout, 100)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
  window.removeEventListener('orientationchange', updateLayout)
})
</script>

<style scoped>
@import '../assets/common.css';

.profile-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  gap: 2rem;
  transition: all var(--transition-normal);
}

/* 横屏布局 - 左右两栏 */
.profile-container.desktop-horizontal {
  grid-template-columns: 1fr 1fr;
  align-items: start;
}

/* 竖屏布局 - 上下两栏 */
.profile-container.desktop-vertical,
.profile-container.mobile-vertical {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
}

/* 主要信息区块 */
.main-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 120px;
  height: 120px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(145deg, var(--primary-color), var(--primary-dark));
  padding: 3px;
}

.profile-info .name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 1rem;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.about-content {
  text-align: center;
}

.bio {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--glass-bg);
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  transition: all var(--transition-normal);
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 次要信息区块 */
.secondary-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skills-section h2,
.contact-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.skill-category h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .profile-container {
    gap: 1.5rem;
  }
  
  .main-section,
  .secondary-section {
    gap: 1.5rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-info .name {
    font-size: 2rem;
  }
  
  .title {
    font-size: 1rem;
  }
  
  .stats {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .stat-item {
    padding: 0.8rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}

/* 横屏特定样式 */
@media (min-width: 769px) {
  .profile-container.desktop-horizontal .profile-header {
    flex-direction: row;
    text-align: left;
    align-items: center;
  }
  
  .profile-container.desktop-horizontal .avatar {
    width: 140px;
    height: 140px;
  }
  
  .profile-container.desktop-horizontal .about-content {
    text-align: left;
  }
  
  .profile-container.desktop-horizontal .bio {
    margin-left: 0;
    margin-right: 0;
  }
  
  .profile-container.desktop-horizontal .skills-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>