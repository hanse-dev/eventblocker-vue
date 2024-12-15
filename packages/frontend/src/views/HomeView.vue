<script setup>
import { ref, onMounted } from 'vue';
import AppointmentList from '../components/AppointmentList.vue';
import BookingDialog from '../components/BookingDialog.vue';

const appointments = ref([]);
const selectedAppointment = ref(null);
const showBookingDialog = ref(false);

const fetchAppointments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/dates');
    appointments.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }
};

const handleBook = (appointment) => {
  selectedAppointment.value = appointment;
  showBookingDialog.value = true;
};

const submitBooking = async (bookingData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/dates/${bookingData.appointmentId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (response.ok) {
      // Refresh the appointments list
      fetchAppointments();
      // TODO: Show success message
    }
  } catch (error) {
    console.error('Failed to book appointment:', error);
    // TODO: Show error message
  }
};

onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-6">Verfügbare Termine</h1>
      </v-col>
    </v-row>

    <AppointmentList
      :appointments="appointments"
      :is-admin="false"
      @book="handleBook"
    />

    <BookingDialog
      v-if="selectedAppointment"
      v-model="showBookingDialog"
      :appointment="selectedAppointment"
      @book="submitBooking"
    />
  </div>
</template>
