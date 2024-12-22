<template>
  <div class="modal fade show" style="display: block;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Buchungen für {{ event.title }}
          </h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div v-if="event.bookings?.length" class="bookings-list">
            <div v-for="booking in event.bookings" :key="booking.id" class="booking-item mb-2 p-3 bg-light rounded">
              <div class="d-flex justify-content-between align-items-start">
                <div>
                  <div class="h6 mb-1">{{ booking.firstName }} {{ booking.lastName }}</div>
                  <div class="text-muted">
                    <div><i class="bi bi-envelope me-2"></i>{{ booking.email }}</div>
                    <div><i class="bi bi-telephone me-2"></i>{{ booking.phone || 'Keine Telefonnummer' }}</div>
                  </div>
                </div>
                <div class="d-flex flex-column align-items-end">
                  <div class="text-muted mb-2">
                    <i class="bi bi-calendar me-1"></i>
                    {{ new Date(booking.createdAt).toLocaleDateString('de-DE') }}
                  </div>
                  <button 
                    class="btn btn-danger btn-sm"
                    :disabled="loading"
                    @click="deleteBooking(booking)"
                  >
                    <i class="bi bi-trash me-1"></i>
                    Löschen
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4 text-muted">
            <i class="bi bi-calendar-x display-4 d-block mb-3"></i>
            Keine Buchungen vorhanden
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Schließen
          </button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '../services/api';
import { useNotificationStore } from '../stores/notification';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'booking-deleted']);
const notificationStore = useNotificationStore();
const loading = ref(false);

const deleteBooking = async (booking) => {
  if (!confirm(`Möchten Sie die Buchung von ${booking.firstName} ${booking.lastName} wirklich löschen?`)) {
    return;
  }

  loading.value = true;
  try {
    await apiService.deleteBooking(props.event.id, booking.id);
    notificationStore.success('Buchung erfolgreich gelöscht');
    emit('booking-deleted');
  } catch (error) {
    console.error('Failed to delete booking:', error);
    notificationStore.error('Fehler beim Löschen der Buchung');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.bookings-list {
  max-height: 60vh;
  overflow-y: auto;
}

.booking-item {
  border: 1px solid #dee2e6;
  transition: background-color 0.2s;
}

.booking-item:hover {
  background-color: #f8f9fa !important;
}

.bi {
  opacity: 0.7;
}
</style>
