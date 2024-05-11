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
    button:{
        width:"80%",
        padding:10,
        backgroundColor:"#f22",
        borderRadius:5,
        marginTop:12,
    },
    buttonText:{
        color:"white",
        textAlign:"center",
        fontFamily:"Rubik-Bold",
        fontSize:16,
    }
});


export default styles;