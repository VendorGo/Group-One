import api from './api';

export const adminService = {
  stats: () => api.get('/admin/stats'),
  users: () => api.get('/admin/users'),
  items: () => api.get('/admin/items'),
  orders: () => api.get('/admin/orders'),
  pickupStations: () => api.get('/admin/pickup-stations'),
  createPickupStation: (data) => api.post('/admin/pickup-stations', data),
  updatePickupStation: (id, data) => api.put(`/admin/pickup-stations/${id}`, data),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  activePickupStations: () => api.get('/pickup-stations')
};
