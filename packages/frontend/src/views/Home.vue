<template>
  <v-container>
    <h1>Terminbuchung</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Verfügbare Termine</v-card-title>
          <v-card-text>
            <!-- Appointment list will go here -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppointmentStore } from '../stores/appointments'

const appointmentStore = useAppointmentStore()

onMounted(() => {
  appointmentStore.fetchAppointments()
})
</script>
