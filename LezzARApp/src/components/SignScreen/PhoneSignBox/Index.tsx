import React from 'react'
import {View, Text,TextInput, Image} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'


function index() {
    const [number, onChangeNumber] = React.useState("5")
    
    const onSubmit = () => {
        
    }

    return(
        <TextInput
        style={styles.index}
        onChangeText={onChangeNumber}
        value={number}
        placeholder='Telefon Numaranız'
        keyboardType="numeric"
        cursorColor={ColorsTheme.TextInput.cursorColor}
        maxLength={10}
        onSubmitEditing={onSubmit}
        />
    )
}


export default index