import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt0Hwltjbe7AcJ2aRddcjprwCFrAI83yg",
  authDomain: "period-track-6e2b8.firebaseapp.com",
  projectId: "period-track-6e2b8",
  storageBucket: "period-track-6e2b8.firebasestorage.app",
  messagingSenderId: "249486060102",
  appId: "1:249486060102:web:e8aacfa9faacc146207847",
  measurementId: "G-8D5E7QX30G",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

export { db, auth };
