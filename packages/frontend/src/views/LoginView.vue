<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notification';
import { apiService } from '../services/api';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const form = ref({
  username: '',
  password: ''
});

const formRef = ref(null);
const loading = ref(false);
const valid = ref(false);

const rules = {
  required: v => !!v || 'Dieses Feld ist erforderlich',
  username: v => v.length >= 3 || 'Benutzername muss mindestens 3 Zeichen lang sein',
  password: v => v.length >= 4 || 'Passwort muss mindestens 4 Zeichen lang sein'
};

const login = async () => {
  const { valid } = await formRef.value.validate();
  
  if (!valid) return;

  loading.value = true;
  try {
    const response = await apiService.login(form.value);
    authStore.setToken(response.token);
    notificationStore.success('Erfolgreich angemeldet');
    const redirectPath = route.query.redirect || '/admin';
    router.push(redirectPath);
  } catch (error) {
    notificationStore.error(error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4" xl="3">
          <v-card class="elevation-12 pa-4">
            <v-card-title class="text-center text-h4 font-weight-bold mb-6">
              <v-icon size="36" color="primary" class="mb-4">mdi-calendar-clock</v-icon>
              <div>Admin Login</div>
            </v-card-title>
            
            <v-card-text>
              <v-form
                ref="formRef"
                v-model="valid"
                @submit.prevent="login"
                class="mt-4"
              >
                <v-text-field
                  v-model="form.username"
                  label="Benutzername"
                  name="username"
                  prepend-icon="mdi-account"
                  variant="outlined"
                  class="mb-4"
                  :rules="[rules.required, rules.username]"
                  :disabled="loading"
                  required
                  autocomplete="username"
                ></v-text-field>

                <v-text-field
                  v-model="form.password"
                  label="Passwort"
                  name="password"
                  prepend-icon="mdi-lock"
                  variant="outlined"
                  type="password"
                  :rules="[rules.required, rules.password]"
                  :disabled="loading"
                  required
                  autocomplete="current-password"
                ></v-text-field>

                <v-btn
                  color="primary"
                  size="large"
                  block
                  :loading="loading"
                  :disabled="loading || !valid"
                  class="mt-6"
                  @click="login"
                >
                  Anmelden
                </v-btn>
              </v-form>
            </v-card-text>

            <v-card-text class="text-center mt-4">
              <p class="text-caption text-medium-emphasis">
                Termin-Buchungssystem Administrationsbereich
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.v-container {
  width: 100%;
}

.v-card {
  border-radius: 12px;
  max-width: 100%;
}

.v-card-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-text-field {
  border-radius: 8px;
}

.v-btn {
  text-transform: none;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  font-weight: 500;
}
</style>
