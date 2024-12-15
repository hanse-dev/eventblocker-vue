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

const drawer = ref(false);
const dialog = ref(false);
const editedItem = ref({
  title: '',
  start: '',
  end: '',
  description: ''
});
const editedIndex = ref(-1);

const formRef = ref(null);
const rules = {
  required: v => !!v || 'Dieses Feld ist erforderlich',
  title: v => v.length >= 3 || 'Titel muss mindestens 3 Zeichen lang sein',
  dateTime: v => !!v || 'Datum und Uhrzeit sind erforderlich',
  endAfterStart: () => {
    if (!editedItem.value.start || !editedItem.value.end) return true;
    return new Date(editedItem.value.end) > new Date(editedItem.value.start) || 
      'Endzeit muss nach Startzeit liegen';
  }
};

const headers = [
  { 
    title: 'Titel',
    key: 'title',
    sortable: true
  },
  { 
    title: 'Start',
    key: 'start',
    sortable: true,
    align: 'start'
  },
  { 
    title: 'Ende',
    key: 'end',
    sortable: true,
    align: 'start'
  },
  { 
    title: 'Beschreibung',
    key: 'description',
    sortable: false,
    align: 'start',
    class: 'd-none d-sm-table-cell'
  },
  { 
    title: 'Aktionen',
    key: 'actions',
    sortable: false,
    align: 'end'
  }
];

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
};

const save = async () => {
  const { valid } = await formRef.value.validate();
  
  if (!valid) return;

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
  <div class="admin-view">
    <v-card :class="{ 
      'elevation-1': $vuetify.display.smAndDown,
      'elevation-2': $vuetify.display.mdAndUp,
      'mx-auto': $vuetify.display.mdAndUp
    }">
      <v-toolbar
        :color="$vuetify.display.smAndDown ? 'transparent' : 'primary'"
        :flat="$vuetify.display.smAndDown"
      >
        <v-toolbar-title :class="{
          'text-primary': $vuetify.display.smAndDown,
          'text-white': $vuetify.display.mdAndUp
        }">
          Termine verwalten
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :variant="$vuetify.display.smAndDown ? 'outlined' : 'text'"
          prepend-icon="mdi-plus"
          @click="dialog = true"
          :class="{
            'text-white': $vuetify.display.mdAndUp
          }"
        >
          Neuer Termin
        </v-btn>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="events"
        :loading="loading.list"
        loading-text="Termine werden geladen..."
        :hover="$vuetify.display.mdAndUp"
        density="comfortable"
      >
        <template v-slot:item.start="{ item }">
          <div :class="{ 'text-caption': $vuetify.display.smAndDown }">
            {{ formatDateTime(item.start) }}
          </div>
        </template>

        <template v-slot:item.end="{ item }">
          <div :class="{ 'text-caption': $vuetify.display.smAndDown }">
            {{ formatDateTime(item.end) }}
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="primary"
            class="mr-1"
            @click="editItem(item)"
          ></v-btn>
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            :loading="loading.delete"
            @click="deleteItem(item)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.display.smAndDown"
      :max-width="$vuetify.display.smAndDown ? undefined : '600px'"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          :color="$vuetify.display.smAndDown ? 'primary' : undefined"
          :dark="$vuetify.display.smAndDown"
        >
          <v-btn
            icon
            @click="close"
            v-if="$vuetify.display.smAndDown"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ editedIndex > -1 ? 'Termin bearbeiten' : 'Neuer Termin' }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items v-if="$vuetify.display.smAndDown">
            <v-btn
              variant="text"
              :loading="loading.save"
              :disabled="loading.save"
              @click="save"
            >
              Speichern
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <v-container>
            <v-form ref="formRef">
              <v-text-field
                v-model="editedItem.title"
                label="Titel"
                :rules="[rules.required, rules.title]"
                :disabled="loading.save"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="editedItem.start"
                label="Startzeit"
                type="datetime-local"
                :rules="[rules.dateTime]"
                :disabled="loading.save"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-text-field
                v-model="editedItem.end"
                label="Endzeit"
                type="datetime-local"
                :rules="[rules.dateTime, rules.endAfterStart]"
                :disabled="loading.save"
                variant="outlined"
                class="mb-4"
              ></v-text-field>

              <v-textarea
                v-model="editedItem.description"
                label="Beschreibung"
                :disabled="loading.save"
                variant="outlined"
                auto-grow
                rows="3"
              ></v-textarea>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions v-if="!$vuetify.display.smAndDown">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="text"
            :disabled="loading.save"
            @click="close"
          >
            Abbrechen
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading.save"
            :disabled="loading.save"
            @click="save"
          >
            Speichern
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.admin-view {
  max-width: 100%;
}

@media (min-width: 960px) {
  .admin-view {
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .v-data-table {
    font-size: 0.875rem;
  }
  
  .v-btn {
    min-width: unset;
  }
}
</style>
