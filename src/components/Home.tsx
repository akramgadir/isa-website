import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <Header showGetStartedButton={true} showLoginButton={true} />
      <h1 className="text-7xl text-center bg-customPink text-white px-36 py-12 font-semibold ">Making workplace pensions and savings easy      </h1>
    </div>
  );
};

export default Home;
