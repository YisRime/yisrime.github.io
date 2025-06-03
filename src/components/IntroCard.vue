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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  overflow: hidden;
}

.intro-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.4), 
    transparent);
  opacity: 0.8;
}

.intro-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(99, 102, 241, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-color: rgba(99, 102, 241, 0.4);
}

.quote-left {
  position: absolute;
  top: 12px;
  left: 18px;
  font-size: 2.8rem;
  color: var(--primary-color);
  font-family: 'Georgia', serif;
  opacity: 0.7;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
  transition: all 0.3s ease;
}

.quote-right {
  position: absolute;
  bottom: 12px;
  right: 18px;
  font-size: 2.8rem;
  color: var(--primary-color);
  font-family: 'Georgia', serif;
  opacity: 0.7;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
  transition: all 0.3s ease;
}

.intro-card:hover .quote-left,
.intro-card:hover .quote-right {
  opacity: 1;
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.5));
}

.intro-text {
  font-size: 1.35rem;
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.6;
  letter-spacing: 1.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .intro-card {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
  
  .intro-text {
    font-size: 1.15rem;
    letter-spacing: 1px;
  }
  
  .quote-left,
  .quote-right {
    font-size: 2.2rem;
  }
}
</style>