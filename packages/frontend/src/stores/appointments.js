import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointments', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchAppointments() {
      this.loading = true
      try {
        const response = await fetch('/api/dates')
        this.appointments = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
