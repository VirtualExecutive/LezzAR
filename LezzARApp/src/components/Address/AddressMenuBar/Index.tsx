import React, {useState}from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAPI } from '../../../scripts/api';


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

function index({navigation}:any) {
    const [title, setTitle] = useState("")
    const [info, setInfo] = useState("")
    const [ID, setID] = useState("")
 
    const SetCurrentAddress = async () => {
        const addressID = await AsyncStorage.getItem("AddressID")
        const token = await AsyncStorage.getItem("Token");

        if (!addressID) {
            console.error("AddressID is null");
            return; 
        }
        
        if(addressID!="-1"){
            let result  =  await fetchAPI(`account/getuseraddresses?token=${token}`);
            let addresses = result.data; 
            let found = false 
            try{
                if(result.status ==200){

                    addresses.forEach((element: Address) => {
                        if(element.addressID==parseInt(addressID)){
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
                console.error(error);
                await AsyncStorage.setItem("AddressID","-1")
            }

            if ( found ==false){
                setTitle("Adres Ekle")
                setInfo("Türkiye")
                setID("-1")
                await AsyncStorage.setItem("AddressID","-1")
            }
        }
        else{
            setTitle("Adres Ekle")
            setInfo("Türkiye")
            setID("-1")
            await AsyncStorage.setItem("AddressID","-1")
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
            <TouchableOpacity style={styles.AddressBox} onPress={onClickPlace}>
                <Text  style={styles.Title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <Text  style={styles.AddressInfo}  numberOfLines={1} ellipsizeMode="tail">{info}</Text>
                    <Icon name="place" size={24} color="red" />
            </TouchableOpacity>
    )
}


export default index