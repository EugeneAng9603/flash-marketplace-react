// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.jsx
// src/App.jsx
import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
// import { store } from './store/index'
// import { ROUTES } from './utils/constants'
// import { useAuth } from './hooks/useAuth'
// import { useWebSocket } from './hooks/useWebSocket'
// import Layout from './components/layout/Layout'
// import LoadingSpinner from './components/common/LoadingSpinner'
// import ErrorBoundary from './components/common/ErrorBoundary'
// import './styles/globals.css'
import { store } from '@store/index'
import { ROUTES } from '@utils/constants'
import { useAuth } from '@hooks/useAuth'
import { useWebSocket } from '@hooks/useWebSocket'
import Layout from '@components/layout/Layout'
import LoadingSpinner from '@components/common/LoadingSpinner'
import ErrorBoundary from '@components/common/ErrorBoundary'
import '@styles/global.css'

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@pages/HomePage'))
const LoginPage = React.lazy(() => import('@pages/LoginPage'))
const RegisterPage = React.lazy(() => import('@pages/RegisterPage'))
const ProductPage = React.lazy(() => import('@pages/ProductPage'))
const ProductDetailPage = React.lazy(() => import('@pages/ProductDetailPage'))
const CartPage = React.lazy(() => import('@pages/CartPage'))
const CheckoutPage = React.lazy(() => import('@pages/CheckoutPage'))
const ProfilePage = React.lazy(() => import('@pages/ProfilePage'))
const FlashSalesPage = React.lazy(() => import('@pages/FlashSalePage'))

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  console.log({ isAuthenticated, isLoading });
  if (isLoading) {
    return <LoadingSpinner />
  }
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />
}

// Public Route component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return !isAuthenticated ? children : <Navigate to={ROUTES.HOME} replace />
}

// App Router component
const AppRouter = () => {
  console.log('AppRouter rendered');
  const { initializeAuth } = useAuth()
  
  // Initialize WebSocket connection for real-time updates
  useWebSocket()
  
  useEffect(() => {
    // Initialize authentication state on app start
    initializeAuth()
  }, [initializeAuth])
  
  return (
    <Router>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public routes */}
              {/* <Route path="/" element={<div>Test</div>} /> */}
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.PRODUCTS} element={<ProductPage />} />
              <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
              <Route path={ROUTES.FLASH_SALES} element={<FlashSalesPage />} />
              
              {/* Auth routes - redirect if already logged in */}
              <Route
                path={ROUTES.LOGIN}
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path={ROUTES.REGISTER}
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              
              {/* Protected routes */}
              <Route
                path={ROUTES.CART}
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.CHECKOUT}
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.PROFILE}
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all route - 404 */}
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </Router>
  )
}

// Main App component
const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </Provider>
  )
}

export default App