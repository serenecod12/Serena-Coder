import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// Import the functions you need from the SDKs you need


const firebaseConfig = {
  apiKey: "AIzaSyCPY9Sv6qNv8a-K-L7-wtc5aNHg-Gy6qRY",
  authDomain: "abulfayz-498af.firebaseapp.com",
  projectId: "abulfayz-498af",
  storageBucket: "abulfayz-498af.firebasestorage.app",
  messagingSenderId: "830028453028",
  appId: "1:830028453028:web:7c66e065a1fdf0656b8231"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
 const auth = getAuth(app)

 export {auth, db, app}

