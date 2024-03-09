<template>
  <v-table class="wrap-table-u">
    <thead>
      <tr>
        <th>User</th>
        <th>Full Name</th>
        <th>Role</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!users.length">
        <td colspan="4" class="no-users">There's no user in the team yet.</td>
      </tr>
      <tr v-else v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.role }}</td>
        <td class="text-center">
          <v-btn
            color="blue-accent-3"
            size="x-small"
            :to="{ name: 'admin-user', params: { id: user.id } }"
          >
            <v-icon icon="mdi-eye" size="20" />
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const prop = defineProps(["team"]);
const users = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUsersByTeam(prop.team.id);
  users.value = userStore.users;
};
</script>

<style scoped>
.wrap-table-u {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.no-users {
  text-align: center;
  color: gray;
  font-style: italic;
}
</style>
