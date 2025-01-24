import React from 'react';
import { View, Text,TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
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

            navigation.reset({  // so user cannot click back to get to login/register page
                index: 0,
                routes: [{ name: 'Home' }],
            });

            Alert.alert("Login Successful!"); 

        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    }

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
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
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 16,
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
  });