<template>
  <div
    class="wrap-dashboard-page d-flex flex-column justify-center align-center"
  >
    <div class="text-h3"><strong>Welcome</strong></div>
    <div>
      <v-img
        width="500"
        class="wrap-dashboard-img"
        src="@/assets/astronauta4.png"
      ></v-img>
    </div>
    <div class="text-h4">
      <strong>{{ profile.firstName }} {{ profile.lastName }}</strong>
    </div>
    <p class="mt-5">
      Welcome to the license and vacation request management system. We hope you
      have a productive day!
    </p>
  </div>
</template>

<script setup>
const prop = defineProps(["profile"]);
</script>

<style scoped>
.wrap-dashboard-page {
  min-block-size: calc(var(--vh, 1vh) * 100);
  width: 100%;
  min-width: 300px;
}
.wrap-dashboard-img {
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>
