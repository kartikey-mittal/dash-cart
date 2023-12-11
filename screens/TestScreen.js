import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreen';

const window = Dimensions.get('window');

const TestScreen = () => {
    const [isOpen, setIsOpen] = useState(true);
  const animateSideMenu = useRef(new Animated.Value(-window.width)).current;

  const toggleMenu = () => {
    Animated.timing(animateSideMenu, {
      toValue: isOpen ? -window.width : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setIsOpen(!isOpen);
  };

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="white" barStyle="light-content" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
      <TouchableOpacity onPress={toggleMenu} style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{isOpen ? 'Close Menu' : 'Open Menu'}</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={{ position: 'absolute', left: animateSideMenu, top: 0, bottom: 0, width: window.width * 0.7, backgroundColor: 'yellow', padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Home</Text>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Profile</Text>
          <Text style={{ marginBottom: 10, fontSize: 18 }}>Settings</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>


        </SafeAreaView>
    );
}



export default TestScreen;
