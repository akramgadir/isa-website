import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {

  return (
    <header className="bg-white py-8 px-7 font-sans text-base text-customGrey flex items-center justify-between"> 
      <div className="flex-1">
        <img src="/cushon-logo.png" alt="Cushon Logo" className="h-[54px] w-auto fill-none" />
      </div>
      <div className="flex justify-center gap-4"> 
        <button className="bg-white text-customGrey border border-gray-300 rounded-md h-[54px] w-36 text-sm font-bold py-2.5 hover:bg-customPink hover:text-white">
          LOG IN
        </button>
        {/* TODO: Change sign up back to /sign-up link when workflow is done fully */}
        <Link to='/account'>
        <button className="text-white bg-customPink border border-customPink rounded-md h-[54px] w-36 text-sm font-bold py-2.5 hover:bg-white hover:text-customPink hover:border-customPink">
          SIGN UP
        </button>
        </Link>
      </div>
    </header>
  )
}

export default Header

