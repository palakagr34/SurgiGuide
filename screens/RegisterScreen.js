import React from 'react';
import { View, Text,TextInput, Button, StyleSheet, Alert, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { signUp } from '../firebaseAuth'; // Import the signUp function
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirm, setConfirm] = useState('');


    const handleRegister = async () => {
      if (pwd === confirm) {
        try {
          // Register the user
          const userCredential = await signUp(email, pwd);
          const user = userCredential.user;

          await AsyncStorage.setItem('userToken', user.uid);
          await AsyncStorage.setItem('userName', name);
          

          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, {
            name: name, 
            email: email,
            preferences: {
              theme: 'light', 
              notifications: true
            }, 
            selectedProcedure: '', 
            favoriteProcedures: [], 
            recentSearches: [], 
            procedures: [{
              type: '',
              date: '',
              name: '',
              notes: ''
            }], 
            notes:''
          });
          console.log("Registration Successful!");
          
          navigation.reset({
            index: 0,
            routes: [{ name: 'Specialties' }],
          });

        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        }
      } else {
          Alert.alert("Error", "Passwords do not match. Please try again.");
      }
    };
    
    

  return (
    <ImageBackground source={require('../assets/background2.png')} style={styles.background}>
    <View style={styles.container}>
      <Image source={require('../assets/surgi2.png')} style={styles.image}/>
      <Text style={styles.title}>Welcome to SurgiGuide!</Text>
      <Text style={styles.subtitle}>Create a free account!</Text>
      <TextInput 
        style={styles.input}
        placeholder="name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#aaa"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry
      />
      <TextInput 
        style={styles.input}
        placeholder="confirm password"
        placeholderTextColor="#aaa"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      <Button title="Sign up" onPress={handleRegister} />
      

    </View>
    <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.bottomText, styles.signinLink]}>Login</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingBottom: 200
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#333',
      fontFamily: 'KulimPark-Bold'
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
        color: '#333',
        fontFamily: 'KulimPark-Regular'
      },
    input: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 15,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      backgroundColor: '#dff0e3',
      color: '#333',
    },
    signupText: {
      marginTop: 20,
      fontSize: 16,
      color: '#555',
      fontFamily: 'KulimPark-Regular'
    },
    signinLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 100, // Adjusted to position the text 100 units from the bottom
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    bottomText: {
      fontSize: 16,
      fontFamily: 'KulimPark-Regular',
      color: '#555',
    },
    signinLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });