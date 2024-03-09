<template>
  <div class="wrap-profile-page d-flex justify-center">
    <v-card width="800" min-width="300">
      <v-card-item class="mx-5 my-2">
        <v-row>
          <v-col cols="auto">
            <v-card-item v-if="profile.profilePhoto">
              <v-img
                :src="profile.profilePhoto"
                width="150"
                class="wrap-profile-img rounded-circle"
              ></v-img>
            </v-card-item>
          </v-col>
          <v-col cols="auto" alignSelf="center">
            <v-card-item class="text-h3 font-weight-bold">
              {{ profile.firstName }} {{ profile.lastName }}
            </v-card-item>
            <v-card-item class="text-h4 font-weight-medium">
              {{ profile.username }}
            </v-card-item>
          </v-col>
        </v-row>
        <v-card-item class="wrap-btn-update">
          <Dialog @fetchData="emit('fetchData')" :user="profile" />
        </v-card-item>
        <v-divider class="my-2"></v-divider>
        <v-card-item class="text-h5 font-weight-medium mb-5">
          Information User
        </v-card-item>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Role: </strong>
              {{ profile.role }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Team: </strong>
              {{ profile.team ? profile.team.name : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Email: </strong>
              {{ profile.email ? profile.email : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Phone: </strong>
              {{ profile.phone ? profile.phone : "N/A" }}
            </v-card-item>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-item>
              <strong>Birth day: </strong>
              {{ profile.birthDay ? format(profile.birthDay, "short") : "N/A" }}
            </v-card-item>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import Dialog from "@/components/employee/DialogUpdateProfile.vue";
import { format } from "@formkit/tempo";

const prop = defineProps(["profile"]);
const emit = defineEmits(["fetchData"]);
</script>

<style scoped>
.wrap-profile-page {
  width: 100%;
  margin-top: 3rem;
}
.wrap-profile-img {
  border: 2px solid #616161;
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
