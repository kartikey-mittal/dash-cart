import React from 'react';
import { View } from 'react-native';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import { SafeAreaView, StatusBar } from 'react-native';
import CategoryComponent from '../components/Category';
import StoresNear from '../components/StoresNear';
import StoreCard from '../components/StoreCard';

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#0a5098" barStyle="light-content" />
            <NavBar />
            <SearchBar />
            <CategoryComponent />
            <StoresNear />
            <StoreCard />

            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default HomeScreen;
