<script setup>
import { ref, onMounted } from 'vue';
import AppointmentList from '../components/AppointmentList.vue';
import BookingDialog from '../components/BookingDialog.vue';
import { useNotificationStore } from '../stores/notification';

const notificationStore = useNotificationStore();
const appointments = ref([]);
const selectedAppointment = ref(null);
const showBookingDialog = ref(false);

const fetchAppointments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/dates');
    appointments.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    notificationStore.error('Fehler beim Laden der Termine');
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
      fetchAppointments();
      notificationStore.success('Termin erfolgreich gebucht');
    } else {
      throw new Error('Booking failed');
    }
  } catch (error) {
    console.error('Failed to book appointment:', error);
    notificationStore.error('Fehler beim Buchen des Termins');
  }
};

onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div class="container-fluid py-4">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-4 text-center mb-4">Verfügbare Termine</h1>
        <div class="text-center mb-5">
          <p class="lead text-muted">
            Wählen Sie einen verfügbaren Termin aus und buchen Sie ihn direkt online.
          </p>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">
        <AppointmentList
          :appointments="appointments"
          :is-admin="false"
          @book="handleBook"
        />
      </div>
    </div>

    <BookingDialog
      v-if="selectedAppointment"
      v-model="showBookingDialog"
      :appointment="selectedAppointment"
      @book="submitBooking"
    />
  </div>
</template>

<style lang="scss" scoped>
.display-4 {
  font-weight: 300;
  line-height: 1.2;
}

.lead {
  font-size: 1.25rem;
  font-weight: 300;
}
</style>
