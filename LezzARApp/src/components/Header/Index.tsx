import React from 'react'
import {View, Text,TextInput, Image,TouchableOpacity} from "react-native"
import styles from "./styles"
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

function index({navigation,title="",isShowBack=false}:any) {


    const onClickBack = () => {
        navigation.goBack();
    };

    const onClickProfile = () => {
    };

    return(
        <View style={styles.HeaderBox}>
            {
                isShowBack?
                <TouchableOpacity style={{zIndex:1}}  activeOpacity={1}  onPress={onClickBack}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                :
                <TouchableOpacity  style={{zIndex:1}}  activeOpacity={1}  onPress={onClickProfile}>
                <MaterialIcons name="account-circle" size={24} color="#fff" />
                </TouchableOpacity>
            }
           <Text style={styles.Title}>{title}</Text> 
    
        </View>
    )
}


export default index