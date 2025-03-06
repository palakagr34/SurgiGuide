import React from 'react';
import {View, Text, ScrollView, StyleSheet, ImageBackground} from 'react-native'; 

export default function PostSurgeryScreen ({navigation}){
    return (
        <ImageBackground source={require('../assets/background3.png')} style={styles.background}>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Post Surgery Tips</Text>

            <View style={styles.outerSection}>
            <View style={styles.section}>
                <Text style={styles.subtitle}>What to Expect</Text>
                <Text style={styles.text}>
                    Temporary text: After surgery, you may experience some discomfort and fatigue. It's normal to feel tired and have some pain at the surgical site.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Common Symptoms Not to Be Worried About</Text>
                <Text style={styles.text}>
                    Temporary text: Mild swelling, bruising, and slight bleeding are common after surgery. These symptoms should gradually improve over time.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Adverse Signs/Symptoms</Text>
                <Text style={styles.text}>
                    Temporary text: If you experience severe pain, excessive bleeding, high fever, or signs of infection, contact your healthcare provider immediately.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Nutrition</Text>
                <Text style={styles.text}>
                    Temporary text: It's important to maintain a balanced diet to support your recovery. Drink plenty of fluids and eat a variety of nutritious foods.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Physical Activity</Text>
                <Text style={styles.text}>
                    Temporary text: Follow your healthcare provider's instructions regarding physical activity. Start with light activities and gradually increase as you recover.
                </Text>
            </View>
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
});