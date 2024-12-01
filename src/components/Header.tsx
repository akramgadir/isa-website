import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLoginButton = false, showSignUpButton = false, showGetStartedButton = false, showHomeButton = false }) => {
  return (
    <header className="bg-customPink py-4 px-6 flex items-center justify-between">
      
      <div>
        <img src="/natwest-logo.png" alt="Cushon Logo" className="h-[54px]" />
      </div>
      <div className="flex gap-4">
        {showGetStartedButton && (
        <Link to="/get-started">
          <button className="bg-white border border-gray-300 text-customPink rounded-3xl px-3 py-2 lg:w-36">
          Get Started
          </button>
        </Link>
        )}
        {showLoginButton && (
          <Link to="/login">
            <button className="bg-customPink text-white border border-white rounded-3xl px-3 py-2 lg:w-36">
              Log In
            </button>
          </Link>
        )}
        {showSignUpButton && (
          <Link to="/signup">
            <button className="bg-white text-customGrey border border-pink-500 rounded-3xl px-3 py-2 lg:w-36 ">
              Sign Up
            </button>
          </Link>
          )}
          {showHomeButton && (
            <Link to="/">
            <button className='bg-pink-500 text-white border border-pink-500 rounded-3xl px-3 py-2 lg:w-36'>
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