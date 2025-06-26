// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'
import flashSaleSlice from './slices/flashSaleSlice'
import uiSlice from './slices/uiSlices'

const rootReducer = combineReducers({
  auth: authSlice,
  products: productSlice,
  cart: cartSlice,
  flashSales: flashSaleSlice,
  ui: uiSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: import.meta.env.DEV
})


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export default store
