import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    users: [],
  }),
  actions: {
    async createUser(form) {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users",
        {
          username: form.username,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          birthDay: form.birthDay,
          role: form.role,
          team: form.team,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.user = response.data;
    },

    async updateUser(form) {
      const response = await axios.put(
        `http://localhost:8080/api/v1/user`,
        {
          username: form.username,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          birthDay: form.birthDay,
          profilePhoto: form.profilePhoto,
          role: form.role,
          team: form.team,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.user = response.data;
    },
    async updateUserById(id, form) {
      const response = await axios.put(
        `http://localhost:8080/api/v1/user/${id}`,
        {
          username: form.username,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          birthDay: form.birthDay,
          profilePhoto: form.profilePhoto,
          role: form.role,
          team: form.team,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.user = response.data;
    },
    async getUser() {
      const response = await axios.get(`http://localhost:8080/api/v1/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.user = response.data;
    },
    async getUserById(id) {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.user = response.data;
    },
    async getAllUsers() {
      const response = await axios.get("http://localhost:8080/api/v1/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.users = response.data;
      this.users.reverse();
    },
  },
});
