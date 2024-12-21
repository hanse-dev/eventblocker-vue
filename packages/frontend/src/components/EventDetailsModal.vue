<script setup>
import { ref, onMounted } from 'vue';
import BookingsList from './BookingsList.vue';
import { apiService } from '../services/api';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  event: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('de-DE');
};

const formatTime = (timeStr) => {
  return new Date(timeStr).toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const close = () => {
  emit('update:modelValue', false);
};
</script>

<template>
  <div v-if="modelValue" class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ event.title }}</h5>
          <button 
            type="button" 
            class="btn-close" 
            @click="close"
            aria-label="Schließen"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Event Details Section -->
          <div class="event-details mb-4">
            <h6 class="border-bottom pb-2 mb-3">Event Details</h6>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="mb-2">
                  <strong>Datum:</strong> {{ formatDate(event.date) }}
                </div>
                <div class="mb-2">
                  <strong>Zeit:</strong> {{ formatTime(event.startTime) }}
                </div>
                <div class="mb-2">
                  <strong>Dauer:</strong> {{ event.duration }} Minuten
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-2">
                  <strong>Ort:</strong> {{ event.location }}
                </div>
                <div class="mb-2">
                  <strong>Raum:</strong> {{ event.room }}
                </div>
                <div class="mb-2">
                  <strong>Status:</strong>
                  <span 
                    class="badge ms-1"
                    :class="{
                      'bg-success': event.status === 'available',
                      'bg-warning': event.status === 'pending',
                      'bg-danger': event.status === 'booked'
                    }"
                  >
                    {{ event.status }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <strong>Beschreibung:</strong>
              <p class="mt-1">{{ event.description || 'Keine Beschreibung vorhanden' }}</p>
            </div>
          </div>

          <!-- Bookings Section -->
          <div class="bookings-section">
            <h6 class="border-bottom pb-2 mb-3">Buchungen</h6>
            <BookingsList :event-id="event.id" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">
            Schließen
          </button>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.badge {
  text-transform: capitalize;
}

.event-details strong {
  color: #666;
}
</style>
