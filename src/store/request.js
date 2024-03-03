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
          file: form.file[0],
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
    async getRequestByUser(userId, requestId) {
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
    async getAllRequests() {
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
  },
});
