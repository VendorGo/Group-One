import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Axios interceptors run before each request. This one attaches the JWT token
// saved at login so protected backend routes can identify the current user.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vendergo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const uploadsUrl = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';

export default api;
