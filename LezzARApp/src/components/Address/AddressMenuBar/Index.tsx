import React, {useState}from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAPI } from '../../../scripts/api';
import { GetAddressNames } from '../../../scripts/addressIndex';




function index({navigation}:any) {
    const [title, setTitle] = useState("")
    const [info, setInfo] = useState("")
    const [ID, setID] = useState("")



 
 
    const SetCurrentAddress = async () => {
        const addressID = await AsyncStorage.getItem("AddressID")
        const token = await AsyncStorage.getItem("Token");

        if (!addressID) {
            await AsyncStorage.setItem("AddressID","-1");
        }

        if(!addressID){
            return;
        }

        if(token){
            let found = false 
            if(addressID!="-1"){
                let result  =  await fetchAPI(`account/getuseraddresses?token=${token}`);
                let addresses = result.data; 
                try{
                    if(result.status ==200){
    
                        addresses.forEach(async (element: Address) => {
                            if(element.addressID==parseInt(addressID)){
                                const data = await GetAddressNames(element.sehirID,element.ilceID,element.mahalleID);
                                if(data){
                                    element.sehir=data.sehir;
                                    element.ilce=data.ilce;
                                    element.mahalle=data.mahalle;
                                }
                                console.log(`${element.sehir} ${element.ilce} ${element.mahalle} ${element.caddeSokak} ${element.binaNo} ${element.binaAdi} ${element.title} ${element.adresTarifi} ${element.enlem} ${element.boylam}`)
                                setTitle(element.title)
                                setInfo(`${element.sehir}, ${element.ilce}, ${element.mahalle}, ${element.caddeSokak}, ${element.binaAdi} No:${element.binaNo}`)
                                setID(element.addressID.toString())
                                found = true;
                            }
                        });
                    }
                }
                catch (error){
                    await AsyncStorage.setItem("AddressID","-1")
                }
            }
            if (addressID!="-1" || found==false ){
                setTitle("Adres Ekle")
                setInfo("Türkiye")
                setID("-1")
                await AsyncStorage.setItem("AddressID","-1")
            }
        }
        else{
            let localAddresses = await AsyncStorage.getItem("LocalAddresses");
            let found = false;
            if (localAddresses){
                let localAddressesJSON = JSON.parse(localAddresses);
                localAddressesJSON.forEach(async (element: LocalAddress)=>{
                    if(element.addressID==parseInt(addressID)){
                        
                        const data = await GetAddressNames(element.sehirID,element.ilceID,element.mahalleID);
                        if(data){
                            element.sehir=data.sehir;
                            element.ilce=data.ilce;
                            element.mahalle=data.mahalle;
                        }
                        console.log(`${element.sehir} ${element.ilce} ${element.mahalle} ${element.caddeSokak} ${element.binaNo} ${element.binaAdi} ${element.title} ${element.adresTarifi} ${element.enlem} ${element.boylam}`)
                        setTitle(element.title)
                        setInfo(`${element.sehir}, ${element.ilce}, ${element.mahalle}, ${element.caddeSokak}, ${element.binaAdi} No:${element.binaNo}`)
                        setID(element.addressID.toString())
                        found = true;
                    }
                })
            }
            if (!localAddresses || found ){
                setTitle("Adres Ekle")
                setInfo("Türkiye")
                setID("-1")
                await AsyncStorage.setItem("AddressID","-1")
            }
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
            SetCurrentAddress();
        },[])
    );

    const onClickPlace = () => {
        if(ID){
            navigation.navigate("Address")
        }
        else{
            navigation.navigate("Address")
        }
    }

    return(
            <TouchableOpacity style={styles.AddressBox} activeOpacity={1}   onPress={onClickPlace}>
                <Text  style={styles.Title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <Text  style={styles.AddressInfo}  numberOfLines={1} ellipsizeMode="tail">{info}</Text>
                    <Icon name="place" size={24} color="red" />
            </TouchableOpacity>
    )
}


export default index