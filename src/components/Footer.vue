<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-brand">Yis_Rime</h3>
          <p class="footer-description">
            全栈开发者，专注于创建现代化的Web应用程序。
            让我们一起构建更好的数字世界。
          </p>
          <div class="social-links">
            <a href="https://github.com/yisrime" target="_blank" class="social-link" title="GitHub">
              📂
            </a>
            <a href="#" target="_blank" class="social-link" title="LinkedIn">
              💼
            </a>
            <a href="#" target="_blank" class="social-link" title="Twitter">
              🐦
            </a>
            <a href="#" target="_blank" class="social-link" title="Blog">
              📝
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>快速链接</h4>
          <ul class="footer-links">
            <li><a href="#home">首页</a></li>
            <li><a href="#about">关于我</a></li>
            <li><a href="#skills">技能</a></li>
            <li><a href="#projects">项目</a></li>
            <li><a href="#contact">联系我</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>服务</h4>
          <ul class="footer-links">
            <li><a href="#">前端开发</a></li>
            <li><a href="#">后端开发</a></li>
            <li><a href="#">全栈开发</a></li>
            <li><a href="#">UI/UX设计</a></li>
            <li><a href="#">技术咨询</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>联系信息</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <a href="mailto:yisrime@example.com">yisrime@example.com</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>中国</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">💬</span>
              <span>随时欢迎交流</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; {{ currentYear }} Yis_Rime. 版权所有。</p>
          <div class="footer-bottom-links">
            <a href="#">隐私政策</a>
            <a href="#">使用条款</a>
            <a href="#">网站地图</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 返回顶部按钮 -->
    <button 
      v-if="showBackToTop" 
      @click="scrollToTop" 
      class="back-to-top"
      title="返回顶部"
    >
      ↑
    </button>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

const currentYear = computed(() => {
  return new Date().getFullYear()
})

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  padding: 4rem 0;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1.5rem;
  color: white;
}

.footer-brand {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #bdc3c7;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(52, 152, 219, 0.8);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
}

.footer-links a:hover {
  color: #3498db;
}

.footer-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.footer-links a:hover::after {
  width: 100%;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #bdc3c7;
}

.contact-icon {
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
}

.contact-item a {
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #3498db;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom-content p {
  color: #bdc3c7;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-links a {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: #3498db;
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  opacity: 0.9;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  opacity: 1;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .contact-info {
    align-items: center;
  }

  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .footer-bottom-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .footer {
    background: #0f1419;
  }

  .footer-description,
  .footer-links a,
  .contact-item,
  .contact-item a,
  .footer-bottom-content p,
  .footer-bottom-links a {
    color: #8892b0;
  }

  .footer-links a:hover,
  .contact-item a:hover,
  .footer-bottom-links a:hover {
    color: #64ffda;
  }

  .social-link:hover {
    background: rgba(100, 255, 218, 0.2);
  }

  .footer-links a::after {
    background-color: #64ffda;
  }
}

/* 滚动行为优化 */
@media (prefers-reduced-motion: reduce) {
  .back-to-top,
  .social-link,
  .footer-links a {
    transition: none;
  }
}
</style>