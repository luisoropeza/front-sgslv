<template>
  <div class="d-flex">
    <NavBarAdmi :user="user" />
    <AdminView @fetchData="fetchData" :profile="user" />
  </div>
</template>

<script setup>
import AdminView from "@/layouts/admin/View.vue";
import NavBarAdmi from "@/components/admin/NavBar.vue";
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
