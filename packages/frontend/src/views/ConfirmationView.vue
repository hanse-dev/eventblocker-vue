<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotificationStore } from '../stores/notification';
import config from '../config';

const route = useRoute();
const router = useRouter();
const notificationStore = useNotificationStore();
const appointment = ref(null);

onMounted(async () => {
  if (!route.params.id) {
    router.push('/');
    return;
  }

  try {
    const response = await fetch(`${config.apiUrl}/events/${route.params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch appointment');
    }
    appointment.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    notificationStore.error('Fehler beim Laden der Termindetails');
    router.push('/');
  }
});
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-sm">
          <div class="card-body text-center p-5">
            <h1 class="card-title mb-4">Buchung bestätigt</h1>

            <template v-if="appointment">
              <div class="confirmation-icon mb-4">
                <i class="bi bi-check-circle-fill text-success"></i>
              </div>

              <h2 class="h4 mb-4">
                Vielen Dank für Ihre Buchung!
              </h2>

              <div class="appointment-details">
                <div class="row g-3 mb-4">
                  <div class="col-12">
                    <div class="p-3 bg-light rounded">
                      <h3 class="h5 mb-3">Termindetails</h3>
                      <dl class="row mb-0">
                        <dt class="col-sm-4">Termin</dt>
                        <dd class="col-sm-8">{{ appointment.title }}</dd>

                        <dt class="col-sm-4">Datum</dt>
                        <dd class="col-sm-8">
                          {{ new Date(appointment.date).toLocaleDateString('de-DE') }}
                        </dd>

                        <dt class="col-sm-4">Uhrzeit</dt>
                        <dd class="col-sm-8">
                          {{ new Date(appointment.startTime).toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit'
                          }) }}
                        </dd>

                        <dt class="col-sm-4">Ort</dt>
                        <dd class="col-sm-8">
                          {{ appointment.location }}
                          <template v-if="appointment.room">
                            <br>
                            <small class="text-muted">Raum: {{ appointment.room }}</small>
                          </template>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="alert alert-info" role="alert">
                <i class="bi bi-envelope me-2"></i>
                Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
              </div>
            </template>

            <div class="mt-4">
              <button
                class="btn btn-primary"
                @click="router.push('/')"
              >
                <i class="bi bi-house me-2"></i>
                Zurück zur Startseite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.confirmation-icon {
  font-size: 4rem;
  line-height: 1;
  color: var(--bs-success);
}

.appointment-details {
  dl {
    dt {
      font-weight: 600;
      text-align: left;
    }
    
    dd {
      text-align: left;
      margin-bottom: 0;
    }
  }
}

.card {
  border: none;
  
  .card-body {
    @media (min-width: 768px) {
      padding: 3rem !important;
    }
  }
}

.alert {
  border: none;
  background-color: rgba(var(--bs-info-rgb), 0.1);
  color: var(--bs-info);
}
</style>
