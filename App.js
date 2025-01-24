import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(false);

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AuthProvider } from './AuthContext';
import AppContent from './AppContent';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}