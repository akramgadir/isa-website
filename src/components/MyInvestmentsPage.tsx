import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const MyInvestmentsPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [investments, setInvestments] = useState<any[]>([]);
  const isaAnnualLimit = 20000;

  const auth = getAuth()
  
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
        }
      }
    });
    return () => unsubscribe(); //clean up the listener on unmount
  }, [auth]);

  useEffect(() => {
    const fetchInvestments = async () => {//fetching investments document from firestore
      if (user) {
        const investmentsRef = collection(db, 'users', user.uid, 'investments');
        const currentInvestments = await getDocs(investmentsRef);
        const investmentsData = currentInvestments.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvestments(investmentsData);
      }
    };
  
    fetchInvestments();
  }, [user]);
  
  
  if (!userData) {
    return <div className='text-customPink text-bold text-3xl m-4'>Loading please wait ...</div>;
  }

  const calculateInvestmentSummary = () => {
    const taxYear = new Date().getFullYear()
    if(userData.investmentTotals) {
    const currentYearInvestedAmount = userData.investmentTotals[`${taxYear}-${taxYear + 1}`]
    
    return {
      totalInvested: currentYearInvestedAmount,
      totalAllowanceAllowedLeft: isaAnnualLimit - currentYearInvestedAmount
    }
  }

    return { totalInvested: 0, totalAllowanceAllowedLeft: isaAnnualLimit}
  }
  const { totalInvested, totalAllowanceAllowedLeft } = calculateInvestmentSummary();
  const currentTaxYear =  new Date().getFullYear()

  return (
    <div className='flex flex-col'>
      <Header showMyAccount={true} showLogoutButton={true}/>
      <div className="border border-customPink border-4 rounded-3xl mt-6 mx-4 p-4 mb-4 w-64 self-center">
      <h2 className="font-bold text-xl">Investment Summary</h2>
      <p className='text-sm self-center mb-2'> 06/04/{currentTaxYear} - 05/04/{currentTaxYear + 1} </p>
      <p>
        <span className="font-bold">Total Invested:</span> £{totalInvested.toFixed(2)}
      </p>
      <p>
        <span className="font-bold">Remaining Limit:</span> £{totalAllowanceAllowedLeft.toFixed(2)}
      </p>
    </div>
      <div className='flex flex-col lg:px-24'>
        <h1 className='lg:text-3xl text-xl text-bold py-4 px-4' >
        {`${userData.title} ${userData.lastName}'s Investments`}
        </h1>
        <div className="px-4 py-2">
    {investments.length === 0 ? (
      <p>No investments made yet. Click on the 'My Account' button to start investing.</p>
    ) : (
      investments.map((investment) => (
        <div
          key={investment.id}
          className="border border-2 border-customGrey rounded p-4 mb-4 shadow-xl"
        >
          <p>
            <span className="font-bold">Fund:</span> {investment.fund}
          </p>
          <p>
            <span className="font-bold">Amount:</span> £{investment.amount.toFixed(2)}
          </p>
          <p>
            {/* displaying the time in a way that is clear for users globally */}
            <span className="font-bold">Date:</span> {new Date(investment.date.seconds * 1000).toString()} 
          </p>
        </div>
      ))
    )}
    </div>

      </div>
    </div>
  )
}

export default MyInvestmentsPage