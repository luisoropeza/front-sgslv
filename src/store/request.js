import { defineStore } from "pinia";
import axios from "axios";

export const useRequestStore = defineStore("request", {
  state: () => ({
    request: null,
    requests: [],
  }),
  actions: {
    async createRequest(form) {
      const response = await axios.post(
        `http://localhost:8080/api/v1/requests`,
        {
          initDate: form.initDate,
          endDate: form.endDate,
          description: form.description,
          reason: form.reason,
          file: form.file ? form.file[0] : null,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.request = response.data;
    },
    async getRequestById(id) {
      const response = await axios.get(
        `http://localhost:8080/api/v1/request/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.request = response.data;
    },
    async getRequests() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/requests`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.requests = response.data;
      this.requests.reverse();
    },
    async approvedRequest(userId, requestId, status) {
      const response = await axios.patch(
        `http://localhost:8080/api/v1/user/${userId}/request/${requestId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.request = response.data;
    },
    async getRequestByEmployee(userId, requestId) {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${userId}/request/${requestId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.request = response.data;
    },
    async getRequestsByPersonal() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/requests`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.requests = response.data;
      this.requests.reverse();
    },
    async getRequestsByEmployee(id) {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/${id}/requests`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.requests = response.data;
      this.requests.reverse();
    },
  },
});
