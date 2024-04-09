import React,{ useEffect, useState } from 'react'
import  {View,Text,Button} from "react-native" 
import ScreenStyles from "../styles"
import {fetchProducts,addProduct} from "../../scripts/api"

const SignIndex = ({navigation}:any) => {
    const [products, setProducts] = useState<any[]>([]); // Ürünleri saklayacak state

    useEffect(() => {
      // Sayfa yüklendiğinde tüm ürünleri getir
      const fetchData = async () => {
        try {
          const data = await fetchProducts();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleAddProduct = async () => {
      // Yeni ürün eklemek için API'yi çağır
      try {
        const newProduct = { name: 'New Product', price: 10 }; // Örnek bir ürün
        const data = await addProduct(newProduct);
        // Yeni eklenen ürünü mevcut ürünler listesine ekleyin (isteğe bağlı)
        setProducts([...products, data]);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
    return(
        <View style={ScreenStyles.center}>
            <Text>Products:</Text>
            {products.map(product => (
                <Text key={product.id}>{product.name} - {product.price}</Text>
            ))}
            <Button title="Add Product" onPress={handleAddProduct} />
        </View>

    )

}

export default SignIndex