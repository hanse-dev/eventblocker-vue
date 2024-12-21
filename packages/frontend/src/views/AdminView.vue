<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notification';
import { apiService } from '../services/api';
import { config } from '../config';
import EventDetailsModal from '../components/EventDetailsModal.vue';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const events = ref([]);
const loading = ref({
  list: false,
  save: false,
  delete: false
});

const dialog = ref(false);
const editedIndex = ref(-1);
const showDetailsModal = ref(false);
const selectedEvent = ref(null);

const getDefaultDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const editedItem = ref({
  title: '',
  date: getDefaultDate(),
  startTime: '19:00',
  duration: 15,
  description: '',
  location: '',
  room: '',
  price: 15,
  maxParticipants: 10,
  visible: true
});

const formRef = ref(null);
const errors = ref({
  title: '',
  date: '',
  startTime: '',
  duration: '',
  price: '',
  maxParticipants: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    title: '',
    date: '',
    startTime: '',
    duration: '',
    price: '',
    maxParticipants: ''
  };

  if (!editedItem.value.title) {
    errors.value.title = 'Dieses Feld ist erforderlich';
    isValid = false;
  } else if (editedItem.value.title.length < 3) {
    errors.value.title = 'Titel muss mindestens 3 Zeichen lang sein';
    isValid = false;
  }

  if (!editedItem.value.date) {
    errors.value.date = 'Datum ist erforderlich';
    isValid = false;
  }

  if (!editedItem.value.startTime) {
    errors.value.startTime = 'Startzeit ist erforderlich';
    isValid = false;
  }

  if (!editedItem.value.duration || editedItem.value.duration < 15) {
    errors.value.duration = 'Dauer muss mindestens 15 Minuten betragen';
    isValid = false;
  }

  if (editedItem.value.price < 0) {
    errors.value.price = 'Preis muss größer oder gleich 0 sein';
    isValid = false;
  }

  if (editedItem.value.maxParticipants < 1) {
    errors.value.maxParticipants = 'Mindestens 1 Teilnehmer erforderlich';
    isValid = false;
  }

  return isValid;
};

const formatDateTime = (date) => {
  return new Intl.DateTimeFormat(
    config.defaultLocale,
    config.dateTimeFormats.dateTime
  ).format(new Date(date));
};

const fetchEvents = async () => {
  loading.value.list = true;
  try {
    events.value = await apiService.getEvents();
  } catch (error) {
    notificationStore.error('Fehler beim Laden der Termine');
  } finally {
    loading.value.list = false;
  }
};

