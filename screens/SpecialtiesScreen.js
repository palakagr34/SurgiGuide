// Page to pick a specialty of procedure
import {React} from 'react';
import { View, Text, Button} from 'react-native';



export default function SpecialtiesScreen({ navigation }) {
    return(
        <View>
            <Text>Specialties Screen</Text>
            <Button title="click" onPress={() => navigation.navigate('Subspecialties')} />
        </View>
    )
}