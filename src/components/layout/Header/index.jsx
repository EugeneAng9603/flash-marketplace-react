import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useCart } from '@hooks/useCart'
import { ROUTES, APP_CONFIG } from '@utils/constants'
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, SearchIcon } from 'lucide-react'
import Button from '@components/common/Button'
import SearchBar from '@components/layout/Header/SearchBar'
// import CartDrawer from '@components/features/Cart/CartDrawer'

const Header = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { getItemCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const cartItemCount = getItemCount()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME)
    setIsProfileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              {APP_CONFIG.NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to={ROUTES.HOME}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to={ROUTES.PRODUCTS}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              to={ROUTES.FLASH_SALES}
              className="text-red-600 hover:text-red-700 font-medium transition-colors relative"
            >
              🔥 Flash Sales
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon for mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => {/* Handle mobile search */}}
            >
              <SearchIcon className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:block">{user?.firstName || 'User'}</span>
                </Button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to={ROUTES.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to={ROUTES.HOME}
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={ROUTES.PRODUCTS}
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to={ROUTES.FLASH_SALES}
                className="text-red-600 hover:text-red-700 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔥 Flash Sales
              </Link>
              
              {/* Mobile Search */}
              <div className="pt-4 border-t border-gray-200">
                <SearchBar />
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {/* <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}

      {/* Overlay for dropdowns */}
      {(isProfileMenuOpen || isCartOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileMenuOpen(false)
            setIsCartOpen(false)
          }}
        />
      )}
    </header>
  )
}

export default Header