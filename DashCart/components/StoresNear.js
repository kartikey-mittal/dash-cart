import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import StoreCard from './StoreCard';

const StoresNear = () => {
    const shops = [
        { name: 'Shop1', type: 'Grocery Store', address: 'Shop No-1, SuperTech Eco' },
        { name: 'Shop2', type: 'Grocery Store', address: 'Shop No-2, SuperTech Eco' },
        { name: 'Shop3', type: 'Grocery Store', address: 'Shop No-3, SuperTech Eco' },
        { name: 'Shop4', type: 'Grocery Store', address: 'Shop No-4, SuperTech Eco' },
    ];

    return (

        <View>


            <View style={{ height: 1, width: 77, backgroundColor: 'gray', marginTop: 10, marginLeft: 5 }} />
            <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 5, marginTop: 5 }}>Stores Near Me</Text>
            <Text style={{ fontSize: 16, marginLeft: 5 }}>Explore stores near your area</Text>
            <ScrollView>

                {
                    shops.map((shop, index) => (
                        <StoreCard
                            key={index}
                            shopName={shop.name}
                            shopType={shop.type}
                            shopAddress={shop.address}
                        />
                    ))
                }
            </ScrollView>

        </View >

    );
};

export default StoresNear;
