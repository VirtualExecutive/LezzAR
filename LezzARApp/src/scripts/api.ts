import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:5233'; // API'nin temel URL'si

// Örnek bir API çağrısı: Tüm ürünleri getir
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Örnek bir API çağrısı: Yeni ürün ekle
export const addProduct = async (newProduct: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, newProduct);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Diğer API çağrıları buraya eklenebilir
