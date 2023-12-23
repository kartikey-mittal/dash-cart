import React , { useContext } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import { MenuContext } from './MenuContext';
import { useSelector } from 'react-redux';

const NavBar = ({ cityName }) => {
  const { toggleMenu } = useContext(MenuContext);

  

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#EB8633',height:'60px' }}>
  <TouchableOpacity style={{ backgroundColor: '#EB8633', borderRadius: 50, padding: 10, margin: 5 }}>
    <Icon name="menu" size={25} color="#fff"onPress={toggleMenu} />
  </TouchableOpacity>
  
  <TouchableOpacity style={{ flexDirection: 'row', flexGrow:2 }} >
    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', }}>{cityName}</Text>
    <Icon name="chevron-down-outline" size={20} color="#f3f3f3" />
  </TouchableOpacity>
  
  <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'flex-end'}}>
    <TouchableOpacity style={{ marginHorizontal: 10 }}>
      <Icon name="notifications" size={25} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity>
      
      <Image source={require('../assets/icons/cart.png')} style={{ width: 35, height: 35, marginRight:10 }}/>
    </TouchableOpacity>
  </View>
</View>

    );
};

export default NavBar;
