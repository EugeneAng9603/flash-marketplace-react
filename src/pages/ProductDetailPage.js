import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProduct = async () => {
      setLoading(true);
      // Mock product data
      const mockProduct = {
        id: id,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        rating: 4.5,
        reviews: 128,
        images: [
          '/api/placeholder/600/400',
          '/api/placeholder/600/400',
          '/api/placeholder/600/400'
        ],
        description: 'Experience premium sound quality with these wireless headphones featuring noise cancellation and 30-hour battery life.',
        features: [
          'Active Noise Cancellation',
          '30-hour battery life',
          'Premium sound quality',
          'Comfortable fit',
          'Wireless connectivity'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Blue', 'Red'],
        inStock: true,
        stockCount: 15
      };
      
      setTimeout(() => {
        setProduct(mockProduct);
        setSelectedColor(mockProduct.colors[0]);
        setSelectedSize(mockProduct.sizes[0]);
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]
    };
    
    // Add to cart logic
    console.log('Added to cart:', cartItem);
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div>
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedColor === color
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-medium mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <div className="text-sm text-gray-600">
              {product.inStock && `${product.stockCount} items in stock`}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-2">Features</h3>
            <ul className="space-y-1 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;