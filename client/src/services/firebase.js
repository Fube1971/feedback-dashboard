/**
 * Firebase Initialization
 * - Sets up Firebase App instance
 * - Exports Firestore DB and Auth modules
 * 
 *
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Connection configuration for Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCx8Rl_N6G8sqIYpxw7xHu4zde3kWx3AZA",
  authDomain: "adiclas-proyect.firebaseapp.com",
  databaseURL: "https://adiclas-proyect-default-rtdb.firebaseio.com",
  projectId: "adiclas-proyect",
  storageBucket: "adiclas-proyect.appspot.com",
  messagingSenderId: "827006465565",
  appId: "1:827006465565:web:66a866c7c764638ee0f8f4"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// Export for global use
export { db, auth };
