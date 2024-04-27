import React from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

function index({navigation,title,addressInfo,addressID}:any) {

    const onClickAddresEdit = () => {

    }

    const onClickAddressBox = async () => {
        await AsyncStorage.setItem("AddressID",addressID.toString())
        navigation.navigate("Home")
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