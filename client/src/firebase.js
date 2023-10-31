// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sample-estate-c03bb.firebaseapp.com",
  projectId: "sample-estate-c03bb",
  storageBucket: "sample-estate-c03bb.appspot.com",
  messagingSenderId: "945894335420",
  appId: "1:945894335420:web:1a8d0834e390229accc1b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);