<template>
  <div class="profile-card-container">
    <ProfileHeader />
    <AboutSection />
    <SkillsSection />
    <MusicPlayer />
    <SocialLinks />
    <ContactForm />
  </div>
</template>

<script setup>
import ProfileHeader from './ProfileHeader.vue'
import AboutSection from './AboutSection.vue'
import SkillsSection from './SkillsSection.vue'
import MusicPlayer from './MusicPlayer.vue'
import SocialLinks from './SocialLinks.vue'
import ContactForm from './ContactForm.vue'
</script>

<style scoped>
.profile-card-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 420px;
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .profile-card-container {
    max-width: 900px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 
      "header header"
      "about skills"
      "music music"
      "social contact";
  }
}

@media (min-width: 1200px) {
  .profile-card-container {
    max-width: 1200px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 
      "header header skills"
      "about music music"
      "social contact contact";
  }
}
</style>