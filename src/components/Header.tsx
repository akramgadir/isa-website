import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLoginButton = false, showSignUpButton = false, showGetStartedButton = false, showHomeButton = false }) => {
  return (
    <header className="bg-customPink py-4 px-2 lg:px-6 flex items-center justify-between">
      
      <div>
        <img src="/natwest-logo.png" alt="NatWest Cushon Logo" className="h-12 lg:max-h-[54px] w-auto" />
      </div>
      <div className="flex gap-4">
        {showGetStartedButton && (
        <Link to="/get-started">
          <button className="bg-white border border-white text-bold text-xs lg:text-sm text-customPink rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:text-pink-800">
          Get Started
          </button>
        </Link>
        )}
        {showLoginButton && (
          <Link to="/start">
            <button className="bg-customPink text-white text-bold text-xs lg:text-sm border border-white rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:border-2">
              Log In
            </button>
          </Link>
        )}
        {showSignUpButton && (
          <Link to="/signup">
            <button className="bg-white text-customPink text-bold text-xs lg:text-sm border border-pink-500 rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:text-pink-800">
              Sign Up
            </button>
          </Link>
          )}
          {showHomeButton && (
            <Link to="/">
            <button className='bg-customPink text-white text-bold text-xs lg:text-sm border border-white rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:border-2'>
            Home
            </button>
            </Link>
          )
          }
      </div>
    </header>
  );
};

export default Header;