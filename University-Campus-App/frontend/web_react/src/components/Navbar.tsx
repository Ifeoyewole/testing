import React from 'react';
import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import { APP_NAME } from '../config/appConfig';

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur shadow-sm border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{APP_NAME}</h2>
        <div className="flex items-center gap-6">
          <button className="relative text-gray-600 hover:text-gray-900">
            <FiBell size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <FiUser size={24} />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <FiLogOut size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
