<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-container">
        <div class="nav-brand">
          <h2>Yis_Rime</h2>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-active': isMenuOpen }">
          <a href="#home" class="nav-link" @click="closeMenu">首页</a>
          <a href="#about" class="nav-link" @click="closeMenu">关于</a>
          <a href="#skills" class="nav-link" @click="closeMenu">技能</a>
          <a href="#projects" class="nav-link" @click="closeMenu">项目</a>
          <a href="#contact" class="nav-link" @click="closeMenu">联系</a>
        </div>
        
        <div class="nav-toggle" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-brand h2 {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #3498db;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: #2c3e50;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: white;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 1rem;
  }

  .nav-menu-active {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }
}

@media (prefers-color-scheme: dark) {
  .header {
    background: rgba(24, 24, 24, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-brand h2,
  .nav-link,
  .bar {
    color: #ffffff;
    background-color: #ffffff;
  }

  .nav-menu {
    background-color: #181818;
  }
}
</style>