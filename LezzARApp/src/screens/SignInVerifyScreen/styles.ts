import { setDisplayName } from "@expo/config-plugins/build/ios/Name";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
        borderBottomWidth:2,
        padding: 5,
        width: '80%',  
        borderBottomColor:"#f88",  
        borderRadius: 5  ,
        fontSize:16,
        fontFamily:"Rubik",
    },
    headerText: {
        textAlign:"left",
        width:"80%",
        fontSize: 16,
    },
    buttonBlue: {
        width: "45%",  
        padding: 10,
        backgroundColor: "#22F",  
        borderRadius: 5,
        marginTop: 12,
    },
    buttonRed: {
        width: "45%", 
        padding: 10,
        backgroundColor: "#F22",  
        borderRadius: 5,
        marginTop: 12,
    },
    buttonText:{
        color:"white",
        textAlign:"center",
        fontFamily:"Rubik-Bold",
        fontSize:16,
    },
    buttons:{
        width:"80%",
        flexDirection:"row",
        display:"flex",
        justifyContent: "space-between",
    }
});


export default styles;