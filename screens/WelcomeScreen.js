import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, Image} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Meet Surgi! </Text>
            <Image source={require('../assets/surgiIntro.png')} style={styles.image}/>
            <Text style={styles.subtitle}>Your surgery guide!</Text>
            <Button title="Login or Sign up" onPress={()=> navigation.navigate('Login')} />
            <Text style={styles.subtitle}>SurgiGuide</Text>
            <Button title="Find a Procedure" onPress={()=>console.warn('search screen')} />
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
      image: {
        width: 250,
        height: 250,
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'KulimPark-Regular'
      },
});