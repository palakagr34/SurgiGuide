// Functions and variables in this file are available globally
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Holds user information when logged in, null when not 
  const [isLoading, setIsLoading] = useState(true); // True while Firebase checks if a user is logged in (takes time)

  useEffect(() => {  // Runs once when component is mounted 
    // onAuthStateChanged: firebase method that provides currentUser(uid,email,displayName) or null
    //                     also returns a function unsubscribe that removes the listener when called (so it only runs once)

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {   //
      if (currentUser) {
        const { uid, email, displayName } = currentUser;
        setUser({ uid, email, displayName });
        console.log("Current user: ", user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe; // Clean up the listener on unmount
  }, []);

  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign Out Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

