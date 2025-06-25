
import { apiService } from './api'

export const productService = {
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await apiService.get(`/products?${queryString}`)
  },
  
  getProduct: async (id) => {
    return await apiService.get(`/products/${id}`)
  },
  
  searchProducts: async (query, filters = {}) => {
    return await apiService.get('/products/search', {
      params: { q: query, ...filters }
    })
  },
  
  getCategories: async () => {
    return await apiService.get('/products/categories')
  },
  
  getFlashSales: async () => {
    return await apiService.get('/flash-sales')
  },
  
  getFlashSaleProducts: async (saleId) => {
    return await apiService.get(`/flash-sales/${saleId}/products`)
  }
}