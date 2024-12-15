<script setup>
import { useNotificationStore } from '../stores/notification';

const notificationStore = useNotificationStore();
</script>

<template>
  <v-snackbar
    v-model="notificationStore.show"
    :color="notificationStore.type"
    :timeout="notificationStore.timeout"
  >
    {{ notificationStore.message }}

    <template v-slot:actions>
      <v-btn
        color="white"
        text
        @click="notificationStore.clearNotification"
      >
        Schließen
      </v-btn>
    </template>
  </v-snackbar>
</template>
