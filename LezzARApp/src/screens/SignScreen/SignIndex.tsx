import React, { useEffect, useState } from 'react'
import { View, Text, Button,Alert} from "react-native"
import ScreenStyles from "../styles"
import SignStyles from "./styles"
import { fetchAPI } from "../../scripts/api"

const SignIndex = ({ navigation }: any) => {



    useEffect(()=>{
        const showAlertMobilApp = async () =>{
            Alert.alert(
                "Erişim Sorunu",
                "Mobil uygulamalar erişime kapalıdır.",
                [
                    {
                        text:"Tamam",
                        onPress: () => console.log("Tamam'a basıldı."),
                        style:"default"
                    }
                ]
                ,{cancelable:true}
            )
        }

        const checkAccessEnabledMobilApp = async () => {
            const data = await fetchAPI("accessControl/MobilApp");
            console.log("AccesControl/MobilApp: "+data.state)
            return data.state
        }

        const asyncStart = async () => {
            console.debug("asyncStart")
            const isEnabled = await checkAccessEnabledMobilApp();
            if (!isEnabled){
                await showAlertMobilApp();
            }
            else{
                navigation.navigate("SignPhone")
            }
        }
        
        asyncStart();
    },[]);
        

    return (
        <View style={ScreenStyles.center}>
            <Text style={SignStyles.SignTitleLezzAR}>LezzAR</Text>
        </View>

    )

}

export default SignIndex