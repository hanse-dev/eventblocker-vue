<script setup>
import { ref, onMounted } from 'vue';
import AppointmentList from '../components/AppointmentList.vue';
import BookingDialog from '../components/BookingDialog.vue';
import { useNotificationStore } from '../stores/notification';
import { useAuthStore } from '../stores/auth';
import { apiService } from '../services/api';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const appointments = ref([]);
const selectedAppointment = ref(null);
const showBookingDialog = ref(false);
const loading = ref(false);
const error = ref(null);

const fetchAppointments = async () => {
  loading.value = true;
  error.value = null;
  try {
    const events = await apiService.getEvents();
    // Filter only visible events for non-authenticated users
    appointments.value = Array.isArray(events) ? events.filter(event => event.visibility) : [];
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
    error.value = 'Fehler beim Laden der Termine. Bitte versuchen Sie es später erneut.';
    appointments.value = [];
  } finally {
    loading.value = false;
  }
};

const handleBook = (appointment) => {
  selectedAppointment.value = appointment;
  showBookingDialog.value = true;
};

const submitBooking = async (bookingData) => {
  try {
    await apiService.bookEvent(bookingData.appointmentId, bookingData);
    await fetchAppointments();
    showBookingDialog.value = false;
    notificationStore.success('Termin erfolgreich gebucht');
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
  <div class="home-view container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white py-3">
            <h5 class="card-title mb-0">Verfügbare Termine</h5>
          </div>
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Termine werden geladen...</span>
              </div>
            </div>
            <div v-else-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>
            <AppointmentList
              v-else
              :appointments="appointments"
              :is-admin="false"
              @book="handleBook"
            />
          </div>
        </div>
      </div>
    </div>

    <BookingDialog
      v-if="showBookingDialog"
      v-model="showBookingDialog"
      :appointment="selectedAppointment"
      @submit="submitBooking"
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
