<template>
  <v-btn
    color="blue-accent-3"
    text="Update"
    @click="dialog = true"
    variant="outlined"
    size="small"
  ></v-btn>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
    scrollable
    width="750"
    min-width="300"
  >
    <v-card class="pa-5">
      <v-alert v-if="message != ''" border="start" variant="tonal" type="error">
        {{ message }}
      </v-alert>
      <v-form @submit.prevent>
        <v-card-item>
          <div class="text-h5 font-weight-bold">Update</div>
        </v-card-item>
        <v-card-item>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.firstName"
                  label="First Name*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.username"
                  label="Username*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.password"
                  label="Password*"
                  variant="outlined"
                  :type="visible ? 'text' : 'password'"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="visible = !visible"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="Phone"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.team"
                  :items="teams"
                  item-title="name"
                  item-value="id"
                  label="Select a team"
                  variant="outlined"
                  density="compact"
                  :disabled="user.role === 'USER'"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.birthDay"
                  type="date"
                  variant="outlined"
                  label="Birth Day"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.profilePhoto"
                  :items="imageUrls"
                  item-title="name"
                  item-value="url"
                  label="Select Photo"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
              <v-col cols="12" class="text-center">
                <img
                  :src="
                    form.profilePhoto ? form.profilePhoto : user.profilePhoto
                  "
                  :alt="
                    form.profilePhoto ? form.profilePhoto : user.profilePhoto
                  "
                  width="150"
                  class="wrap-profile-img rounded-circle my-5"
                />
              </v-col>
            </v-row>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card-item>
        <v-card-item class="wrap-btn-action">
          <v-btn
            color="red-darken-3"
            @click="initForm"
            class="mx-1 my-1"
            variant="outlined"
            size="small"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-accent-3"
            type="submit"
            @click="updateUser"
            class="mx-1 my-1"
            variant="outlined"
            size="small"
          >
            Save
          </v-btn>
        </v-card-item>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useUserStore } from "@/store/user";
import { useTeamStore } from "@/store/team";
import { ref, onMounted } from "vue";

const userStore = useUserStore();
const teamStore = useTeamStore();
const emit = defineEmits(["fetchData"]);
const user = ref({});
const teams = ref([]);
const message = ref([""]);
const dialog = ref(false);
const visible = ref(false);
const defaultTeam = ref({
  id: null,
  name: "No Team",
});
const form = ref({});

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUser();
  user.value = userStore.user;
  await teamStore.getAllTeams();
  teams.value = teamStore.teams;
  teams.value.unshift(defaultTeam.value);
  initForm();
};
const updateUser = async () => {
  try {
    await userStore.updateUser(form.value);
    emit("fetchData");
    fetchData();
  } catch (error) {
    message.value = error.response.data.message;
  }
};
const initForm = () => {
  form.value = {
    id: user.value.id,
    username: user.value.username,
    password: "",
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
    birthDay: user.value.birthDay,
    team: user.value.team ? user.value.team.id : null,
    role: user.value.role,
    profilePhoto: null,
  };
  dialog.value = false;
  visible.value = false;
  message.value = "";
};

const imageUrls = [
  { name: "Lego 1", url: "https://randomuser.me/api/portraits/lego/1.jpg" },
  { name: "Lego 2", url: "https://randomuser.me/api/portraits/lego/2.jpg" },
  { name: "Lego 3", url: "https://randomuser.me/api/portraits/lego/3.jpg" },
  { name: "Lego 4", url: "https://randomuser.me/api/portraits/lego/4.jpg" },
  { name: "Lego 5", url: "https://randomuser.me/api/portraits/lego/5.jpg" },
  { name: "Lego 6", url: "https://randomuser.me/api/portraits/lego/6.jpg" },
  { name: "Lego 7", url: "https://randomuser.me/api/portraits/lego/7.jpg" },
  { name: "Lego 8", url: "https://randomuser.me/api/portraits/lego/8.jpg" },
];
</script>

<style scoped>
.wrap-profile-img {
  border: 1px solid #e0e0e0;
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
