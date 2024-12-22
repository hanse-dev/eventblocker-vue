<template>
  <div>
    <!-- Backdrop -->
    <div class="modal-backdrop"></div>
    
    <!-- Dialog -->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ appointment.title }}</h5>
        </div>
        <div class="modal-body">
          <!-- Event Details -->
          <div class="event-details">
            <div class="detail-grid">
              <div class="detail-item">
                <i class="bi bi-calendar me-2"></i>
                <span>{{ formatDate(appointment.date) }}</span>
              </div>
              <div class="detail-item">
                <i class="bi bi-clock me-2"></i>
                <span>{{ formatTime(appointment.startTime) }}</span>
              </div>
              <div class="detail-item">
                <i class="bi bi-hourglass me-2"></i>
                <span>{{ appointment.duration }} Min.</span>
              </div>
              <div class="detail-item">
                <i class="bi bi-currency-euro me-2"></i>
                <span>{{ appointment.price }}€</span>
              </div>
            </div>
            <div class="detail-location mt-2">
              <div class="detail-item">
                <i class="bi bi-geo-alt me-2"></i>
                <span>{{ appointment.location || 'Kein Ort' }}</span>
              </div>
              <div class="detail-item">
                <i class="bi bi-door-closed me-2"></i>
                <span>{{ appointment.room || 'Kein Raum' }}</span>
              </div>
            </div>
          </div>

          <!-- Booking Form -->
          <form @submit.prevent="handleSubmit" class="booking-form">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label required">Vorname</label>
                  <input
                    v-model="formData.firstName"
                    type="text"
                    class="form-control"
                    required
                    placeholder="Ihr Vorname"
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label required">Nachname</label>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    class="form-control"
                    required
                    placeholder="Ihr Nachname"
                    :disabled="loading"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label required">E-Mail</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                    required
                    placeholder="ihre@email.de"
                    :disabled="loading"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Telefon</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    class="form-control"
                    placeholder="Optional"
                    :disabled="loading"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Anmerkungen</label>
              <textarea
                v-model="formData.notes"
                class="form-control"
                rows="3"
                placeholder="Optional"
                :disabled="loading"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="d-flex gap-3 w-100 justify-content-end">
            <button 
              type="button" 
              class="btn btn-light" 
              @click="$emit('close')"
              :disabled="loading"
            >
              <i class="bi bi-x-lg me-1"></i>Abbrechen
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="handleSubmit"
              :disabled="loading"
            >
              <div v-if="loading" class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="bi bi-check-lg me-1"></i>
              {{ loading ? 'Wird gebucht...' : 'Jetzt buchen' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: ''
});

const handleSubmit = () => {
  if (!formData.value.firstName || !formData.value.lastName || !formData.value.email) {
    return;
  }
  
  emit('submit', {
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    email: formData.value.email,
    phone: formData.value.phone || null,
    notes: formData.value.notes || null
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return time.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1055;
}

.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  margin: 0;
  z-index: 1056;
  max-height: 90vh;
}

.modal-content {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  background-color: #f8f9fa;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 1.5rem;
  flex-shrink: 0;
}

.modal-title {
  font-size: 1.25rem;
  color: #212529;
  margin: 0;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modal-body {
  padding: 1.5rem;
  background-color: #f8f9fa;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  padding: 1rem 1.5rem;
  flex-shrink: 0;
}

.event-details {
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  margin-bottom: 1.5rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.detail-location {
  border-top: 1px solid #dee2e6;
  padding-top: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
}

.detail-item i {
  width: 1.5rem;
  color: #6c757d;
}

.booking-form .form-group {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background-color: #fff;
}

.booking-form .row {
  margin: 0 -0.5rem;
}

.booking-form .row > div {
  padding: 0 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-label.required::after {
  content: " *";
  color: #dc3545;
}

.btn {
  padding: 0.5rem 1rem;
  font-weight: 500;
}

.btn-light {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.btn-light:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

@media (max-width: 576px) {
  .modal-dialog {
    width: 100%;
    height: 100vh;
    margin: 0;
    max-width: none;
    max-height: none;
    top: 0;
    transform: translate(-50%, 0);
  }

  .modal-content {
    height: 100vh;
    border-radius: 0;
    border: none;
  }

  .modal-body {
    padding: 1rem;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .booking-form .row {
    flex-direction: column;
  }

  .booking-form .row > div {
    width: 100%;
    padding: 0;
  }

  .modal-footer {
    padding: 1rem;
  }

  .modal-footer .d-flex {
    flex-direction: column;
    gap: 0.5rem !important;
  }

  .modal-footer .btn {
    width: 100%;
  }
}
</style>
