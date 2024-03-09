<template>
  <div class="wrap-teams-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Teams</div>
      </v-card-item>
      <v-card-item class="wrap-btn-create">
        <Dialog @fetchData="fetchData" />
      </v-card-item>
      <v-card-item>
        <div
          v-if="!teams.length"
          class="d-flex justify-center text-h5 font-weight-bold"
        >
          There's no teams yet.
        </div>
        <div v-else class="d-flex">
          <ExpansionPanel :teams="teams" />
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import ExpansionPanel from "@/components/admin/ExpasionPanelTeams.vue";
import Dialog from "@/components/admin/DialogCreateTeam.vue";
import { useTeamStore } from "@/store/team";
import { ref, onMounted } from "vue";

const teamStore = useTeamStore();
const teams = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await teamStore.getAllTeams();
  teams.value = teamStore.teams;
};
</script>

<style scoped>
.wrap-teams-page {
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
