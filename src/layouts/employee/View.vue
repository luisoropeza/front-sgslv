<template>
  <router-view @fetchData="emit('fetchData')" :user="user" />
</template>

<script setup>
const prop = defineProps(["user"]);
const emit = defineEmits(["fetchData"]);
</script>

<style scoped></style>
