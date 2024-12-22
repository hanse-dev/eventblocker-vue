<template>
  <div class="container-fluid py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h3">Termine verwalten</h1>
      <button class="btn btn-primary" @click="dialog = true">
        <i class="bi bi-plus-circle"></i> Neuer Termin
      </button>
    </div>

    <!-- Filter controls -->
    <div class="mb-4">
      <select v-model="filters.visibility" class="form-select">
        <option value="all">Alle Termine</option>
        <option value="visible">Nur sichtbare</option>
        <option value="hidden">Nur versteckte</option>
      </select>
    </div>

    <!-- Loading state -->
    <div v-if="loading.list" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else-if="!filteredEvents.length" class="text-center py-4">
      <p class="text-muted mb-0">Keine Termine gefunden</p>
    </div>

    <!-- Events list -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div v-for="item in filteredEvents" :key="item.id" class="col">
        <EventCard
          :event="item"
          :loading="loading.save || loading.delete"
          :is-admin="true"
          @edit="editItem"
          @copy="copyItem"
          @delete="deleteItem"
          @refresh="fetchEvents"
        />
      </div>
    </div>

    <!-- Edit/Create Dialog -->
    <div v-if="dialog" class="modal fade show" style="display: block;">
      <EventForm
        :event="editedItem"
        :loading="loading.save"
        @save="save"
        @close="dialog = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { apiService } from '@/services/api';
import EventCard from '@/components/EventCard.vue';
import EventForm from '@/components/EventForm.vue';

const notificationStore = useNotificationStore();

const dialog = ref(false);
const events = ref([]);
const loading = ref({
  list: false,
  save: false,
  delete: false
});

const editedItem = ref({
  title: '',
  date: '',
  startTime: '',
  duration: 60,
  maxBookings: 1,
  price: 0,
  visibility: true
});

const filters = ref({
  visibility: 'all'
});

const filteredEvents = computed(() => {
  if (filters.value.visibility === 'all') return events.value;
  return events.value.filter(event => 
    filters.value.visibility === 'visible' ? event.visibility : !event.visibility
  );
});

const fetchEvents = async () => {
  loading.value.list = true;
  try {
    console.log('Fetching all events (including hidden) as admin...');
    const response = await apiService.getEvents(true);
    console.log('Raw response:', response);
    
    if (Array.isArray(response)) {
      console.log('Sample event bookings:', response[0]?.bookings);
    }
    
    // Ensure visibility is properly set and bookings are present
    events.value = Array.isArray(response) ? response.map(event => {
      console.log(`Event ${event.id} bookings:`, event.bookings);
      return {
        ...event,
        visibility: Boolean(event.visibility),
        bookings: event.bookings || []
      };
    }) : [];
    
    if (events.value.length > 0) {
      console.log('Events after processing:', events.value.map(e => ({
        id: e.id,
        title: e.title,
        bookingsCount: e.bookings?.length || 0,
        bookings: e.bookings
      })));
      events.value.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    notificationStore.error('Fehler beim Laden der Termine: ' + error.message);
    events.value = [];
  } finally {
    loading.value.list = false;
  }
};

const resetEditedItem = () => {
  editedItem.value = {
    title: '',
    date: '',
    startTime: '',
    duration: 60,
    maxBookings: 1,
    price: 0,
    visibility: true
  };
};

const editItem = (item) => {
  editedItem.value = { ...item };
  dialog.value = true;
};

const copyItem = (item) => {
  console.log('Original item:', item);
  
  // Create a copy with the original item's values
  const itemCopy = {
    title: `${item.title} (Kopie)`,
    date: item.date,
    startTime: item.startTime,
    duration: parseInt(item.duration) || 60,
    maxBookings: parseInt(item.maxBookings) || 1,
    price: parseFloat(item.price) || 0,
    visibility: item.visibility !== false,
    // Ensure these fields are not copied
    id: undefined,
    bookings: undefined,
    bookedSeats: undefined
  };
  
  console.log('Initial copy:', itemCopy);
  
  // Format the date and time
  if (itemCopy.date && itemCopy.startTime) {
    // Parse the original date and time
    const originalDate = new Date(itemCopy.date);
    const originalTime = new Date(itemCopy.startTime);
    
    // Format date as YYYY-MM-DD
    itemCopy.date = originalDate.toLocaleDateString('sv').split('T')[0];
    
    // Extract hours and minutes from the original time
    const hours = originalTime.getHours().toString().padStart(2, '0');
    const minutes = originalTime.getMinutes().toString().padStart(2, '0');
    itemCopy.startTime = `${hours}:${minutes}`;
    
    console.log('Formatted date:', itemCopy.date);
    console.log('Formatted time:', itemCopy.startTime);
  }
  
  console.log('Final copy:', itemCopy);
  
  // Set the edited item
  editedItem.value = itemCopy;
  dialog.value = true;
};

const deleteItem = async (item) => {
  if (!confirm('Möchten Sie diesen Termin wirklich löschen?')) return;
  
  loading.value.delete = true;
  try {
    await apiService.deleteEvent(item.id);
    notificationStore.success('Termin erfolgreich gelöscht');
    await fetchEvents();
  } catch (error) {
    console.error('Error deleting event:', error);
    notificationStore.error('Fehler beim Löschen: ' + error.message);
  } finally {
    loading.value.delete = false;
  }
};

const save = async (formData) => {
  loading.value.save = true;
  try {
    if (formData.id) {
      await apiService.updateEvent(formData.id, formData);
      notificationStore.success('Termin erfolgreich aktualisiert');
    } else {
      await apiService.createEvent(formData);
      notificationStore.success('Termin erfolgreich erstellt');
    }
    dialog.value = false;
    await fetchEvents();
  } catch (error) {
    console.error('Error saving event:', error);
    notificationStore.error('Fehler beim Speichern: ' + error.message);
  } finally {
    loading.value.save = false;
  }
};

// Fetch events on mount
fetchEvents();
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}
</style>
