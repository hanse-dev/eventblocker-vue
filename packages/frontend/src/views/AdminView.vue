<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notification';
import { apiService } from '../services/api';
import { config } from '../config';

const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const events = ref([]);
const loading = ref({
  list: false,
  save: false,
  delete: false
});

const dialog = ref(false);
const editedItem = ref({
  title: '',
  start: '',
  end: '',
  description: ''
});
const editedIndex = ref(-1);

const formRef = ref(null);
const errors = ref({
  title: '',
  start: '',
  end: '',
  description: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    title: '',
    start: '',
    end: '',
    description: ''
  };

  if (!editedItem.value.title) {
    errors.value.title = 'Dieses Feld ist erforderlich';
    isValid = false;
  } else if (editedItem.value.title.length < 3) {
    errors.value.title = 'Titel muss mindestens 3 Zeichen lang sein';
    isValid = false;
  }

  if (!editedItem.value.start) {
    errors.value.start = 'Datum und Uhrzeit sind erforderlich';
    isValid = false;
  }

  if (!editedItem.value.end) {
    errors.value.end = 'Datum und Uhrzeit sind erforderlich';
    isValid = false;
  } else if (new Date(editedItem.value.end) <= new Date(editedItem.value.start)) {
    errors.value.end = 'Endzeit muss nach Startzeit liegen';
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

const close = () => {
  dialog.value = false;
  editedIndex.value = -1;
  editedItem.value = {
    title: '',
    start: '',
    end: '',
    description: ''
  };
  errors.value = {
    title: '',
    start: '',
    end: '',
    description: ''
  };
};

const save = async () => {
  if (!validateForm()) return;

  loading.value.save = true;
  try {
    if (editedIndex.value > -1) {
      const updatedEvent = await apiService.updateEvent(
        events.value[editedIndex.value].id,
        editedItem.value
      );
      Object.assign(events.value[editedIndex.value], updatedEvent);
      notificationStore.success('Termin erfolgreich aktualisiert');
    } else {
      const newEvent = await apiService.createEvent(editedItem.value);
      events.value.push(newEvent);
      notificationStore.success('Termin erfolgreich erstellt');
    }
    close();
  } catch (error) {
    notificationStore.error('Fehler beim Speichern des Termins');
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
                <th>Start</th>
                <th>Ende</th>
                <th class="d-none d-md-table-cell">Beschreibung</th>
                <th class="text-end">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading.list">
                <td colspan="5" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Termine werden geladen...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="events.length === 0">
                <td colspan="5" class="text-center py-4">
                  Keine Termine vorhanden
                </td>
              </tr>
              <tr v-else v-for="item in events" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ formatDateTime(item.start) }}</td>
                <td>{{ formatDateTime(item.end) }}</td>
                <td class="d-none d-md-table-cell">{{ item.description }}</td>
                <td class="text-end">
                  <div class="btn-group">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="editItem(item)"
                      :disabled="loading.delete"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm"
                      @click="deleteItem(item)"
                      :disabled="loading.delete"
                    >
                      <i class="bi bi-trash"></i>
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
                <label for="start" class="form-label">Start</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  :class="{ 'is-invalid': errors.start }"
                  id="start"
                  v-model="editedItem.start"
                  required
                >
                <div class="invalid-feedback">{{ errors.start }}</div>
              </div>

              <div class="mb-3">
                <label for="end" class="form-label">Ende</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  :class="{ 'is-invalid': errors.end }"
                  id="end"
                  v-model="editedItem.end"
                  required
                >
                <div class="invalid-feedback">{{ errors.end }}</div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Beschreibung</label>
                <textarea
                  class="form-control"
                  :class="{ 'is-invalid': errors.description }"
                  id="description"
                  v-model="editedItem.description"
                  rows="3"
                ></textarea>
                <div class="invalid-feedback">{{ errors.description }}</div>
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
