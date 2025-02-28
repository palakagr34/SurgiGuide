import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'


export default function GenInfoScreen({ navigation, route }) {
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [procedureData, setProcedureData] = useState(null);


    useEffect(() => {
        console.log("In first useEffect");
        const fetchSelectedProcedure = async () => {
            let procedure = await AsyncStorage.getItem('selectedProcedure');
            if (!procedure) {
                procedure = route.params?.procedure || 'Unknown Procedure';
            }
            setSelectedProcedure(procedure);
        };

        fetchSelectedProcedure();
    }, [route.params]);

    useEffect(() => {
        console.log("In second useEffect");
        const fetchProcedureData = async () => {
            if (!selectedProcedure) return;  // Prevents running when selectedProcedure is null/undefined
            console.log("Selected Procedure (GenInfo):", selectedProcedure);

           
            const procedureRef = doc(db, 'procedures', selectedProcedure);
            const docSnap = await getDoc(procedureRef);

            if (docSnap.exists()) {
                setProcedureData(docSnap.data());
                console.log("Procedure Data found:", procedureData["Procedure Name"]);
            } else {
                console.log('No such document!');
            }
            
        };

        fetchProcedureData();
    }, [selectedProcedure]);

    useEffect(() => {
        if (procedureData) {
            console.log("Updated Procedure Data:", procedureData["Procedure Name"]);
        }
    }, [procedureData]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{selectedProcedure}</Text>
            <Text style={styles.subtitle}>General Information</Text>
            {procedureData ? (
            <>
                <View style={styles.section}>
                    <Text style={styles.label}>Treatment Reason:</Text>
                    <Text style={styles.value}>
                        {procedureData["Treatment Reason"]}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Surgeon's Actions:</Text>
                    <Text style={styles.value}>
                        {procedureData["Surgeon's Action"]}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Medications:</Text>
                    <Text style={styles.value}>
                        {procedureData["Medications"]}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Length of Procedure:</Text>
                    <Text style={styles.value}>The length of the procedure will be displayed here.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Diagram:</Text>
                </View>
            </>
            ) : (
                <ActivityIndicator size="large" color="#0000ff" /> //Loading indicator 
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    diagram: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 10,
    },
});