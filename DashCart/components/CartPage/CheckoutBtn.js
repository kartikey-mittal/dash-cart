import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const { width, height } = Dimensions.get('window');

const CheckoutButton = ({ total }) => (
    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: height * 0.09, backgroundColor: '#F15117', paddingHorizontal: 20, position: 'absolute', bottom: 0, width }}>
        <Text style={{ fontSize: 20, color: 'white' ,fontFamily:'DMSans'}}>CHECKOUT</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 20, color: 'white' }}>{total}</Text> */}
            <Text style={{ fontSize: 20, color: 'white', marginRight: 5 ,fontFamily:'DMSans'}}>₹ 500</Text>
            <Icon name="arrow-forward" size={30} color="#fff" />
        </View>
    </TouchableOpacity>
);

export default CheckoutButton;
