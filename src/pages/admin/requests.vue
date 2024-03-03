<template>
  <div class="wrap-requests-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Requests</div>
      </v-card-item>
      <v-card-item>
        <TableR :height="700" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import TableR from "@/components/admin/TableR.vue";
</script>

<style scoped>
.wrap-requests-page {
  width: 100%;
  margin-top: 3rem;
}
</style>
