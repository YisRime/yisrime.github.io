<template>
  <div class="intro-card">
    <div class="quote-left">"</div>
    <div class="intro-text">天山云水 上下一白</div>
    <div class="quote-right">"</div>
  </div>
</template>

<style scoped>
.intro-card {
  position: relative;
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  text-align: center;
}

.intro-card:hover {
  transform: translateY(-3px);
}

.quote-left {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 3rem;
  color: var(--primary-color);
  font-family: 'Times New Roman', serif;
  opacity: 0.8;
}

.quote-right {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 3rem;
  color: var(--primary-color);
  font-family: 'Times New Roman', serif;
  opacity: 0.8;
}

.intro-text {
  font-size: 1.3rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .intro-card {
    padding: 2rem 1.5rem;
  }
  
  .intro-text {
    font-size: 1.1rem;
  }
}
</style>