<template>
  <div class="about-section">
    <div class="section-header">
      <h2>关于我</h2>
      <div class="header-line"></div>
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
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: about;
}

.about-section:hover {
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

.bio {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
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

@media (max-width: 768px) {
  .about-section {
    padding: 1.5rem;
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
</style>