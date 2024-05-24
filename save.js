import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Client, Databases, Query } from 'appwrite';  // Assuming this is how you import from Appwrite
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SearchBarStore from '../components/StorePageComponents/SearchBarStore';
import StoreCategory from '../components/StorePageComponents/StoreCategory';
import ItemCard from '../components/StorePageComponents/ItemCard';

const { width } = Dimensions.get('window');

const StoreScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Appwrite client
    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1');
    client.setProject('65773c8581b895f83d40');

    // Initialize Databases instance
    const databases = new Databases(client);

    // Replace 'YOUR_COLLECTION_ID' with your actual collection ID
    const collectionId = 'ProductsDB';

    // Fetch data from Appwrite collection
    databases
      .listDocuments('data-level-1',collectionId)
      .then((response) => {
        setItems(response.documents);
        setLoading(false);
        console.log(response)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <StatusBar backgroundColor="#0c356a" barStyle="light-content" />

      <NavBarStore storeName="Bigbasket" />
      <SearchBarStore />
      <StoreCategory />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ItemCard
            title={item['Product-Name']}
            price={item['Product-SP']}
            discountPrice={item['Product-MRP']}
            image={item['Product-Image']}
          />
          
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default StoreScreen;
