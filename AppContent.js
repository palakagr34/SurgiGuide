import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';


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
import HistoryScreen from './screens/HistoryScreen';
import DatePickerScreen from './screens/DatePickerScreen';
import GenInfoScreen from './screens/GenInfoScreen';
import TimelineScreen from './screens/TimelineScreen';
import PostSurgeryScreen from './screens/PostSurgeryScreen';
import PreSurgeryScreen from './screens/PreSurgeryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const BottomTabNavigator = ({route}) => {
  const procedure = route?.params?.procedure || null;
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
      <Tab.Screen name="Home" options={{headerRight: () => <UserIcon />}}>
        {props => <HomeScreen {...props} procedure={procedure} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="History" component={HistoryScreen} options={{headerRight: () => <UserIcon />}} />
    </Tab.Navigator>
  );
};

const StackNavigator = ({ params }) => {
  console.log("User (StackNavigator):", params.user);
  return (
    <Stack.Navigator>
      {params.user ? (
        <>
          <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ headerShown: false}}/>
          <Stack.Screen name="PreSurgery" component={PreSurgeryScreen} />
          <Stack.Screen name="PostSurgery" component={PostSurgeryScreen} />
          <Stack.Screen name="Timeline" component={TimelineScreen} />
          <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
          <Stack.Screen name="Procedures" component={ProceduresScreen} />
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{headerRight: () => <UserIcon />}} />
          <Stack.Screen name="DatePicker" component={DatePickerScreen} options={{headerRight: () => <UserIcon />}}/>
          <Stack.Screen name="GenInfo" component={GenInfoScreen} options={{headerRight: () => <UserIcon />}}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
          <Stack.Screen name ="Login" component = {LoginScreen}/>
          <Stack.Screen name="Register" component = {RegisterScreen} />
          <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
          <Stack.Screen name="Procedures" component={ProceduresScreen} />
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
          <Stack.Screen name="GenInfo" component={GenInfoScreen} />
        </>
      )
      }
  </Stack.Navigator>
  );
};

export default function AppContent() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { user, isLoading, signOutUser } = useContext(AuthContext);

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
  
  console.log("User (AppContent):", user);
  console.log("SignOutUser (AppContent):", signOutUser);
  return (
      <NavigationContainer>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <StackNavigator params={{user, signOutUser}}/>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
