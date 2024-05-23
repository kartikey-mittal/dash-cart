import React, { useState } from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';

import OrderNavBar from '../components/OrderPage/OrderNavBar';
import OrderDetails from '../components/OrderPage/OrderDetails';

import ProgressBar from '../components/OrderPage/ProgessBar';
import MyOrderCard from '../components/OrderPage/MyOrderCard';
import FontLoader from '../FontLoader';



const OrderScreen = () => {
    const [activeTab, setActiveTab] = useState('Summary');

    const handlePress = (title) => {
        setActiveTab(title);
        Alert.alert(title);
    };


    return (
        <FontLoader>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
<<<<<<< HEAD
            <StatusBar backgroundColor="#0c356a" barStyle="light-content" />
=======
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce


            <OrderNavBar title="Order Details" />
            <ProgressBar />

            {/*------------TAB BAR ⬇️⬇️⬇️⬇️ ------------------- */}
<<<<<<< HEAD
            <View style={{ flexDirection: 'row', backgroundColor: '#0c356a', borderBottomWidth: 0.8, borderColor: 'blue' }}>
=======
            <View style={{ flexDirection: 'row', backgroundColor: '#EB8633', borderBottomWidth: 0.8, borderColor: 'blue' }}>
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce
                {['Summary', 'Items'].map((title) => {
                    const isActive = title === activeTab;
                    return (
                        <TouchableOpacity
                            key={title}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}
                            onPress={() => handlePress(title)}
                        >
                            <Text style={{ color: isActive ? 'white' : '#f3f3f3', fontSize: 15, fontWeight: 300,fontFamily:"DMSans" }}>{title}</Text>
                            {isActive && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: 'white' }} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/*------------TAB BAR⬆️⬆️⬆️ ------------------- */}
            

            <OrderDetails /> 



        </SafeAreaView>
        </FontLoader>
    );
};

export default OrderScreen;
