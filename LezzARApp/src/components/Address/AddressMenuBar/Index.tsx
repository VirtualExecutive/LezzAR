import React, {useState}from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../../Theme/color'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



function index({navigation}:any) {
    const [title, setTitle] = useState("")
    const [info, setInfo] = useState("")
    const [ID, setID] = useState("")
 
    const SetCurrentAddress = async () => {
        let addressID = await AsyncStorage.getItem("AddressID")
        if(addressID){

        }
        else{
            setTitle("Adres Ekle")
            setInfo("Türkiye")
            setID("")
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