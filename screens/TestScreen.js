import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestScreen = () => {
  // Dummy data
  const user_data = {
    'User-City': 'Dadri',
    'User-CityCode': '12345',
    'User-Phone': '9876543210',
    'User-SocietyName': 'Green Park',
    'User-SocietyCode': 'GP123',
    'User-SocietyBlock': 'A',
    'User-SocietyFlat': '101',
    'User-Name': 'John Doe',
    'User-Email': 'johndoe@example.com',
  };

  // Save initial data to AsyncStorage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('UserData', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  // Merge new data with existing data
  const mergeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.mergeItem('UserData', jsonValue)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  // Fetch specific field
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  useEffect(() => {
    storeData(user_data);
    // mergeData({'User-Name': 'New Name'}); // This will only update 'User-Name' field

    // Fetch specific field
    getData().then(data => {
      console.log(data['User-Name']); // This will fetch 'User-Name' field
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
  
    </SafeAreaView>
  );
}

export default TestScreen;
