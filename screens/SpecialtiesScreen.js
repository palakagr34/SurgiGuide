// Page to pick a specialty of procedure
import {React, useEffect, useState} from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, loading } from 'react-native';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure this is correctly pointing to firebaseConfig.js


export default function SpecialtiesScreen({ navigation }) {

    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        const fetchSpecialties = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "procedures"));
            const specialtiesSet = new Set();
    
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.Specialty) {
                specialtiesSet.add(data.Specialty);
              }
            });
    
            const uniqueSpecialties = Array.from(specialtiesSet).sort(); // Sorting alphabetically
            setSpecialties(uniqueSpecialties);
          } catch (error) {
            console.error("Error fetching specialties:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchSpecialties();
  }, []); // Runs once when the component mounts


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Specialties</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={specialties}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Procedures", item )} >
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );

};

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