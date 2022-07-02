// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmkWXfLGFo71tF9rJNzqUL5yXMCDd2bWg",
  authDomain: "wildlifegallery-b5b63.firebaseapp.com",
  projectId: "wildlifegallery-b5b63",
  storageBucket: "wildlifegallery-b5b63.appspot.com",
  messagingSenderId: "12367763334",
  appId: "1:12367763334:web:6681ea4e9b45c7d0e53e07",
  measurementId: "G-CEYXGWF7P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Connecting firestore database to React app
export const db = getFirestore(app);

export const storage = getStorage(app);

