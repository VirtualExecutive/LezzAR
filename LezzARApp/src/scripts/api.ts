import axios from 'axios';

const BASE_URL = 'https://lezzar.store';

export const fetchAPI = async (endpoint: any) => {
  const url =`${BASE_URL}/api/${endpoint}`
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.debug(`URL: ${url}`);
    throw error;
  }
};


