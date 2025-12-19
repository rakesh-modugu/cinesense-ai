// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <--- Ee line miss ayyindhi

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2nXjzEzA2ETSfgBOhf3XZBuS3k1BDQwU",
  authDomain: "cinesense-ai.firebaseapp.com",
  projectId: "cinesense-ai",
  storageBucket: "cinesense-ai.firebasestorage.app",
  messagingSenderId: "224904052698",
  appId: "1:224904052698:web:526af8b47bad57b6310ae3",
  measurementId: "G-G1E2CT8SY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication ni export chesthunnam (Important Step)
export const auth = getAuth(); // <--- Idhi lekapothe login pani cheyadhu