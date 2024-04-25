import React from 'react'
import {View, Text,TextInput,TouchableOpacity, Image,Button} from "react-native"

import Styles from  "../styles"
import styles from "./styles"
import ColorsTheme from "../../Theme/color"
import homeTheme from '../../Theme/home'
import AddressBox from "../../components/Address/Index"



const  HomeIndex = ({navigation}:any) => {
    return(
        <View style={{ flex: 1}}>

            <AddressBox/>


            <View style={styles.shopLister}>
                <TouchableOpacity style={[styles.shopBox,styles.directionH]}>
                    <Image style={styles.shopImage} source={{uri:"https://i.pinimg.com/564x/ed/8f/f0/ed8ff05b26a39eefcf3527523d716bc6.jpg"}}/>
                    <View style={styles.shopSlider}></View>

                    <View>
                        <Text style={styles.shopTitle}>My Döner</Text>
                        <Text style={styles.shopInfoAddress}>Ataşehir Mahallesi</Text>
                        <Text style={styles.shopInfoStar}>5.0</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeIndex