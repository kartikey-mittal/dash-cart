import React from 'react';
import { View, StyleSheet, Text ,SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreen';
import Category1 from '../components/Category1';


const TestScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#0a5098" barStyle="light-content" />
        <View >
           <Category1/>
        </View>
        </SafeAreaView>
    );
}



export default TestScreen;
