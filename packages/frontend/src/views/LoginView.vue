<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref({
  username: '',
  password: ''
});

const rules = {
  required: v => !!v || 'Dieses Feld ist erforderlich'
};

const login = async () => {
  try {
    await authStore.login(form.value.username, form.value.password);
    const redirectPath = route.query.redirect || '/admin';
    router.push(redirectPath);
  } catch (error) {
    // Error is handled by the store
  }
};
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Admin Login</v-toolbar-title>
          </v-toolbar>
          
          <v-card-text>
            <v-alert
              v-if="authStore.error"
              type="error"
              class="mb-4"
            >
              {{ authStore.error }}
            </v-alert>

            <v-form @submit.prevent="login">
              <v-text-field
                v-model="form.username"
                label="Benutzername"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :rules="[rules.required]"
                :disabled="authStore.loading"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Passwort"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[rules.required]"
                :disabled="authStore.loading"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="authStore.loading"
              :disabled="authStore.loading"
              @click="login"
            >
              Anmelden
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
