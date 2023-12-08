import React from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
// import { useState } from 'react';
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SideCategory from '../components/StorePageComponents/SideCategory';
import ProductGrid from '../components/StorePageComponents/ProductGrid';
import SearchBarStore from '../components/StorePageComponents/SearchBarStore';
import StoreCategory from '../components/StorePageComponents/StoreCategory';
import StoreCard from '../components/StoreCard';
import ItemCard from '../components/StorePageComponents/ItemCard';
const { width } = Dimensions.get('window');


const items = [
    {
      title: 'Chocolate',
      price: 'Rs 40/',
      discountPrice: 'Rs 50',
      image: 'https://www.freepngimg.com/thumb/grocery/53973-6-grocery-free-hq-image.png',
    },
    {
      title: 'Candy',
      price: 'Rs 20/',
      discountPrice: 'Rs 25',
      image: 'https://www.freepngimg.com/thumb/grocery/53973-6-grocery-free-hq-image.png',
    },
    // Add more items here
  ];

const StoreScreen = () => {
    // const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#f2f2f2' }}>
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />
            
            <NavBarStore storeName="Bigbasket" />
            <SearchBarStore/>
            <StoreCategory/>

            {items.map((item, index) => (
        <ItemCard
          key={index}
          title={item.title}
          price={item.price}
          discountPrice={item.discountPrice}
          image={item.image}
        />
      ))}
            

            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default StoreScreen;
