<script setup>
import { ref, computed } from 'vue';
import BookingsList from './BookingsList.vue';
import EventDetailsModal from './EventDetailsModal.vue';
import 'bootstrap-icons/font/bootstrap-icons.css';

const props = defineProps({
  appointments: {
    type: Array,
    required: true,
    default: () => []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['edit', 'delete', 'book']);
const selectedEventId = ref(null);
const showDetailsModal = ref(false);
const selectedEvent = ref(null);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('de-DE');
};

const formatTime = (timeStr) => {
  return new Date(timeStr).toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const toggleBookings = (eventId) => {
  selectedEventId.value = selectedEventId.value === eventId ? null : eventId;
};

const showDetails = (event) => {
  selectedEvent.value = event;
  showDetailsModal.value = true;
};

const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedAppointments = computed(() => {
  const appointments = Array.isArray(props.appointments) ? props.appointments : [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return appointments.slice(start, end);
});

const totalPages = computed(() => {
  const appointments = Array.isArray(props.appointments) ? props.appointments : [];
  return Math.ceil(appointments.length / itemsPerPage);
});

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const hasAppointments = computed(() => {
  return Array.isArray(props.appointments) && props.appointments.length > 0;
});
</script>

<template>
  <div class="appointment-list">
    <div v-if="!hasAppointments" class="text-center py-4">
      <p class="text-muted mb-0">Keine Termine verfügbar</p>
    </div>
    <div v-else>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Datum</th>
              <th>Zeit</th>
              <th>Ort</th>
              <th>Raum</th>
              <th class="text-end">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!Array.isArray(props.appointments)">
              <td colspan="6" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Termine werden geladen...</span>
                </div>
              </td>
            </tr>
            <template v-else>
              <tr v-for="item in paginatedAppointments" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ formatTime(item.startTime) }}</td>
                <td>{{ item.location }}</td>
                <td>{{ item.room }}</td>
                <td class="text-end">
                  <div class="btn-group">
                    <button
                      v-if="isAdmin"
                      class="btn btn-outline-primary btn-sm d-flex align-items-center"
                      @click="emit('edit', item)"
                      title="Bearbeiten"
                    >
                      ✏️
                    </button>
                    <button
                      v-if="isAdmin"
                      class="btn btn-outline-info btn-sm d-flex align-items-center"
                      @click="showDetails(item)"
                      title="Details anzeigen"
                    >
                      👁️
                    </button>
                    <button
                      v-if="isAdmin"
                      class="btn btn-outline-danger btn-sm d-flex align-items-center"
                      @click="emit('delete', item)"
                      title="Löschen"
                    >
                      🗑️
                    </button>
                    <button
                      v-if="!isAdmin && item.status === 'available'"
                      class="btn btn-success btn-sm d-flex align-items-center gap-1"
                      @click="emit('book', item)"
                    >
                      📅 Buchen
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav v-if="totalPages > 1" aria-label="Termine Navigation" class="mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage--"
              aria-label="Vorherige"
            >
              <i class="bi bi-chevron-left"></i>
            </a>
          </li>
          <li
            v-for="page in pages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage = page"
            >
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage++"
              aria-label="Nächste"
            >
              <i class="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Event Details Modal -->
  <EventDetailsModal
    v-if="selectedEvent"
    v-model="showDetailsModal"
    :event="selectedEvent"
  />
</template>

<style lang="scss" scoped>
.table {
  th {
    border-top: none;
    background-color: #f8f9fa;
  }
  
  td {
    vertical-align: middle;
  }
}

.btn-group {
  .btn {
    padding: 0.25rem 0.5rem;
    
    &:hover {
      transform: translateY(-1px);
    }
    
    transition: all 0.2s ease-in-out;
  }
}

.pagination {
  .page-link {
    color: var(--bs-primary);
    
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
    }
  }
  
  .active .page-link {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
  }
}

.spinner-border {
  width: 2rem;
  height: 2rem;
}
</style>
