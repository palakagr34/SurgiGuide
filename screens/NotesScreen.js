import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function NotesScreen() {
    const [note, setNote] = useState('');

    const handleSave = (text) => {
        // Handle save action (e.g., save to storage or backend)
        console.log('Note saved:', note);
        setNote(text);
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
                    value={note}
                    onChangeText={handleSave}
                />
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

