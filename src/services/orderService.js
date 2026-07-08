import api from './api';

export const orderService = {
  placeOrder: (data) => api.post('/orders', data),
  myOrders: () => api.get('/orders/my-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
  confirmReceived: (id) => api.put(`/orders/${id}/confirm-received`),
  supplierOrders: () => api.get('/supplier/orders'),
  acceptOrder: (id) => api.put(`/supplier/orders/${id}/accept`),
  rejectOrder: (id) => api.put(`/supplier/orders/${id}/reject`),
  markPacked: (id) => api.put(`/supplier/orders/${id}/packed`),
  sendToStation: (id) => api.put(`/supplier/orders/${id}/send-to-station`),
  stationOrders: () => api.get('/station/orders'),
  markArrived: (id, note) => api.put(`/station/orders/${id}/arrived`, { note }),
  markReady: (id, note) => api.put(`/station/orders/${id}/ready`, { note }),
  markPickedUp: (id, note) => api.put(`/station/orders/${id}/picked-up`, { note })
};
