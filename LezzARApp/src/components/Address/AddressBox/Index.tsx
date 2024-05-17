import React,{useState} from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { GetAddressNames } from '../../../scripts/addressIndex';

function index({navigation,title,addressInfo,addressID}:any) {
    const [addressText,setAddressText] = useState("")


    const onClickAddresEdit = () => {
        navigation.navigate("AddressEdit")
    }

    const onClickAddressBox = async () => {
        await AsyncStorage.setItem("AddressID",addressID.toString())
        navigation.navigate("Home")
    };
    const onClickPlace = () => {
        navigation.navigate("Address")
    }

    const onPlace = async () =>{

        const data = await GetAddressNames(addressInfo.sehirID,addressInfo.ilceID,addressInfo.mahalleID);
        if(data){
            addressInfo.sehir=data.sehir;
            addressInfo.ilce=data.ilce;
            addressInfo.mahalle=data.mahalle;
            console.log(addressInfo)
            setAddressText(`${addressInfo.sehir}, ${addressInfo.ilce}\n${addressInfo.mahalle}, ${addressInfo.caddeSokak}\n${addressInfo.binaAdi} No:${addressInfo.binaNo}`)
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
            onPlace();
        },[])
    );

    return(
        <TouchableOpacity style={styles.AddressBox}  onPress={onClickAddressBox}>
        <Text  style={styles.Title}>{title}</Text>
        <Text  style={styles.AddressInfo} >{addressText}</Text>
            <TouchableOpacity style={styles.EditButton} onPress={onClickAddresEdit}>
                <Feather name="edit" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


export default index