import React, { useState } from 'react'
import {View, Text,TextInput,TouchableOpacity, Image,Button} from "react-native"
import { useFocusEffect } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { Picker } from '@react-native-picker/picker';


import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from  "../styles"
import styles from "./styles"
import { ScrollView } from 'react-native-gesture-handler';
import Header from "../../components/Header/Index";
import { fetchAPI } from '../../scripts/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { GetCities, GetDistricts, GetNeighborhoods } from '../../scripts/addressIndex';



const  AddressAddIndex = ({navigation}:any) => {

    const [sehir, setSehir] = useState("");
    const [ilce, setIlce] = useState("");
    const [mahalle, setMahalle] = useState("");
    const [caddesokak, setSokak] = useState("");
    const [binano, setBinano] = useState("");
    const [kat, setKat] = useState("");
    const [daireno, setDaireno] = useState("");
    const [binaadi, setBinaadi] = useState("");
    const [title, setTitle] = useState("");
    const [adrestarif, setAdresTarifi] = useState("");


    const [cities,setCities] = useState([{}])
    const [districts,setDistricts] = useState([{}])
    const [neighborhoods,setNeighborhoods] = useState([{}])
  

    const [location, setLocation] = useState({
        latitude: 40.0,
        longitude: 29.0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handleConfirmButton = async () => {
        let token = await AsyncStorage.getItem("Token");
        let result = await fetchAPI(`address/AddUserAddress?token=${token}&sehirID=${sehir.id}&ilceID=${ilce.id}&mahalleID=${mahalle.id}&sokak=${caddesokak}&binano=${binano}&kat=${kat}&daire=${daireno}&binaadi=${binaadi}&title=${title}&adrestarifi=${adrestarif}&enlem=${location.latitude}&boylam=${location.longitude}`)
        if ( result.status =200){
            navigation.navigate("Address")
        }
    };


    const map = async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            // setErrorMsg('Permission to access location was denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        });
    }

    const onRegionChangeComplete = (newRegion:any) => {
        setLocation(newRegion);
    };


    const loadPickers = async () => {
        const dataCities = await GetCities();
        setCities(dataCities);
        const dataDist = await GetDistricts(0);
        setDistricts(dataDist);
        const dataNeigh = await GetNeighborhoods(0,0);
        setNeighborhoods(dataNeigh);
    }


    const selectedCity = async (itemValue:any) => {
        setSehir(itemValue)
        const dataDist = await GetDistricts(itemValue.id);
        setDistricts(dataDist);
        const dataNeigh = await GetNeighborhoods(itemValue.id,0);
        setNeighborhoods(dataNeigh);
    }

    const selectedDistrict = async (itemValue:any) => {
        try{

            setIlce(itemValue)
            const dataNeigh = await GetNeighborhoods(sehir.id,itemValue.id);
            setNeighborhoods(dataNeigh);
        }
        catch(e){
            
        }
    }

    const selectedNeighborhood = async ( itemValue:any) =>{
        setMahalle(itemValue)
    }
    

    useFocusEffect(
        React.useCallback(() => {
            map();
            loadPickers();
        },[])
    );

    return(
        <>
        <Header 
            navigation={navigation}
            title="Adres Ekle"
            isShowBack={true}
        />
        <ScrollView style={{ flex: 1}}>
            <View style={styles.container}>
                <MapView
                style={styles.map}
                region={location}
                onRegionChangeComplete={onRegionChangeComplete}
                >
                        {/* <Marker coordinate={location} /> */}
                </MapView>
                <View style={styles.markerFixed}>
                    <Icon name="place" size={50} color="#f22" /> 
                </View>
            </View>

            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Şehir</Text>
                <View>
                <Picker
                    selectedValue={sehir}
                    onValueChange={(itemValue) => selectedCity(itemValue)}
                    >
                    {cities.map((city,index) => (
                        <Picker.Item key={index} label={city.name} value={city} />
                    ))}
                </Picker>
                </View>

                {/* <TextInput style={styles.TextInput} autoCorrect={false} id="sehir"></TextInput> */}
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>İlçe</Text>
                <Picker
                    selectedValue={ilce}
                    onValueChange={(itemValue) => selectedDistrict(itemValue)}
                    >
                    {districts.map((district,index) => (
                        <Picker.Item key={index} label={district.name} value={district} />
                    ))}
                </Picker>
                </View>
            </View>
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Mahalle</Text>
                
                <Picker
                    selectedValue={mahalle}
                    onValueChange={(itemValue) => selectedNeighborhood(itemValue)}
                    >
                    {neighborhoods.map((neighborhood,index) => (
                        <Picker.Item key={index} label={neighborhood.name} value={neighborhood} />
                    ))}
                </Picker>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput} >Cadde&Sokak</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="caddesokak" value={caddesokak} onChangeText={setSokak}></TextInput>
                </View>
            </View>
            
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Bina No</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="binano" value={binano} onChangeText={setBinano}></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Kat</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="kat" value={kat} onChangeText={setKat}></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Daire No</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="daireno" value={daireno} onChangeText={setDaireno}></TextInput>
                </View>
            </View>
            
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Bina&Site Adı</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="binaadi" value={binaadi} onChangeText={setBinaadi}></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>{"Adres başlığı"}</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="baslik" value={title} onChangeText={setTitle}></TextInput>
                </View>
            </View>

            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Adres Tarifi</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="adrestarif" value={adrestarif} onChangeText={setAdresTarifi}></TextInput>
                </View>
            </View>
            
            <TouchableOpacity style={styles.Confirm} activeOpacity={1}  onPress={handleConfirmButton}>
                <Text style={styles.ConfirmText}>Onayla</Text>
            </TouchableOpacity>
        </ScrollView>
        </>
    )
}

export default AddressAddIndex