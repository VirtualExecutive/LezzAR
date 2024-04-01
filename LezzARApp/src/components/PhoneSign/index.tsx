import React from 'react'
import {View, Text,TextInput, Image} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../Theme/color'



function index() {
    const [number, onChangeNumber] = React.useState("5")
    return(
        <TextInput
        style={styles.index}
        onChangeText={onChangeNumber}
        value={number}
        placeholder='Telefon Numaranız'
        keyboardType="numeric"
        //@ts-ignore
        cursorColor={ColorsTheme.TextInput.cursorColor}
        maxLength={10}
        />
    )
}


export default index