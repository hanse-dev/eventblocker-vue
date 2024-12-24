import { useAuthStore } from '../stores/auth';

const API_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.authStore = useAuthStore();
  }

  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const authHeader = options.requiresAuth ? this.authStore.getAuthHeader() : {};
    console.log('Auth header for request:', authHeader);

    const headers = {
      'Content-Type': 'application/json',
      ...authHeader,
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
        method: options.method || 'GET',
        headers,
        body: options.body,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      // Check if there's content to parse
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('API Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: responseData
        });
        return responseData;
      }

      // For empty responses (like DELETE)
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
      method: 'GET'
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
      body: JSON.stringify(bookingData)
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
