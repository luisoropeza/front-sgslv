<template>
  <div class="wrap-login-page d-flex">
    <div
      class="wrap-div-message d-flex flex-column justify-center align-center text-grey-lighten-4"
    >
      <div class="text-h4 font-weight-bold mb-5">Your App License!</div>
      <div class="text-h5">Manage your licenses and vacations efficiently</div>
    </div>
    <div class="wrap-div-login d-flex justify-center align-center">
      <v-card elevation="0" color="grey-lighten-4" width="25rem">
        <v-form @submit.prevent>
          <v-card-item>
            <div
              class="text-h6 text-center font-weight-medium text-grey-darken-2"
            >
              Enter your credentials
            </div>
          </v-card-item>
          <v-divider class="my-5 mx-15" color="grey-darken-4"></v-divider>
          <v-card-item class="wrap-card-login">
            <v-card-text>
              <v-text-field
                v-model="username"
                label="Username"
                variant="outlined"
                class="mb-3"
                density="compact"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                variant="outlined"
                class="mb-3"
                :type="visible ? 'text' : 'password'"
                :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="visible = !visible"
                density="compact"
              ></v-text-field>
            </v-card-text>
          </v-card-item>
          <v-card-item>
            <v-card-text class="d-flex flex-column align-center">
              <v-btn
                text="Sign In"
                flat
                color="red-darken-3"
                type="submit"
                @click="login"
                width="250"
              ></v-btn>
              <span v-if="message !== ''" class="mt-5 text-red-darken-4">
                {{ message }}
              </span>
            </v-card-text>
          </v-card-item>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const message = ref("");
const visible = ref(false);

const login = async () => {
  try {
    await authStore.login(username, password);
  } catch (error) {
    message.value = error.response.data.message;
  }
};
</script>

<style scoped>
.wrap-login-page {
  background: url("@/assets/Wave-10s-1872px.svg") no-repeat center center;
  background-size: cover;
  min-block-size: calc(var(--vh, 1vh) * 100);
}
.wrap-div-message {
  min-block-size: calc(var(--vh, 1vh) * 100);
  width: 100%;
}
.wrap-div-login {
  min-block-size: calc(var(--vh, 1vh) * 100);
  width: 45rem;
  background-color: #f5f5f5;
  z-index: 1;
}
@media (max-width: 1100px) {
  .wrap-div-message {
    width: 0%;
  }
  .wrap-div-login {
    width: 100%;
  }
}
</style>
