import React from 'react'
import {View, Text,TextInput,TouchableOpacity, Image,Button} from "react-native"
import { useFocusEffect } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from  "../styles"
import styles from "./styles"
import ColorsTheme from "../../Theme/color"
import homeTheme from '../../Theme/home'
import { ScrollView } from 'react-native-gesture-handler';



const  AddressAddIndex = ({navigation}:any) => {

 

    useFocusEffect(
        React.useCallback(() => {

        },[])
    );

    return(
        <>
        <ScrollView style={{ flex: 1}}>
            <TextInput>Test</TextInput>
        </ScrollView>
        </>
    )
}

export default AddressAddIndex