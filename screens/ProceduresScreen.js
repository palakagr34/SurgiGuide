// Page to search for specific procedure filtered by specialty and subspecialty 
import {React, useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
              if (data["Procedure Type"]){
                proceduresList.push(data["Procedure Type"]);
                console.log("Procedure Type:", data["Procedure Type"]);
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
        console.log("handling save");
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const userRef = doc(db, 'users', userToken);
            await updateDoc(userRef, {
                selectedProcedure: procedure
            });
            await AsyncStorage.setItem('selectedProcedure', procedure);
            console.log('set procedure w/ async:', procedure);
        } catch (error) {
            console.log('Error: ', error);
        } 

        navigation.navigate("MainApp");
    }
    
    return(
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
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    item: {
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
  });