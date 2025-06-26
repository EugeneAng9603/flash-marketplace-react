// src/utils/constants.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
}

export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Flash Marketplace',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  DEBUG: import.meta.env.VITE_DEBUG === 'true'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  FLASH_SALES: '/flash-sales'
}

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  CART_ITEMS: 'cart_items'
}

export const FLASH_SALE_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  ENDED: 'ended'
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  INVENTORY_UPDATE: 'inventory_update',
  FLASH_SALE_START: 'flash_sale_start',
  FLASH_SALE_END: 'flash_sale_end',
  ORDER_UPDATE: 'order_update'
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
}

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  PHONE: /^\+?[\d\s-()]+$/
}

export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD'
}

export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  INPUT: 500,
  RESIZE: 100
}
