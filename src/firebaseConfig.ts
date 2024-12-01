import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP7ja4kh08lLJxq8fOFhAYQP2_TW9ft7g",
  authDomain: "cushon-assignment.firebaseapp.com",
  projectId: "cushon-assignment",
  storageBucket: "cushon-assignment.firebasestorage.app",
  messagingSenderId: "508095040465",
  appId: "1:508095040465:web:e0e63c20e88c0b9e36eef0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };