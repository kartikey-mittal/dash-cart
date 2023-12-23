import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const CartNavBar = ({ storeName }) => {
    return (
        <FontLoader>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, backgroundColor: '#EB8633', paddingLeft: 10,height:60 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { }}>
                    <Icon name="chevron-back-outline" size={25} color="white" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: 'white', marginLeft: 10,fontFamily:"DMSansB"}}>{storeName}</Text>
            </View>
        </View>
        </FontLoader>
    );
};

export default CartNavBar;
