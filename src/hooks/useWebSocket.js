import { useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { API_CONFIG, WEBSOCKET_EVENTS, LOCAL_STORAGE_KEYS } from '@utils/constants'
import { updateInventory } from '@store/slices/productSlice'
import { updateFlashSaleStatus } from '@store/slices/flashSaleSlice'
import toast from 'react-hot-toast'

export const useWebSocket = () => {
  const dispatch = useDispatch()
  const socketRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)

  const connect = useCallback(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    
    socketRef.current = io(API_CONFIG.WS_URL, {
      auth: {
        token
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      maxReconnectionAttempts: 5
    })

    const socket = socketRef.current

    socket.on(WEBSOCKET_EVENTS.CONNECT, () => {
      console.log('WebSocket connected')
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
        reconnectTimeoutRef.current = null
      }
    })

    socket.on(WEBSOCKET_EVENTS.DISCONNECT, () => {
      console.log('WebSocket disconnected')
    })

    socket.on(WEBSOCKET_EVENTS.INVENTORY_UPDATE, (data) => {
      dispatch(updateInventory(data))
      
      // Show toast notification for low stock
      if (data.quantity <= 5 && data.quantity > 0) {
        toast.warning(`Only ${data.quantity} left for ${data.productName}!`)
      } else if (data.quantity === 0) {
        toast.error(`${data.productName} is now out of stock!`)
      }
    })

    socket.on(WEBSOCKET_EVENTS.FLASH_SALE_START, (data) => {
      dispatch(updateFlashSaleStatus(data))
      toast.success(`🔥 Flash sale started: ${data.title}!`)
    })

    socket.on(WEBSOCKET_EVENTS.FLASH_SALE_END, (data) => {
      dispatch(updateFlashSaleStatus(data))
      toast.info(`Flash sale ended: ${data.title}`)
    })

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
      
      // Attempt to reconnect after delay
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect WebSocket...')
          connect()
        }, 3000)
      }
    })

    return socket
  }, [dispatch])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
  }, [])

  const emit = useCallback((event, data) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data)
    }
  }, [])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    socket: socketRef.current,
    emit,
    disconnect,
    reconnect: connect
  }
}
