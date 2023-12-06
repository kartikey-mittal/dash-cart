import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const SearchBar = () => {
    return (

        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
            <View style={{ backgroundColor: '#EB8633', padding: 5,  shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5 }}>
                {/* <Text style={{ color: '#0a5098', fontSize: 15 }}>Welcome, 👋 </Text>
                <Text style={{ color: '#0a5098', fontSize: 30, fontWeight: 'bold' }}>Kartikey! 👋</Text> */}

                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10,  borderColor: '#858484', borderWidth: 1 }}>
                    <Icon name="search" size={20} color="black" />
                    <TextInput placeholder="Search for products..." style={{ marginLeft: 10 }} />
                </View>
            </View>
        </View>


    );
};

export default SearchBar;
