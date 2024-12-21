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
      ...(options.requiresAuth ? this.authStore.getAuthHeader() : {}),
      ...options.headers
    };

    try {
      const requestBody = options.body ? JSON.parse(options.body) : undefined;
      console.log('API Request Details:', {
        url,
        method: options.method || 'GET',
        headers,
        body: requestBody
      });

      const response = await fetch(url, {
        ...options,
        headers
      });

      const responseData = await response.json();
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData
      });

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || `Server returned ${response.status}`);
      }

      return responseData;
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
    return this.request('/dates', { requiresAuth: false });
  }

  async createEvent(eventData) {
    console.log('Creating event with data:', eventData);
    return this.request('/dates', {
      method: 'POST',
      body: JSON.stringify(eventData),
      requiresAuth: true
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/dates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
      requiresAuth: true
    });
  }

  async deleteEvent(id) {
    return this.request(`/dates/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  async bookEvent(id, bookingData) {
    return this.request(`/dates/${id}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
      requiresAuth: false
    });
  }

  async getEventBookings(id) {
    return this.request(`/dates/${id}/bookings`, {
      requiresAuth: true
    });
  }
}

export const apiService = new ApiService();
