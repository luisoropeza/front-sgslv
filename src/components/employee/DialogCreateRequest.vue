<template>
  <v-btn
    color="blue-accent-3"
    text="Create Request"
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
          <div class="text-h5 font-weight-bold">Create Request</div>
        </v-card-item>
        <v-card-item>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.initDate"
                  type="date"
                  label="Init Date"
                  variant="outlined"
                  density="compact"
                  :error-messages="errors.initDate"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.endDate"
                  type="date"
                  label="End Date"
                  variant="outlined"
                  density="compact"
                  :error-messages="errors.endDate"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.reason"
                  :items="reasons"
                  label="Select a reason"
                  item-title="reason"
                  item-value="id"
                  variant="outlined"
                  density="compact"
                  :error-messages="errors.reason"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
                  v-model="form.file"
                  label="File input"
                  variant="outlined"
                  density="compact"
                ></v-file-input>
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
            :loading="loading"
            color="blue-accent-3"
            type="submit"
            @click="createRequest"
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
import { useRequestStore } from "@/store/request";
import { ref } from "vue";

const requestStore = useRequestStore();
const emit = defineEmits(["fetchData"]);
const reasons = ref(["Medical license", "Vacation", "Other"]);
const errors = ref([]);
const dialog = ref(false);
const visible = ref(false);
const loading = ref(false);
const form = ref({
  initDate: null,
  endDate: null,
  description: null,
  reason: null,
  file: null,
});

const createRequest = async () => {
  try {
    loading.value = true;
    await requestStore.createRequest(form.value);
    emit("fetchData");
    loading.value = false;
    resetForm();
  } catch (error) {
    loading.value = false;
    errors.value = error.response.data;
  }
};
const resetForm = () => {
  form.value = {};
  visible.value = false;
  dialog.value = false;
  errors.value = {};
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
