import React, { useState, useEffect } from 'react';

const FlashSalesPage = () => {
  const [flashSales, setFlashSales] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  useEffect(() => {
    // Simulate loading flash sales data
    const mockFlashSales = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        originalPrice: 199.99,
        salePrice: 89.99,
        discount: 55,
        image: '/api/placeholder/300/200',
        category: 'electronics',
        stock: 15,
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        sold: 234
      },
      {
        id: 2,
        name: 'Premium Coffee Maker',
        originalPrice: 299.99,
        salePrice: 149.99,
        discount: 50,
        image: '/api/placeholder/300/200',
        category: 'home',
        stock: 8,
        endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
        sold: 156
      },
      {
        id: 3,
        name: 'Smartwatch Pro',
        originalPrice: 399.99,
        salePrice: 199.99,
        discount: 50,
        image: '/api/placeholder/300/200',
        category: 'electronics',
        stock: 22,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        sold: 89
      },
      {
        id: 4,
        name: 'Designer Handbag',
        originalPrice: 249.99,
        salePrice: 99.99,
        discount: 60,
        image: '/api/placeholder/300/200',
        category: 'fashion',
        stock: 5,
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        sold: 67
      }
    ];

    setFlashSales(mockFlashSales);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      flashSales.forEach(sale => {
        const now = new Date().getTime();
        const endTime = new Date(sale.endTime).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          newTimeLeft[sale.id] = {
            hours: Math.floor(difference / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        } else {
          newTimeLeft[sale.id] = { hours: 0, minutes: 0, seconds: 0 };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSales]);

  const filteredAndSortedSales = flashSales
    .filter(sale => filter === 'all' || sale.category === filter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discount - a.discount;
        case 'price':
          return a.salePrice - b.salePrice;
        case 'time':
          return new Date(a.endTime) - new Date(b.endTime);
        default:
          return 0;
      }
    });

  const addToCart = (productId) => {
    alert(`Added product ${productId} to cart!`);
  };

  const formatTime = (time) => {
    if (!time) return '00:00:00';
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flash-sales-page">
      <div className="container">
        <div className="page-header">
          <h1>⚡ Flash Sales</h1>
          <p>Limited time offers - Don't miss out!</p>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Category:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Garden</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="discount">Highest Discount</option>
              <option value="price">Lowest Price</option>
              <option value="time">Ending Soon</option>
            </select>
          </div>
        </div>

        <div className="flash-sales-grid">
          {filteredAndSortedSales.map(sale => (
            <div key={sale.id} className="flash-sale-card">
              <div className="sale-badge">
                -{sale.discount}%
              </div>
              
              <div className="product-image">
                <img src={sale.image} alt={sale.name} />
              </div>
              
              <div className="product-info">
                <h3>{sale.name}</h3>
                
                <div className="price-info">
                  <span className="sale-price">${sale.salePrice.toFixed(2)}</span>
                  <span className="original-price">${sale.originalPrice.toFixed(2)}</span>
                </div>
                
                <div className="stock-info">
                  <span className="stock-count">{sale.stock} left in stock</span>
                  <span className="sold-count">{sale.sold} sold</span>
                </div>
                
                <div className="countdown">
                  <span className="countdown-label">Ends in:</span>
                  <span className="countdown-time">
                    {formatTime(timeLeft[sale.id])}
                  </span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(sale.sold / (sale.sold + sale.stock)) * 100}%` }}
                  ></div>
                </div>
                
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(sale.id)}
                  disabled={sale.stock === 0}
                >
                  {sale.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedSales.length === 0 && (
          <div className="no-results">
            <p>No flash sales found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSalesPage;