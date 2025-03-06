import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native'; 

export default function PreSurgeryScreen ({navigation}){
    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Before your surgery</Text>
            <View style={styles.section}>
                <Text style={styles.text}>
                    Make sure to inform your healthcare providers about all the medications and supplements you're using. Avoid drinking alcohol prior to your surgery, and if you smoke, stopping a few days before your surgery can greatly reduce the risk of breathing problems during your surgery.
                </Text>
                <Text style={styles.text}>
                    Be sure to follow your provider's instructions for taking the following: aspirin, vitamin E, multivitamins, herbal remedies, other dietary supplements, and NSAIDs, such as ibuprofen (Advil® and Motrin®) and naproxen (Aleve®).
                </Text>
                <Text style={styles.text}>
                    Stop eating at midnight (12 a.m.) the night before your surgery. This includes hard candy and gum. If your healthcare provider told you to stop eating earlier than midnight, follow their instructions. Some people need to fast (not eat) for longer before their surgery.
                </Text>
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
    section: {
        backgroundColor: '#78ccd1',
        padding: 20,
        borderRadius: 15,
        elevation: 4, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        lineHeight: 24,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    }, 
});