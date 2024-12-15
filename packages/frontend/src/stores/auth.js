import { defineStore } from 'pinia';

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
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
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
    
    initAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
      }
    },

    getAuthHeader() {
      return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }
  }
});
