import { StyleSheet,Dimensions } from "react-native";

const   {height } = Dimensions.get('window')
const styles = StyleSheet.create({
    screen:{
        height: "100%"
    },
    center:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
}
)

export default styles;