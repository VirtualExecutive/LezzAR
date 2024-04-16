import React, { useEffect, useState } from 'react'
import { View, Text, Button,Alert} from "react-native"
import ScreenStyles from "../styles"
import SignPhoneStyles from "./styles"
import { fetchAPI } from "../../scripts/api"

const SignPhoneIndex = ({ navigation }: any) => {

    const asyncStart = async () => {

    }

    asyncStart();

    return (
        <View style={ScreenStyles.center}>
            <Text>SignPhoneScreen</Text>
        </View>

    )

}

export default SignPhoneIndex