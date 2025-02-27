import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Button, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';

export default function UserIcon(){
    const { user, signOutUser } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();

    useEffect(()=> {
      const fetchUserName = async () => {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      };
      fetchUserName();
    }, []);

    const initial = userName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase();

    const handlePress = () => {
        console.log("User icon clicked");
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        try {
            await signOutUser();
            await AsyncStorage.clear();
            console.log("Successfully logged out");

            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });

        } catch (error) {
            console.error("Error logging out: ", error.message);
        }
        
    }
    const handleOutsidePress = () => {
      console.log("outside press")
      if(dropdownVisible){
        setDropdownVisible(false);
      }
    }

    return (
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View>
          <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
              <View style={styles.icon}>
                  <Text style={styles.iconText}>{initial}</Text>
              </View>
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <Text style={styles.userName}>{userName}</Text>
              <Button title="View Profile" onPress={() => navigation.navigate("Settings")} />
              <Button title="Logout" onPress={handleLogout} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      backgroundColor: '#007AFF',
      width: 35,
      height: 35,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    dropdown: {
      position: 'absolute',
      top: 40,
      right: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      width: 150,
  },
  userName: {
      fontWeight: 'bold',
      marginBottom: 0,
      textAlign: 'center',
      fontSize: 20,
  },
  });