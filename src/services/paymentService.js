import api from './api';

export const paymentService = {
  initiate: (orderId) => api.post('/payments/initiate', { order_id: orderId }),
  process: (payload) => api.post('/payments/process', payload)
};
