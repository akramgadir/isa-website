import React from 'react';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <Header showLoginButton={true} showSignUpButton={false} />
      <h1 className="text-2xl text-center">Home</h1>
    </div>
  );
};

export default Home;
