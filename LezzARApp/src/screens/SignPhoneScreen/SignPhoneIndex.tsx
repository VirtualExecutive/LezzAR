import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity,Alert,TextInput} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignPhoneStyles from "./styles"
import { getFormatPhone } from '../../scripts/formatPhone';

const SignPhoneIndex = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState(''); 
    
    useEffect(()=>{
        const loadPhoneNumber = async () => {
            const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
            if (savedPhoneNumber) {
                navigation.navigate("Home")
            }
        };

        loadPhoneNumber();
    },[]);

    const handlePhoneSubmit = async () => {
        let viewPhoneNumber =phoneNumber;
        switch(phoneNumber[0]){
            case "0":
                viewPhoneNumber = `+9${viewPhoneNumber}`;
                break;
            case "+":
                viewPhoneNumber = `${viewPhoneNumber}`;
                break;
            case undefined:
                Alert.alert("Telefon Numarınızı Giriniz","Telefon numaranızı girmeniz gerekmektedir.");
                return;
            default:    
                viewPhoneNumber = `+90${viewPhoneNumber}`;
                break;
        }
        if(viewPhoneNumber.slice(0,3)!="+90"){
            Alert.alert("Desteklenmeyen Ülke Kodu", "Yalnızca +90 ile başlayan telefon numaraları kabul edilmektedir.")
            return;
        }
        if (viewPhoneNumber.length!=13){
            Alert.alert("Hatalı Telefon Numarası", "Telefon numaranız hatalı veya eksik girdiniz.");
            return;
        }
        if ( viewPhoneNumber.slice(1).match(/^\d+$/) ===null){
            Alert.alert("Hatalı Telefon Numarası","Telefon numaranız sadece sayılardan oluşmalıdır.")   
            return;
        }
        
        Alert.alert(
            "Telefon Numaranızı Onaylayın",
            `Bu telefon numaranıza SMS doğrulama kodu göndereceğiz.\nTelefon No:\n${getFormatPhone(viewPhoneNumber)} \n\nOnaylıyor musunuz?`,
            [
            {
                text: "İptal",
                style: "cancel"
            },
            { text: "Onayla", onPress: async () => {await AsyncStorage.setItem('PhoneNumber', viewPhoneNumber);navigation.navigate("SignIn")}}
            ],
            { cancelable: false }
        );

    };

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