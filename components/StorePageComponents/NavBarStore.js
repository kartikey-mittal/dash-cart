import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import FontLoader from '../../FontLoader';

const NavBarStore = ({ storeName }) => {
  const navigation = useNavigation(); // Get the navigation object using useNavigation

  return (
    <FontLoader>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#0c356a', height: 60 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: 'white', marginLeft: 10,fontFamily:"DMSansB" }}>{storeName}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="search" size={25} color="white" style={{ margin: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          {/* Use navigation.navigate to go to the CartScreen */}
          <Image source={require('../../assets/icons/cart.png')} style={{ width: 35, height: 35, marginRight:10 }}/>

        </TouchableOpacity>
      </View>
    </View> 
    </FontLoader>   
  );
};

export default NavBarStore;
