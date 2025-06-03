<script setup>
</script>

<template>
  <div class="profile-simple">
    <h1 class="name">苡淞</h1>
  </div>
</template>

<style scoped>
.profile-simple {
  text-align: center;
}

.name {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .name {
    font-size: 2.5rem;
  }
}

.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.avatar:hover {
  transform: scale(1.05);
  border-color: var(--primary-color);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.profile-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.profile-info p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}
</style>