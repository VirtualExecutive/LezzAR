import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenStyles from "../styles"
import SignInVerifyStyles from "./styles"
import { fetchAPI } from '../../scripts/api';
import { useFocusEffect } from '@react-navigation/native';

const SignInVerifyIndex = ({ navigation }: any) => {
    const [code, setCode] = useState('');
    const [isEnabled_buttonBlue, setEnabled_buttonBlue] = useState(true);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const getEmail = async () => {
        let email = await AsyncStorage.getItem("Email");
        if (email) { setEmail(email); }
        else {
            navigation.navigate("SignIn")
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            getEmail();
        }, [])
    );

    const handleMailSubmit = async () => {
        const viewCode = code;
        if (viewCode.toString() == "") {
            Alert.alert("Eksik Kod", "Kod kısmını boş bırakamazsınız.")
            return;
        }
        else if (viewCode.length != 6) {
            Alert.alert("Yanlış Doğrulama Kodu", "Girdiğiniz doğrulama kodunuzu eksik veya fazladan karakter girdiniz.")
            return;
        }
        setIsLoading(true);
        var result = await fetchAPI(`verify/email/${email}/${code}`);
        setIsLoading(false);
        if (result.status == 200) {
            if (result.data.result == false) {
                Alert.alert("Hatalı Kod", "Girdiğiniz doğrulama kodunuz yanlıştır.")
                return;
            }
            await AsyncStorage.setItem("Token", result.data.token);
            await AsyncStorage.setItem("Email",email);
            return navigation.navigate("SignUp");
        }

    };


    const requestVerificationCode = async () => {
        var result = await fetchAPI(`verify/email/${email}`)

        if (result.status == 200) {
            setEnabled_buttonBlue(false);
            const isEnablerButton = setTimeout(() => {
                setEnabled_buttonBlue(true);
            }, 60000);
            clearTimeout(isEnablerButton);
        }

    };

    return (
        <View style={ScreenStyles.center}>
            {
                isLoading
                    ?
                    <Text style={SignInVerifyStyles.loadingText}>Doğrulanıyor</Text>
                    :
                    <>
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
                                id="buttonBlue"
                                style={[SignInVerifyStyles.buttonBlue, { backgroundColor: isEnabled_buttonBlue ? 'blue' : "grey" }]}
                                onPress={requestVerificationCode}
                                disabled={!isEnabled_buttonBlue}
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
                    </>
            }
        </View>

    )

}

export default SignInVerifyIndex