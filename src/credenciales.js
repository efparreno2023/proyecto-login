// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWfUjDyYde2J7TsMVEN_Bvm0GaFgKNCmU",
  authDomain: "proyecto1-22015.firebaseapp.com",
  projectId: "proyecto1-22015",
  storageBucket: "proyecto1-22015.appspot.com",
  messagingSenderId: "532955318196",
  appId: "1:532955318196:web:8a7dbd4b41d2df1da2d4e1"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase