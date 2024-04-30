
import { StyleSheet, Text, View, Dimensions, StatusBar,Button} from 'react-native';
import notificationBarTheme from '../Theme/notificationBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from "expo-linking";

import SignScreen from "./SignScreen/SignIndex"
import SignPhoneScreen from "./SignPhoneScreen/SignPhoneIndex"
import SignInScreen from './SignInScreen/SignInIndex';
import SignInVerifyScreen from './SignInVerifyScreen/SignInVerifyIndex';
import HomeScreen from './HomeScreen/HomeIndex';
import AddressScreen from './AddressScreen/AddressIndex';
import AddressAddScreen from './AddressAddScreen/AddressIndex';
import React from 'react';

const Stack = createStackNavigator();
const { height } = Dimensions.get('window')

import { ErrorBoundary } from 'react-error-boundary';
function ErrorFallback({error, resetErrorBoundary}:any) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Something went wrong:</Text>
        <Text>{error.message}</Text>
        <Button onPress={resetErrorBoundary} title="Try again" />
      </View>
    );
  }

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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StatusBar backgroundColor="red"></StatusBar>
            <NavigationContainer linking={linking}>
                <Stack.Navigator initialRouteName="Sign">
                    <Stack.Screen name="Sign" component={SignScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignPhone" component={SignPhoneScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignInVerify" component={SignInVerifyScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Address" component={AddressScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AddressAdd" component={AddressAddScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </ErrorBoundary>
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