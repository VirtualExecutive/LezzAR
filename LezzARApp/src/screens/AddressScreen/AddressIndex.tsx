import React, { useState } from 'react'
import {View, Text,TextInput,TouchableOpacity, ScrollView} from "react-native"
import { useFocusEffect } from '@react-navigation/native'
import styles from "./styles"
import AddressBox from  "../../components/Address/AddressBox/Index"
import AddressAdd from  "../AddressAddScreen/AddressIndex"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAPI } from '../../scripts/api'

interface Address {
    accountID: number;
    addressID: number;
    sehir: string;
    ilce: string;
    mahalle: string;
    caddeSokak: string;
    kat:string;
    binaNo: string;
    binaAdi: string;
    adresTarifi: string;
    title: string;
    enlem: number;
    boylam: number;
}

const  AddressIndex = ({navigation}:any) => {
    const  [addresses, setAddresses] = useState([])


    const loadAddresses = async () => {
        const token = await AsyncStorage.getItem("Token");
        const response = await fetchAPI(`account/getuseraddresses?token=${token}`)
        setAddresses(response)
    };

    useFocusEffect(
        React.useCallback(() => {
            loadAddresses();
        },[])
    );

    return(
        <ScrollView  style={{ flex: 1}}>
            {addresses.map((address:Address,index) => (
                <AddressBox
                    key={index}
                    navigation={navigation}
                    title={address.title} 
                    addressInfo={`${address.sehir}, ${address.ilce}\n${address.mahalle}, ${address.caddeSokak}\n${address.binaAdi} No:${address.binaNo}`}
                    addressID={address.addressID}/>
            ))}

            <TouchableOpacity style={styles.AddressAddBox} onPress={() => {navigation.navigate("AddressAdd")}}>
                <Text style={styles.AddressAddBox_Text}>Yeni bir adres ekle </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default AddressIndex