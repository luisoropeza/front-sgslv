<template>
  <div class="wrap-users-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Users</div>
      </v-card-item>
      <v-card-item>
        <Table :users="users" :height="650" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import Table from "@/components/personal/TableUsers.vue";
import { useUserStore } from "@/store/user";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const prop = defineProps(["profile"]);
const users = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUser();
  await userStore.getUsersByTeam(prop.profile.team.id);
  users.value = userStore.users
    .filter((user) => user.id !== prop.profile.id && user.role != "PERSONAL")
    .sort((a, b) => {
      if (a.username < b.username) return -1;
      if (a.username > b.username) return 1;
      return 0;
    });
};
</script>

<style scoped>
.wrap-users-page {
  width: 100%;
  margin-top: 3rem;
}
.wrap-btn-create {
  text-align: end;
}
@media (max-width: 480px) {
  .wrap-btn-create {
    text-align: start;
  }
}
</style>
