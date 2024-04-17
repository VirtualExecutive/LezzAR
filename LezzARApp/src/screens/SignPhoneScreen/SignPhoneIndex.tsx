import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Alert,TextInput} from "react-native"
import ScreenStyles from "../styles"
import SignPhoneStyles from "./styles"
import { fetchAPI } from "../../scripts/api"

const SignPhoneIndex = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState('');  // Telefon numarasını saklamak için state


    const handlePhoneSubmit = () => {
        Alert.alert("Girilen Telefon Numarası", phoneNumber);
    };

    const asyncStart = async () => {

    }

    asyncStart();

    return (
        <View style={ScreenStyles.center}>
            {/* <Text style={SignPhoneStyles.headerText} >Telefon Numaranızı Giriniz</Text> */}
            <TextInput
                style={SignPhoneStyles.input}
                placeholder="Telefon numaranızı giriniz"
                keyboardType="phone-pad" 
                value={phoneNumber}
                onChangeText={setPhoneNumber} 
                underlineColorAndroid="transparent"
            />
            <TouchableOpacity
                style={SignPhoneStyles.button}
                onPress={handlePhoneSubmit} 
            >
                <Text style={SignPhoneStyles.buttonText}>Numaramı doğrula</Text>
            </TouchableOpacity>
        </View>

    )

}

export default SignPhoneIndex