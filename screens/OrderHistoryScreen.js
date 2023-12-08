import React, { useState } from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';


import MyOrderCard from '../components/OrderPage/MyOrderCard';
import OrderNavBar from '../components/OrderPage/OrderNavBar';



const OrderHistoryScreen = () => {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />
            <OrderNavBar title="My Orders"  />
            <MyOrderCard />
            <MyOrderCard />
            <MyOrderCard />

        </SafeAreaView>
    );
};

export default OrderHistoryScreen;
