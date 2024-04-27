import axios from 'axios';

const BASE_URL = 'https://lezzar.store';

export const fetchAPI = async (endpoint: string) => {
  const url =`${BASE_URL}/api/${endpoint}`
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('API isteği sırasında hata oluştu:', error);
    console.debug(`Hata oluşan URL: ${url}`);
    throw error;
  }
};


