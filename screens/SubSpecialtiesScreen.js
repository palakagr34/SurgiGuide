// Page to search for subspecialty filtered based on chosen specialty 
import {React} from 'react';
import { View, Text, Button } from 'react-native';



export default function SubSpecialtiesScreen({ navigation }) {
    return(
        <View>
            <Text>Subspecialties Screen</Text>
            <Button title="click" onPress={() => navigation.navigate('Procedures')} />
        </View>
    )
}