import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function UserIcon(){
    const { user } = useContext(AuthContext);

    const initial = user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase();

    const handlePress = () => {
        console.log("User icon clicked");
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
            <View style={styles.icon}>
                <Text style={styles.iconText}>{initial}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      backgroundColor: '#4CAF50',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });