import React from 'react';
import { View, Text,TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleRegister = () => {
        if (pwd === confirm) {
            console.log('Register with: ', email, pwd);
            navigation.navigate('Home');
        }
        
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
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