import { StyleSheet,Dimensions } from "react-native";
import ColorsTheme from "../../Theme/color";

const   {height } = Dimensions.get('window')
const styles = StyleSheet.create({
    index:{
        height:40,
        borderWidth:3,
        paddingHorizontal:20,
        borderRadius:30,
        borderColor:ColorsTheme.TextInput.borderColor
    }
}
)

export default styles;