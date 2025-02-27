import React, { use, useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext, useAuth } from '../AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation, procedure }) {
    const [procedureData, setProcedureData] = useState(null);
    const [storedProcedure, setStoredProcedure] = useState(null);

    useEffect(() => {
        console.log("Fetching stored procedure");
        const fetchStoredProcedure = async () => {
            const storedProcedure = await AsyncStorage.getItem('selectedProcedure');
            setStoredProcedure(storedProcedure);
            console.log("Stored Procedure:", storedProcedure);
        }
        fetchStoredProcedure();
    }, []);

    const selectedProcedure = route?.params?.procedure || procedure || storedProcedure || null;
        
    useEffect(() => {
        if (selectedProcedure) {
          console.log('Selected Procedure (Home):', selectedProcedure);   
          fetchProcedureData(selectedProcedure);      
        }
    }, [selectedProcedure]);

    const fetchProcedureData = async (procedureId) => {
        try {
            const procedureRef = doc(db, "procedures", procedureId);
            const docSnap = await getDoc(procedureRef);
            if (docSnap.exists()) {
                setProcedureData(docSnap.data());
            } else {
                console.error("Procedure not found");
            }
        } catch (error) {
            console.error("Error fetching procedure data: ", error.message);
        }
    }

    return (
        <View style={styles.container}>
            {procedureData ? (
                <>
                    <Text style={styles.title}>{procedureData["Procedure Type"]}</Text>
                    <ScrollView horizontal style={styles.timeline}>
                        <TouchableOpacity style={styles.timelineItem}>
                            <Text>Day Before Surgery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.timelineItem}>
                            <Text>Morning of Surgery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.timelineItem}>
                            <Text>Day After Surgery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.timelineItem}>
                            <Text>Day of Discharge</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.buttonRow}>
                        <Button title="Pre-Surgery" />
                        <Button title="Post-Surgery" />
                    </View>
                    <Button title="General Info" />
                </>
            ): (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    timeline: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineItem: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
});