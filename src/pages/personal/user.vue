<template>
  <div class="wrap-user-page d-flex justify-center">
    <v-card width="800" min-width="300">
      <v-btn
        elevation="0"
        icon="mdi-arrow-left"
        class="wrap-btn-back"
        size="x-large"
        @click="router.back()"
      ></v-btn>
      <v-card-item class="mx-5 my-2">
        <v-row>
          <v-col cols="auto">
            <v-card-item v-if="user.profilePhoto">
              <v-img
                :src="user.profilePhoto"
                width="150"
                class="wrap-user-img rounded-circle"
              ></v-img>
            </v-card-item>
          </v-col>
          <v-col cols="auto" alignSelf="center">
            <v-card-item class="text-h3 font-weight-bold">
              {{ user.firstName }} {{ user.lastName }}
            </v-card-item>
            <v-card-item class="text-h4 font-weight-medium">
              {{ user.username }}
            </v-card-item>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-card-item class="text-h5 font-weight-medium mb-5">
          Information User
        </v-card-item>
        <v-row noGutters>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Role: </strong>
              {{ user.role ? user.role : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Team: </strong>
              {{ user.team ? user.team.name : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Email: </strong>
              {{ user.email ? user.email : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Phone: </strong>
              {{ user.phone ? user.phone : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Birth day: </strong>
              {{ user.birthDay ? format(user.birthDay, "short") : "N/A" }}
            </v-card-item>
          </v-col>
        </v-row>
        <v-divider
          class="my-2"
          v-if="user.role && user.role === 'EMPLOYEE'"
        ></v-divider>
        <v-card-item
          class="text-h5 font-weight-medium"
          v-if="user.role && user.role === 'EMPLOYEE'"
        >
          Requests
          <Table :height="275" :requests="requests" />
        </v-card-item>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import Table from "@/components/personal/TableRequestsByUser.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useRequestStore } from "@/store/request";
import { ref, onMounted } from "vue";
import { format } from "@formkit/tempo";

const router = useRouter();
const userStore = useUserStore();
const requestStore = useRequestStore();
const id = ref(router.currentRoute.value.params.id);
const user = ref({});
const requests = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUserById(id.value);
  user.value = userStore.user;
  await requestStore.getRequestsByEmployee(id.value);
  requests.value = requestStore.requests;
};
</script>

<style scoped>
.wrap-user-page {
  width: 100%;
  margin-top: 3rem;
}
.wrap-user-img {
  border: 1px solid #616161;
}
.wrap-btn-back {
  position: absolute;
}
.wrap-btn-update {
  text-align: end;
}
@media (max-width: 480px) {
  .wrap-btn-update {
    text-align: start;
  }
}
</style>
