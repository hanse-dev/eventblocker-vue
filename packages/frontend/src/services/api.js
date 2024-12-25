import { useAuthStore } from '../stores/auth';

// In production, use relative URLs to automatically use the same domain
const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
  constructor() {
    this.authStore = useAuthStore();
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const authHeader = options.requiresAuth ? this.authStore.getAuthHeader() : {};

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
          ...options.headers
        },
        body: options.body,
        credentials: 'include' // Include cookies for session handling
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized access
          this.authStore.clearAuth();
          throw new Error('Unauthorized access. Please log in.');
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null;
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
  async getEvents(includeHidden = false) {
    return this.request('/events', { 
      method: 'GET',
      requiresAuth: true
    });
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
      requiresAuth: true
    });
  }

  async getEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'GET',
      requiresAuth: true
    });
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
      requiresAuth: true
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }

  async bookEvent(id, bookingData) {
    return this.request(`/events/${id}/book`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
      requiresAuth: true
    });
  }

  async getEventBookings(id) {
    return this.request(`/events/${id}/bookings`, {
      method: 'GET',
      requiresAuth: true
    });
  }

  async deleteBooking(eventId, bookingId) {
    return this.request(`/events/${eventId}/bookings/${bookingId}`, {
      method: 'DELETE',
      requiresAuth: true
    });
  }
}

export const apiService = new ApiService();
export default apiService;
