// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500 active:bg-cyan-800',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100',
    'outline-primary': 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    'outline-success': 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 active:bg-green-100',
    'outline-danger': 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 active:bg-red-100'
  };

  // Size styles
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md',
    xl: 'px-8 py-4 text-lg rounded-lg'
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Loading styles
  const loadingStyles = loading ? 'opacity-75 cursor-not-allowed' : '';

  // Combine all styles
  const buttonClasses = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${widthStyles}
    ${loadingStyles}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'ghost',
    'outline',
    'outline-primary',
    'outline-success',
    'outline-danger'
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

export default Button;