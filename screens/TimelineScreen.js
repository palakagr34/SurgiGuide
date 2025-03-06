import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground} from 'react-native'; 
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

    const renderBullets = (message) => {
        return message.split(/\n+/).map((item, index) => (
            <View key={index} style={styles.bulletContainer}> 
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.bulletText}>{item.trim()}</Text> 
            </View>
        ));
    };

    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.section}>
                    {message ? (
                        renderBullets(message)
                    ) : (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    }, 
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
        backgroundColor: '#c4ecee',
        padding: 20,
        borderRadius: 15,
        elevation: 4, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    message: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left',
    },
    bulletContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 20,
        lineHeight: 30,
        marginRight: 10,
    },
    bulletText: {
        fontSize: 16,
        lineHeight: 30,
        flex: 1,
    },
});