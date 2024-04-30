import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button,Alert} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignStyles from "./styles"
import { fetchAPI } from "../../scripts/api"

const SignIndex = ({ navigation }: any) => {
    const asyncStart = async () => {
        console.debug("asyncStart");
        // checkStorageData();
        clearStorageData();
        const isEnabled = await isAccessEnabledMobilApp();
        if (!isEnabled) {
            await showAlertMobilApp();
        } else {
            await navigateSignPhoneScreen();
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            asyncStart();
        }, [])
    );

    const clearStorageData = async () =>{
        try {
            const keys = await AsyncStorage.getAllKeys(); 
            await AsyncStorage.multiRemove(keys); 
            console.log('Tüm veriler sıfırlandı.');
          } catch (error) {
            console.error('Veri sıfırlama hatası:', error);
          }
    }

    const checkStorageData = async () =>{
        if (!(await AsyncStorage.getItem("AddressID"))) await AsyncStorage.setItem("AddressID","-1")
        if (!(await AsyncStorage.getItem("Token"))) await AsyncStorage.setItem("Token","e7697428-0480-11ef-aaba-287f07a526cf")
        
    }

    const showAlertMobilApp = async () => {
        Alert.alert(
            "Erişim Sorunu",
            "Mobil uygulamalar erişime kapalıdır.",
            [
                {
                    text: "Tamam",
                    onPress: () => console.log("Tamam'a basıldı."),
                    style: "default"
                }
            ],
            { cancelable: true }
        );
    };

    const isAccessEnabledMobilApp = async () => {
        const data = await fetchAPI("accessControl/MobilApp");
        console.log("AccessControl/MobilApp: " + data.state);
        return data.state;
    };

    const navigateSignPhoneScreen = async () => {
        console.log("Navigating SignPhoneScreen");
        const loadPhoneNumber = async () => {
            const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
            if (savedPhoneNumber) {
                console.log(`Telefon numarası: ${savedPhoneNumber}`);
                navigation.navigate("Home");
            } else {
                navigation.navigate("SignPhone");
            }
        };

        loadPhoneNumber();
    };

    return (
        <View style={ScreenStyles.center}>
            <Text style={SignStyles.SignTitleLezzAR}>LezzAR</Text>
        </View>

    )

}

export default SignIndex