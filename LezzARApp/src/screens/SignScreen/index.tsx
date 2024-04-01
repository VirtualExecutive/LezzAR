import React from 'react'
import {View, Text,TextInput, Image} from "react-native"
import Styles from  "../styles"
import styles from "./styles"
import ColorsTheme from "../../Theme/color"
import signTheme from '../../Theme/sign'
import Phone from "../../components/PhoneSign"
import * as linking from "expo-linking"

function index() {
    return(
        <View style={[Styles.screen,signTheme.background]}>
            <View style={Styles.center}>
                <Text style={styles.PhoneText}>Telefon Numaranız:</Text>
                <Phone/>
            </View>
        </View>
    )
}

export default index