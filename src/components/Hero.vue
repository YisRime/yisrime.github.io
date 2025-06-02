<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <div class="avatar-section">
          <div class="avatar">
            <div class="avatar-image">
              <span class="avatar-text">YR</span>
            </div>
            <div class="status-indicator">
              <div class="status-dot"></div>
              <span>可接项目</span>
            </div>
          </div>
        </div>
        
        <div class="text-section">
          <h1 class="name">Yis_Rime</h1>
          <p class="title">全栈开发者</p>
          <p class="description">
            专注于现代Web开发技术，致力于创造优雅且高效的数字解决方案。
            拥有丰富的前端和后端开发经验，善于将复杂的需求转化为简洁易用的产品。
          </p>
            <div class="tech-badges">
            <span class="tech-badge">Vue.js</span>
            <span class="tech-badge">React</span>
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">TypeScript</span>
            <span class="tech-badge">Python</span>
            <span class="tech-badge">Docker</span>
            <span class="tech-badge">MongoDB</span>
            <span class="tech-badge">Git</span>
          </div>
          
          <div class="action-buttons">
            <a href="#projects" class="btn btn-primary">
              <span>查看作品</span>
              <span class="btn-icon">🚀</span>
            </a>
            <a href="#contact" class="btn btn-secondary">
              <span>联系我</span>
              <span class="btn-icon">💬</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="floating-elements">
        <div class="floating-icon icon-1">💻</div>
        <div class="floating-icon icon-2">⚡</div>
        <div class="floating-icon icon-3">🎨</div>
        <div class="floating-icon icon-4">🚀</div>
        <div class="floating-icon icon-5">📱</div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-container {
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar {
  position: relative;
}

.avatar-image {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.avatar-text {
  font-size: 2rem;
  font-weight: bold;
  color: white;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(46, 204, 113, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  font-size: 0.8rem;
  color: #27ae60;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.text-section {
  text-align: left;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #5a6c7d;
  margin-bottom: 1.5rem;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tech-badge {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.btn-secondary:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-icon {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.icon-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.icon-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.icon-3 {
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 1.5rem;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  
  .avatar-image {
    width: 100px;
    height: 100px;
  }
  
  .avatar-text {
    font-size: 1.5rem;
  }
  
  .name {
    font-size: 2rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    min-width: 120px;
    justify-content: center;
  }
  
  .floating-elements {
    display: none;
  }
}

@media (max-width: 480px) {
  .name {
    font-size: 1.8rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .tech-badges {
    justify-content: center;
  }
}

@media (prefers-color-scheme: dark) {
  .name {
    color: #ffffff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .title {
    color: #b8c6db;
  }
  
  .description {
    color: #a8b3c5;
  }
  
  .status-indicator {
    background: rgba(46, 204, 113, 0.2);
    border-color: rgba(46, 204, 113, 0.3);
    color: #2ecc71;
  }
  
  .tech-badge {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
  
  .btn-secondary {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
}
</style>