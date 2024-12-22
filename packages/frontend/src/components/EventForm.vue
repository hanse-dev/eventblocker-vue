<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ event.id ? 'Termin bearbeiten' : 'Neuen Termin erstellen' }}</h5>
        <button type="button" class="btn-close" @click="$emit('close')"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="row g-3">
          <div class="col-12">
            <label class="form-label">Titel</label>
            <input
              v-model="formData.title"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Datum</label>
            <input
              v-model="formData.date"
              type="date"
              class="form-control"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Startzeit</label>
            <input
              v-model="formData.startTime"
              type="time"
              class="form-control"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Ort</label>
            <input
              v-model="formData.location"
              type="text"
              class="form-control"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Raum</label>
            <input
              v-model="formData.room"
              type="text"
              class="form-control"
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Dauer (Minuten)</label>
            <input
              v-model.number="formData.duration"
              type="number"
              class="form-control"
              min="1"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Max. Buchungen</label>
            <input
              v-model.number="formData.maxBookings"
              type="number"
              class="form-control"
              min="1"
              required
            />
          </div>

          <div class="col-md-6">
            <label class="form-label">Preis (€)</label>
            <input
              v-model.number="formData.price"
              type="number"
              class="form-control"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div class="col-12">
            <div class="form-check">
              <input
                v-model="formData.visibility"
                type="checkbox"
                class="form-check-input"
                id="visibility"
              />
              <label class="form-check-label" for="visibility">Sichtbar</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">Abbrechen</button>
        <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="loading">
          {{ loading ? 'Speichern...' : 'Speichern' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['save', 'close']);

const formData = ref({
  title: '',
  date: '',
  startTime: '',
  location: '',
  room: '',
  duration: 60,
  maxBookings: 1,
  price: 0,
  visibility: true
});

onMounted(() => {
  // Always copy the event data, whether it's new or existing
  const eventData = {
    title: props.event.title || '',
    date: '',
    startTime: '',
    location: props.event.location || '',
    room: props.event.room || '',
    duration: props.event.duration || 60,
    maxBookings: props.event.maxBookings || 1,
    price: props.event.price || 0,
    visibility: props.event.visibility !== false
  };
  
  console.log('Initial event data:', eventData);
  
  // Format date and time with timezone consideration
  if (props.event.date) {
    const date = new Date(props.event.date);
    eventData.date = date.toLocaleDateString('sv').split('T')[0];
  }
  
  if (props.event.startTime) {
    // Check if startTime is already in HH:MM format
    if (props.event.startTime.includes(':') && !props.event.startTime.includes('T')) {
      // Already in HH:MM format, keep as is
      eventData.startTime = props.event.startTime;
      console.log('Time already in HH:MM format:', eventData.startTime);
    } else {
      // Convert from ISO format
      const time = new Date(props.event.startTime);
      if (!isNaN(time.getTime())) {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        eventData.startTime = `${hours}:${minutes}`;
        console.log('Converted time to HH:MM:', eventData.startTime);
      } else {
        console.warn('Invalid time format:', props.event.startTime);
        eventData.startTime = ''; // Reset if invalid
      }
    }
  }
  
  formData.value = eventData;
  console.log('Final form data:', formData.value);
});

const handleSubmit = () => {
  const submitData = { ...formData.value };
  console.log('Form data before submit:', submitData);
  
  try {
    // Convert string values to appropriate types
    submitData.duration = parseInt(submitData.duration);
    submitData.maxBookings = parseInt(submitData.maxBookings);
    submitData.price = parseFloat(submitData.price);
    
    // Format date and time for the server
    if (submitData.date && submitData.startTime) {
      // Create a Date object from the date and time strings
      const [hours, minutes] = submitData.startTime.split(':');
      const dateTime = new Date(submitData.date);
      dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // Set the date and startTime in ISO format
      submitData.date = dateTime.toISOString().split('T')[0];
      submitData.startTime = dateTime.toISOString();
      
      console.log('Formatted date and time:', {
        date: submitData.date,
        startTime: submitData.startTime
      });
    }
    
    emit('save', submitData);
  } catch (error) {
    console.error('Error formatting form data:', error);
    throw error;
  }
};
</script>

<style scoped>
.modal-dialog {
  max-width: 600px;
  margin: 1.75rem auto;
}

.form-label {
  font-weight: 500;
}

.form-check {
  margin-top: 0.5rem;
}
</style>
