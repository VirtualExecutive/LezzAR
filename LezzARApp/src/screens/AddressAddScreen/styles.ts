import { StyleSheet,Dimensions,Text } from "react-native";

const   {height } = Dimensions.get('window')
const addressStyles = StyleSheet.create({
    container: {
        height: 400,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        shadowColor:"black",
        elevation:10
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
    },
    marker: {
        height: 48,
        width: 48,
        backgroundColor: 'red',
        borderRadius: 24
    },
      
    Box:{
        margin:15,
        padding:15,
        borderRadius:15,
        backgroundColor:"#f8f8f8",
        flexDirection:"row",

        shadowColor:"black",
        shadowOffset:{
            height:5,
            width:5
        },
        shadowOpacity:1,
        shadowRadius:0,
        elevation:5
    },
    BoxItem:{
        flex:1,
        marginHorizontal:10,
    },
    TextInput:{
        fontFamily:"Rubik",
        fontSize:14,
        paddingHorizontal:10,
        paddingVertical:3,
        borderColor:"#ddd",
        borderBottomWidth:4,
        
        borderRadius:8,
    },
    TitleInput:{
        fontFamily:"Rubik-Bold",
        fontSize:16,
        paddingBottom:3,
        paddingLeft:5,
        color:"#f22",
        
    },
    Confirm:{
        backgroundColor:"#f22",
        marginTop:20,
        padding:15,
        alignItems:"center",
        justifyContent:"center"
    },
    ConfirmText:{
        color:"white",
        fontFamily:"Rubik-Bold",
        fontSize:24,

    }
}
)

export default addressStyles;