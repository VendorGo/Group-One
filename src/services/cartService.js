import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addItem: (item_id, quantity = 1) => api.post('/cart/items', { item_id, quantity }),
  updateItem: (cartItemId, quantity) => api.put(`/cart/items/${cartItemId}`, { quantity }),
  deleteItem: (cartItemId) => api.delete(`/cart/items/${cartItemId}`),
  clearCart: () => api.delete('/cart/clear')
};
