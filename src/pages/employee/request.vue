<template>
  <div class="wrap-request-page d-flex justify-center">
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
            <v-card-item v-if="request.user?.profilePhoto">
              <v-img
                :src="request.user?.profilePhoto"
                width="150"
                class="wrap-user-request-img rounded-circle"
              ></v-img>
            </v-card-item>
          </v-col>
          <v-col cols="auto" alignSelf="center">
            <v-card-item class="text-h3 font-weight-regular">
              <strong>User: </strong>
              {{ request.user?.firstName }}
              {{ request.user?.lastName }}
            </v-card-item>
            <v-card-item class="text-h4 font-weight-regular">
              <strong>Team:</strong>
              {{ request.user?.team?.name }}
            </v-card-item>
          </v-col>
        </v-row>
        <v-card-item>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-btn
                color="blue-accent-3"
                text="Show Calendar"
                @click="show = !show"
                variant="outlined"
                size="small"
              ></v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                :disabled="request.status !== 'Pending'"
                color="blue-accent-3"
                text="Update Request"
                @click="show = !show"
                variant="outlined"
                size="small"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider class="my-2"></v-divider>
        <v-card-item class="text-h5 font-weight-medium mb-5">
          Information Request
        </v-card-item>
        <v-row v-if="!show" noGutters>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Init Date: </strong>
              {{ format(request.initDate, "short") }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>End Date: </strong>
              {{ format(request.endDate, "short") }}
            </v-card-item> </v-col
          ><v-col cols="12" sm="6">
            <v-card-item>
              <strong>Reason: </strong>
              {{ request.reason }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Status: </strong>
              <span
                class="px-2 rounded-xl"
                :class="
                  request.status === 'Pending'
                    ? 'wrap-span-reason-pending'
                    : request.status === 'Rejected'
                    ? 'wrap-span-reason-rejected'
                    : 'wrap-span-reason-approved'
                "
              >
                {{ request.status }}
              </span>
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Document: </strong>
              <a
                v-if="request.document?.url"
                :href="request.document?.url"
                target="_blank"
                class="text-decoration-none font-weight-regular px-2 rounded-xl"
              >
                {{ request.document?.name }}
              </a>
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Created At: </strong>
              {{ format(request.createdAt, "short") }}
            </v-card-item>
          </v-col>
          <v-col cols="12">
            <v-card-item>
              <strong>Description: </strong>
              {{ request.description ? request.description : "N/A" }}
            </v-card-item>
          </v-col>
        </v-row>
        <Calendar v-if="show" :attributes="attributes" expanded :rows="2" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { useRequestStore } from "@/store/request";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { format } from "@formkit/tempo";

const router = useRouter();
const requestStore = useRequestStore();
const id = ref(router.currentRoute.value.params.id);
const request = ref({});
const show = ref(false);
const attributes = ref([]);

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await requestStore.getRequestById(id.value);
  request.value = requestStore.request;
  attributes.value = [
    {
      highlight:
        request.value.status === "Pending"
          ? "yellow"
          : request.value.status === "Approved"
          ? "green"
          : "red",
      popover: {
        label:
          request.value.user?.firstName +
          " " +
          request.value.user?.lastName +
          " " +
          request.value.reason,
      },
      dates: [[request.value.initDate, request.value.endDate]],
    },
  ];
};
</script>

<style scoped>
.wrap-request-page {
  width: 100%;
  margin-top: 3rem;
}
.wrap-user-request-img {
  border: 1px solid #616161;
}
.wrap-btn-back {
  position: absolute;
}
.wrap-span-reason-pending {
  background-color: #fff59d;
  color: #f9a825;
}
.wrap-span-reason-rejected {
  background-color: #ef9a9a;
  color: #c62828;
}
.wrap-span-reason-approved {
  background-color: #a5d6a7;
  color: #2e7d32;
}
a {
  color: #0277bd; /* Cambia el color del enlace */
  background-color: #e0e0e0; /* Añade un fondo al enlace */
}
.wrap-btn-action {
  text-align: end;
}
@media (max-width: 480px) {
  .wrap-btn-action {
    text-align: start;
  }
}
</style>
