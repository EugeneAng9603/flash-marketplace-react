import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, XIcon } from 'lucide-react'
import { useDebounce } from '@hooks/useDebounce'
import { productService } from '@services/productService'
import { ROUTES, DEBOUNCE_DELAY } from '@utils/constants'
import Button from '@components/common/Button'

const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const resultsRef = useRef(null)

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY.SEARCH)

  // Search products when debounced query changes
  useEffect(() => {
    const searchProducts = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await productService.searchProducts(debouncedQuery, {
          limit: 8
        })
        setResults(response.products || [])
        setShowResults(true)
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchProducts()
  }, [debouncedQuery])

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(query.trim())}`)
      setShowResults(false)
      setQuery('')
    }
  }

  const handleResultClick = (productId) => {
    navigate(`${ROUTES.PRODUCTS}/${productId}`)
    setShowResults(false)
    setQuery('')
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowResults(true)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ${product.price}
                    </p>
                  </div>
                </button>
              ))}
              <div className="p-3 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all results for "{query}"
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No products found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar