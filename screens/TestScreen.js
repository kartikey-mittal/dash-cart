import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import SideMenu from '../components/SideMenu';
import HomeScreen from './HomeScreen';

const window = Dimensions.get('window');

const TestScreen = () => {
    
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
             <SideMenu/>


        </SafeAreaView>
    );
}



export default TestScreen;
