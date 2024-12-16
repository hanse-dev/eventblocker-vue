<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notification';

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
const errors = ref({
  username: '',
  password: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    username: '',
    password: ''
  };

  if (!form.value.username) {
    errors.value.username = 'Benutzername ist erforderlich';
    isValid = false;
  } else if (form.value.username.length < 3) {
    errors.value.username = 'Benutzername muss mindestens 3 Zeichen lang sein';
    isValid = false;
  }

  if (!form.value.password) {
    errors.value.password = 'Passwort ist erforderlich';
    isValid = false;
  } else if (form.value.password.length < 4) {
    errors.value.password = 'Passwort muss mindestens 4 Zeichen lang sein';
    isValid = false;
  }

  return isValid;
};

const login = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    await authStore.login(form.value.username, form.value.password);
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
  <div class="login-page min-vh-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Left side with background -->
        <div class="col-md-8 d-none d-md-flex login-bg align-items-center justify-content-center text-center text-white">
          <div>
            <i class="bi bi-calendar-event display-1 mb-4"></i>
            <h1 class="display-4 fw-bold mb-4">Termin-Buchungssystem</h1>
            <p class="h4">Verwalten Sie Ihre Termine einfach und effizient</p>
          </div>
        </div>
        
        <!-- Right side with login form -->
        <div class="col-12 col-md-4 login-form d-flex align-items-center">
          <div class="w-100 p-4">
            <div class="text-center mb-4">
              <i class="bi bi-calendar-event h1 text-primary d-block d-md-none"></i>
              <h2 class="h2 fw-bold">Admin Login</h2>
            </div>
            
            <form @submit.prevent="login" ref="formRef" class="needs-validation" novalidate>
              <div class="mb-4">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.username }"
                    id="username"
                    v-model="form.username"
                    placeholder="Benutzername"
                    :disabled="loading"
                    required
                  >
                  <label for="username">
                    <i class="bi bi-person me-2"></i>Benutzername
                  </label>
                  <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
              </div>

              <div class="mb-4">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="password"
                    v-model="form.password"
                    placeholder="Passwort"
                    :disabled="loading"
                    required
                  >
                  <label for="password">
                    <i class="bi bi-lock me-2"></i>Passwort
                  </label>
                  <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-3 mb-4"
                :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Anmelden
              </button>

              <p class="text-center text-muted">
                Termin-Buchungssystem Administrationsbereich
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  background-color: #f8f9fa;
}

.login-bg {
  background: linear-gradient(135deg, $primary, darken($primary, 10%));
  min-height: 100vh;
}

.login-form {
  background-color: white;
  min-height: 100vh;
}

.form-floating {
  > label {
    padding-left: 2.5rem;
  }
  
  .bi {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }
}

.form-control {
  height: 3.5rem;
  padding-left: 2.5rem;
  
  &:focus {
    box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
  }
}

.btn-primary {
  font-size: 1.1rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  transition: all 0.2s ease-in-out;
}

@media (max-width: 767.98px) {
  .login-form {
    background-color: #f8f9fa;
    padding: 1.5rem;
  }
}
</style>
