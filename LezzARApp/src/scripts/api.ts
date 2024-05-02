import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native'; // React Native'den Alert'i içe aktarın

const BASE_URL = 'https://lezzar.store';

export const fetchAPI = async (endpoint: string): Promise<AxiosResponse<any>> => {
  const url = `${BASE_URL}/api/${endpoint}`;
  try {
    const response = await axios.get(url, {
      validateStatus: function (status) {
        return true; 
      }
    });
    console.debug(`Url: ${url}`)
    console.debug(`Status: ${response.status}`)
    console.debug(`Data: ${response.data.toString()}`)
    if (response.status === 200) {
      return response;
    } else if (response.status === 400) {
      Alert.alert("Uyarı", response.data);
      return response;
    } else if (response.status === 500) {
      Alert.alert("Hata", "Bilinmeyen sunucu hatası.");
      return response;
    } else {
      Alert.alert("Hata", "Bilinmeyen uygulama hatası.");
      return response;
    }
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    console.debug(`Hata oluşan URL: ${url}`);
    throw error; 
  }
};