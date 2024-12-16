<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  appointment: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'book']);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const form = ref({
  name: '',
  email: '',
  phone: ''
});

const errors = ref({
  name: '',
  email: '',
  phone: ''
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: '',
    email: '',
    phone: ''
  };

  if (!form.value.name) {
    errors.value.name = 'Name ist erforderlich';
    isValid = false;
  }

  if (!form.value.email) {
    errors.value.email = 'E-Mail ist erforderlich';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'E-Mail muss gültig sein';
    isValid = false;
  }

  if (!form.value.phone) {
    errors.value.phone = 'Telefon ist erforderlich';
    isValid = false;
  }

  return isValid;
};

const submitForm = () => {
  if (!validateForm()) return;

  emit('book', {
    ...form.value,
    appointmentId: props.appointment.id
  });
  emit('update:modelValue', false);
};

// Reset form when dialog closes
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    form.value = {
      name: '',
      email: '',
      phone: ''
    };
    errors.value = {
      name: '',
      email: '',
      phone: ''
    };
  }
});
</script>

<template>
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
          <h5 class="modal-title">Termin buchen</h5>
          <button
            type="button"
            class="btn-close"
            @click="dialog = false"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="appointment-details mb-4">
            <h5 class="mb-3">{{ appointment.title }}</h5>
            <div class="d-flex align-items-center text-muted mb-2">
              <i class="bi bi-calendar me-2"></i>
              <span>{{ new Date(appointment.date).toLocaleDateString('de-DE') }}</span>
            </div>
            <div class="d-flex align-items-center text-muted">
              <i class="bi bi-clock me-2"></i>
              <span>{{ new Date(appointment.startTime).toLocaleTimeString('de-DE', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) }}</span>
            </div>
          </div>

          <form @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  id="name"
                  v-model="form.name"
                  placeholder="Name"
                  required
                >
                <label for="name">
                  <i class="bi bi-person me-2"></i>Name
                </label>
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>
            </div>

            <div class="mb-3">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  id="email"
                  v-model="form.email"
                  placeholder="E-Mail"
                  required
                >
                <label for="email">
                  <i class="bi bi-envelope me-2"></i>E-Mail
                </label>
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>
            </div>

            <div class="mb-3">
              <div class="form-floating">
                <input
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors.phone }"
                  id="phone"
                  v-model="form.phone"
                  placeholder="Telefon"
                  required
                >
                <label for="phone">
                  <i class="bi bi-telephone me-2"></i>Telefon
                </label>
                <div class="invalid-feedback">{{ errors.phone }}</div>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="dialog = false"
          >
            Abbrechen
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="submitForm"
          >
            <i class="bi bi-calendar-check me-2"></i>
            Buchen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.form-floating {
  > label {
    padding-left: 2.5rem;
  }
  
  .bi {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }
}

.form-control {
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

.appointment-details {
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  
  .bi {
    font-size: 1.1rem;
  }
}
</style>
