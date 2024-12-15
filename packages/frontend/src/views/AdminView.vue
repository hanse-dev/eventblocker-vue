<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AppointmentList from '../components/AppointmentList.vue';
import AppointmentForm from '../components/AppointmentForm.vue';

const router = useRouter();
const authStore = useAuthStore();

const appointments = ref([]);
const showForm = ref(false);
const editingAppointment = ref(null);

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  router.push('/login');
}

const fetchAppointments = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/dates', {
      headers: authStore.getAuthHeader()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }
    
    appointments.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
  }
};

const handleEdit = (appointment) => {
  editingAppointment.value = appointment;
  showForm.value = true;
};

const handleDelete = async (appointment) => {
  if (!confirm('Sind Sie sicher, dass Sie diesen Termin löschen möchten?')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/dates/${appointment.id}`, {
      method: 'DELETE',
      headers: authStore.getAuthHeader()
    });
    
    if (response.ok) {
      fetchAppointments();
      // TODO: Show success message
    }
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    // TODO: Show error message
  }
};

const handleSubmit = async (formData) => {
  try {
    const url = editingAppointment.value
      ? `http://localhost:3000/api/dates/${editingAppointment.value.id}`
      : 'http://localhost:3000/api/dates';
    
    const method = editingAppointment.value ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authStore.getAuthHeader()
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      showForm.value = false;
      editingAppointment.value = null;
      fetchAppointments();
      // TODO: Show success message
    }
  } catch (error) {
    console.error('Failed to save appointment:', error);
    // TODO: Show error message
  }
};

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchAppointments();
  }
});
</script>

<template>
  <div v-if="authStore.isAuthenticated">
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h1 class="text-h3">Termine verwalten</h1>
        <v-btn
          color="primary"
          @click="showForm = true; editingAppointment = null"
        >
          Neuer Termin
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showForm"
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editingAppointment ? 'Termin bearbeiten' : 'Neuer Termin' }}</span>
        </v-card-title>

        <v-card-text>
          <AppointmentForm
            :initial-data="editingAppointment || {}"
            @submit="handleSubmit"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="showForm = false"
          >
            Abbrechen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <AppointmentList
      :appointments="appointments"
      :is-admin="true"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>
