import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flashSales: [],
  activeDeals: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    sortBy: 'discount'
  }
}

const flashSaleSlice = createSlice({
  name: 'flashSales',
  initialState,
  reducers: {
    fetchFlashSalesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchFlashSalesSuccess: (state, action) => {
      state.loading = false
      state.flashSales = action.payload
      state.activeDeals = action.payload.filter(sale => new Date(sale.endTime) > new Date())
    },
    fetchFlashSalesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateFlashSaleFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    updateFlashSaleStatus: (state, action) => {
      const { id, status } = action.payload
      const sale = state.flashSales.find(sale => sale.id === id)
      if (sale) {
        sale.status = status
        if (status === 'active') {
          state.activeDeals.push(sale)
        } else {
          state.activeDeals = state.activeDeals.filter(sale => sale.id !== id)
        }
      }
    },
    updateSaleStock: (state, action) => {
      const { id, stock } = action.payload
      const sale = state.flashSales.find(sale => sale.id === id)
      if (sale) {
        sale.stock = stock
      }
    },
    expireSale: (state, action) => {
      const saleId = action.payload
      state.activeDeals = state.activeDeals.filter(sale => sale.id !== saleId)
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const {
  fetchFlashSalesStart,
  fetchFlashSalesSuccess,
  fetchFlashSalesFailure,
  updateFlashSaleFilters,
  updateFlashSaleStatus,
  updateSaleStock,
  expireSale,
  clearError
} = flashSaleSlice.actions
export default flashSaleSlice.reducer

