import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity, ImageBackground} from 'react-native'; 
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
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Calendar</Text>
            <Calendar onDayPress={dayPress}
                markedDates={procedureDates}
                hideExtraDays={true}
                theme={{
                    todayTextColor: 'blue',
                    arrowColor: 'blue',
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textSectionTitleColor: 'black',
                    dayTextColor: 'black',
                    selectedDayBackgroundColor: 'blue',
                    selectedDayTextColor: 'white',
                    monthTextColor: 'black',
                    indicatorColor: 'blue',
                }}
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DatePicker')}>
                <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>

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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    }, 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#e9f2eb',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        marginTop: 20,
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
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
    },
    infoBox: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        padding: 25,
        backgroundColor: '#f1e6cd',
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
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