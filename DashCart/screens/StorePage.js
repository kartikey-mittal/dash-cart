import React from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SideCategory from '../components/StorePageComponents/SideCategory';
import ProductGrid from '../components/StorePageComponents/ProductGrid';
const { width } = Dimensions.get('window');

const StorePage = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#0a5098" barStyle="light-content" />
            <NavBarStore storeName="Bigbasket" />

            <View style={{ flexDirection: 'row' }}>

                <View style={{ width: width * 0.2 }}>
                    <SideCategory />
                </View>
                <View style={{ width: width * 0.8 }}>
                    <ProductGrid />
                </View>
            </View>

            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default StorePage;
