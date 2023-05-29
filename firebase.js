// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAygLTU3emuQg0Yd-PmE_4s2JB-gkZcRWM",
  authDomain: "kuis2pbf.firebaseapp.com",
  projectId: "kuis2pbf",
  storageBucket: "kuis2pbf.appspot.com",
  messagingSenderId: "1041853558272",
  appId: "1:1041853558272:web:d03a72798a86914b8cb2e5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);