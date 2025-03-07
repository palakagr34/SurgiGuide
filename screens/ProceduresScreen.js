// Page to search for specific procedure filtered by specialty and subspecialty 
import {React, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { db } from "../firebaseConfig"; // Import Firestore instance
import { getFirestore, collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProceduresScreen({ route, navigation }) {
    const [procedures, setProcedures] = useState([]);
    const specialty = route.params;

    useEffect(() => {
        const fetchProcedures = async () => {
          try {
            const q = query(collection(db, "procedures"), where("Specialty", "==", specialty));
            const querySnapshot = await getDocs(q);
            const proceduresList = [];
    
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data["Procedure Name"]){
                proceduresList.push(data["Procedure Name"]);
                console.log("Procedure Name:", data["Procedure Name"]);
              }
            });
    
            setProcedures(proceduresList);
          } catch (error) {
            console.error("Error fetching procedures:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchProcedures();
    }, []); // Runs once when the component mounts

    const handleSelection = async (procedure) => {
        console.log("handling procedure selection");
        
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            if (userToken){
                const userRef = doc(db, 'users', userToken);
                await updateDoc(userRef, {
                    selectedProcedure: procedure
                });
                await AsyncStorage.setItem('selectedProcedure', procedure);
                console.log('Procedure set w/ async:', procedure);
                navigation.navigate('MainApp');
            }
            else {
                console.log('User not logged in');
                navigation.navigate("GenInfo", { procedure });
            }
        } catch (error) {
            console.log('Error: ', error);
        } 

        
    }
    
    return(
      <ImageBackground source={require('../assets/background4.png')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>{specialty} Procedures</Text>
            <FlatList
                data={procedures}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleSelection(item)} >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
    background: {
      flexGrow: 1
    },
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 80,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    item: {
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
  });