const editItem = (item) => {
  editedIndex.value = events.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const deleteItem = async (item) => {
  const index = events.value.indexOf(item);
  if (confirm('Möchten Sie diesen Termin wirklich löschen?')) {
    loading.value.delete = true;
    try {
      await apiService.deleteEvent(item.id);
      events.value.splice(index, 1);
      notificationStore.success('Termin erfolgreich gelöscht');
    } catch (error) {
      notificationStore.error('Fehler beim Löschen des Termins');
    } finally {
      loading.value.delete = false;
    }
  }
};

const showDetails = (event) => {
  selectedEvent.value = event;
  showDetailsModal.value = true;
};

const close = () => {
  dialog.value = false;
  editedIndex.value = -1;
  editedItem.value = {
    title: '',
    date: getDefaultDate(),
    startTime: '19:00',
    duration: 15,
    description: '',
    location: '',
    room: '',
    price: 15,
    maxParticipants: 10,
    visible: true
  };
  errors.value = {
    title: '',
    date: '',
    startTime: '',
    duration: '',
    price: '',
    maxParticipants: ''
  };
};

const save = async () => {
  if (!validateForm()) return;

  loading.value.save = true;
  try {
    // Format data for API
    const eventData = {
      title: editedItem.value.title.trim(),
      date: editedItem.value.date,
      startTime: `${editedItem.value.date}T${editedItem.value.startTime}`,
      duration: Math.floor(editedItem.value.duration),
      location: (editedItem.value.location || '').trim(),
      room: (editedItem.value.room || '').trim(),
      description: (editedItem.value.description || '').trim(),
      price: Math.max(0, Math.floor(editedItem.value.price)),
      maxBookings: Math.max(1, Math.floor(editedItem.value.maxParticipants)),
      visibility: editedItem.value.visible
    };

    console.log('Formatted event data:', eventData);

    if (editedIndex.value > -1) {
      const updatedEvent = await apiService.updateEvent(events.value[editedIndex.value].id, eventData);
      Object.assign(events.value[editedIndex.value], updatedEvent);
      notificationStore.success('Termin erfolgreich aktualisiert');
    } else {
      const newEvent = await apiService.createEvent(eventData);
      events.value.push(newEvent);
      notificationStore.success('Termin erfolgreich erstellt');
    }
    close();
  } catch (error) {
    console.error('Error saving event:', error);
    notificationStore.error(`Fehler beim Speichern des Termins: ${error.message}`);
  } finally {
    loading.value.save = false;
  }
};

onMounted(fetchEvents);
</script>

<template>
  <div class="admin-view container-fluid py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-primary d-flex justify-content-between align-items-center py-3">
        <h5 class="card-title mb-0 text-white">Termine verwalten</h5>
        <button
          class="btn btn-light"
          @click="dialog = true"
        >
          <i class="bi bi-plus-lg me-2"></i>
          Neuer Termin
        </button>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Titel</th>
                <th>Datum</th>
                <th>Startzeit</th>
                <th>Dauer</th>
                <th>Preis</th>
                <th>Teilnehmer</th>
                <th>Sichtbar</th>
                <th class="d-none d-md-table-cell">Beschreibung</th>
                <th class="text-end">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading.list">
                <td colspan="9" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Termine werden geladen...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="events.length === 0">
                <td colspan="9" class="text-center py-4">
                  Keine Termine vorhanden
                </td>
              </tr>
              <tr v-for="item in events" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.startTime }}</td>
                <td>{{ item.duration }} Min.</td>
                <td>{{ item.price }}€</td>
                <td>{{ item.maxParticipants }}</td>
                <td>
                  <span v-if="item.visible" class="badge bg-success">Ja</span>
                  <span v-else class="badge bg-secondary">Nein</span>
                </td>
                <td class="d-none d-md-table-cell">{{ item.description }}</td>
                <td class="text-end">
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-info btn-sm d-flex align-items-center"
                      @click="showDetails(item)"
                      :disabled="loading.delete"
                      title="Details anzeigen"
                    >
                      👁️
                    </button>
                    <button
                      class="btn btn-outline-primary btn-sm d-flex align-items-center"
                      @click="editItem(item)"
                      :disabled="loading.delete"
                      title="Bearbeiten"
                    >
                      ✏️
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm d-flex align-items-center"
                      @click="deleteItem(item)"
                      :disabled="loading.delete"
                      title="Löschen"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Dialog -->
    <div
      v-if="dialog"
      class="modal fade show"
      style="display: block; z-index: 1050"
      tabindex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-backdrop fade show"></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editedIndex > -1 ? 'Termin bearbeiten' : 'Neuer Termin' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="close"
              :disabled="loading.save"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="save" ref="formRef" class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="title" class="form-label">Titel</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.title }"
                  id="title"
                  v-model="editedItem.title"
                  required
                >
                <div class="invalid-feedback">{{ errors.title }}</div>
              </div>

              <div class="mb-3">
                <label for="date" class="form-label">Datum</label>
                <input
                  type="date"
                  class="form-control"
                  :class="{ 'is-invalid': errors.date }"
                  id="date"
                  v-model="editedItem.date"
                  required
                >
                <div class="invalid-feedback">{{ errors.date }}</div>
              </div>

              <div class="mb-3">
                <label for="startTime" class="form-label">Startzeit</label>
                <input
                  type="time"
                  class="form-control"
                  :class="{ 'is-invalid': errors.startTime }"
                  id="startTime"
                  v-model="editedItem.startTime"
                  required
                >
                <div class="invalid-feedback">{{ errors.startTime }}</div>
              </div>

              <div class="mb-3">
                <label for="duration" class="form-label">Dauer (Minuten)</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': errors.duration }"
                  id="duration"
                  v-model="editedItem.duration"
                  required
                >
                  <option v-for="minutes in [15, 30, 45, 60, 75, 90, 105, 120]" :key="minutes" :value="minutes">
                    {{ minutes }} Minuten
                  </option>
                </select>
                <div class="invalid-feedback">{{ errors.duration }}</div>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Preis (€)</label>
                <input
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors.price }"
                  id="price"
                  v-model.number="editedItem.price"
                  min="0"
                  step="1"
                  required
                >
                <div class="invalid-feedback">{{ errors.price }}</div>
              </div>

              <div class="mb-3">
                <label for="maxParticipants" class="form-label">Maximale Teilnehmerzahl</label>
                <input
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors.maxParticipants }"
                  id="maxParticipants"
                  v-model.number="editedItem.maxParticipants"
                  min="1"
                  step="1"
                  required
                >
                <div class="invalid-feedback">{{ errors.maxParticipants }}</div>
              </div>

              <div class="mb-3">
                <label for="location" class="form-label">Ort</label>
                <input
                  type="text"
                  class="form-control"
                  id="location"
                  v-model="editedItem.location"
                >
              </div>

              <div class="mb-3">
                <label for="room" class="form-label">Raum</label>
                <input
                  type="text"
                  class="form-control"
                  id="room"
                  v-model="editedItem.room"
                >
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Beschreibung</label>
                <textarea
                  class="form-control"
                  id="description"
                  v-model="editedItem.description"
                  rows="3"
                ></textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="visible"
                    v-model="editedItem.visible"
                  >
                  <label class="form-check-label" for="visible">Termin sichtbar</label>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="close"
              :disabled="loading.save"
            >
              Abbrechen
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="save"
              :disabled="loading.save"
            >
              <span
                v-if="loading.save"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ editedIndex > -1 ? 'Speichern' : 'Erstellen' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <EventDetailsModal
      v-if="selectedEvent"
      v-model="showDetailsModal"
      :event="selectedEvent"
    />
  </div>
</template>

<style lang="scss" scoped>
.admin-view {
  max-width: 100%;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.table {
  th, td {
    vertical-align: middle;
  }
}

.btn-group {
  .btn {
    padding: 0.25rem 0.5rem;
    
    i {
      font-size: 1rem;
    }
  }
}

.card {
  border: none;
  
  .card-header {
    border-bottom: none;
  }
}

@media (max-width: 768px) {
  .btn-group {
    .btn {
      padding: 0.375rem 0.75rem;
    }
  }
}
</style>
