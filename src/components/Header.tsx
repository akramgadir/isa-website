import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLoginButton = false, showSignUpButton = false }) => {
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <div>
        <img src="/cushon-logo.png" alt="Cushon Logo" className="h-[54px]" />
      </div>
      <div className="flex gap-4">
        {showLoginButton && (
          <Link to="/login">
            <button className="bg-white border border-gray-300 rounded px-4 py-2">
              Log In
            </button>
          </Link>
        )}
        {showSignUpButton && (
          <Link to="/signup">
            <button className="bg-pink-500 text-white border border-pink-500 rounded px-4 py-2">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;