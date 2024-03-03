<template>
  <div class="wrap-users-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Users</div>
      </v-card-item>
      <v-card-item class="wrap-btn-create">
        <DialogCU @fetchData="fetchData" />
      </v-card-item>
      <v-card-item>
        <TableU :users="users" :height="650" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import DialogCU from "@/components/admin/DialogCU.vue";
import TableU from "@/components/admin/TableU.vue";
import { useUserStore } from "@/store/user";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const users = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getAllUsers();
  users.value = userStore.users;
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
