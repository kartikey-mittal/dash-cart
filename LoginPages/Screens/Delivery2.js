import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import AddressNavBar2 from '../Components/AddressNavbar2';
import { useDispatch, useSelector } from 'react-redux';
import { setBlockNo, setFlatNo } from '../../redux/actions/actions';
import { Client, Databases, ID } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';


const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');

const databases = new Databases(client);

const Delivery2 = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginReducerState = useSelector((state) => state.loginReducer);

  const handleSaveAndContinue = async (blockNo, flatNo) => {

    dispatch(setBlockNo(blockNo));
    dispatch(setFlatNo(flatNo));
    try {
      const { city, mobileNumber, society, userName, userEmail } = loginReducerState;

      // -------------------------APPWRITE -----------------------

      const response = await databases.createDocument(
        'data-level-1', // Replace with your collection ID
        'UsersDB',
        ID.unique(),
        {
          'User-City': city.cityName,
          'User-CityCode': city.cityId,
          'User-Phone': mobileNumber,
          'User-SocietyName': society.societyName,
          'User-SocietyCode': society.societyId,
          'User-SocietyBlock': blockNo,
          'User-SocietyFlat': flatNo,
          'User-Name': userName,
          'User-Email': userEmail, // Add other attributes as needed
        },
        // Use the necessary permissions for the document
      );

      // ----------------------Get existing user data array from AsyncStorage----------------------

      const user_data = {
        'User-City': response['User-City'],
        'User-CityCode': response['User-CityCode'],
        'User-Phone': response['User-Phone'],
        'User-SocietyName': response['User-SocietyName'],
        'User-SocietyCode': response['User-SocietyCode'],
        'User-SocietyBlock': response['User-SocietyBlock'],
        'User-SocietyFlat': response['User-SocietyFlat'],
        'User-Name': response['User-Name'],
        'User-Email': response['User-Email'],
        // Add other attributes as needed
      };

      // Save to AsyncStorage
      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('UserData', jsonValue)
        } catch (e) {
          // saving error
          console.log(e);
        }
      }

      storeData(user_data);

      // Fetch specific field
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserData')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
          console.log(e);
        }
      }

      // Usage
      const data = await getData();
      console.log(data['User-Name']); // This will fetch 'User-Name' field

      // ---------------------- AsyncStorage----------------------
      
      console.log('Document created successfully:', response);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <AddressNavBar2 onSaveAndContinue={handleSaveAndContinue} />

      {/* Rest of your screen components go here */}
    </SafeAreaView>
  );
};

export default Delivery2;
