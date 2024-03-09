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
      <v-alert
        v-if="errors.message"
        border="start"
        variant="tonal"
        type="error"
      >
        {{ errors.message }}
      </v-alert>
      <v-form @submit.prevent>
        <v-card-item>
          <div class="text-h5 font-weight-bold">Update</div>
        </v-card-item>
        <v-card-item>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Password*"
                  variant="outlined"
                  :type="visible ? 'text' : 'password'"
                  :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="visible = !visible"
                  density="compact"
                  :error-messages="errors.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.role"
                  :items="roles"
                  label="Roles*"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  :error-messages="errors.role"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.team"
                  :items="teams"
                  label="Teams"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>
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
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const userStore = useUserStore();
const teamStore = useTeamStore();
const emit = defineEmits(["fetchData"]);
const prop = defineProps(["user"]);
const id = ref(router.currentRoute.value.params.id);
const teams = ref([]);
const roles = ref(["PERSONAL", "EMPLOYEE"]);
const errors = ref("");
const dialog = ref(false);
const visible = ref(false);
const form = ref({});

onMounted(async () => {
  fetchData();
});
const fetchData = async () => {
  await userStore.getUserById(id.value);
  await teamStore.getAllTeams();
  teams.value = teamStore.teams;
  initForm();
};
const updateUser = async () => {
  try {
    await userStore.updateUserById(id.value, form.value);
    emit("fetchData");
    fetchData();
  } catch (error) {
    errors.value = error.response.data;
  }
};
const initForm = () => {
  form.value = {
    password: null,
    team: prop.user.team ? prop.user.team.id : null,
    role: prop.user.role,
  };
  dialog.value = false;
  visible.value = false;
  errors.value = "";
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
