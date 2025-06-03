<template>
  <div class="profile-header">
    <div class="avatar-container">
      <div class="avatar">
        <img src="/avatar.jpg" alt="Yis_Rime" />
        <div class="status-indicator"></div>
      </div>
    </div>
    <div class="profile-info">
      <h1 class="name">Yis_Rime</h1>
      <p class="title">全栈开发者</p>
      <div class="location">
        <i class="location-icon">📍</i>
        <span>中国 • 在线</span>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.profile-header {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: var(--text-primary);
  transition: all var(--transition-normal);
  grid-area: header;
}

.profile-header:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
  background: rgba(255, 255, 255, 0.08);
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all var(--transition-normal);
  background: linear-gradient(145deg, var(--primary-color), var(--primary-dark));
  padding: 3px;
}

.avatar:hover {
  transform: scale(1.05);
  border-color: var(--primary-color);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #10b981;
  border-radius: 50%;
  border: 3px solid var(--bg-primary);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.profile-info h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title {
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 1rem;
}

.location {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.location-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .profile-header {
    padding: 1.5rem;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
  }
  
  .profile-info h1 {
    font-size: 2rem;
  }
  
  .title {
    font-size: 1rem;
  }
}

/* 横屏特殊优化 */
@media (min-width: 769px) and (orientation: landscape) {
  .profile-header {
    text-align: left;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  
  .avatar-container {
    margin-bottom: 0;
  }
  
  .profile-info {
    flex: 1;
  }
}

/* 竖屏保持居中 */
@media (min-width: 769px) and (orientation: portrait) {
  .profile-header {
    text-align: center;
  }
  
  .avatar {
    width: 140px;
    height: 140px;
  }
  
  .profile-info h1 {
    font-size: 2.8rem;
  }
}
</style>