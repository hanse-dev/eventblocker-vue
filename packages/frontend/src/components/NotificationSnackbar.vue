<script setup>
import { useNotificationStore } from '../stores/notification';
import { watch } from 'vue';

const notificationStore = useNotificationStore();

// Auto-hide the notification after timeout
watch(() => notificationStore.show, (newValue) => {
  if (newValue && notificationStore.timeout > 0) {
    setTimeout(() => {
      notificationStore.clearNotification();
    }, notificationStore.timeout);
  }
});
</script>

<template>
  <div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
    <div
      v-if="notificationStore.show"
      class="toast show"
      :class="{
        'bg-success': notificationStore.type === 'success',
        'bg-danger': notificationStore.type === 'error',
        'bg-warning': notificationStore.type === 'warning',
        'bg-info': notificationStore.type === 'info'
      }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <i
          class="bi me-2"
          :class="{
            'bi-check-circle-fill text-success': notificationStore.type === 'success',
            'bi-x-circle-fill text-danger': notificationStore.type === 'error',
            'bi-exclamation-triangle-fill text-warning': notificationStore.type === 'warning',
            'bi-info-circle-fill text-info': notificationStore.type === 'info'
          }"
        ></i>
        <strong class="me-auto">{{ 
          notificationStore.type.charAt(0).toUpperCase() + notificationStore.type.slice(1)
        }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="notificationStore.clearNotification"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body text-white">
        {{ notificationStore.message }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.toast-container {
  z-index: 1056;
}

.toast {
  min-width: 300px;
  
  .btn-close {
    filter: brightness(0) invert(1);
    opacity: 0.75;
    
    &:hover {
      opacity: 1;
    }
  }
}
</style>
