import { apiService } from './api'

export const authService = {
  login: async (credentials) => {
    return await apiService.post('/auth/login', credentials)
  },
  
  register: async (userData) => {
    return await apiService.post('/auth/register', userData)
  },
  
  logout: async () => {
    return await apiService.post('/auth/logout')
  },
  
  refreshToken: async (refreshToken) => {
    return await apiService.post('/auth/refresh', { refreshToken })
  },
  
  getCurrentUser: async () => {
    return await apiService.get('/auth/me')
  },
  
  updateProfile: async (userData) => {
    return await apiService.put('/auth/profile', userData)
  },
  
  changePassword: async (passwordData) => {
    return await apiService.put('/auth/password', passwordData)
  },
  
  forgotPassword: async (email) => {
    return await apiService.post('/auth/forgot-password', { email })
  },
  
  resetPassword: async (token, password) => {
    return await apiService.post('/auth/reset-password', { token, password })
  }
}
