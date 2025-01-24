// File: firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';





const firebaseConfig = {
    apiKey: "AIzaSyDa0SFHdI5H51cvjWsDMAjrMIB9F2-xfyI",
    authDomain: "surgiguide-7aaf0.firebaseapp.com",
    projectId: "surgiguide-7aaf0",
    storageBucket: "surgiguide-7aaf0.firebasestorage.app",
    messagingSenderId: "464230160796",
    appId: "1:464230160796:web:eec08a359d6fbc25ccd059",
    measurementId: "G-NGM724E0NV"
  };

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {    // authentication by firebase 
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),   // store authentication info in persistent storage 
});
  
export { auth };

export const db = getFirestore(app); // Firestore database 

