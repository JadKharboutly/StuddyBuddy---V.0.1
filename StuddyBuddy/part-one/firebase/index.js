// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZxTj3p2RiQ3mSwsYD7MTKCV1LjzlRE00",
  authDomain: "studdybuddy-aa8d0.firebaseapp.com",
  projectId: "studdybuddy-aa8d0",
  storageBucket: "studdybuddy-aa8d0.appspot.com",
  messagingSenderId: "850776503470",
  appId: "1:850776503470:web:5de0b777cd0ec50dc7693f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export {auth}; 