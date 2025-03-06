import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image, TouchableOpacity} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Meet Surgi! </Text>
            <Image source={require('../assets/surgiIntro.png')} style={styles.image}/>
            <Text style={styles.subtitle}>Your surgery guide!</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}></Text>
            <Button title="Find a Procedure" onPress={()=>navigation.navigate('Specialties')} /> 
            <Text style={styles.subtitle}>SurgiGuide</Text>

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
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'KulimPark-Bold'
    },
    button: {
      backgroundColor: '#e9f2eb',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
      marginBottom: 10,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.8, 
      shadowRadius: 2, 
      elevation: 5, 
    },
    buttonText: {
      color: '#007bff', 
      fontSize: 18, 
      textAlign: 'center',
      fontFamily: 'KulimPark-Regular',
    },
    image: {
      width: 250,
      height: 250,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 19,
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'KulimPark-Regular'
    },
});