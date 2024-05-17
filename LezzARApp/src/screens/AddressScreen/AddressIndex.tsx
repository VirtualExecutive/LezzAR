import React, { useState } from 'react'
import {View, Text,TextInput,TouchableOpacity, ScrollView} from "react-native"
import { useFocusEffect } from '@react-navigation/native'
import styles from "./styles"
import AddressBox from  "../../components/Address/AddressBox/Index"
import AddressAdd from  "../AddressAddScreen/AddressIndex"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchAPI } from '../../scripts/api'

import Header from "../../components/Header/Index";


const  AddressIndex = ({navigation}:any) => {
    const  [addresses, setAddresses] = useState([])


    const loadAddresses = async () => {
        const token = await AsyncStorage.getItem("Token");

        if (token){
            const response = await fetchAPI(`account/getuseraddresses?token=${token}`)
            try{
                response.data.map(()=>{})
                setAddresses(response.data)
            }
            catch(error){
                setAddresses([])
            }
        }
        else{
            const localAddresses = await AsyncStorage.getItem("LocalAddresses");
            if (localAddresses){
                setAddresses(JSON.parse(localAddresses))
            }
            else{
                setAddresses([])
            }
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadAddresses();
        },[])
    );

    return(
        <>
        <Header 
            navigation={navigation}
            title="Adreslerim"
            isShowBack={true}
        />
        <ScrollView  style={{ flex: 1}}>
            {addresses.map( (address:Address,index) => (
                <AddressBox
                key={index}
                navigation={navigation}
                title={address.title} 
                addressInfo={address}
                addressID={address.addressID}/>
                ))}

            <TouchableOpacity style={styles.AddressAddBox} activeOpacity={1}   onPress={() => {navigation.navigate("AddressAdd")}}>
                <Text style={styles.AddressAddBox_Text}>Yeni bir adres ekle </Text>
            </TouchableOpacity>
        </ScrollView>
        </>
    )
}

export default AddressIndex