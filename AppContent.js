import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

import { AuthProvider, AuthContext } from './AuthContext';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserIcon from './components/UserIcon';
import SpecialtiesScreen from './screens/SpecialtiesScreen';
import ProceduresScreen from './screens/ProceduresScreen';
import SetProcedureScreen from './screens/SetProcedureScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import NotesScreen from './screens/NotesScreen';
import CalendarScreen from './screens/CalendarScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { height: 60, paddingBottom: 10 }, // Adjust styling
        })}
      >
      <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Notes" component={NotesScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Home" component={HomeScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerRight: () => <UserIcon />}} />
    </Tab.Navigator>
  );
};

const StackNavigator = ({ user }) => {
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false}}/>
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
          <Stack.Screen name = "Login" component = {LoginScreen}/>
          <Stack.Screen name="Register" component = {RegisterScreen} />
          <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
          <Stack.Screen name="Procedures" component={ProceduresScreen} />
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
        </>
      )
      }
  </Stack.Navigator>
  );
};

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
        <StackNavigator user={user}/>
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
