import {Alert} from "react-native"
const showAlert = () => {
    Alert.alert(
        "Uyarı Başlığı",
        "Burada uyarı mesajınız yer alır.",
        [
        {
            text: "İptal",
            onPress: () => console.log("İptal'e basıldı"),
            style: "cancel"
        },
        { text: "Tamam", onPress: () => console.log("Tamam'a basıldı") }
        ],
        { cancelable: false }
    );
};