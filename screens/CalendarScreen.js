import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity} from 'react-native'; 
import {Calendar} from 'react-native-calendars';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function CalendarScreenScreen ({navigation}){

    const [procedureDates, setProcedureDates] = useState({});
    const [boxVisible, setBoxVisible] = useState(false);
    const [selectedProcedure, setSelectedProcedure] = useState(null);


    const fetchProcedures = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userRef = doc(db, 'users', userToken);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const procedures = userDoc.data().procedures; 
            const newMarkedDates = {}; 

            procedures.forEach(procedure => {
                newMarkedDates[procedure.date] = {
                    selected: true, 
                    marked: true, 
                    selectedColor: 'green', 
                    procedure: procedure 
                };
            });
            setProcedureDates(newMarkedDates);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProcedures();
        }, [])
    );


    const dayPress = (day) => {
        console.log("Day pressed:", day.dateString);
        const procedure = procedureDates[day.dateString]?.procedure;

        if(procedure){
            setBoxVisible(true);
            setSelectedProcedure(procedure);
            console.log('Selected Procedure: ', procedure);
        }
    };


    return (
        <View style={styles.container}>
            <Calendar onDayPress={dayPress}
                markedDates={procedureDates}
                theme={{
                    todayTextColor: 'blue',
                    arrowColor: 'blue',
                }}
            />
            <View style={styles.buttonContainer}>
                <Button title="Add Surgery" onPress={()=> navigation.navigate('DatePicker', { type: 'surgery' } )} />
                <Button title="Add Follow up" onPress={() => navigation.navigate('DatePicker', { type: 'follow-up' })} />
            </View>
            { boxVisible && selectedProcedure && (
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>{selectedProcedure.name}</Text>
                    <Text style={styles.infoText}>{selectedProcedure.notes}</Text>
                    <TouchableOpacity onPress={()=> setBoxVisible(!boxVisible)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});