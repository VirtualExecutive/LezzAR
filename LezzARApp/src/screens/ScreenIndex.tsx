
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import notificationBarTheme from '../Theme/notificationBar';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from "expo-linking";

import SignScreen from "./SignScreen/SignIndex"
import SignPhoneScreen from "./SignPhoneScreen/SignPhoneIndex"
import HomeScreen from './HomeScreen/HomeIndex';

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
        <View >
            <StatusBar backgroundColor="red"></StatusBar>
            <View style={styles.container}>
                <NavigationContainer linking={linking}>
                    <Stack.Navigator initialRouteName="Sign">
                        <Stack.Screen name="Sign" component={SignScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignPhone" component={SignPhoneScreen} options={{ headerShown: false }} />
                        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: height * 0.03,
        backgroundColor: notificationBarTheme.Theme.backgroundColor,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    headerTitle: {
        marginBottom: 3,
        fontFamily: "Rubik-Bold",
        fontSize: 20,
        color: "white"
    },
    container: {
        height: height * 0.97,
        backgroundColor: "white"
    },
});

export default Screen