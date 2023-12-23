import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import { useNavigation } from '@react-navigation/native';
import FontLoader from '../FontLoader';

const StoreCard = ({ shopName, shopType, shopAddress, shopId, shopTicketSize, shopCurrentSize }) => {
    console.log('shop id :  ' + shopId);
    const navigation = useNavigation();

    const calculatePercentage = () => {
        return (shopCurrentSize / shopTicketSize) * 100;
    };

    const handlePress = async () => {
        try {
            // Save the shopId to AsyncStorage
            await AsyncStorage.setItem('storeid', shopId);

            // Calculate the percentage
            const percentage = calculatePercentage();

            // Display an alert with the percentage
            Alert.alert(
                'Shop Status',
                `Current Size: ${shopCurrentSize}/${shopTicketSize}\nPercentage: ${percentage.toFixed(2)}%`
            );

            // Navigate to StoreScreen with the shopId as a prop
             navigation.navigate('StoreScreen', { storeid: shopId, storename: shopName });
        } catch (error) {
            console.error('Error saving shopId to AsyncStorage:', error);
        }
    };

    const renderCircularProgressBar = () => {
        const percentage = calculatePercentage();
        const radius = 30; // Adjust the radius as needed

        // Set the color based on the percentage
        let progressColor = '#20f495'; // Default color
        if (percentage < 40) {
            progressColor = 'red';
        } else if (percentage < 80) {
            progressColor = 'yellow';
        }

        return (
            <View
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    borderRadius: radius,
                    borderWidth: 5, // Adjust the thickness of the progress bar
                    borderColor: progressColor, // Use the calculated color as the border
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Icon name="flash" size={25} color="#000522" />
            </View>
        );
    };

    return (
        <FontLoader>
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
                onPress={handlePress}>
                <View style={{ backgroundColor: '#e6e6e6', width: 79, height: 75, borderRadius: 5, marginLeft: 10 }} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 10, color: '#34495E' ,fontFamily:'DMSansB'}}>{shopName}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 10 ,fontFamily:'DMSansSB'}}>{shopType}</Text>
                    <Text style={{ fontSize: 14, marginLeft: 10 ,fontFamily:'DMSans'}}>{shopAddress}</Text>
                </View>
                {renderCircularProgressBar()}
                <View style={{ flex: 1 }} />
                <View style={{
                    backgroundColor: '#20f495', width: 20, height: 127, borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                }} >
                    <Text>ddcde</Text>
                </View>
            </TouchableOpacity>

        </FontLoader>
    );
};

export default StoreCard;

