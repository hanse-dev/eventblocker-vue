<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from '../services/api';

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
});

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBookings = async () => {
  loading.value = true;
  error.value = null;
  try {
    bookings.value = await apiService.getEventBookings(props.eventId);
  } catch (err) {
    console.error('Failed to fetch bookings:', err);
    error.value = 'Fehler beim Laden der Buchungen';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBookings();
});
</script>

<template>
  <div class="bookings-list">
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Buchungen werden geladen...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="bookings.length === 0" class="text-center py-4">
        <p class="text-muted">Keine Buchungen vorhanden</p>
      </div>

      <div v-else class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Status</th>
              <th>Notizen</th>
              <th>Gebucht am</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.name }}</td>
              <td>{{ booking.email }}</td>
              <td>{{ booking.phone }}</td>
              <td>
                <span 
                  class="badge" 
                  :class="{
                    'bg-success': booking.status === 'confirmed',
                    'bg-warning': booking.status === 'pending',
                    'bg-danger': booking.status === 'cancelled'
                  }"
                >
                  {{ booking.status }}
                </span>
              </td>
              <td>{{ booking.notes }}</td>
              <td>{{ new Date(booking.createdAt).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookings-list {
  margin-top: 1rem;
}

.badge {
  text-transform: capitalize;
}
</style>
