// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDELIkB9LWg-gGRUGOO3r4qD0q86KVkVVc",
  authDomain: "ecommerce-talentotech-react.firebaseapp.com",
  projectId: "ecommerce-talentotech-react",
  storageBucket: "ecommerce-talentotech-react.firebasestorage.app",
  messagingSenderId: "831203983251",
  appId: "1:831203983251:web:2102e0e6e41e32fa20f266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)