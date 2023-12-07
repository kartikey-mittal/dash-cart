import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const { width, height } = Dimensions.get('window');

const CheckoutButton = ({ total }) => (
    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 60, backgroundColor: 'white', paddingHorizontal: 20, position: 'absolute', bottom: 0, width:'98%',borderColor:'#EB8633',borderWidth:2,borderRadius:15 ,margin:5,marginRight:10,alignSelf:'center'}}>
        <Text style={{ fontSize: 20, color: '#3388CB' }}>Confirm
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Text style={{ fontSize: 20, color: 'white' }}>{total}</Text> */}
            <Text style={{ fontSize: 20, color: 'black', marginRight: 5 }}>₹ 500</Text>
            <Icon name="arrow-forward" size={30} color="black" />
        </View>
    </TouchableOpacity>
);

export default CheckoutButton;
