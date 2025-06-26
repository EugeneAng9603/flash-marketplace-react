import { apiService } from './api'

export const orderService = {
  createOrder: async (orderData) => {
    return await apiService.post('/orders', orderData)
  },
  
  getOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiService.get(`/orders?${queryString}`)
  },
  
  getOrder: async (orderId) => {
    return await apiService.get(`/orders/${orderId}`)
  },
  
  cancelOrder: async (orderId) => {
    return await apiService.put(`/orders/${orderId}/cancel`)
  },
  
  trackOrder: async (orderId) => {
    return await apiService.get(`/orders/${orderId}/tracking`)
  }
}