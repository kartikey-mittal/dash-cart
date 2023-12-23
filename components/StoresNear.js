import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import StoreCard from './StoreCard';
import { Client, Databases, Query } from 'appwrite';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');
const databases = new Databases(client);

const StoresNear = ({societyId}) => {
  const [shops, setShops] = useState([]);

  // Fetch the societyId from the Redux store
  

  useEffect(() => {
    const fetchStores = async () => {
      try {
        console.log('Fetching Stores');
        const response = await databases.listDocuments('data-level-1', 'StoresDB', [
          
          Query.search('Store-Housing-Code', societyId) // Use the societyId from Redux
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
  }, [societyId]); // Include societyId in the dependency array

  useEffect(() => {
    console.log('Shops:', shops.map(shop => shop['Store-Items']).flat());
  }, [shops]);

  return (
    <ScrollView>
      
      <View style={{ height: 1, width: 100, backgroundColor: 'gray', marginTop: 10, marginLeft: 10 }} />
      <Text style={{ fontSize: 17, fontWeight: '600', marginLeft: 10, marginTop: 5,color:'#074654' }}>Stores near me 🏬</Text>
      <Text style={{ fontSize: 14, marginLeft: 10,color:'#2C3E50', }}>3 stores delivering around you</Text>

      {shops.map((shop, index) => (
        <StoreCard
          key={index}
          shopName={shop['Store-Name']}
          shopType={shop['Store-OwnerName']}
          shopAddress={shop['Store-City']}
          shopItems={shops.map(shop => shop['Store-Items']).flat()}
          shopId={shop['Store-ID']}
          shopTicketSize={shop['Store-TicketSize']}
          shopCurrentSize={shop['Store-CurrentSize']}
        />
        
      )
      )}
    </ScrollView>
  );
};

export default StoresNear;
