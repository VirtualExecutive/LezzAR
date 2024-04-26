import { StyleSheet,Dimensions } from "react-native";
import ColorsTheme from "../../../Theme/color";

const   {height } = Dimensions.get('window')
const styles = StyleSheet.create({
    AddressBox:{
        alignItems:"center",
        flexDirection:"row",
        margin:0,
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
    AddressAddBox:{
        alignItems:"center",
        padding:10,
        margin:0,

        width:"100%",
        
        backgroundColor:"#f33",
        color:"white",

        shadowColor:"black",
        shadowOffset:{
            height:10,
            width:0
        },
        shadowOpacity:1,
        shadowRadius:0,
        elevation:10
    },
    AddressAddBox_Text:{
        color:"white",
    },
    Item:{
        marginLeft:10
    },
    Title:{
        fontFamily:"Rubik-Bold",
        fontSize:15,
        color:"red",
        flex:1
    },
    AddressInfo:{
        fontFamily:"Rubik",
        fontSize:15,
        marginLeft:10,
        maxWidth:"80%",
        flex:3
    },
    EditButton:{
        justifyContent:"flex-end",

    }
}
)

export default styles;