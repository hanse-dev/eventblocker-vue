<script setup>
import { ref, onMounted } from 'vue';
import EventCard from '../components/EventCard.vue';
import BookingDialog from '../components/BookingDialog.vue';
import { useNotificationStore } from '../stores/notification';
import { useAuthStore } from '../stores/auth';
import { apiService } from '../services/api';
import { useRouter } from 'vue-router';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const router = useRouter();
const appointments = ref([]);
const selectedAppointment = ref(null);
const showBookingDialog = ref(false);
const loading = ref(false);
const bookingLoading = ref(false);
const error = ref(null);

const fetchAppointments = async () => {
  loading.value = true;
  error.value = null;
  try {
    const events = await apiService.getEvents();
    appointments.value = Array.isArray(events) ? events : [];
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

const handleEdit = async (event) => {
  try {
    // Redirect to admin view for editing
    router.push('/admin');
  } catch (error) {
    console.error('Failed to handle edit:', error);
    notificationStore.error('Fehler beim Bearbeiten des Termins');
  }
};

const handleCopy = async (event) => {
  try {
    // Redirect to admin view for copying
    router.push('/admin');
  } catch (error) {
    console.error('Failed to handle copy:', error);
    notificationStore.error('Fehler beim Kopieren des Termins');
  }
};

const handleDelete = async (event) => {
  try {
    if (!confirm('Möchten Sie diesen Termin wirklich löschen?')) return;
    
    await apiService.deleteEvent(event.id);
    notificationStore.success('Termin erfolgreich gelöscht');
    await fetchAppointments();
  } catch (error) {
    console.error('Failed to delete event:', error);
    notificationStore.error('Fehler beim Löschen des Termins');
  }
};

const submitBooking = async (bookingData) => {
  if (bookingLoading.value) return;
  
  bookingLoading.value = true;
  try {
    console.log('Submitting booking:', { id: selectedAppointment.value.id, bookingData });
    const response = await apiService.bookEvent(selectedAppointment.value.id, bookingData);
    
    console.log('Booking response:', response);
    
    // Always close dialog and refresh on successful response
    notificationStore.success('Termin erfolgreich gebucht');
    showBookingDialog.value = false;
    await fetchAppointments();
  } catch (error) {
    console.error('Failed to book appointment:', error);
    if (error.message?.includes('fully booked')) {
      notificationStore.error('Dieser Termin ist leider bereits ausgebucht');
    } else if (error.message?.includes('not available')) {
      notificationStore.error('Dieser Termin ist nicht mehr verfügbar');
    } else {
      notificationStore.error('Fehler beim Buchen des Termins. Bitte versuchen Sie es später erneut.');
    }
  } finally {
    bookingLoading.value = false;
  }
};

onMounted(() => {
  fetchAppointments();
});
</script>

<template>
  <div class="container-fluid py-3">
    <h1 class="h3 mb-4">Verfügbare Termine</h1>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="!appointments.length" class="text-center py-4">
      <p class="text-muted mb-0">Keine Termine verfügbar</p>
    </div>

    <!-- Events grid -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div v-for="appointment in appointments" :key="appointment.id" class="col">
        <EventCard
          :event="appointment"
          :loading="loading"
          :is-admin="authStore.isAuthenticated"
          @book="handleBook"
          @edit="handleEdit"
          @copy="handleCopy"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Booking dialog -->
    <BookingDialog
      v-if="showBookingDialog"
      :appointment="selectedAppointment"
      :loading="bookingLoading"
      @close="showBookingDialog = false"
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
