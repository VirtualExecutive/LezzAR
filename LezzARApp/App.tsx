
import React, { useState } from 'react';
import { StyleSheet, Text, View, LogBox} from 'react-native';
import { useFonts } from 'expo-font';


import Screen from "./src/screens/ScreenIndex.tsx";


LogBox.ignoreAllLogs();






export default function App() {
    let [isFontsLoaded] = useFonts({
        "Rubik-Black": require("./assets/fonts/Rubik-Black.ttf"),
        "Rubik": require("./assets/fonts/Rubik-Regular.ttf"),
        "Rubik-Bold": require("./assets/fonts/Rubik-Bold.ttf"),
        "Rubik-Light": require("./assets/fonts/Rubik-Light.ttf"),
        "Rubik-Italic": require("./assets/fonts/Rubik-Italic.ttf"),
    
    });
    if (!isFontsLoaded) {
        return <View><Text>Yükleniyor.</Text></View>
    }
    else {
        return <Screen/>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});