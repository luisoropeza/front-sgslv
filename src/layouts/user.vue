<template>
  <div class="d-flex">
    <NavbarUser :user="user" />
    <UserView @fetchData="fetchData" :profile="user" />
  </div>
</template>

<script setup>
import UserView from "@/layouts/user/View.vue";
import NavbarUser from "@/components/user/Navbar.vue";
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
