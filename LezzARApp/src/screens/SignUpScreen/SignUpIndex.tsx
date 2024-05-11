import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignUpStyles from "./styles"
import { fetchAPI } from "../../scripts/api"
import { getFormatPhone } from '../../scripts/formatPhone';
import { useFocusEffect } from '@react-navigation/native';

const SignUpIndex = ({ navigation }: any) => {
    const [name, setName] = useState("");
    const [sur, setSur] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    const [gotKeys, setGotKeys] = useState(false);

    const getKeys = async () => {
        let  email_as = await AsyncStorage.getItem("Email");
        if(email_as){
            setEmail(email_as);
        }
        else{
            console.log("Email adresi yerel olarak kaydı bulunamadı.");
            return navigation.navigate("SignIn");
        }

        let token = await AsyncStorage.getItem("Token");
        if(token){
            await setToken(token)
        }
        else{
            console.log("Token yerel olarak kaydı bulunamadı.");
            return navigation.navigate("SignIn");
        }

        setGotKeys(true);
    }

    const isHaveAccount = async () => {
        
        let result = await fetchAPI(`account/isHaveAccount?email=${email}`);
        return result.data.result
    }
    const isHaveNameAndSurname = async () => {
        let token = await AsyncStorage.getItem("Token");
        let result = await fetchAPI(`account/fullName?token=${token}`);
        if(!result.data.name){
            await AsyncStorage.setItem("Name",result.data.name);
            return false;
        }
        if(!result.data.surname){
            await AsyncStorage.setItem("SurName",result.data.surname    );
            return false;
        }
        return true;
    }

    const checkSignUp = async() =>{
        console.log(email);
        if(email){
            let isHaveAc = await isHaveAccount();
            if (isHaveAc){
                let result = await isHaveNameAndSurname(); 
                if (result){
                    
                    console.log("Hesap bulunudu homeye yönlendiriliyor.")
                    return navigation.navigate("Home")
                }
            }
            else{
                console.log("Hesap bulunamadı tekrar emaile kayıt ediliyor.")
                await AsyncStorage.removeItem("Email")
                return navigation.navigate("SignIn")
            }
        }
        else{
            console.log("Email geçersiz.")
            return navigation.navigate("SignIn")
        }
    }


    useEffect(()=>{
        checkSignUp();
    },[gotKeys]);



    useFocusEffect(
        React.useCallback(() => {
            getKeys();
        }, [])
    );

    const handleSubmit = async () => {
        if(!sur || !name){
            Alert.alert("Uyarı","Ad veya soyadınız boş olamaz.");
            return;
        }
        else if(sur.length >100 || name.length >100){
            Alert.alert("Uyarı","İsim veya soyadınız maksimum 100 karakterli olmalıdır.");
            return;
        }
        else if(sur.length <2 || name.length <2){
            Alert.alert("Uyarı","İsim veya soyadınız minimum 2 karakter içermelidir.");
            return;    
        }
        let result = await fetchAPI(`account/signUp?token=${token}&name=${name}&surname=${sur}`)
        if(result.status==200){
            await AsyncStorage.setItem("Name",name);
            await AsyncStorage.setItem("SurName",sur);
            return navigation.navigate("Home");
        }
        else{
            Alert.alert("Hata","Giriş bilgileriniz geçersiz veya bilinmeyen hata.")
        }


    }

    return (
        <View style={ScreenStyles.center}>
            <TextInput
                style={SignUpStyles.input}
                placeholder="Adınız"
                keyboardType="default"
                value={name}
                onChangeText={setName}
                underlineColorAndroid="transparent"
            />
            <TextInput
                style={SignUpStyles.input}
                placeholder="Soy Adınız"
                keyboardType="default"
                value={sur}
                onChangeText={setSur}
                underlineColorAndroid="transparent"
            />
            <TouchableOpacity
                style={SignUpStyles.button}
                onPress={handleSubmit}
            >
                <Text style={SignUpStyles.buttonText}>Onayla</Text>
            </TouchableOpacity>
        </View>

    )

}

export default SignUpIndex