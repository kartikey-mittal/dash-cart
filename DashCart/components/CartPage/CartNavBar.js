import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const CartNavBar = ({ storeName }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, backgroundColor: '#0a5098', paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="chevron-back-outline" size={35} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: 'white', marginLeft: 10 ,fontFamily:'DMSans'}}>{storeName}</Text>
            </View>
        </View>
    );
};

export default CartNavBar;
