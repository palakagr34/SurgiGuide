import React from 'react';
import { View, Text,TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { signUp } from '../firebaseAuth'; // Import the signUp function
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

                Alert.alert("Registration Successful!");
                
                navigation.reset({  // so user cannot click back to get to login/register page
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } catch (error) {
                Alert.alert("Registration Failed", error.message);
            }
        } else {
            Alert.alert("Error", "Passwords do not match. Please try again.");
        }
    };
    
    

  return (
    <View style={styles.container}>
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
      
      
      <Text style={styles.signupText}>
              Already have an account?{' '}
              <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
      

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
      fontSize: 14,
      color: '#555',
    },
    signupLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });