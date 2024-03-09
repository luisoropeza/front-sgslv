<template>
  <div class="d-flex">
    <NavbarPersonal :user="user" />
    <PersonalView @fetchData="fetchData" :profile="user" />
  </div>
</template>

<script setup>
import PersonalView from "@/layouts/personal/View.vue";
import NavbarPersonal from "@/components/personal/Navbar.vue";
import { useUserStore } from "@/store/user";
import { ref, onBeforeMount } from "vue";

const userStore = useUserStore();
const user = ref({});

onBeforeMount(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUser();
  user.value = userStore.user;
};
</script>

<style scoped></style>
