import React from 'react'
import {View, Text,TextInput,TouchableOpacity, ScrollView} from "react-native"
import { useFocusEffect } from '@react-navigation/native'
import styles from "./styles"
import AddressBox from  "../../components/Address/AddressBox/Index"


const  AddressIndex = ({navigation}:any) => {

    useFocusEffect(
        React.useCallback(() => {

        },[])
    );

    return(
        <ScrollView style={{ flex: 1}}>
            <AddressBox title={"Fırat Erkek KYK Yurdu"} addressInfo={`Elazığ/Merkez\nAtaşehir Mahallesi/Mazı Sokak\nNo :4/Daire:2`}/>
            <TouchableOpacity style={styles.AddressAddBox}>
                <Text style={styles.AddressAddBox_Text}>Yeni bir adres ekle </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddressIndex