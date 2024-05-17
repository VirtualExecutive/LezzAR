import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetAddressNames = async (cityID:number, districtID:number, neighborhoodID:number) => {
  try {
    const addressIndexs = await AsyncStorage.getItem("AddressIndexs");
    let data = [];
    let result = { sehir: "", ilce: "", mahalle: "" };

    if (addressIndexs) {
      data = typeof addressIndexs === 'string' ? JSON.parse(addressIndexs) : addressIndexs;
    }

    for (const city of data) {
      if (city.id === cityID) {
        result.sehir = city.name;
      }
      for (const district of city.districts) {
        if (districtID < 1) {
          return result;
        }
        if (district.id === districtID) {
          result.ilce = district.name;
        }
        for (const neighborhood of district.neighborhoods) {
          if (neighborhoodID < 1) {
            return result;
          }
          if (neighborhood.id === neighborhoodID) {
            result.mahalle = neighborhood.name;
          }
        }
      }
    }
    return result;
  } catch (e) {
    console.error("GetAddressNames Error fetching data from AsyncStorage:", e);
    return { sehir: "", ilce: "", mahalle: "" }; // Hata durumunda boş result döndür
  }
};


export const GetCities = async () =>{
  try {
    const addressIndexs = await AsyncStorage.getItem("AddressIndexs");
    let data = [];
    let result = [];

    if (addressIndexs) {
      data = typeof addressIndexs === 'string' ? JSON.parse(addressIndexs) : addressIndexs;
    }

    for (const city of data) {
      result.push({"id":city.id,"name":city.name})
    }
    
    return result;
  } catch (e) {
    console.error("GetCities Error fetching data from AsyncStorage:", e);
    return []; // Hata durumunda boş result döndür
  }
};

export const GetDistricts = async (cityID:number) =>{
  try {
    const addressIndexs = await AsyncStorage.getItem("AddressIndexs");
    let data = [];
    let result = [];

    if (addressIndexs) {
      data = typeof addressIndexs === 'string' ? JSON.parse(addressIndexs) : addressIndexs;
    }
    for (const city of data) {
      if(city.id == cityID)
      {
        for(const district of city.districts){
          result.push({"id":district.id,"name":district.name})
        }
      }
    }
    return result;
  } catch (e) {
    console.error("GetDistricts Error fetching data from AsyncStorage:", e);
    return []; // Hata durumunda boş result döndür
  }
};

export const GetNeighborhoods = async (cityID:number,districtID:number) =>{
  try {
    const addressIndexs = await AsyncStorage.getItem("AddressIndexs");
    let data = [];
    let result = [];

    if (addressIndexs) {
      data = typeof addressIndexs === 'string' ? JSON.parse(addressIndexs) : addressIndexs;
    }
    for (const city of data) {
      if(city.id == cityID)
      {
        for(const district of city.districts){
          if(district.id == districtID)
          {
            for(const neighborhood of district.neighborhoods){
              result.push({"id":neighborhood.id,"name":neighborhood.name})
            }
          }
        }
      }
    }
    return result;
  } catch (e) {
    console.error("GetNeighborhoods Error fetching data from AsyncStorage:", e);
    return []; // Hata durumunda boş result döndür
  }
};