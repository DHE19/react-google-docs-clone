

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0OaRvOjOA2j_EI93BLfa6elt6wYw0hyg",
  authDomain: "docs-be8dc.firebaseapp.com",
  projectId: "docs-be8dc",
  storageBucket: "docs-be8dc.appspot.com",
  messagingSenderId: "28130263715",
  appId: "1:28130263715:web:5eb2bc3f101c5e3c6f3516",
  measurementId: "G-PHN0BTJ30Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
