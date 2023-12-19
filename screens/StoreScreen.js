// StoreScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Client, Databases } from 'appwrite';
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SearchBarStore from '../components/StorePageComponents/SearchBarStore';
import StoreCategory from '../components/StorePageComponents/StoreCategory';
import ItemCard from '../components/StorePageComponents/ItemCard';

const { width } = Dimensions.get('window');

const StoreScreen = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Initialize with an empty string
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
      .listDocuments('data-level-1', collectionId)
      .then((response) => {
        setItems(response.documents);

        // Extract unique categories from the items
        const uniqueCategories = Array.from(new Set(response.documents.map((item) => item['Product-Category'])));

        // Create an array of category objects with name and image URL
        const categoryData = uniqueCategories.map((category) => ({
          name: category,
          image: response.documents.find((item) => item['Product-Category'] === category)['Category-URL'], // Assuming 'Category-URL' is the attribute for category image
        }));

        setCategories(categoryData);
        setSelectedCategory(categoryData[0]?.name || ''); // Set the default category name
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredItems = selectedCategory ? items.filter((item) => item['Product-Category'] === selectedCategory) : items;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <StatusBar backgroundColor="#EB8633" barStyle="light-content" />

      <NavBarStore storeName="Bigbasket" />
      <SearchBarStore />
      <StoreCategory categories={categories} onSelectCategory={setSelectedCategory} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <ItemCard
              id={item.$id} // Pass the document ID as a prop
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
