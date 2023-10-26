import React from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions } from 'react-native';

import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';
import CheckoutButton from '../components/CartPage/CheckoutBtn';


const CartScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#0a5098" barStyle="light-content" />




            <CartNavBar storeName="Bigbasket" />
            <BillingComponent />
            <CheckoutButton />

            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default CartScreen;
