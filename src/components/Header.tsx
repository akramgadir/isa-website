import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

// TODO: implement useLocation and conditionally style the buttons depending on which page were currently on e.g. ${location.pathname === '/login' ? : 
const Header = ({ showLoginButton = false, showSignUpButton = false, showGetStartedButton = false, showHomeButton = false, showMyAccount = false, showLogoutButton = false }) => {
  const navigate = useNavigate()
  const auth = getAuth()

  const handleLogout = async () => {
    try{
      await signOut(auth)
      navigate('/')
    }
    catch (error) {
      console.error('Error logging out: ', error)
    }
  }

  return (
    <header className="bg-customPink py-6 px-2 lg:px-6 flex items-center justify-between">
      
      <div>
        <img src="/nw-logo.png" alt="NW Logo" className="h-12 lg:h-[54px] w-auto" />
      </div>
      <div className="flex gap-2">
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
        {showLogoutButton && (
            <button className="bg-customPink text-white text-bold text-xs lg:text-sm border border-white rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:border-2"
                    onClick={handleLogout}>
              Log Out
            </button>
        )
        }
        {showSignUpButton && (
          <Link to="/signup">
            <button className="bg-white text-customPink text-bold text-xs lg:text-sm border border-pink-500 rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:text-pink-800">
              Sign Up
            </button>
          </Link>
          )}
          {showMyAccount && (
          <Link to="/account">
            <button className="bg-white text-customPink text-bold text-xs lg:text-sm border border-pink-500 rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:text-pink-800">
              My Account
            </button>
          </Link>
          )}
          {showHomeButton && (
            <Link to="/">
            <button className='bg-customPink text-white text-bold text-xs lg:text-sm border border-white rounded-3xl px-3 lg:px-4 py-3 lg:w-36 hover:border-2'>
           <span className='flex justify-center items-center gap-2'>
             Home <FaHome size={16}/>
            </span>
            </button>
            </Link>
          )
          }
      </div>
    </header>
  );
};

export default Header;