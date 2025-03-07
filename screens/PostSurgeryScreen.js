import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, ActivityIndicator, ImageBackground} from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'

export default function PostSurgeryScreen ({navigation}){
    const [procedureData, setProcedureData] = useState(null);
    const selectedProcedure = "Cerebrospinal Fluid (CSF) Shunt Procedures";

    useEffect(()=> {
        const fetchProcedureData = async() => {
            const procedureRef = doc(db, 'procedures', selectedProcedure);
            const docSnap = await getDoc(procedureRef);

            if(docSnap.exists()){
                setProcedureData(docSnap.data());
                console.log("Post Surgery Procedure Data found");
            }
            else {
                console.log("No post surgery procedure data was found.");
            }
        };
        fetchProcedureData();
    }, []);

    useEffect(()=> {
        if(procedureData){
            console.log("updated procedure data:", procedureData["Procedure Name"]);
        }
    }, [procedureData]);


    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>After your surgery</Text>
            <View style={styles.outerSection}>
            {procedureData ? (
                <>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>What to Expect</Text>
                        <Text style={styles.text}>
                            {procedureData["Post-surgery What to expect"]}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Common Symptoms Not to Be Worried About</Text>
                        <Text style={styles.text}>
                            {procedureData["Post-surgery Common symptoms not to be worried about"]}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Adverse Signs/Symptoms</Text>
                        <Text style={styles.text}>
                            {procedureData["Post-surgery adverse signs/symptoms"]}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Nutrition</Text>
                        <Text style={styles.text}>
                            {procedureData["Post-surgery nutrition"]}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.subtitle}>Physical Activity</Text>
                        <Text style={styles.text}>
                            {procedureData["Post-surgery physical activity"]}
                        </Text>
                    </View>
                </>
            ): (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
            
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
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
    section: {
        marginBottom: 20,
    },
    outerSection: {
        backgroundColor: '#c4ecee',
        padding: 20,
        borderRadius: 15,
        elevation: 4, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    }, 
});