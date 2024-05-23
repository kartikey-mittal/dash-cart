import React, { useState } from 'react';
import { View, Button, SafeAreaView, StatusBar } from 'react-native';
import AddressNavBar from '../Components/AddressNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { setSociety } from '../../redux/actions/actions'
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';


const Delivery = ({ navigation }) => {
    const [societyName, setSocietyName] = useState('');
    const dispatch = useDispatch();

    const handleSocietyChange = (text) => {
        setSocietyName(text);
      };
    
    const handleSocietySubmit = () => {
        dispatch(setSociety(societyName));
        // Additional logic if needed
        navigation.navigate('Delivery2'); 
      };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <AddressNavBar onSocietyChange={handleSocietyChange} />

      <TouchableOpacity onPress={handleSocietySubmit}>
        <Text>Submit Society</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Delivery;
