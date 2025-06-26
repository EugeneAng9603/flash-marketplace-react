import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name',
    search: ''
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  }
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload.products
      state.pagination = action.payload.pagination
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    updateInventory: (state, action) => {
      const { productId, quantity } = action.payload
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.inventory -= quantity
      }
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCurrentProduct,
  updateInventory,
  updateFilters,
  clearFilters,
  clearError
} = productSlice.actions
export default productSlice.reducer


