import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const FirebaseConfig = {
  apiKey: "AIzaSyDoxwf-h2mZcUbvzA3dHVgakiNdHCXbRO8",
  authDomain: "angna-290618.firebaseapp.com",
  projectId: "angna-290618",
  storageBucket: "angna-290618.appspot.com",
  messagingSenderId: "120398440232",
  appId: "1:120398440232:web:35491e6156672f9393521d",
};

const app = initializeApp(FirebaseConfig);

export const firebaseAuthentication = getAuth(app);
