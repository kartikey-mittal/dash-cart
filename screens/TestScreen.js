import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import CircularProgress from '../components/CircularProgress';
import { Client, Databases, ID } from 'appwrite';
import { TextInput } from 'react-native-gesture-handler';
import { Text } from 'react-native';
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65773c8581b895f83d40');

const databases = new Databases(client);

const TestScreen = () => {
  // useEffect(() => {
  //   // Creating the order data
  //   const orderData = {
  //     'Order-ID': '12345',
  //     'Order-Value': '100',
  //     'Order-PayValue': '90',
  //     'Store-ID': '789',
  //     'User-ID': '567',
  //     'Order-Status': 'Pending',
  //     'Order-Created': '2023-01-01T12:00:00Z',
  //     'Status-Key': '0',
  //     'Order-Items': [
  //       '3:2', // Item ID 3 with quantity 2
  //       '5:2', // Item ID 5 with quantity 2
  //     ],
  //   };

  //   const promise = databases.createDocument('data-level-1', 'OrdersDB', ID.unique(), orderData);

  //   promise.then(function (response) {
  //     console.log('Document created:', response);
  //   }, function (error) {
  //     console.error('Error creating document:', error);
  //   });
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 50 }}></View>
      <CircularProgress />

      <View style={{ height: 50, width: '45%', backgroundColor: 'white', borderRadius: 15, borderWidth: 0.5, flexDirection: 'row', alignItems: 'center',alignContent:'center' }}>
        <Text style={{ color: 'black', fontSize: 20, justifyContent: 'center', fontWeight: 800, marginLeft: 10 }}>₹</Text>
        <TextInput placeholder='Enter MRP in ₹' style={{marginLeft:10,borderBottomWidth:0.2,borderColor:'grey'}}></TextInput>
      </View>

    </SafeAreaView>
  );
};

export default TestScreen;
