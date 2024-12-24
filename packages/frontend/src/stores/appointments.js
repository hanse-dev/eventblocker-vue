import { defineStore } from 'pinia'
import apiService from '../services/api'

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
        const response = await apiService.request('/events')
        this.appointments = response
      } catch (error) {
        console.error('API Error (/events):', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
