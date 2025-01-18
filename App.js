import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);


  useEffect (() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'KulimPark-Regular': require('./assets/fonts/KulimPark-Regular.ttf'),
        'KulimPark-Bold': require('./assets/fonts/KulimPark-Bold.ttf'),
      });
      setFontsLoaded(true);
    };


    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!userToken); 
    };
    loadFonts();
    checkLoginStatus();
  }, []);

  if(!fontsLoaded || isLoggedIn === null){
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
            <Stack.Screen name = "Login" component = {LoginScreen}/>
            <Stack.Screen name="Register" component = {RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
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
