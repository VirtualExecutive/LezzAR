import { StyleSheet,Dimensions } from "react-native";
import ColorsTheme from "../../../Theme/color";

const   {height } = Dimensions.get('window')
const styles = StyleSheet.create({
    AddressBox:{
        alignItems:"center",
        flexDirection:"row",
        margin:0,
        maxWidth:"100%",
        width:"100%",
        backgroundColor:"white",

        padding:10,

        shadowColor:"red",
        shadowOffset:{
            height:10,
            width:0
        },
        shadowOpacity:1,
        shadowRadius:0,
        elevation:10
    },
    Item:{
        marginLeft:10
    },
    Title:{
        fontFamily:"Rubik-Bold",
        fontSize:15,
        color:"red",
        maxWidth:"80%",
    },
    AddressInfo:{
        fontFamily:"Rubik",
        fontSize:15,
        marginLeft:10,
        maxWidth:"80%",
        flex:1
    }
}
)

export default styles;