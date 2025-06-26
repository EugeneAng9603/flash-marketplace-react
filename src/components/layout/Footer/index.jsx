import React from 'react'
import { Link } from 'react-router-dom'
import { APP_CONFIG, ROUTES } from '@utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  console.log(APP_CONFIG);
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">{APP_CONFIG.NAME}</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Your ultimate destination for flash sales and amazing deals. 
              Get the best products at unbeatable prices with lightning-fast delivery.
            </p>
            <div className="flex space-x-4">
              <a href="https://google.com" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="https://google.com" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="https://google.com" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRODUCTS} className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to={ROUTES.FLASH_SALES} className="text-gray-400 hover:text-white transition-colors">
                  Flash Sales
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-md font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {APP_CONFIG.NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer