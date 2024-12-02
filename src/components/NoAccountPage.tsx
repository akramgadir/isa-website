import React from 'react';
import Header from './Header';

const NoAccountPage = () => {

  return (
    <div className="bg-customCream">
      <Header showLoginButton={true} showSignUpButton={true} />
      <div className="flex flex-col items-center px-4 py-12">
        <h2 className="text-28 text-customGrey mb-6">
        What product are you interested in?
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <a
            href="https://www.cushon.co.uk/isa"
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
          >
            ISA
            <p className="text-sm font-normal text-gray-500 mt-2">
              Want a simple, tax-free account? Make the most of your annual allowance with our ISA.
            </p>
          </a>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            Lifetime ISA
            <p className="text-sm font-normal text-gray-500 mt-2">
              A tax-free savings account to help first-time home buyers get on the property ladder and/or save for retirement.
            </p>
          </button>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            Junior ISA
            <p className="text-sm font-normal text-gray-500 mt-2">
              Want to set some money aside for the kids? Set up a Junior ISA ready for when they turn 18.
            </p>
          </button>
          <button
            className="w-full bg-white text-customGrey font-bold p-6 rounded-2xl border hover:border-customPink text-left shadow-md"
            disabled
          >
            General Investment Account
            <p className="text-sm font-normal text-gray-500 mt-2">
              Maxed out your ISA allowance for the year? Use our General Investment Account.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoAccountPage;
