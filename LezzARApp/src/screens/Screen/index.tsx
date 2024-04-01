import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SignScreen from "../SignScreen"
import notificationBarTheme from '../../Theme/notificationBar';



const   {height } = Dimensions.get('window')

function Screen() {
  return (
    <View >
        <View style={styles.header}>
        </View>
        <View style={styles.container}>
            <SignScreen/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: height *0.03,
    backgroundColor:notificationBarTheme.Theme.backgroundColor,
  },
  container: {
    height: height * 0.97,
    backgroundColor: "white"
  },
});

export default Screen