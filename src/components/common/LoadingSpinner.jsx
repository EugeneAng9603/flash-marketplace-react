import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Star, Heart, User, Search, Menu, X, Minus, Plus, Trash2, CreditCard, MapPin, Phone, Mail, Eye, EyeOff } from 'lucide-react';

// Common Components
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default LoadingSpinner;