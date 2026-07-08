import api from './api';

export const itemService = {
  getItems: (params) => api.get('/items', { params }),
  getItem: (id) => api.get(`/items/${id}`),
  getMyItems: () => api.get('/items/supplier/my-items'),
  createItem: (formData) => api.post('/items', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateItem: (id, formData) => api.put(`/items/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteItem: (id) => api.delete(`/items/${id}`),
  getCategories: () => api.get('/categories')
};
