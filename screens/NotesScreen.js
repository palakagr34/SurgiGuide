import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <TextInput  
                    style={styles.textInput}
                    multiline
                    placeholder="Type your notes here..."
                    value={text}
                    onChangeText={setText}
                />
                <Button title="Save Notes" onPress={handleSave} disabled={loading} />

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        textAlignVertical: 'top', // Ensures text starts at the top of the TextInput
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
    },
});

