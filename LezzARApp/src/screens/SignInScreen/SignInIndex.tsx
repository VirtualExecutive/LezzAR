import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Alert,TextInput} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignInStyles from "./styles"
import { fetchAPI } from "../../scripts/api"
import { getFormatPhone } from '../../scripts/formatPhone';

const SignInIndex = ({ navigation }: any) => {
    const [mail, setMail] = useState(''); 
    
    const validateEmail = (email:any) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

    const handleMailSubmit = async () => {
        let viewMail =mail;
        if(viewMail.toString()==""){

            Alert.alert("E-mail Adresini Girin","E-mail adresinizi girmeniz gerekmektedir.");
            return;
        }
        if (viewMail.length>=255){
            Alert.alert("Çok Uzun!", "E-mail adresini çooooook uzun.");
            return;
        }
        if (!validateEmail(viewMail)){
            Alert.alert("Geçersiz E-mail Adresi", "Girdiğiniz E-mail adresiniz geçersizdir.");
            return;
        }
        await AsyncStorage.setItem("email",viewMail)
        navigation.navigate("SignInVerify")

    };

    return (
        <View style={ScreenStyles.center}>
            {/* <Text style={SignPhoneStyles.headerText} >Telefon Numaranızı Giriniz</Text> */}
            <TextInput
                style={SignInStyles.input}
                placeholder="Email adresinizi giriniz"
                keyboardType="email-address" 
                value={mail}
                onChangeText={setMail} 
                underlineColorAndroid="transparent"
            />
            <TouchableOpacity
                style={SignInStyles.button}
                onPress={handleMailSubmit} 
            >
                <Text style={SignInStyles.buttonText}>Email Adresimi Doğrula</Text>
            </TouchableOpacity>
        </View>

    )

}

export default SignInIndex