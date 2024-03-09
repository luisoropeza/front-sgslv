<template>
  <div class="d-flex">
    <NavbarEmployee :user="user" />
    <EmployeeView @fetchData="fetchData" :profile="user" />
  </div>
</template>

<script setup>
import EmployeeView from "@/layouts/employee/View.vue";
import NavbarEmployee from "@/components/employee/Navbar.vue";
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
