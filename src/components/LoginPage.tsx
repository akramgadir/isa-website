import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Header from './Header';

// TODO: write jest tests for the happy/sad paths of the login/logout workflow
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // attempt to log in with firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // redirect to accountpage on successful login
      navigate('/account');
    } catch (error: any) {
      console.error('login error:', error);
      setErrorMessage(
        error.message || 'invalid email or password. please try again.'
      );
    }
  };

  return (
    <div>
        <Header showSignUpButton={true} showHomeButton={true} />
        <div className="flex flex-col items-center px-4 py-4  lg:py-8">
        <h1 className="text-2xl text-bold mb-6 text-left">Login to your account</h1>
        {errorMessage && (
            <div className="mb-4 p-2 text-red-700 border border-red-700 rounded">
            {errorMessage}
            </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-md">
            <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                />
            </div>
            <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                />
            </div>
            <button
            type="submit"
            className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
            Log In
            </button>
        </form>
        </div>
    </div>
  );
};

export default LoginPage;
