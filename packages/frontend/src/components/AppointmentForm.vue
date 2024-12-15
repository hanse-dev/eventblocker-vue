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
  <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.title"
            label="Titel"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.location"
            label="Ort"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.date"
            label="Datum"
            type="date"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.startTime"
            label="Startzeit"
            type="time"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.duration"
            label="Dauer (Minuten)"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.room"
            label="Raum"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.price"
            label="Preis"
            type="number"
            prefix="€"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea
            v-model="form.description"
            label="Beschreibung"
            rows="3"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.maxBookings"
            label="Maximale Buchungen"
            type="number"
            min="1"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-switch
            v-model="form.visibility"
            label="Sichtbar"
          ></v-switch>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn
            color="primary"
            type="submit"
          >
            Speichern
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
