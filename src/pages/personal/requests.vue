<template>
  <div class="wrap-requests-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Requests</div>
      </v-card-item>
      <v-card-item>
        <Table :height="700" :requests="requests" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import Table from "@/components/personal/TableRequests.vue";
import { useRequestStore } from "@/store/request";
import { ref, onMounted } from "vue";

const requestStore = useRequestStore();
const requests = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await requestStore.getRequestsByPersonal();
  requests.value = requestStore.requests;
};
</script>

<style scoped>
.wrap-requests-page {
  width: 100%;
  margin-top: 3rem;
}
</style>
