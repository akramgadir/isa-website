import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import Header from './Header';
const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [postcode, setPostcode] = useState('')
  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const auth = getAuth();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage('Please enter the same password both times.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // create new user using Firebase

      await setDoc(doc(collection(db, 'users'), user.uid), { //store the data in firestore
        email,
        title,
        firstName,
        lastName,
        postcode,
        subscribedToNewsletter,
      });
      navigate('/account'); // if successful redirect them straight to the account page
    }
    catch (error: any) {
      console.error('Error signing up:', error);
      setErrorMessage(error.message || 'Error: Please try again.');
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Header showLoginButton={true} showSignUpButton={false} showHomeButton={true} />
      <div className="flex flex-col items-center px-4 py-4 lg:py-8">
        <h1 className="text-2xl font-bold mb-6">Register for an Account</h1>
        {errorMessage && (
          <div className="mb-4 p-2 text-red-700 border border-red-700 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full max-w-md text-gray-600">
          <button type="button" onClick={redirectToLogin} className="block text-sm font-bold mb-2">
            Already have an account?
          </button>
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
          <div>
            <label className="block text-sm font-bold mb-2">Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Title</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              >
              <option value="">-- Select --</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
              <option value="Sir">Sir</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Postcode</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={subscribedToNewsletter}
              onChange={() => setSubscribedToNewsletter(!subscribedToNewsletter)}
              />
            <label className="text-sm">Please send me the newsletter and keep me up to date on relevant promotions.</label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
