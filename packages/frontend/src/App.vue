<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import NotificationSnackbar from './components/NotificationSnackbar.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

onMounted(() => {
  authStore.initAuth();
});
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-calendar-event me-2"></i>
          Termin-Buchungssystem
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="bi bi-house-door me-1"></i>
                Home
              </router-link>
            </li>
            <template v-if="authStore.isAuthenticated">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">
                  <i class="bi bi-calendar-plus me-1"></i>
                  Admin
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="handleLogout">
                  <i class="bi bi-box-arrow-right me-1"></i>
                  Logout
                </a>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  <i class="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow-1">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-light py-3 mt-auto">
      <div class="container text-center">
        <span class="text-muted">
          {{ new Date().getFullYear() }} Termin-Buchungssystem
        </span>
      </div>
    </footer>

    <NotificationSnackbar />
  </div>
</template>

<style lang="scss">
// Custom primary color
$primary: #1976D2;
$enable-shadows: true;
$enable-gradients: true;

// Import Bootstrap styles
@import "bootstrap/scss/bootstrap";

// Custom styles
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.router-link-active {
  font-weight: 500;
}

// Add smooth transitions
.nav-link {
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-1px);
  }
}
</style>
