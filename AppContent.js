import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
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
          tabBarStyle: { ...styles.tabBar }, 
          tabBarShowLabel: false, 
          tabBarIcon: ({ focused, color, size=30 }) => { 
            let iconName;

            if (route.name === 'Chatbot') {
              iconName = require('./assets/chatbot.png');
            } else if (route.name === 'Notes') {
              iconName = require('./assets/notes.png');
            } else if (route.name === 'Home') {
              iconName = require('./assets/surgiIntro.png');
            } else if (route.name === 'Calendar') {
              iconName = require('./assets/calendar.png');
            } else if (route.name === 'History') {
              iconName = require('./assets/history.png');
            }
            return <Image source={iconName} style={styles.tabIcons} />;
          },
        })}
      >
      <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Notes" component={NotesScreen} options={{headerRight: () => <UserIcon />}} />
      <Tab.Screen name="Home" options={{headerTransparent: true, headerTitle: '', headerRight: () => <UserIcon />}}>
        {props => <HomeScreen {...props} procedure={procedure} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerTransparent: true, headerTitle: '', headerRight: () => <UserIcon />}} />
      <Tab.Screen name="History" component={HistoryScreen} options={{headerTransparent: true, headerTitle: '', headerRight: () => <UserIcon />}} />
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
          <Stack.Screen name="PreSurgery" component={PreSurgeryScreen} options={{headerTransparent: true, headerTitle: ''}}/>
          <Stack.Screen name="PostSurgery" component={PostSurgeryScreen} options={{headerTransparent: true, headerTitle: ''}}/>
          <Stack.Screen name="Timeline" component={TimelineScreen} options={{headerTransparent: true, headerTitle: ''}}/>
          <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
          <Stack.Screen name="Procedures" component={ProceduresScreen} />
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{headerRight: () => <UserIcon />}} />
          <Stack.Screen name="DatePicker" component={DatePickerScreen} options={{headerTransparent: true, headerTitle: '', headerRight: () => <UserIcon />}}/>
          <Stack.Screen name="GenInfo" component={GenInfoScreen} options={{headerTransparent: true, headerTitle: '', headerRight: () => <UserIcon />}}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
          <Stack.Screen name ="Login" component = {LoginScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Register" component = {RegisterScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="Specialties" component={SpecialtiesScreen} />
          <Stack.Screen name="Procedures" component={ProceduresScreen} />
          <Stack.Screen name="SetProcedure" component={SetProcedureScreen} />
          <Stack.Screen name="GenInfo" component={GenInfoScreen} options={{headerTransparent: true, headerTitle: ''}}/>
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
  }, 
  tabBar: {
    height: 60,
    paddingTop: 5, 
    backgroundColor: '#e5ce9d', // Adjusted to match the beige color from the image
    borderTopLeftRadius: 20, // Rounded edges
    borderTopRightRadius: 20,
    position: 'absolute', // Ensures the bar has rounded edges properly
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 5, // Adds slight shadow for depth
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }, 
  tabIcons: {
    width: 32, 
    height: 32, 
    resizeMode: 'contain',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});
