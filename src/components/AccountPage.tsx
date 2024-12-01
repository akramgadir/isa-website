import Header from './Header'
import React, { useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
const AccountPage = () => {

    useEffect(() => {
        const testFirestore = async () => {
          try {
            const docRef = await addDoc(collection(db, 'testCollection'), {
              message: 'Firestore test',
              timestamp: new Date(),
            });
            console.log('Document written with ID: ', docRef.id);
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        };
      
        testFirestore();
      }, []);
      

  return (
    <div>
    <Header/>
    <p>Account Page</p>
    </div>
  )
}

export default AccountPage