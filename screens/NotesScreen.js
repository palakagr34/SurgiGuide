import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Keyboard, ImageBackground, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function NotesScreen() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            const userToken = await AsyncStorage.getItem('userToken');
            const userRef = doc(db, 'users', userToken);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const notes = userDoc.data().notes || '';
                setText(notes);
            }
            setLoading(false);
        };

        fetchNotes();
    }, []);

    const handleSave = async () => {
        console.log("handling save");
        setLoading(true);
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const userRef = doc(db, 'users', userToken);
            await updateDoc(userRef, {
                notes: text
            });
            console.log('Success: Notes updated successfully');
        } catch (error) {
            console.log('Error: Failed to update notes');
        } finally {
            setLoading(false);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Text style={styles.title}>Notes</Text>
                <View style={styles.textInputContainer}>
                    <TextInput  
                        style={styles.textInput}
                        multiline
                        placeholder="Type your notes here..."
                        value={text}
                        onChangeText={setText}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    textInputContainer: {
        flex: 1,
        marginBottom: 0, // Ensures the TextInput ends 100 pixels above the bottom
    },
    textInput: {
        flex: 1,
        textAlignVertical: 'top', // Ensures text starts at the top of the TextInput
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 16,
        backgroundColor: '#f1e6cd',
    },
    button: {
        backgroundColor: '#e9f2eb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 55,
        marginTop: 15,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        elevation: 5, 
        width: '50%',
        alignSelf: 'center',
      },
      buttonText: {
        color: '#007bff', 
        fontSize: 18, 
        textAlign: 'center',
        fontFamily: 'KulimPark-Regular',
      },
});

