import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import { useNavigation } from '@react-navigation/native';
import FontLoader from '../FontLoader';
import CircularProgress from './CircularProgress';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

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

           
             navigation.navigate('StoreScreen', { storeid: shopId, storename: shopName });
        } catch (error) {
            console.error('Error saving shopId to AsyncStorage:', error);
        }
    };

    // Calculate the percentage
    const percentage = calculatePercentage();

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
                
                backgroundColor: 'white',
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
               
            }}
                onPress={handlePress}>
                <View style={{ backgroundColor: '#e6e6e6', width: 90, height: 100, borderRadius: 15, marginLeft: 10 }} />
                <View style={{ marginLeft: 10,backgroundColor:'transparent' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 10, color: '#34495E' ,fontFamily:'DMSansB',marginTop:5}}>{shopName}</Text>
                    
                        
                        
                    <Text style={{ fontSize: 13, marginLeft: 10 ,fontFamily:'DMSansSB',backgroundColor:'transparent',marginTop:2}}>{shopType}</Text>
                    
                    
                    <View style={{display:"flex",flexDirection:"row",marginTop:5, marginLeft: 10}}>
                    <Icon2
                            name="delivery-dining"
                            size={20}
                            color='#F86443'
                            style={{marginTop:0}}
                        />
                    <Text style={{ fontSize: 14, marginLeft: 5 ,fontFamily:'DMSans'}}>{shopAddress}</Text>
                    </View>
                    <View style={{ height: .4, width: 140, backgroundColor: 'grey', marginTop: 10, marginLeft: 10 ,borderWidth: .8,}} />
                <View style={{display:"flex",flexDirection:"row",marginTop:2}}>
                    <Text style={{ fontSize: 13, marginLeft: 10 ,fontFamily:'DMSansSB',color:'#0c356a',marginTop:7}}>⭐</Text>
                    <Text style={{ fontSize: 15, marginLeft:3 ,fontFamily:'DMSansSB',color:'green',marginTop:5,marginBottom:5}}>5.0 </Text>
                </View>
                </View>
                
                <View style={{ flex: 1 }} />
                <View style={{
                    backgroundColor: '#20f495', width: 40, paddingVertical:48, borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,justifyContent:'center'
                }} >
                    <CircularProgress progress={percentage}/> 
                    
                </View>
            </TouchableOpacity>

        </FontLoader>
    );
};

export default StoreCard;


