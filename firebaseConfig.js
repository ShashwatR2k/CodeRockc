// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDIRoq-NX_9Z-GbLvm8VnxJfduKBTHdvX0",
  authDomain: "code-2c68d.firebaseapp.com",
  projectId: "code-2c68d",
  storageBucket: "code-2c68d.appspot.com",
  messagingSenderId: "935170348483",
  appId: "1:935170348483:web:591224706353748050d976",
  measurementId: "G-6L0KTDPC3F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
