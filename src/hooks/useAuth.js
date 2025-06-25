import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { loginUser, registerUser, logoutUser, setUser, clearError } from '@store/slices/authSlice'
import { authService } from '@services/authService'
import { LOCAL_STORAGE_KEYS } from '@utils/constants'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated, isLoading, error } = useSelector((state) => state.auth)

  const login = useCallback(
    async (credentials) => {
      return await dispatch(loginUser(credentials)).unwrap()
    },
    [dispatch]
  )

  const register = useCallback(
    async (userData) => {
      return await dispatch(registerUser(userData)).unwrap()
    },
    [dispatch]
  )

  const logout = useCallback(async () => {
    await dispatch(logoutUser())
  }, [dispatch])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
    if (token && !user) {
      try {
        const userData = await authService.getCurrentUser()
        dispatch(setUser(userData))
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
      }
    }
  }, [user, dispatch])

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearAuthError,
    initializeAuth
  }
}
