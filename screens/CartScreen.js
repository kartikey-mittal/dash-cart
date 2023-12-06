import React from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions } from 'react-native';

import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';
import CheckoutButton from '../components/CartPage/CheckoutBtn';
import ItemCard from '../components/StorePageComponents/ItemCard';

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

const CartScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'white' }}>
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />




            <CartNavBar storeName="Bigbasket" />
            <BillingComponent />
            {items.map((item, index) => (
        <ItemCard
          key={index}
          title={item.title}
          price={item.price}
          discountPrice={item.discountPrice}
          image={item.image}
        />
      ))}
            <CheckoutButton />

            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default CartScreen;
