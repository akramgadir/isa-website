import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzXlI3fwqyBLLJHf8uLXDocv1AAyGxrE8",
  authDomain: "isa-website-d6b05.firebaseapp.com",
  projectId: "isa-website-d6b05",
  storageBucket: "isa-website-d6b05.firebasestorage.app",
  messagingSenderId: "455197904822",
  appId: "1:455197904822:web:b9b3267f9fb66cdc98fb17"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };