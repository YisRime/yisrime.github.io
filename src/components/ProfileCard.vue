<script setup>
import { profileConfig } from '@/config'
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
</style>