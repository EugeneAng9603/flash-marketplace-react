import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Star, Heart, User, Search, Menu, X, Minus, Plus, Trash2, CreditCard, MapPin, Phone, Mail, Eye, EyeOff } from 'lucide-react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all'
  });

  useEffect(() => {
    // Mock products data
    setProducts([
      { id: 1, name: 'Wireless Headphones', price: 29.99, originalPrice: 89.99, image: '/api/placeholder/200/200', rating: 4.5, sold: 145, category: 'electronics' },
      { id: 2, name: 'Smart Watch', price: 79.99, originalPrice: 199.99, image: '/api/placeholder/200/200', rating: 4.8, sold: 89, category: 'electronics' },
      { id: 3, name: 'Bluetooth Speaker', price: 19.99, originalPrice: 49.99, image: '/api/placeholder/200/200', rating: 4.3, sold: 234, category: 'electronics' },
      { id: 4, name: 'Phone Case', price: 9.99, originalPrice: 24.99, image: '/api/placeholder/200/200', rating: 4.6, sold: 567, category: 'accessories' },
      { id: 5, name: 'Gaming Mouse', price: 39.99, originalPrice: 79.99, image: '/api/placeholder/200/200', rating: 4.7, sold: 123, category: 'electronics' },
      { id: 6, name: 'Laptop Stand', price: 24.99, originalPrice: 59.99, image: '/api/placeholder/200/200', rating: 4.4, sold: 87, category: 'accessories' }
    ]);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.priceRange === 'under-25' && product.price >= 25) return false;
    if (filters.priceRange === '25-50' && (product.price < 25 || product.price > 50)) return false;
    if (filters.priceRange === 'over-50' && product.price <= 50) return false;
    if (filters.rating !== 'all' && product.rating < parseFloat(filters.rating)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  >
                    <option value="all">All Prices</option>
                    <option value="under-25">Under $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="over-50">Over $50</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                  >
                    <option value="all">All Ratings</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
              <span className="text-gray-600">{filteredProducts.length} products found</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({product.sold} sold)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-red-600">${product.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;