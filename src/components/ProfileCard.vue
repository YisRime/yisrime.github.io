<script setup>
</script>

<template>
  <div class="profile-simple">
    <div class="avatar">
      <img src="/avatar.webp" alt="头像" />
    </div>
    <h1 class="name">苡淞</h1>
  </div>
</template>

<style scoped>
.profile-simple {
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--primary-color);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.4);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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
</style>