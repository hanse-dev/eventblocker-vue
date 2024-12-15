import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    message: '',
    type: 'info', // 'success', 'error', 'info', 'warning'
    show: false,
    timeout: 3000
  }),

  actions: {
    showNotification({ message, type = 'info', timeout = 3000 }) {
      this.message = message;
      this.type = type;
      this.timeout = timeout;
      this.show = true;

      setTimeout(() => {
        this.clearNotification();
      }, timeout);
    },

    clearNotification() {
      this.show = false;
      this.message = '';
    },

    success(message) {
      this.showNotification({ message, type: 'success' });
    },

    error(message) {
      this.showNotification({ message, type: 'error', timeout: 5000 });
    },

    info(message) {
      this.showNotification({ message, type: 'info' });
    },

    warning(message) {
      this.showNotification({ message, type: 'warning', timeout: 4000 });
    }
  }
});
