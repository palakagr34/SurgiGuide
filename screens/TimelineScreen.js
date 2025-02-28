import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'; 
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function TimelineScreen ({navigation, route}){
    const {title} = route.params; 
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
        console.log(title);
            try {
                const procedureRef = doc(db, 'procedures', 'Cerebrospinal Fluid (CSF) Shunt Procedures');
                const docSnap = await getDoc(procedureRef);
                if(docSnap.exists()){
                    data = docSnap.data();
                    setMessage(data[title]);
                }
                else {
                    console.log('No such documen');
                    setMessage("No message found for this title");
                }
            }
            catch (error){
                console.log('Error fetching message:', error);
            }
        };
        fetchMessage();
    }, [title]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {message ? (
                <Text style={styles.message}>{message}</Text>
            ) : (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
    },
});