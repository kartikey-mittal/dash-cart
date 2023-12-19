import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import StoreCard from './StoreCard';
import { Client, Databases, Query } from 'appwrite';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');
const databases = new Databases(client);

const StoresNear = () => {
  const [shops, setShops] = useState([]);

  // Fetch the societyId from the Redux store
  const id = useSelector((state) => state.loginReducer.society);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        console.log('Fetching Stores');
        const response = await databases.listDocuments('data-level-1', 'StoresDB', [
          Query.select(['Store-Name', 'Store-OwnerName', 'Store-City']),
          Query.search('Store-Housing-Code', id.societyId) // Use the societyId from Redux
          // Add other queries as needed
        ]);

        if (response?.documents) {
          console.log('Stores response:', response);
          setShops(response.documents);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, [id]); // Include societyId in the dependency array

  useEffect(() => {
    console.log('Shops:', shops);
  }, [shops]);

  return (
    <ScrollView>
      <View style={{ height: 1, width: 77, backgroundColor: 'gray', marginTop: 10, marginLeft: 5 }} />
      <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 5, marginTop: 5 }}>Stores Near Me</Text>
      <Text style={{ fontSize: 16, marginLeft: 5 }}>Explore stores near your area</Text>

      {shops.map((shop, index) => (
        <StoreCard
          key={index}
          shopName={shop['Store-Name']}
          shopType={shop['Store-OwnerName']}
          shopAddress={shop['Store-City']}
        />
      ))}
    </ScrollView>
  );
};

export default StoresNear;
