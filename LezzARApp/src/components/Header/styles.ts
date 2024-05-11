
import { StyleSheet,Dimensions } from "react-native";

const   {height } = Dimensions.get('window')
const styles = StyleSheet.create({
    HeaderBox:{
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#f00",
        shadowColor:"red",
        shadowOffset:{
            height:5,
            width:5
        },
        shadowOpacity:1,
        shadowRadius:0,
        elevation:10,
    },
    Title: {
        position: 'absolute', 
        left: 0,  
        right: 0,  
        textAlign: 'center',  
        color: "#fff",
        fontSize: 24,
        fontFamily: "Rubik-Bold",
        // backgroundColor:"white"
    }
}
)

export default styles;