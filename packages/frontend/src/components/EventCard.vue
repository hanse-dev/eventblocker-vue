<template>
  <div class="card h-100">
    <div class="card-body p-3">
      <!-- Event header -->
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">{{ event.title }}</h6>
        <span v-if="isAdmin" :class="['badge', event.visibility ? 'bg-success' : 'bg-warning']">
          {{ event.visibility ? 'Sichtbar' : 'Versteckt' }}
        </span>
      </div>

      <!-- Event details -->
      <div class="mb-2">
        <div class="detail-item">
          <i class="bi bi-calendar text-primary"></i>
          <span>{{ formatDate(event.date) }}</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-clock text-primary"></i>
          <span>{{ formatTime(event.startTime) }} ({{ event.duration }} Min.)</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-geo-alt text-primary"></i>
          <span>{{ event.location || 'Kein Ort' }}</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-door-closed text-primary"></i>
          <span>{{ event.room || 'Kein Raum' }}</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-people text-primary"></i>
          <span>{{ event.bookedSeats || 0 }} / {{ event.maxBookings }}</span>
        </div>
        <div class="detail-item">
          <i class="bi bi-currency-euro text-primary"></i>
          <span>{{ event.price }}€</span>
        </div>
      </div>

      <!-- Bookings section (admin only) -->
      <div v-if="isAdmin" class="mt-2 border-top pt-2">
        <h6 class="mb-2">
          <i class="bi bi-person-lines-fill me-1"></i>
          Buchungen ({{ event.bookings?.length || 0 }})
        </h6>
        <div class="bookings-list">
          <slot name="bookings"></slot>
        </div>
      </div>

      <!-- Actions -->
      <div class="card-actions mt-2 pt-2 border-top">
        <!-- Admin actions -->
        <template v-if="isAdmin">
          <button class="btn btn-primary btn-sm" @click="$emit('edit', event)" :disabled="loading">
            <i class="bi bi-pencil"></i> Bearbeiten
          </button>
          <button class="btn btn-info btn-sm" @click="$emit('copy', event)" :disabled="loading">
            <i class="bi bi-files"></i> Kopieren
          </button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', event)" :disabled="loading">
            <i class="bi bi-trash"></i> Löschen
          </button>
        </template>
        
        <!-- User actions -->
        <template v-else>
          <button 
            class="btn btn-primary btn-sm" 
            @click="$emit('book', event)"
            :disabled="loading || isFullyBooked"
          >
            <i class="bi bi-calendar-check"></i>
            {{ isFullyBooked ? 'Ausgebucht' : 'Jetzt buchen' }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['edit', 'copy', 'delete', 'book']);

const isFullyBooked = computed(() => {
  return (props.event.bookedSeats || 0) >= props.event.maxBookings;
});

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const date = new Date(timeStr);
  return date.toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  }) + ' Uhr';
};
</script>

<style scoped>
.card {
  font-size: 0.9rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.detail-item i {
  width: 1rem;
  text-align: center;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.card-actions :deep(.btn) {
  flex: 1;
  min-width: auto;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

@media (max-width: 576px) {
  .card-actions {
    flex-direction: column;
  }
  
  .card-actions :deep(.btn) {
    width: 100%;
    margin-bottom: 0.25rem;
  }
}
</style>
