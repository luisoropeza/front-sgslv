<template>
  <v-expansion-panels class="ma-1" multiple>
    <v-expansion-panel class="wrap-panel" v-for="team in teams" :key="team.id">
      <v-expansion-panel-title class="d-flex flex-column align-start">
        <div class="text-h6 font-weight-bold mb-5">{{ team.name }}</div>
        <div>
          {{ team.description ? team.description : "N/A" }}
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <TableTeamU :team="team" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import TableTeamU from "@/components/admin/TableTeamU.vue";
const prop = defineProps(["teams"]);
</script>

<style scoped>
.wrap-panel {
  border-radius: 10px;
}
</style>
