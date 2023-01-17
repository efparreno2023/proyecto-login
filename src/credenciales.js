// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmxHr9G06NMcFQ8QCr32SwjmlQzWH4pEY",
  authDomain: "react-proyecto-7bcb5.firebaseapp.com",
  projectId: "react-proyecto-7bcb5",
  storageBucket: "react-proyecto-7bcb5.appspot.com",
  messagingSenderId: "599923605995",
  appId: "1:599923605995:web:c857c4b94ebd1eaae519ae"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase