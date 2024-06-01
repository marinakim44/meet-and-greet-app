// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMMnH327F1Lcj8MVybpS_wVkzfnSJwknY",
  authDomain: "meeting-app-7793b.firebaseapp.com",
  databaseURL:
    "https://meeting-app-7793b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "meeting-app-7793b",
  storageBucket: "meeting-app-7793b.appspot.com",
  messagingSenderId: "235939347082",
  appId: "1:235939347082:web:3e9c475bc0b3e2a81b0b73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
