import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import Header from './Header'

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [selectedFund, setSelectedFund] = useState<string>('')
  const [investmentAmount, setInvestmentAmount] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const auth = getAuth();

  const isaAnnualLimit = 20000;
  const funds = [
    'Cushon Equities Fund',
    'Cushon Ethical Fund',
    'Cushon Sustainable Fund',
  ];

  useEffect(() => {
    // listener for authentication changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // fetch user data from firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data()); //store their data in our userData state
        }
      }
    });

    return () => unsubscribe(); //clean up the listener when the component unmounts
  }, [auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investmentAmount);

    // validate the input
    if (!selectedFund) {
      setErrorMessage('Please select a fund.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid investment amount.');
      return;
    }
    if (amount > isaAnnualLimit) {
      setErrorMessage(`You cannot legally invest more than £${isaAnnualLimit} in an ISA per tax year.`);
      return;
    }

    setErrorMessage('');

    try {
      // save the investment to Firestore
      if (user) {
        const investmentsCollection = collection(db, 'users', user.uid, 'investments');
        await addDoc(investmentsCollection, {
          fund: selectedFund,
          amount,
          date: new Date(),
        });

        setSuccessMessage('Investment recorded successfully!');
        setSelectedFund('');
        setInvestmentAmount('');
      }
    } catch (error) {
      console.error('Error saving investment:', error);
      setErrorMessage('Error: Please try again.');
    }
  };

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <div className="mx-auto">
      <Header showHomeButton={true} />
      {userData && (
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Account</h1>
          <p>
            <strong>Name:</strong> {userData.title || ''} {userData.firstName || ''}{' '}
            {userData.lastName || ''}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || ''}
          </p>
          <p>
            <strong>Account Type:</strong> {userData.accountType || ''}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Fund</label>
          <select
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="block w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="">Choose an ISA Fund</option>
            {funds.map((fund, index) => (
              <option key={index} value={fund}>
                {fund}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Investment Amount (£)</label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="block w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-customPink text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Invest Now
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
