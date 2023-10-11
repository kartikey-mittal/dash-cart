import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const SearchBar = () => {
    return (
        <View style={{ backgroundColor: '#0a5098', padding: 15, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
            <Text style={{ color: 'white', fontSize: 15,fontFamily:'DMSans' }}>Welcome, 👋 </Text>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold',fontFamily:'DMSans' }}>Kartikey</Text>

            <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 50, padding: 10, marginTop: 10 }}>
                <Icon name="search" size={20} color="black" />
                <TextInput placeholder="Search for products..." style={{ marginLeft: 10 }} />
            </View>
        </View>
    );
};

export default SearchBar;
