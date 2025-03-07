import { LogBox } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './AuthContext';
import AppContent from './AppContent';


export default function App() {
  LogBox.ignoreAllLogs(false);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}