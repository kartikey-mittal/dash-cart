import React from 'react';
import { View, Text, TouchableOpacity, ScrollView,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

const StoreCard = ({ shopName, shopType, shopAddress,shopItems ,shopId}) => {
    console.log('shop id :  ' + shopId)
    const navigation = useNavigation();

    const handlePress = async () => {
        try {
          // Save the shopId to AsyncStorage
          await AsyncStorage.setItem('storeid', shopId);
    
          // Navigate to StoreScreen with the shopId as a prop
          navigation.navigate('StoreScreen', { storeid: shopId,storename:shopName });
        } catch (error) {
          console.error('Error saving shopId to AsyncStorage:', error);
        }
      };

    return (

        <TouchableOpacity style={{
            margin: 10,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 10,
            padding: 0,
            marginVertical: 10,
            alignItems: 'center',
            height: 127,
            backgroundColor: 'white',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,


        }}
            onPress={ handlePress}>
            <View style={{ backgroundColor: '#e6e6e6', width: 79, height: 75, borderRadius: 5, marginLeft: 10 }} />
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>{shopName}</Text>
                <Text style={{ fontSize: 16, marginLeft: 10 }}>{shopType}</Text>
                <Text style={{ fontSize: 14, marginLeft: 10 }}>{shopAddress}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{
                backgroundColor: '#20f495', width: 20, height: 127, borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
            }} />
        </TouchableOpacity>


    );
};

export default StoreCard;

