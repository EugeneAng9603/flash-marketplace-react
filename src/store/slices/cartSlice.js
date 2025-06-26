// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        })
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateCartItem: (state, action) => {
      const { itemId, quantity } = action.payload
      const item = state.items.find(item => item.id === itemId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== itemId)
        }
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id)
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    calculateTotals: (state) => {
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, updateCartItem, clearCart, calculateTotals } = cartSlice.actions
export default cartSlice.reducer