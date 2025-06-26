import React, { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simulate loading cart items
    const mockCartItems = [
      { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
      { id: 2, name: 'Smartphone Case', price: 24.99, quantity: 2 }
    ];
    setCartItems(mockCartItems);
    calculateTotal(mockCartItems);
  }, []);

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 9.99;
    setTotal(subtotal + tax + shipping);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Order placed successfully!');
    setIsLoading(false);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <section className="shipping-section">
                <h2>Shipping Information</h2>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </section>

              <section className="payment-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Credit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal
                  </label>
                </div>
              </section>

              <button type="submit" disabled={isLoading} className="place-order-btn">
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;