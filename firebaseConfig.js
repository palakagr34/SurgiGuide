// File: firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDa0SFHdI5H51cvjWsDMAjrMIB9F2-xfyI",
  authDomain: "surgiguide-7aaf0.firebaseapp.com",
  projectId: "surgiguide-7aaf0",
  storageBucket: "surgiguide-7aaf0.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
