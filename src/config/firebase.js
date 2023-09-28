// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDJ2eNBvcW2kUJ6YyOnIkkYLK_nxfHvt4M",
  authDomain: "saving-expenses-tracker.firebaseapp.com",
  projectId: "saving-expenses-tracker",
  storageBucket: "saving-expenses-tracker.appspot.com",
  messagingSenderId: "913565102534",
  appId: "1:913565102534:web:45e62b392da5febb4bc2c7",
  measurementId: "G-0SQLDDDEB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)