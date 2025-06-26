import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Simulate loading cart items
    const loadCartItems = async () => {
      const mockCartItems = [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 299.99,
          quantity: 1,
          size: 'M',
          color: 'Black',
          image: '/api/placeholder/100/100'
        },
        {
          id: 2,
          name: 'Smartphone Case',
          price: 29.99,
          quantity: 2,
          size: 'Universal',
          color: 'Blue',
          image: '/api/placeholder/100/100'
        }
      ];

      setTimeout(() => {
        setCartItems(mockCartItems);
        setLoading(false);
      }, 500);
    };

    loadCartItems();
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(0.1);
      alert('Promo code applied! 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some items to get started</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="font-bold text-lg">${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="mt-6 bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-3">Promo Code</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={applyPromoCode}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 shadow-sm sticky top-4">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <hr className="my-3" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 mt-6 block text-center"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="w-full text-center text-blue-600 hover:text-blue-700 mt-3 block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;