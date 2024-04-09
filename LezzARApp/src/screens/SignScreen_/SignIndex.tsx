import React from 'react'
import {View, Text,TextInput, Image,Button} from "react-native"
import Styles from  "../styles"
import styles from "./styles"
import ColorsTheme from "../../Theme/color"
import signTheme from '../../Theme/sign'
import PhoneSignBox from "../../components/SignScreen/PhoneSignBox/Index"
import PhoneSignText from "../../components/SignScreen/PhoneSignText/Index"



const  SignIndex = ({ navigation}:any) => {
    const handleLogin = () => {
        
      }

    return(
        <View style={{ flex: 1}}>

        <View style={[Styles.screen,signTheme.background, Styles.center]}>
            <View style={styles.center}>
                <PhoneSignText/>
                <PhoneSignBox />
                <Button
                    title='Giriş Yap'
                    color="red"
                    onPress={() => navigation.navigate("Home")}
                    />
            </View>
        </View>
        </View>
    )
}

export default SignIndex