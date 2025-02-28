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
                    <Text style={styles.title}>{procedureData["Procedure Name"]}</Text>

                    <ScrollView horizontal contentContainerStyle={styles.timeline}>
                        {[
                            { title: "Day Before Surgery" },
                            { title: "Morning of Surgery" },
                            { title: "Day After Surgery " },
                            { title: "Day of Discharge" },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.timelineItem}
                                onPress={() => navigation.navigate('Timeline', { title: item.title })}
                            >
                                <Text style={styles.timelineText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    
                    <Button title="Pre-Surgery" />
                    <Button title="Post-Surgery" />        
                    <Button title="General Info" onPress={()=> navigation.navigate('GenInfo')} />
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
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 5,
        height: 100,
    },
    timelineItem: {
        backgroundColor: "#007bff", // Primary blue color
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 15, // Rounded buttons
        marginHorizontal: 6, // Space between buttons
        elevation: 3, // Shadow on Android
        shadowColor: "#000", // Shadow on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    timelineText: {
        color: "#fff", // White text
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});