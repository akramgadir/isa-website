import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const IndividualPage = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/login');
  };

  const handleNoClick = () => {
    navigate('/no-account');
  };

  return (
    <div className="bg-customCream">
      <Header showLoginButton={true} showSignUpButton={true} />
      <div className="flex flex-col items-center px-4 lg:px-4 py-4 lg:py-12">
        <h2 className="text-28 text-customGrey mb-6">
          Do you already have a Workplace Pension or ISA with Cushon?
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={handleYesClick}
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
          >
            Yes, I do have a pension or ISA
            <p className="text-sm font-normal text-gray-500 mt-2">
              Access your workplace pension or ISA via web or download our app
            </p>
          </button>
          <button
            onClick={handleNoClick}
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
          >
            No, I don’t have a pension or ISA
            <p className="text-sm font-normal text-gray-500 mt-2">
              Please note: we do not currently offer personal pensions, only workplace ones.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualPage;
