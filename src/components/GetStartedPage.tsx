import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleIndividualClick = () => {
    navigate('/individual');
  };

  return (
    <div className='container bg-customCream'>
      <Header showLoginButton={true} showSignUpButton={true} />
      <div className="flex flex-col items-center px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">What best describes you?</h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={handleIndividualClick}
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
          >
            I’m an individual
          </button>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            I’m an employer
          </button>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            I’m an adviser
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
