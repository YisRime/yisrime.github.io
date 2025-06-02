<template>
  <div class="social-links">
    <div class="section-header">
      <h2>联系方式</h2>
      <div class="header-line"></div>
    </div>
    <div class="links-grid">
      <a 
        v-for="link in socialLinks" 
        :key="link.name"
        :href="link.url" 
        target="_blank" 
        class="social-link"
        :class="link.className"
      >
        <div class="link-icon">
          <i :class="link.icon"></i>
        </div>
        <div class="link-content">
          <span class="link-name">{{ link.name }}</span>
          <span class="link-description">{{ link.description }}</span>
        </div>
        <div class="link-arrow">→</div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const socialLinks = ref([
  {
    name: 'GitHub',
    description: '查看我的代码',
    url: 'https://github.com/yisrime',
    icon: '🚀',
    className: 'github'
  },
  {
    name: 'Email',
    description: '发送邮件',
    url: 'mailto:your.email@example.com',
    icon: '📧',
    className: 'email'
  },
  {
    name: 'Twitter',
    description: '关注动态',
    url: 'https://twitter.com/yisrime',
    icon: '🐦',
    className: 'twitter'
  },
  {
    name: 'LinkedIn',
    description: '专业联系',
    url: 'https://linkedin.com/in/yisrime',
    icon: '💼',
    className: 'linkedin'
  },
  {
    name: 'Blog',
    description: '技术博客',
    url: 'https://blog.yisrime.com',
    icon: '📝',
    className: 'blog'
  },
  {
    name: 'Discord',
    description: '即时聊天',
    url: 'https://discord.gg/yisrime',
    icon: '🎮',
    className: 'discord'
  }
])
</script>

<style scoped>
.social-links {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: social;
}

.social-links:hover {
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

.links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
  color: var(--text-primary);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.social-link.github:hover {
  background: rgba(36, 41, 46, 0.3);
  border-color: #24292e;
}

.social-link.email:hover {
  background: rgba(234, 67, 53, 0.2);
  border-color: #ea4335;
}

.social-link.twitter:hover {
  background: rgba(29, 161, 242, 0.2);
  border-color: #1da1f2;
}

.social-link.linkedin:hover {
  background: rgba(10, 102, 194, 0.2);
  border-color: #0a66c2;
}

.social-link.blog:hover {
  background: rgba(255, 94, 77, 0.2);
  border-color: #ff5e4d;
}

.social-link.discord:hover {
  background: rgba(114, 137, 218, 0.2);
  border-color: #7289da;
}

.link-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  flex-shrink: 0;
}

.link-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.link-name {
  font-weight: 600;
  color: var(--text-primary);
}

.link-description {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.link-arrow {
  font-size: 1.2rem;
  color: var(--text-muted);
  transition: all var(--transition-normal);
  flex-shrink: 0;
}

.social-link:hover .link-arrow {
  transform: translateX(3px);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .social-links {
    padding: 1.5rem;
  }
  
  .links-grid {
    gap: 0.6rem;
  }
  
  .social-link {
    padding: 0.8rem;
  }
  
  .link-icon {
    width: 35px;
    height: 35px;
    font-size: 1.3rem;
  }
}

@media (min-width: 768px) {
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>