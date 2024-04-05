import { StyleSheet,Dimensions,Text } from "react-native";

const   {height } = Dimensions.get('window')
const signStyles = StyleSheet.create({
    PhoneText:{
        fontWeight:"800"
    },
    center:{
        // alignItems:"",
        justifyContent:"center"
    }
}
)

export default signStyles;