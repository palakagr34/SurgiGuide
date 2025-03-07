import React, { use, useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
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
        <ImageBackground source={require('../assets/background.png')} style={styles.background}>
            <View style={styles.container}>
                {procedureData ? (
                    <>
                        <Text style={styles.title}>{procedureData["Procedure Name"]}</Text>

                        <ScrollView horizontal contentContainerStyle={styles.timeline} showsHorizontalScrollIndicator={false}>
                            {[
                                { title: "Day Before Surgery" , color: '#a5e4cb'},
                                { title: "Morning of Surgery" , color: '#c8f1f3'},
                                { title: "Right After Surgery " , color: '#68a8e4'},
                                { title: "Day of Discharge" , color: '#f7ddb9'},
                            ].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.timelineItem, { backgroundColor: item.color }] }
                                    onPress={() => navigation.navigate('Timeline', { title: item.title })}
                                >
                                    <Text style={styles.timelineText}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.buttonRow}>
                            <Text style={styles.infoTitle}>More information:</Text>
                            {[
                                { title: "General Information", screen: "GenInfo", color: "#baedf0" }, 
                                { title: "Before your surgery", screen: "PreSurgery", color: "#75c2c7" }, 
                                { title: "After your surgery", screen: "PostSurgery", color: "#aedadd" } 
                            ].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.infoButton, { backgroundColor: item.color, marginTop: index === 0 ? 0 : -20 }]}
                                    onPress={() => navigation.navigate(item.screen)}
                                >
                                    <Text style={styles.infoButtonText}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ): (
                    <Text>Loading...</Text>
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
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 110,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    timeline: {
        flexGrow: 1,
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 0,
        height: 120, // Increased for a balanced layout
        alignItems: "center", // Centers items vertically
    },
    timelineItem: {
        paddingVertical: 10, 
        paddingHorizontal: 5,
        borderRadius: 20, 
        marginHorizontal: 4, 
        height: 100, 
        width: 100,
        alignItems: "center", 
        justifyContent: "center",
        elevation: 4, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    timelineText: {
        color: "#000", 
        fontWeight: "600",
        fontSize: 17, 
        textAlign: "center",
    },
    infoTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        color: "black",  
        alignSelf: "flex-start",
        paddingLeft: 10,
    },
    buttonRow: {
        flexDirection: "column",
        width: "90%",
        alignItems: "center",
        paddingBottom: 90,
    },
    infoButton: {
        width: "100%", 
        paddingVertical: 35, 
        borderRadius: 20, 
        alignItems: "center",
        justifyContent: "center",
        elevation: 7, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    infoButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },

});