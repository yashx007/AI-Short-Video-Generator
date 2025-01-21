// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-ba7b5.firebaseapp.com",
  projectId: "ai-short-video-generator-ba7b5",
  storageBucket: "ai-short-video-generator-ba7b5.firebasestorage.app",
  messagingSenderId: "193755363394",
  appId: "1:193755363394:web:9c0b989513a1e0adfc55db",
  measurementId: "G-6JW9XLTYD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);