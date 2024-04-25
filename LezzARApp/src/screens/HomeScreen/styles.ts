import { StyleSheet,Dimensions,Text } from "react-native";

const   {height } = Dimensions.get('window')
const homeStyles = StyleSheet.create({
    shopLister:{
        marginHorizontal:"5%",
        marginTop:30,
        alignItems:"center"
    },
    shopBox:{
        width:"100%",
        padding:5,
        borderWidth:3,
        borderColor:"#ff8080",
        borderStyle:"solid",
        borderRadius:15,
        backgroundColor:"white"
    },
    shopImage:{
        width:120,
        height:120,
        borderRadius:10,
        
    },
    shopSlider:{
        margin:10
    },
    shopTitle:{
        fontFamily:"Rubik-Bold",
        fontSize:20,
    },
    shopInfoAddress:{
        fontFamily:"Rubik-Italic",
        opacity:0.5
    },
    shopInfoStar:{
        fontFamily:"Rubik-Bold",
        fontSize:12
    },
    directionH:{
        
        flexDirection:"row"
    }
}
)

export default homeStyles;