import { apiService } from './api'

export const cartService = {
  getCart: async () => {
    return await apiService.get('/cart')
  },
  
  addToCart: async (productId, quantity = 1) => {
    return await apiService.post('/cart/items', { productId, quantity })
  },
  
  updateCartItem: async (itemId, quantity) => {
    return await apiService.put(`/cart/items/${itemId}`, { quantity })
  },
  
  removeFromCart: async (itemId) => {
    return await apiService.delete(`/cart/items/${itemId}`)
  },
  
  clearCart: async () => {
    return await apiService.delete('/cart')
  },
  
  applyCoupon: async (couponCode) => {
    return await apiService.post('/cart/coupon', { code: couponCode })
  },
  
  removeCoupon: async () => {
    return await apiService.delete('/cart/coupon')
  }
}