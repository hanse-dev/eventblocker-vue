<script setup>
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';
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
  <v-app>
    <v-app-bar
      color="primary"
      :elevation="2"
    >
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-title class="text-truncate">
        <v-icon icon="mdi-calendar-clock" class="mr-2"></v-icon>
        Termin-Buchungssystem
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn to="/" text>
          <v-icon>mdi-home</v-icon>
          <span class="ml-2">Home</span>
        </v-btn>
        <template v-if="authStore.isAuthenticated">
          <v-btn to="/admin" text>
            <v-icon>mdi-calendar-edit</v-icon>
            <span class="ml-2">Admin</span>
          </v-btn>
          <v-btn @click="handleLogout" text>
            <v-icon>mdi-logout</v-icon>
            <span class="ml-2">Logout</span>
          </v-btn>
        </template>
        <v-btn v-else to="/login" text>
          <v-icon>mdi-login</v-icon>
          <span class="ml-2">Login</span>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      v-if="$vuetify.display.smAndDown"
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/"
          :active="$route.path === '/'"
        ></v-list-item>
        
        <template v-if="authStore.isAuthenticated">
          <v-list-item
            prepend-icon="mdi-calendar-edit"
            title="Admin"
            to="/admin"
            :active="$route.path === '/admin'"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="handleLogout"
          ></v-list-item>
        </template>
        <v-list-item
          v-else
          prepend-icon="mdi-login"
          title="Login"
          to="/login"
          :active="$route.path === '/login'"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container :class="{ 
        'pa-2': $vuetify.display.xs,
        'pa-4': $vuetify.display.sm,
        'pa-6': $vuetify.display.mdAndUp
      }">
        <RouterView />
      </v-container>
    </v-main>

    <v-footer app class="d-flex flex-column">
      <div class="px-4 py-2 text-center w-100">
        <span class="text-caption text-medium-emphasis">
          &copy; {{ new Date().getFullYear() }} - Termin-Buchungssystem
        </span>
      </div>
    </v-footer>

    <NotificationSnackbar />
  </v-app>
</template>

<style>
.v-application {
  font-family: "Roboto", sans-serif;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

/* Mobile-first responsive adjustments */
@media (max-width: 600px) {
  .v-container {
    padding: 8px !important;
  }
  
  .v-card {
    border-radius: 8px !important;
  }
}

/* Tablet adjustments */
@media (min-width: 601px) and (max-width: 960px) {
  .v-container {
    padding: 16px !important;
  }
}

/* Desktop adjustments */
@media (min-width: 961px) {
  .v-container {
    max-width: 1280px;
    margin: 0 auto;
  }
}
</style>
