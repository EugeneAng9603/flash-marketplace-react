
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Star, Heart, Search} from 'lucide-react';


const HomePage = () => {
  const [flashDeals, setFlashDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    // Mock flash deals data
    setFlashDeals([
      { id: 1, name: 'Wireless Headphones', price: 29.99, originalPrice: 89.99, image: '/api/placeholder/200/200', rating: 4.5, sold: 145 },
      { id: 2, name: 'Smart Watch', price: 79.99, originalPrice: 199.99, image: '/api/placeholder/200/200', rating: 4.8, sold: 89 },
      { id: 3, name: 'Bluetooth Speaker', price: 19.99, originalPrice: 49.99, image: '/api/placeholder/200/200', rating: 4.3, sold: 234 },
      { id: 4, name: 'Phone Case', price: 9.99, originalPrice: 24.99, image: '/api/placeholder/200/200', rating: 4.6, sold: 567 }
    ]);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FlashDeals</h1>
            </div>
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for deals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">⚡ FLASH SALE ⚡</h2>
          <p className="text-xl mb-4">Up to 70% off - Limited Time Only!</p>
          <div className="flex items-center justify-center space-x-2 text-2xl font-mono">
            <Clock className="w-6 h-6" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Flash Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Flash Deals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                  -{Math.round((1 - deal.price / deal.originalPrice) * 100)}%
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{deal.name}</h4>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(deal.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">({deal.sold} sold)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-red-600">${deal.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${deal.originalPrice}</span>
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
  );
};

export default HomePage;