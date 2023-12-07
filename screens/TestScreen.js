import React from 'react';
import { View, StyleSheet, Text ,SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreen';
import LoginNavBar from '../components/LoginComponents/LoginNavbar';


const TestScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
           <LoginNavBar/>
        
        </SafeAreaView>
    );
}



export default TestScreen;
