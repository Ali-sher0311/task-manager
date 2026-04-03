// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiEaZXbctWTtayuSGbtMzqEnz6Pzgnnk0",
  authDomain: "todo-app-afb3f.firebaseapp.com",
  projectId: "todo-app-afb3f",
  storageBucket: "todo-app-afb3f.firebasestorage.app",
  messagingSenderId: "665824576512",
  appId: "1:665824576512:web:6cf4a424386e68c5e804e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const  auth = getAuth(app)
export const db = getFirestore(app)

export  default app