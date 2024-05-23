import React, { useState } from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';


import MyOrderCard from '../components/OrderPage/MyOrderCard';
import OrderNavBar from '../components/OrderPage/OrderNavBar';
import FontLoader from '../FontLoader';



const OrderHistoryScreen = () => {


    return (
        <FontLoader>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
<<<<<<< HEAD
            <StatusBar backgroundColor="#0c356a" barStyle="light-content" />
=======
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce
            <OrderNavBar title="My Orders"  />
            <MyOrderCard />
            <MyOrderCard />
            <MyOrderCard />

        </SafeAreaView>
        </FontLoader>
    );
};

export default OrderHistoryScreen;
