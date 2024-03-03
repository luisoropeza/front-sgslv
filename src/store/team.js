import { defineStore } from "pinia";
import axios from "axios";

export const useTeamStore = defineStore("team", {
  state: () => ({
    team: null,
    teams: [],
  }),
  actions: {
    async createTeam(form) {
      const response = await axios.post(
        "http://localhost:8080/api/v1/teams",
        {
          name: form.name,
          description: form.description,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      this.team = response.data;
    },
    async getAllTeams() {
      const response = await axios.get("http://localhost:8080/api/v1/teams", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      this.teams = response.data;
    },
  },
});
