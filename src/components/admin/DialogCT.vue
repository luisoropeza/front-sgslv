<template>
  <v-btn
    color="blue-accent-3"
    text="Create"
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
      <v-form @submit.prevent>
        <v-card-item>
          <div class="text-h5 font-weight-bold">Create</div>
        </v-card-item>
        <v-card-item>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Name*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.description"
                  label="Description"
                  variant="outlined"
                  density="compact"
                ></v-textarea>
              </v-col>
            </v-row>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card-item>
        <v-card-item class="wrap-btn-action">
          <v-btn
            color="red-darken-3"
            @click="resetForm"
            class="mx-1 my-1"
            variant="outlined"
            size="small"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-accent-3"
            type="submit"
            @click="createTeam"
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
import { useTeamStore } from "@/store/team";
import { ref } from "vue";

const teamStore = useTeamStore();
const emit = defineEmits(["fetchData"]);
const message = ref("");
const dialog = ref(false);
const form = ref({
  name: null,
  description: null,
});
const createTeam = async () => {
  try {
    await teamStore.createTeam(form.value);
    emit("fetchData");
    resetForm();
  } catch (error) {
    message.value = error.response.data.message;
  }
};
const resetForm = () => {
  form.value = {};
  dialog.value = false;
  message.value = "";
};
</script>

<style scoped>
.wrap-btn-action {
  text-align: end;
}
@media (max-width: 480px) {
  .wrap-btn-action {
    text-align: start;
  }
}
</style>
