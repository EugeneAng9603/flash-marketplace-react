import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '@store/slices/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const { items, total, subtotal, tax, shipping, coupon, isLoading, error } = useSelector(
    (state) => state.cart
  )

  const addItem = useCallback(
    (product, quantity = 1) => {
      dispatch(addToCart({ product, quantity }))
    },
    [dispatch]
  )

  const updateItem = useCallback(
    (itemId, quantity) => {
      dispatch(updateCartItem({ itemId, quantity }))
    },
    [dispatch]
  )

  const removeItem = useCallback(
    (itemId) => {
      dispatch(removeFromCart(itemId))
    },
    [dispatch]
  )

  const clear = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const addCoupon = useCallback(
    (couponCode) => {
      dispatch(applyCoupon(couponCode))
    },
    [dispatch]
  )

  const removeCouponCode = useCallback(() => {
    dispatch(removeCoupon())
  }, [dispatch])

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }, [items])

  const isItemInCart = useCallback(
    (productId) => {
      return items.some((item) => item.product.id === productId)
    },
    [items]
  )

  const getItemQuantity = useCallback(
    (productId) => {
      const item = items.find((item) => item.product.id === productId)
      return item ? item.quantity : 0
    },
    [items]
  )

  return {
    items,
    total,
    subtotal,
    tax,
    shipping,
    coupon,
    isLoading,
    error,
    addItem,
    updateItem,
    removeItem,
    clear,
    addCoupon,
    removeCouponCode,
    getItemCount,
    isItemInCart,
    getItemQuantity
  }
}