import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

export default function HistoryScreen({ navigation }) {
    const [pastProcedures, setPastProcedures] = useState([]);

    const fetchPastProcedures = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userRef = doc(db, 'users', userToken);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const procedures = userDoc.data().procedures;
            const pastProcedures = procedures
                .filter(procedure => moment(procedure.date).isBefore(moment()))
                .sort((a, b) => moment(b.date).diff(moment(a.date)));
            setPastProcedures(pastProcedures);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPastProcedures();
        }, [])
    );

    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>History</Text>
            {pastProcedures.length > 0 ? (
                pastProcedures.map((procedure, index) => (
                    <View key={index} style={styles.procedureBox}>
                        <Text style={styles.procedureTitle}>{procedure.name}</Text>
                        <Text style={styles.procedureText}>Date: {procedure.date}</Text>
                        <Text style={styles.procedureText}>Type: {procedure.type}</Text>
                        <Text style={styles.procedureText}>Notes: {procedure.notes}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noProceduresText}>No past procedures found.</Text>
            )}
        </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 100,
        paddingBottom: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    procedureBox: {
        padding: 15,
        backgroundColor: '#93d6da',
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    procedureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    procedureText: {
        fontSize: 14,
        marginBottom: 5,
    },
    noProceduresText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
    },
});