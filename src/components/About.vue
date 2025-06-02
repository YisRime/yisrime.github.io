<template>
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">关于我</h2>
        <p class="section-subtitle">了解更多关于我的背景和经历</p>
      </div>
      
      <div class="about-content">
        <div class="about-text">
          <div class="intro">
            <h3>你好！我是Yis_Rime</h3>
            <p>
              我是一名充满热情的全栈开发者，专注于创建现代化的Web应用程序。
              我热爱编程，享受将创意转化为功能性产品的过程。
            </p>
          </div>
          
          <div class="details">
            <div class="detail-item">
              <h4>🎓 教育背景</h4>
              <p>计算机科学相关专业，持续学习新技术</p>
            </div>
            
            <div class="detail-item">
              <h4>💼 工作经验</h4>
              <p>具有多年Web开发经验，参与过多个项目的开发</p>
            </div>
            
            <div class="detail-item">
              <h4>🚀 兴趣爱好</h4>
              <p>热爱编程、开源贡献、技术分享和持续学习</p>
            </div>
          </div>
          
          <div class="stats">
            <div class="stat-item">
              <div class="stat-number">3+</div>
              <div class="stat-label">年经验</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">20+</div>
              <div class="stat-label">完成项目</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">客户满意度</div>
            </div>
          </div>
        </div>
        
        <div class="about-visual">
          <div class="image-container">
            <div class="profile-image">
              <div class="image-placeholder">
                <span>Yis_Rime</span>
              </div>
              <div class="image-decoration"></div>
            </div>
          </div>
          
          <div class="floating-badges">
            <div class="badge badge-1">
              <span class="badge-icon">⚡</span>
              <span class="badge-text">Fast</span>
            </div>
            <div class="badge badge-2">
              <span class="badge-icon">🎨</span>
              <span class="badge-text">Creative</span>
            </div>
            <div class="badge badge-3">
              <span class="badge-icon">🔧</span>
              <span class="badge-text">Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 6rem 0;
  background: #f8f9fa;
  position: relative;
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

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.intro h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 2rem;
}

.details {
  margin: 2rem 0;
}

.detail-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.detail-item:hover {
  transform: translateY(-3px);
}

.detail-item h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.detail-item p {
  color: #666;
  line-height: 1.6;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.about-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
}

.profile-image {
  position: relative;
  z-index: 2;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 20px 40px rgba(52, 152, 219, 0.3);
}

.image-decoration {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #e74c3c, #f39c12);
  border-radius: 50%;
  z-index: 1;
  opacity: 0.8;
}

.floating-badges {
  position: absolute;
  width: 100%;
  height: 100%;
}

.badge {
  position: absolute;
  background: white;
  padding: 0.8rem 1rem;
  border-radius: 50px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: float 3s ease-in-out infinite;
}

.badge-1 {
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.badge-2 {
  top: 50%;
  right: -15%;
  animation-delay: 1s;
}

.badge-3 {
  bottom: 10%;
  left: 0%;
  animation-delay: 2s;
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-weight: 600;
  color: #2c3e50;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .stats {
    flex-direction: column;
    gap: 1rem;
  }

  .image-placeholder {
    width: 250px;
    height: 250px;
  }

  .floating-badges {
    display: none;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (prefers-color-scheme: dark) {
  .about {
    background: #1a1a1a;
  }

  .section-title {
    color: #ffffff;
  }

  .section-subtitle,
  .intro p,
  .detail-item p {
    color: #cccccc;
  }

  .intro h3 {
    color: #ffffff;
  }

  .detail-item,
  .stat-item,
  .badge {
    background: #2a2a2a;
    border: 1px solid #333;
  }

  .detail-item h4 {
    color: #ffffff;
  }

  .stat-label {
    color: #999;
  }

  .badge-text {
    color: #ffffff;
  }
}
</style>