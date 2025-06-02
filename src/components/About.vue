<template>
  <section id="about" class="about">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">关于我</h2>
        <p class="section-subtitle">了解更多关于我的技能和经验</p>
      </div>

      <div class="about-content">
        <!-- 个人介绍卡片 -->
        <div class="intro-card">
          <div class="card-header">
            <div class="icon">👋</div>
            <h3>个人介绍</h3>
          </div>
          <div class="card-content">
            <p>
              我是一名热爱技术的全栈开发者，拥有5年以上的Web开发经验。
              专注于现代前端框架和后端技术，致力于创造高质量、用户友好的数字产品。
            </p>
            <p>
              我享受解决复杂问题的过程，喜欢学习新技术，并且相信代码的艺术性。
              在工作中，我注重代码质量、性能优化和用户体验。
            </p>
          </div>
        </div>

        <!-- 核心技能卡片 -->
        <div class="skills-overview-card">
          <div class="card-header">
            <div class="icon">⚡</div>
            <h3>核心技能</h3>
          </div>
          <div class="card-content">
            <div class="skill-categories">
              <div class="skill-category">
                <h4>前端开发</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Vue.js</span>
                  <span class="skill-tag">React</span>
                  <span class="skill-tag">TypeScript</span>
                  <span class="skill-tag">Sass/SCSS</span>
                </div>
              </div>
              <div class="skill-category">
                <h4>后端开发</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Node.js</span>
                  <span class="skill-tag">Python</span>
                  <span class="skill-tag">Express</span>
                  <span class="skill-tag">MongoDB</span>
                </div>
              </div>
              <div class="skill-category">
                <h4>工具 & 部署</h4>
                <div class="skill-tags">
                  <span class="skill-tag">Git</span>
                  <span class="skill-tag">Docker</span>
                  <span class="skill-tag">AWS</span>
                  <span class="skill-tag">Webpack</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 经验时间线卡片 -->
        <div class="experience-card">
          <div class="card-header">
            <div class="icon">🚀</div>
            <h3>工作经验</h3>
          </div>
          <div class="card-content">
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>高级前端开发工程师</h4>
                  <p class="company">科技公司 • 2022 - 至今</p>
                  <p class="description">负责大型Web应用的前端架构设计和开发，使用Vue.js和React构建高性能用户界面。</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>全栈开发工程师</h4>
                  <p class="company">互联网公司 • 2020 - 2022</p>
                  <p class="description">参与多个产品的全栈开发，从需求分析到部署上线，负责完整的开发流程。</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4>前端开发工程师</h4>
                  <p class="company">创业公司 • 2019 - 2020</p>
                  <p class="description">从零开始构建公司的前端技术栈，参与产品原型设计和用户体验优化。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 个人特质卡片 -->
        <div class="qualities-card">
          <div class="card-header">
            <div class="icon">🎯</div>
            <h3>个人特质</h3>
          </div>
          <div class="card-content">
            <div class="qualities-grid">
              <div class="quality-item">
                <div class="quality-icon">💡</div>
                <h4>创新思维</h4>
                <p>善于发现问题并提出创新解决方案</p>
              </div>
              <div class="quality-item">
                <div class="quality-icon">🤝</div>
                <h4>团队协作</h4>
                <p>具备良好的沟通能力和团队精神</p>
              </div>
              <div class="quality-item">
                <div class="quality-icon">📚</div>
                <h4>持续学习</h4>
                <p>保持对新技术的好奇心和学习热情</p>
              </div>
              <div class="quality-item">
                <div class="quality-icon">✨</div>
                <h4>细节把控</h4>
                <p>注重代码质量和用户体验细节</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
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
  margin-bottom: 4rem;
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
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

/* 通用卡片样式 */
.intro-card,
.skills-overview-card,
.experience-card,
.qualities-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  height: fit-content;
}

.intro-card:hover,
.skills-overview-card:hover,
.experience-card:hover,
.qualities-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-header .icon {
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

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.card-content p {
  line-height: 1.6;
  color: #5a6c7d;
  margin-bottom: 1rem;
}

/* 技能概览卡片 */
.skill-categories {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-category h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

/* 时间线样式 */
.timeline {
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 3rem;
}

.timeline-dot {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 6px rgba(102, 126, 234, 0.2);
}

.timeline-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.timeline-content .company {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.timeline-content .description {
  font-size: 0.9rem;
  color: #5a6c7d;
  line-height: 1.5;
}

/* 个人特质网格 */
.qualities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.quality-item {
  text-align: center;
  padding: 1rem;
}

.quality-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.quality-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.quality-item p {
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about {
    padding: 3rem 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .intro-card,
  .skills-overview-card,
  .experience-card,
  .qualities-card {
    padding: 1.5rem;
  }
  
  .qualities-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .timeline-item {
    padding-left: 2.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    gap: 0.8rem;
  }
  
  .card-header .icon {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
  }
  
  .qualities-grid {
    grid-template-columns: 1fr;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .about {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
  }
  
  .intro-card,
  .skills-overview-card,
  .experience-card,
  .qualities-card {
    background: rgba(45, 55, 72, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .section-title {
    color: #ffffff;
  }
  
  .section-subtitle {
    color: #b8c6db;
  }
  
  .card-header h3 {
    color: #ffffff;
  }
  
  .card-content p {
    color: #a8b3c5;
  }
  
  .skill-category h4,
  .timeline-content h4,
  .quality-item h4 {
    color: #ffffff;
  }
  
  .timeline-content .description,
  .quality-item p {
    color: #a8b3c5;
  }
  
  .skill-tag {
    background: rgba(102, 126, 234, 0.2);
    border-color: rgba(102, 126, 234, 0.3);
  }
}
</style>