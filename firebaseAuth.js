import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import the initialized auth object from firebaseConfig.js

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up: ", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up: ", error.message);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Log In
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in: ", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in: ", error.message);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Log Out
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out: ", error.message);
    throw error;
  }
};
