import React from 'react';
import { View, Text,TextInput, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig'; 
import { doc, getDoc } from "firebase/firestore";
import { login } from '../firebaseAuth'; // Import the login function
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await login(email, pwd);
            const user = userCredential.user;
            await AsyncStorage.setItem('userToken', user.uid);

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if(docSnap.exists()){
              const userName = docSnap.data().name || docSnap.data().email;
              await AsyncStorage.setItem('userName', userName);
              
              const selectedProcedure = docSnap.data().selectedProcedure;
              console.log("Selected Procedure:", selectedProcedure);

              if (selectedProcedure) {
                await AsyncStorage.setItem('selectedProcedure', selectedProcedure);
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainApp', params: { procedure: selectedProcedure } }],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Specialties' }],
                });
              }
            }

            console.log("Login Successful!"); 

        } catch (error) {
            console.log("Login Failed", error.message);
        }
    }

  return (
    <ImageBackground source={require('../assets/background2.png')} style={styles.background}>
    <View style={styles.container}>
      <Image source={require('../assets/surgi2.png')} style={styles.image}/>
      
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
    <View style={styles.bottomContainer}>
      <Text style={styles.bottomText}>Are you new here? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.bottomText, styles.signupLink]}>Sign up!</Text>
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
      fontWeight: 'bold',
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
    signupLink: {
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
    signupLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });