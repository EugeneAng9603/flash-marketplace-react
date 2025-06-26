// src/store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  sidebarOpen: false,
  mobileMenuOpen: false,
  notifications: [],
  loading: {
    global: false,
    components: {}
  },
  modals: {
    loginModal: false,
    cartModal: false,
    productModal: false
  },
  toast: {
    show: false,
    message: '',
    type: 'info'
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    openModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = true
    },
    closeModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = false
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false
      })
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload
      state.loading.components[component] = loading
    },
    showToast: (state, action) => {
      const { message, type = 'info' } = action.payload
      state.toast = {
        show: true,
        message,
        type
      }
    },
    hideToast: (state) => {
      state.toast.show = false
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      })
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      )
    },
    clearNotifications: (state) => {
      state.notifications = []
    }
  }
})

export const {
  toggleTheme,
  toggleSidebar,
  toggleMobileMenu,
  openModal,
  closeModal,
  closeAllModals,
  setGlobalLoading,
  setComponentLoading,
  showToast,
  hideToast,
  addNotification,
  removeNotification,
  clearNotifications
} = uiSlice.actions
export default uiSlice.reducer