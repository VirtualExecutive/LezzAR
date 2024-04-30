import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Alert,TextInput} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignInVerifyStyles from "./styles"
import { fetchAPI } from "../../scripts/api"

const SignInVerifyIndex = ({ navigation }: any) => {
    const [code, setCode] = useState(''); 
    

    const handleMailSubmit = async () => {

        navigation.navigate("Home")

    };
    const askVerificationCode = async () => {

        navigation.navigate("Home")

    };

    return (
        <View style={ScreenStyles.center}>
            {/* <Text style={SignPhoneStyles.headerText} >Telefon Numaranızı Giriniz</Text> */}
            <TextInput
                style={SignInVerifyStyles.input}
                placeholder="Doğrulama kodunuzu giriniz"
                keyboardType="numeric" 
                value={code}
                onChangeText={setCode} 
                underlineColorAndroid="transparent"
            />
            <View style={SignInVerifyStyles.buttons}>
                <TouchableOpacity
                    style={SignInVerifyStyles.buttonBlue}
                    onPress={askVerificationCode} 
                    >
                    <Text style={SignInVerifyStyles.buttonText}>Kod Gönder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={SignInVerifyStyles.buttonRed}
                    onPress={handleMailSubmit} 
                    >
                    <Text style={SignInVerifyStyles.buttonText}>Doğrula</Text>
                </TouchableOpacity>
            </View>
        </View>

    )

}

export default SignInVerifyIndex