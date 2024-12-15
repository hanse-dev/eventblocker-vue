<script setup>
import { ref, computed } from 'vue';

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

const rules = {
  required: v => !!v || 'Dieses Feld ist erforderlich',
  email: v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
};

const submitForm = () => {
  emit('book', {
    ...form.value,
    appointmentId: props.appointment.id
  });
  emit('update:modelValue', false);
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Termin buchen</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3>{{ appointment.title }}</h3>
              <p>{{ new Date(appointment.date).toLocaleDateString('de-DE') }}</p>
              <p>{{ new Date(appointment.startTime).toLocaleTimeString('de-DE', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) }}</p>
            </v-col>
          </v-row>

          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="E-Mail"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.phone"
                  label="Telefon"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          text
          @click="dialog = false"
        >
          Abbrechen
        </v-btn>
        <v-btn
          color="primary"
          @click="submitForm"
        >
          Buchen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
