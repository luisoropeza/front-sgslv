<template>
  <div class="wrap-requests-page d-flex justify-center">
    <v-card elevation="0" width="800" min-width="300">
      <v-card-item>
        <div class="text-h4 font-weight-bold">Your Requests</div>
      </v-card-item>
      <v-card-item class="wrap-btn-create">
        <DialogCR @fetchData="fetchData" />
      </v-card-item>
      <v-card-item>
        <TableR :requests="requests" :height="700" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import DialogCR from "@/components/user/DialogCR.vue";
import TableR from "@/components/user/TableR.vue";
import { useUserStore } from "@/store/user";
import { useRequestStore } from "@/store/request";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const requestStore = useRequestStore();
const user = ref({});
const requests = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await requestStore.getAllRequests();
  user.value = userStore.user;
  requests.value = requestStore.requests.filter(
    (request) => request.user.id === user.value.id
  );
};
</script>

<style scoped>
.wrap-requests-page {
  width: 100%;
  margin-top: 2.5rem;
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
