<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const appointment = ref(null);

onMounted(async () => {
  if (!route.params.id) {
    router.push('/');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/dates/${route.params.id}`);
    appointment.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    router.push('/');
  }
});
</script>

<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mt-4">
          <v-card-title class="text-h4 text-center">
            Buchung bestätigt
          </v-card-title>

          <v-card-text class="text-center" v-if="appointment">
            <v-icon
              color="success"
              size="64"
              class="mb-4"
            >
              mdi-check-circle
            </v-icon>

            <h2 class="text-h5 mb-4">
              Vielen Dank für Ihre Buchung!
            </h2>

            <div class="text-body-1">
              <p class="mb-2">
                <strong>Termin:</strong> {{ appointment.title }}
              </p>
              <p class="mb-2">
                <strong>Datum:</strong> 
                {{ new Date(appointment.date).toLocaleDateString('de-DE') }}
              </p>
              <p class="mb-2">
                <strong>Uhrzeit:</strong>
                {{ new Date(appointment.startTime).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </p>
              <p class="mb-2">
                <strong>Ort:</strong> {{ appointment.location }}
                <template v-if="appointment.room">
                  (Raum: {{ appointment.room }})
                </template>
              </p>
            </div>

            <p class="mt-6">
              Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              @click="router.push('/')"
            >
              Zurück zur Startseite
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
