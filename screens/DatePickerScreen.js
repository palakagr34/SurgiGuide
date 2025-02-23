import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatePickerScreen({ route, navigation }) {
    const { type } = route.params;
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
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.title}>Add {type === 'surgery' ? 'Surgery' : 'Follow Up'} Date</Text>
                <Calendar
                    onDayPress={onDayPress}
                    markedDates={{
                        [date.toISOString().split('T')[0]]: { selected: true, marked: true, selectedColor: 'blue' },
                    }}
                    theme={{
                        selectedDayBackgroundColor: 'blue',
                        todayTextColor: 'blue',
                        arrowColor: 'blue',
                    }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    value={name}
                    onChangeText={setName}
                    returnKeyType="done"
                    onSubmitEditing={()=>Keyboard.dismiss()}
                />
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Enter notes"
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />
                <Button title="Save" onPress={handleSave} />
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
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
});