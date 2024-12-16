<script setup>
import { ref } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['submit']);

const form = ref({
  title: props.initialData.title || '',
  date: props.initialData.date || '',
  startTime: props.initialData.startTime || '',
  duration: props.initialData.duration || 60,
  location: props.initialData.location || '',
  room: props.initialData.room || '',
  description: props.initialData.description || '',
  price: props.initialData.price || null,
  maxBookings: props.initialData.maxBookings || 1,
  visibility: props.initialData.visibility !== false
});

const submitForm = () => {
  emit('submit', { ...form.value });
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="container-fluid p-0">
      <div class="row g-3">
        <div class="col-12 col-md-6">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="form.title"
              placeholder="Titel"
              required
            >
            <label for="title">Titel</label>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="location"
              v-model="form.location"
              placeholder="Ort"
              required
            >
            <label for="location">Ort</label>
          </div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-12 col-md-4">
          <div class="form-floating">
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="form.date"
              required
            >
            <label for="date">Datum</label>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="form-floating">
            <input
              type="time"
              class="form-control"
              id="startTime"
              v-model="form.startTime"
              required
            >
            <label for="startTime">Startzeit</label>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="duration"
              v-model="form.duration"
              placeholder="Dauer"
              required
            >
            <label for="duration">Dauer (Minuten)</label>
          </div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-12 col-md-6">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="room"
              v-model="form.room"
              placeholder="Raum"
            >
            <label for="room">Raum</label>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="price"
              v-model="form.price"
              placeholder="Preis"
            >
            <label for="price">Preis (€)</label>
          </div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-12">
          <div class="form-floating">
            <textarea
              class="form-control"
              id="description"
              v-model="form.description"
              placeholder="Beschreibung"
              style="height: 100px"
            ></textarea>
            <label for="description">Beschreibung</label>
          </div>
        </div>
      </div>

      <div class="row g-3 mt-2">
        <div class="col-12 col-md-6">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="maxBookings"
              v-model="form.maxBookings"
              placeholder="Maximale Buchungen"
              min="1"
            >
            <label for="maxBookings">Maximale Buchungen</label>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="form-check form-switch mt-3">
            <input
              class="form-check-input"
              type="checkbox"
              id="visibility"
              v-model="form.visibility"
            >
            <label class="form-check-label" for="visibility">
              Sichtbar
            </label>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12 text-end">
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-save me-2"></i>
            Speichern
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-floating {
  > label {
    padding-left: 1rem;
  }
}

.form-control {
  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
  }
}

.form-check-input {
  &:checked {
    background-color: $primary;
    border-color: $primary;
  }
  
  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 0.25rem rgba($primary, 0.25);
  }
}

.btn-primary {
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  transition: all 0.2s ease-in-out;
}
</style>
