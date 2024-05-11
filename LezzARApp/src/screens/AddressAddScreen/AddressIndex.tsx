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


    const cities = [
      "Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
      "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
      "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ",
      "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
      "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
      "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
      "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize",
      "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon",
      "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt",
      "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova",
      "Karabük", "Kilis", "Osmaniye", "Düzce"
    ];
  

    const [location, setLocation] = useState({
        latitude: 40.0,
        longitude: 29.0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [errorMsg, setErrorMsg] = useState(null);

    const handleConfirmButton = async () => {
        let token = await AsyncStorage.getItem("Token");
        let result = await fetchAPI(`address/AddUserAddress?token=${token}&sehir=${sehir}&ilce=${ilce}&mahalle=${mahalle}&sokak=${caddesokak}&binano=${binano}&kat=${kat}&daire=${daireno}&binaadi=${binaadi}&title=${title}&adrestarifi=${adrestarif}&enlem=${location.latitude}&boylam=${location.longitude}`)
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

    useFocusEffect(
        React.useCallback(() => {
            map();
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
                    onValueChange={(itemValue) => setSehir(itemValue)}>
                    {cities.map((city, index) => (
                    <Picker.Item key={index} label={city} value={city} />
                    ))}
                </Picker>
                </View>

                {/* <TextInput style={styles.TextInput} autoCorrect={false} id="sehir"></TextInput> */}
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>İlçe</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="ilce"></TextInput>
                </View>
            </View>
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Mahalle</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="mahalle"></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Cadde&Sokak</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="caddesokak"></TextInput>
                </View>
            </View>
            
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Bina No</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="binano"></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Kat</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="kat"></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Daire No</Text>
                <TextInput style={styles.TextInput}  autoCorrect={false} id="daireno"></TextInput>
                </View>
            </View>
            
            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Bina&Site Adı</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="binaadi"></TextInput>
                </View>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>{"Adres başlığı"}</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="baslik"></TextInput>
                </View>
            </View>

            <View style={styles.Box}>
                <View style={styles.BoxItem}>
                <Text style={styles.TitleInput}>Adres Tarifi</Text>
                <TextInput style={styles.TextInput} autoCorrect={false} id="adrestarif"></TextInput>
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