// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8GDbvnxhRy8X_kgejWJ_n57RAA3WK0nI",
  authDomain: "react-project-9ef6c.firebaseapp.com",
  projectId: "react-project-9ef6c",
  storageBucket: "react-project-9ef6c.appspot.com",
  messagingSenderId: "541134036702",
  appId: "1:541134036702:web:fbbdf711cc65616a4f6c4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);