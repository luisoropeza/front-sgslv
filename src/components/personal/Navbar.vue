<template>
  <v-btn
    class="wrap-btn-menu"
    elevation="0"
    icon="mdi-menu"
    @click.stop="drawer = !drawer"
  ></v-btn>
  <v-navigation-drawer color="red-darken-3" width="250" v-model="drawer">
    <v-list :class="loading ? 'my-0' : 'my-2'">
      <v-skeleton-loader
        v-if="loading"
        type="list-item-avatar-two-line"
        color="red-darken-3"
      >
      </v-skeleton-loader>
      <v-list-item
        v-else
        :prepend-avatar="user.profilePhoto"
        :title="user.firstName + ' ' + user.lastName"
        :subtitle="user.username"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <template v-if="loading">
        <v-skeleton-loader
          v-for="index in items"
          :key="index"
          type="list-item"
          color="red-darken-3"
        ></v-skeleton-loader>
      </template>
      <template v-else>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="`/personal/${item.value}`"
        ></v-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          :active="false"
          @click="logout"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { ref, onMounted } from "vue";

const authStore = useAuthStore();
const prop = defineProps(["user"]);
const drawer = ref(null);
const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 200);
});
const logout = () => {
  authStore.logout();
};
const items = [
  { icon: "mdi-home", title: "Home", value: "home" },
  { icon: "mdi-archive", title: "Requests", value: "requests" },
  { icon: "mdi-account-group", title: "Users", value: "users" },
  { icon: "mdi-account", title: "Profile", value: "profile" },
];
</script>

<style scoped>
.wrap-btn-menu {
  position: absolute;
}
@media (width > 1280px) {
  .wrap-btn-menu {
    display: none;
  }
}
</style>
