import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Platform, ScrollView, ImageBackground} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DatePickerScreen({ navigation }) {
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');

    const onDayPress = (day) => {
        setDate(new Date(day.dateString));
    };

    const handleSave = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userRef = doc(db, "users", userToken);

        const newProcedure = {
            type: type, 
            date: date.toISOString().split('T')[0],
            name: name,
            notes: notes
        };

        await updateDoc(userRef, {
            procedures: arrayUnion(newProcedure)
        })

        console.log('Procedure added:', newProcedure);
        navigation.goBack();
    };


    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Add Event</Text>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={{
                        [date.toISOString().split('T')[0]]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    hideExtraDays={true}
                    theme={{
                        selectedDayBackgroundColor: 'blue',
                        todayTextColor: 'blue',
                        arrowColor: 'blue',
                        backgroundColor: 'transparent',
                        calendarBackground: 'transparent',
                    }}
                    style={styles.calendar}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Event type"
                    value={type}
                    onChangeText={setType}
                    returnKeyType="done"
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="done"
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    returnKeyType="done"
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    calendar: {
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#dff0e3',
        color: '#333',
        alignSelf: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 2, 
        elevation: 5,
      },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#e9f2eb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 10,
        marginTop: 10,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 2, 
        elevation: 5, 
        width: '25%',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#007bff', 
        fontSize: 18, 
        textAlign: 'center',
        fontFamily: 'KulimPark-Regular',
    },
});