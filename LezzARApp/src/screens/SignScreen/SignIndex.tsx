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
        // clearStorageData();
        checkStorageData();
        const isEnabled = await isAccessEnabledMobilApp();
        if (!isEnabled) {
            await showAlertMobilApp();
        } else {
            await checkLoading();
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
        const data = (await fetchAPI("accessControl/MobilApp")).data;
        console.log("AccessControl/MobilApp: " + data.state);
        return data.state;
    };

    const checkLoading = async () => {

        const loadToken = async () => {
            const savedPhone = await AsyncStorage.getItem('Phone');
            const savedEmail = await AsyncStorage.getItem('Email');
            const savedToken = await AsyncStorage.getItem('Token');
            const savedName = await AsyncStorage.getItem('Name');
            const savedSurName = await AsyncStorage.getItem('SurName');

            

            if(!savedPhone){
                navigation.navigate("SignPhone");
            }
            else if(!savedEmail){
                navigation.navigate("SignEmail");
            }
            else if(!savedName || !savedSurName){
                navigation.navigate("SignUp");
            }
            else if(!savedToken){
                navigation.navigate("SignPhone");
            }
            else{
                navigation.navigate("Home")
            }
        };

        loadToken();
    };

    return (
        <View style={ScreenStyles.center}>
            <Text style={SignStyles.SignTitleLezzAR}>LezzAR</Text>
        </View>

    )

}

export default SignIndex