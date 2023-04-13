// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdpTovAyUXjCJSFW96Huy8VUKigMwxhVc",
  authDomain: "journal-f9486.firebaseapp.com",
  projectId: "journal-f9486",
  storageBucket: "journal-f9486.appspot.com",
  messagingSenderId: "753837838523",
  appId: "1:753837838523:web:16c3296f907211eda4999e",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(firebaseApp);

export const FirebaseDB = getFirestore(firebaseApp);
