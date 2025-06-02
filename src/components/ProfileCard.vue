<template>
  <div class="profile-card">
    <div class="avatar-section">
      <div class="avatar">
        <img src="/avatar.jpg" alt="Yis_Rime" />
      </div>
      <div class="name-title">
        <h1>Yis_Rime</h1>
        <p class="title">全栈开发者</p>
      </div>
    </div>
    
    <div class="bio-section">
      <p class="bio">
        热爱编程，专注于现代Web技术开发。<br>
        擅长 Vue.js、React、Node.js 等技术栈，<br>
        致力于创造优雅高效的用户体验。
      </p>
    </div>
    
    <div class="social-section">
      <h3>联系方式</h3>
      <div class="social-links">
        <a href="https://github.com/yisrime" target="_blank" class="social-link">
          <i class="icon-github"></i>
          <span>GitHub</span>
        </a>
        <a href="mailto:your.email@example.com" class="social-link">
          <i class="icon-email"></i>
          <span>Email</span>
        </a>
        <a href="https://twitter.com/yisrime" target="_blank" class="social-link">
          <i class="icon-twitter"></i>
          <span>Twitter</span>
        </a>
        <a href="https://linkedin.com/in/yisrime" target="_blank" class="social-link">
          <i class="icon-linkedin"></i>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  color: white;
  transition: all 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.avatar-section {
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name-title h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
}

.bio-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bio {
  font-size: 1rem;
  line-height: 1.8;
  opacity: 0.9;
}

.social-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.social-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.social-link i {
  font-size: 1.2rem;
}

.social-link span {
  font-size: 0.9rem;
  font-weight: 500;
}

/* 图标样式 */
.icon-github::before { content: "📱"; }
.icon-email::before { content: "✉️"; }
.icon-twitter::before { content: "🐦"; }
.icon-linkedin::before { content: "💼"; }

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-card {
    padding: 2rem;
    max-width: 350px;
    margin: 1rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .name-title h1 {
    font-size: 2rem;
  }
  
  .bio {
    font-size: 0.9rem;
  }
  
  .social-links {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 1.5rem;
    max-width: 300px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .name-title h1 {
    font-size: 1.8rem;
  }
}
</style>