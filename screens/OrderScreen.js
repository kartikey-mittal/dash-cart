import React, { useState } from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';

import OrderNavBar from '../components/OrderPage/OrderNavBar';
import OrderDetails from '../components/OrderPage/OrderDetails';

import ProgressBar from '../components/OrderPage/ProgessBar';
import MyOrderCard from '../components/OrderPage/MyOrderCard';



const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('Summary');

    const handlePress = (title) => {
        setActiveTab(title);
        Alert.alert(title);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />


            <OrderNavBar title="Order Details" />


            {/*------------TAB BAR ⬇️⬇️⬇️⬇️ ------------------- */}
            <View style={{ flexDirection: 'row', backgroundColor: '#EB8633', borderBottomWidth: 0.8, borderColor: 'blue' }}>
                {['Summary', 'Items'].map((title) => {
                    const isActive = title === activeTab;
                    return (
                        <TouchableOpacity
                            key={title}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}
                            onPress={() => handlePress(title)}
                        >
                            <Text style={{ color: isActive ? 'white' : '#f3f3f3', fontSize: 15, fontWeight: 300 }}>{title}</Text>
                            {isActive && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: 'white' }} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/*------------TAB BAR⬆️⬆️⬆️ ------------------- */}
            <ProgressBar />

            <OrderDetails /> 



        </SafeAreaView>
    );
};

export default OrderScreen;
