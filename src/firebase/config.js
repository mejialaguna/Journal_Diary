// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const process = import.meta.env;
const api_key = process.VITE_APP_API_KEY;
const auth_domain = process.VITE_APP_AUTH_DOMAIN;
const project_id = process.VITE_APP_PROJECT_ID;
const storage_bucket = process.VITE_APP_STORAGE_BUCKET;
const messaging_sender_id = process.VITE_APP_MESSAGING_SEND_ID;
const firebase_app_id = process.VITE_APP_FIREBASE_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: firebase_app_id,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(firebaseApp);

export const FirebaseDB = getFirestore(firebaseApp);
