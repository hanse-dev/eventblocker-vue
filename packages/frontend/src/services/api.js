import { useAuthStore } from '../stores/auth';

const API_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.authStore = useAuthStore();
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.authStore.getAuthHeader(),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Ein Fehler ist aufgetreten');
      }

      return response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  // Event endpoints
  async getEvents() {
    return this.request('/dates');
  }

  async createEvent(eventData) {
    return this.request('/dates', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/dates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData)
    });
  }

  async deleteEvent(id) {
    return this.request(`/dates/${id}`, {
      method: 'DELETE'
    });
  }

  async bookEvent(id, bookingData) {
    return this.request(`/dates/${id}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }
}

export const apiService = new ApiService();
