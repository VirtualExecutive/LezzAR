import React from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import ColorsTheme from '../../Theme/color'
import Icon from 'react-native-vector-icons/MaterialIcons';


function index() {

    const onClickPlace = () => {

    }

    return(
        <View style={styles.AddressBox}>
            <Text  style={styles.Title}>Kütüphane</Text>
            <Text  style={styles.AddressInfo}  numberOfLines={1} ellipsizeMode="tail">Yeni, Yenice Sk. No:4 Elazığ/Merkez Elazığ 23230</Text>
            <TouchableOpacity onPress={onClickPlace}>
                <Icon name="place" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}


export default index