// StoreScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, SafeAreaView, StatusBar } from 'react-native';
import { Client, Databases, Query } from 'appwrite'; // Import the Query module
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SearchBarStore from '../components/StorePageComponents/SearchBarStore';
import StoreCategory from '../components/StorePageComponents/StoreCategory';
import ItemCard from '../components/StorePageComponents/ItemCard';
import PromotionStore from '../components/StorePageComponents/PromotionStore';
import TestCard from './TestCard';
const StoreScreen = ({route}) => {
  const { storeid ,storename} = route.params;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(storeid)

  // ----------------------Manually Set the storeid ------------------------
  // const [storeid, setStoreid] = useState('');

  // useEffect(() => {
  //   setStoreid('020');
  // }, []); // Run this once on mount to set the initial value of storeid
  
  // ------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const client = new Client();
      client.setEndpoint('https://cloud.appwrite.io/v1');
      client.setProject('65773c8581b895f83d40');

      const databases = new Databases(client);
      const collectionId = 'ItemsDB';

      try {
        const response = await databases.listDocuments(
          'data-level-1',
          collectionId,
          [Query.search("SPrice", storeid)]
        );

        console.log(response);
        setItems(response.documents);

        const uniqueCategories = Array.from(new Set(response.documents.map((item) => item['Item-Category'])));
        const categoryData = uniqueCategories.map((category) => ({
          name: category,
          image: response.documents.find((item) => item['Item-Category'] === category)['Category-Image'],
        }));

        setCategories(categoryData);
        setSelectedCategory(categoryData[0]?.name || '');
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [storeid]); // Run this whenever storeid changes

  const filteredItems = selectedCategory ? items.filter((item) => item['Item-Category'] === selectedCategory) : items;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f3ee' }}>
      <StatusBar backgroundColor="#0c356a" barStyle="light-content" />
      <NavBarStore storeName={storename} />
      <SearchBarStore />
      {/* <PromotionStore/> */}
      <StoreCategory categories={categories} onSelectCategory={setSelectedCategory} />
      

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : items.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            const spriceArray = item['SPrice'].split(',').map(pair => pair.split(':'));
            const valueForStore = spriceArray.find(pair => pair[0] === storeid);
            const valueStore = valueForStore ? valueForStore[1] : null;

            return (
              <ItemCard
                id={item.$id}
                pid={item['Item-ID']}
                title={item['Item-Name']}
                price={valueStore}
                discountPrice={item['Item-MRP']}
                image={item['Item-Image']}
                weight={item['Item-Weight']}
              />
            );
          }}
        />
      )}
        <TestCard
  productName="Doritos Tortilla Chips, "
  productWeight="311.8 gm"
  originalPrice="₹ 10.00"
  discountedPrice="₹ 8.00"
  showDropdown={1}
  productimg="https://m.media-amazon.com/images/I/81nfmUmU2qL.jpg"
  
/>
<TestCard
  productName="Doritos Tortilla Chips, "
  productWeight="311.8 gm"
  originalPrice="₹ 10.00"
  discountedPrice="₹ 8.00"
  showDropdown={1}
  productimg="https://m.media-amazon.com/images/I/81nfmUmU2qL.jpg"
  
/>
    </SafeAreaView>
  );
};

export default StoreScreen;
