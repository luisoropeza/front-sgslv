import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    router: useRouter(),
    userStore: useUserStore(),
  }),
  actions: {
    async login(username, password) {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username.value,
        password: password.value,
      });
      localStorage.setItem("token", response.data.token);
      await this.userStore.getUser();
      localStorage.setItem("role", this.userStore.user.role);
      if (this.userStore.user.role === "ADMIN") {
        this.router.push("/admin");
      } else {
        this.router.push("/user");
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.router.push("/login");
    },
  },
});
