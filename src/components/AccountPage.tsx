import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import Header from './Header';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [selectedFund, setSelectedFund] = useState<string>('')
  const [investmentAmount, setInvestmentAmount] = useState<string>('') //TODO: parse to a float later since browsers take inputs as strings
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const auth = getAuth();

  const isaAnnualLimit = 20000;
  const funds = [
    'Low-Risk Fund',
    'Moderate-Risk Fund',
    'High-Risk Fund',
  ];

  //triggers on log in or log out
  useEffect(() => {
    // listener for authentication changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // fetch user data from firestore to our React state
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data()); //store their data in our userData state
          // console.log('userDoc.data: ', userDoc.data())
        }
      }
    });

    return () => unsubscribe(); //clean up the listener on unmount
  }, [auth]);

  const getTaxYear = (currentDate: Date): string => { //alternative: try with npm install tax-year
    const year = currentDate.getFullYear();
    const taxYearStart = new Date(year, 3, 6); //for April 6th of the current year
    if (currentDate < taxYearStart) { //if the date is before April 6th then we look at the previous tax year
      return `${year - 1}-${year}`; 
    }
    else return `${year}-${year + 1}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(investmentAmount);

    if (!selectedFund) {
      setErrorMessage('Please select a fund.');
      return;
    }
    else if (isNaN(amount) || amount <= 0) { //less strict than typeof(amount) !== 'number' in case they enter it as a string
      setErrorMessage('Please enter a valid investment amount.');
      return;
    }

    try {
      if (user) {
        const now = new Date();
        const taxYear = getTaxYear(now);

        // fetch user's investment total from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        let investmentTotals: { [key: string]: number} = {};
        if (userDoc.exists() && userDoc.data().investmentTotals) {
          investmentTotals = userDoc.data().investmentTotals;
        }

        // calculate total for the current tax year
        const totalInvestedThisYear = investmentTotals[taxYear] || 0;


        if (totalInvestedThisYear + amount > isaAnnualLimit) {
          setErrorMessage(
            `You have already invested £${totalInvestedThisYear.toFixed(
              2
            )} this tax year. Adding £${amount.toFixed(
              2
            )} would exceed the £${isaAnnualLimit} annual limit.`
          );
          return;
        }

        // update the total for the current tax year
        investmentTotals[taxYear] = totalInvestedThisYear + amount;

        // create/save the updated totals and new investment
        const investmentsCollection = collection(db, 'users', user.uid, 'investments');
        await addDoc(investmentsCollection, {
          fund: selectedFund,
          amount,
          date: now,
        });

        await setDoc(userDocRef, { investmentTotals }, { merge: true });

        setSuccessMessage('Investment recorded successfully!');
        setSelectedFund('');
        setInvestmentAmount('');
        setErrorMessage('');
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
      <Header showHomeButton={true} showLogoutButton={true} />
      {userData && (
        <div className="mx-4 my-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Account</h1>
          <p>
            <span>Name:</span> {userData.title || ''} {userData.firstName || ''}{' '}
            {userData.lastName || ''}
          </p>
          <p>
            <span>Email:</span> {userData.email || ''}
          </p>
          {/* TODO: display their investmentTotals for each year from the object my backend */}
        </div>
      )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded max-w-md mx-auto">
            {errorMessage}
          </div>
        )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-customPink lg:rounded p-4">
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-customGrey text-sm font-bold mb-2">Select Fund</label>
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
          <label className="block text-customGrey text-sm font-bold mb-2">Investment Amount (£)</label>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="block w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-customPink text-white px-4 py-2 rounded hover:bg-pink-600 hover:shadow-xl"
        >
          Invest Now
        </button>
      </form>
        <Link to='/my-investments'>
      <div className='flex justify center mt-6'>
        <button className='max-w-md mx-auto border border-2 border-customPink lg:rounded p-4 hover:bg-customPink text-customGrey'>View My Investments</button>
      </div>
        </Link>
    </div>
  );
};

export default AccountPage;
