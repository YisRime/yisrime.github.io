<template>
  <div class="skills-section">
    <div class="section-header">
      <h2>技能</h2>
      <div class="header-line"></div>
    </div>
    <div class="skills-content">
      <div class="skill-category">
        <h3>前端</h3>
        <div class="skills-list">
          <div class="skill-item" v-for="skill in frontendSkills" :key="skill.name">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-progress">
              <div class="progress-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h3>后端</h3>
        <div class="skills-list">
          <div class="skill-item" v-for="skill in backendSkills" :key="skill.name">
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-progress">
              <div class="progress-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
.skills-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: skills;
}

.skills-section:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  background: rgba(255, 255, 255, 0.08);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.header-line {
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 2px;
}

.skill-category {
  margin-bottom: 2rem;
}

.skill-category:last-child {
  margin-bottom: 0;
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

.skill-progress {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
  border-radius: 3px;
  transition: width 1s ease-out;
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 1.5rem;
  }
  
  .skill-category {
    margin-bottom: 1.5rem;
  }
}
</style>