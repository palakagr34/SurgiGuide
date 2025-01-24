import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

import { AuthProvider, AuthContext } from './AuthContext';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserIcon from './components/UserIcon';


const Stack = createNativeStackNavigator();

export default function AppContent() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, isLoading } = useContext(AuthContext);

  console.warn('Stop 1');

  useEffect (() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'KulimPark-Regular': require('./assets/fonts/KulimPark-Regular.ttf'),
        'KulimPark-Bold': require('./assets/fonts/KulimPark-Bold.ttf'),
      });
      setFontsLoaded(true);
      console.warn('Fonts loaded:', fontsLoaded);

    };

    loadFonts();
  }, []);

  if(isLoading || !fontsLoaded){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} options={{headerRight: () => <UserIcon />}}/>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
              <Stack.Screen name = "Login" component = {LoginScreen}/>
              <Stack.Screen name="Register" component = {RegisterScreen} />
            </>
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40, 
    color: 'blue'
  }
});
