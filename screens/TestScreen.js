import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'react-native';

const TestScreen = () => {
    return (
        <View>
            <StatusBar backgroundColor="#0a5098" barStyle="light-content" />

            <Text style={{ alignSelf: 'center', fontSize: 30, fontWeight: 500, color: 'orange' }}>TEST SCREEN</Text>
        </View>
    );
}



export default TestScreen;
