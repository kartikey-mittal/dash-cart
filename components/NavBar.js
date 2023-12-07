import React , { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import { MenuContext } from './MenuContext';

const NavBar = () => {
  const { toggleMenu } = useContext(MenuContext);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#EB8633',height:'60px' }}>
  <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5 }}>
    <Icon name="menu" size={25} color="#EB8633"onPress={toggleMenu} />
  </TouchableOpacity>
  
  <TouchableOpacity style={{ flexDirection: 'row', flexGrow:2 }} >
    <Text style={{ fontSize: 15, color: 'white', fontWeight: '500', }}>Rudrapur</Text>
    <Icon name="chevron-down-outline" size={20} color="#f3f3f3" />
  </TouchableOpacity>
  
  <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'flex-end'}}>
    <TouchableOpacity style={{ marginHorizontal: 10 }}>
      <Icon name="notifications" size={25} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Icon name="cart" size={25} color="white" />
    </TouchableOpacity>
  </View>
</View>

    );
};

export default NavBar;
