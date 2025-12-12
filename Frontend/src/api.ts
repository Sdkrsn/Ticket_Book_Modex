import axios from 'axios';

// Use Vite dev proxy by default to avoid CORS/mixed-content issues.
// You can still override with VITE_API_BASE if needed in other environments.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' }
});

export default api;
