<script setup>
import { RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Termin-Buchungssystem</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/admin" text>Admin</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
        <HelloWorld msg="Vite + Vue" />
      </v-container>
    </v-main>

    <v-footer app>
      <v-row justify="center" no-gutters>
        <span>&copy; {{ new Date().getFullYear() }} - Termin-Buchungssystem</span>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-application {
  font-family: "Roboto", sans-serif;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
