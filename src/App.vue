<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <div class="container">
        <div class="cards-grid">
          <div class="card hero-card">
            <Hero />
          </div>
          <div class="card about-card">
            <About />
          </div>
          <div class="card skills-card">
            <Skills />
          </div>
          <div class="card projects-card">
            <Projects />
          </div>
          <div class="card contact-card">
            <Contact />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  margin-top: 80px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  grid-template-areas: 
    "hero hero hero hero hero hero hero hero hero hero hero hero"
    "about about about about about about skills skills skills skills skills skills"
    "projects projects projects projects projects projects projects projects projects projects projects projects"
    "contact contact contact contact contact contact contact contact contact contact contact contact";
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.hero-card {
  grid-area: hero;
  min-height: 60vh;
}

.about-card {
  grid-area: about;
  min-height: 500px;
}

.skills-card {
  grid-area: skills;
  min-height: 500px;
}

.projects-card {
  grid-area: projects;
  min-height: 600px;
}

.contact-card {
  grid-area: contact;
  min-height: 400px;
}

@media (max-width: 1200px) {
  .cards-grid {
    grid-template-areas: 
      "hero hero hero hero hero hero hero hero hero hero hero hero"
      "about about about about about about about about about about about about"
      "skills skills skills skills skills skills skills skills skills skills skills skills"
      "projects projects projects projects projects projects projects projects projects projects projects projects"
      "contact contact contact contact contact contact contact contact contact contact contact contact";
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    grid-template-areas: 
      "hero"
      "about"
      "skills"
      "projects"
      "contact";
  }
  
  .card {
    border-radius: 16px;
    min-height: auto !important;
  }
  
  .hero-card {
    min-height: 50vh;
  }
}

@media (prefers-color-scheme: dark) {
  #app {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
  
  .card {
    background: rgba(42, 42, 42, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
