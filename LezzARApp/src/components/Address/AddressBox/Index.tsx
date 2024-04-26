import React from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import { Feather } from '@expo/vector-icons';


function index({navigation,title,addressInfo,addressID}:any) {

    const onClickAddresEdit = () => {

    }

    const onClickAddressBox = () => {

    };
    const onClickPlace = () => {
        navigation.navigate("Address")
    }

    return(
        <TouchableOpacity style={styles.AddressBox} onPress={onClickAddressBox}>
        <Text  style={styles.Title}>{title}</Text>
        <Text  style={styles.AddressInfo} >{addressInfo} </Text>
            <TouchableOpacity style={styles.EditButton} onPress={onClickAddresEdit}>
                <Feather name="edit" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


export default index