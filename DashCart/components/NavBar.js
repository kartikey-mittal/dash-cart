import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const NavBar = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: "#0a5098" }}>
            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 50, padding: 10, marginTop: 5 }}>
                <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 15, color: 'white' }}>A-1401</Text>
            <TouchableOpacity>
                <Icon name="chevron-down-outline" size={20} color="white" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                    <Icon name="notifications" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="cart" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavBar;
