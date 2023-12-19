import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import AddressNavBar2 from '../Components/AddressNavbar2';
import { useDispatch, useSelector } from 'react-redux';
import { setBlockNo, setFlatNo } from '../../redux/actions/actions';
import { Client, Databases, ID } from 'appwrite';

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
      const { city, mobileNumber, society } = loginReducerState;

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
          'User-Name': 'USER NAME', // Add other attributes as needed
        },
         // Use the necessary permissions for the document
      );

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
