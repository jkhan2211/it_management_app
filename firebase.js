// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwNihOEaDrBWMkcd5aWZAAD1y-CQJ0EqM",
  authDomain: "it-inventory-management-60569.firebaseapp.com",
  projectId: "it-inventory-management-60569",
  storageBucket: "it-inventory-management-60569.appspot.com",
  messagingSenderId: "494471230760",
  appId: "1:494471230760:web:4fb1a0dc887342084e0c1d",
  measurementId: "G-6R34FYRQLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}