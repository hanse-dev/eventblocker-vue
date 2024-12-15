<script setup>
import { ref } from 'vue';

const props = defineProps({
  appointments: {
    type: Array,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['edit', 'delete', 'book']);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('de-DE');
};

const formatTime = (timeStr) => {
  return new Date(timeStr).toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
</script>

<template>
  <v-container>
    <v-data-table
      :headers="[
        { title: 'Titel', key: 'title' },
        { title: 'Datum', key: 'date' },
        { title: 'Zeit', key: 'startTime' },
        { title: 'Ort', key: 'location' },
        { title: 'Raum', key: 'room' },
        { title: 'Aktionen', key: 'actions', sortable: false }
      ]"
      :items="appointments"
      :items-per-page="10"
    >
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>

      <template v-slot:item.startTime="{ item }">
        {{ formatTime(item.startTime) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          v-if="isAdmin"
          icon="mdi-pencil"
          size="small"
          color="primary"
          class="mr-2"
          @click="emit('edit', item)"
        ></v-btn>
        <v-btn
          v-if="isAdmin"
          icon="mdi-delete"
          size="small"
          color="error"
          class="mr-2"
          @click="emit('delete', item)"
        ></v-btn>
        <v-btn
          v-if="!isAdmin && item.status === 'available'"
          color="success"
          size="small"
          @click="emit('book', item)"
        >
          Buchen
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
