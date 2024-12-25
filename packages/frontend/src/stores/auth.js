import { defineStore } from 'pinia';
import { config } from '../config';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null,
    error: null,
    loading: false
  }),
  
  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(`${config.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login fehlgeschlagen');
        }

        this.token = data.token;
        this.isAuthenticated = true;
        localStorage.setItem('token', data.token);
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      this.error = null;
      localStorage.removeItem('token');
    },

    clearAuth() {
      this.logout();
    },
    
    initAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },
    
    getAuthHeader() {
      return this.token ? {
        'Authorization': `Bearer ${this.token}`
      } : {};
    }
  }
});
