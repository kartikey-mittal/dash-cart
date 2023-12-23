import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setCityInfo, setSociety, setSocietyInfo } from '../../redux/actions/actions';
import { Client, Databases, Query } from 'appwrite';
import loginReducer from '../../redux/reducers/login/loginReducers';
import { useNavigation } from '@react-navigation/native';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');

const databases = new Databases(client);

const CityCard = ({ city }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleCityPress = () => {
    // Dispatch action to set City Name and City ID in Redux store
    dispatch(setSocietyInfo(city.name, city.housingId));

    // Show an alert with the city information
    Alert.alert(
      'Selected City',
      `City Name: ${city.name}\nCity ID: ${city.housingId} \n${city.id}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
    navigation.navigate('Delivery2');
  };

  return (
    <TouchableOpacity onPress={handleCityPress}>
      <View style={{ width: '100%', backgroundColor: '#fff', padding: 5, borderRadius: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 1, marginTop: 10 }}>
        <Text style={{ fontSize: 15,  marginBottom: 10,fontFamily:"DMSansSB" }}>{city.name}</Text>
        <Text style={{ fontSize: 14, color: '#888' }}>ID: {city.housingId}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Deliveryd = ({navigation}) => {
    const cityName = useSelector((state) => state.loginReducer.city.cityName);
console.log(cityName)
      
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments('data-level-1', 'HousingDB', [
            Query.select(['Housing-Name', 'Housing-ID', '$id',]),
            Query.equal("Housing-City", [cityName])
        ]);
        console.log(response);
        const cities = response.documents?.map(({ $id, 'Housing-Name': name, 'Housing-ID': housingId }) => ({ id: $id, name, housingId })) || [];
        setCityData(cities);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchData();
  }, []);


  const cityInfo = useSelector((state) => state.loginReducer.society).societyId;

  useEffect(() => {
    console.log('Updated Society Information:', cityInfo);
  }, [cityInfo]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#fff', height: '60px' }}>
        <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5 }}>
          <Icon name="arrow-back-outline" size={25} color="#EB8633" />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', flexGrow: 2 }}>
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '500' ,fontFamily:"DMSansB"}}>Select Housing Location</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }}></View>

      {/* Render City Cards */}
      {cityData.map(city => <CityCard key={city.id} city={city} />)}
    </SafeAreaView>
  );
};

export default Deliveryd;
