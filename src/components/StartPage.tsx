import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const StartPage = () => {
  const navigate = useNavigate();

  const handleIndividualClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-customCream">
      <Header showLoginButton={true} showSignUpButton={true} />
      <div className="flex flex-col items-center px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">How can we help you today?</h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            Employer
            <p className="text-sm font-normal text-gray-500 mt-2">
              Log in to manage your Cushon pension or complete your application.
            </p>
          </button>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            Advisor / Accountant
            <p className="text-sm font-normal text-gray-500 mt-2">
              Log in to manage Cushon clients, or sign up new clients to our workplace pensions.
            </p>
          </button>
          <button
            onClick={handleIndividualClick}
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
          >
            Individual
            <p className="text-sm font-normal text-gray-500 mt-2">
              Check on your existing Cushon account or set up a new savings account with us.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
