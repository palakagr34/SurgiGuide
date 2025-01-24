import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext, useAuth } from '../AuthContext';
import { logout } from '../firebaseAuth'

export default function HomeScreen({ navigation }) {
    const {signOutUser} = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Successfully logged out");
        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Home Screen!</Text>
            <Button title="Log Out" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });