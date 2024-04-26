
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import notificationBarTheme from '../Theme/notificationBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from "expo-linking";

import SignScreen from "./SignScreen/SignIndex"
import SignPhoneScreen from "./SignPhoneScreen/SignPhoneIndex"
import HomeScreen from './HomeScreen/HomeIndex';
import AddressScreen from './AddressScreen/AddressIndex';
import React from 'react';

const Stack = createStackNavigator();
const { height } = Dimensions.get('window')

const prefix = Linking.createURL("/")
function Screen() {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Home: {
                    path:"Home"
                }
            }
        }
    }
    return (
        <>
            <StatusBar backgroundColor="red"></StatusBar>
            
            <NavigationContainer linking={linking}>
                <Stack.Navigator initialRouteName="Sign">
                    <Stack.Screen name="Sign" component={SignScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignPhone" component={SignPhoneScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Address" component={AddressScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height * 0.97,
        backgroundColor: "white"
    },
});

export default Screen