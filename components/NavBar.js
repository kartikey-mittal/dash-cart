import React , { useContext } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import { MenuContext } from './MenuContext';
import { useSelector } from 'react-redux';
import FontLoader from '../FontLoader';

const NavBar = ({ cityName }) => {
  const { toggleMenu } = useContext(MenuContext);

  

    return (
      <FontLoader>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#0c356a',height:'60px' }}>
  {/* <TouchableOpacity style={{ backgroundColor: '#0c356a', borderRadius: 50, padding: 10, margin: 5 }}>
    <Icon name="menu" size={25} color="#f4f3ee"onPress={toggleMenu} />
  </TouchableOpacity> */}
  
  <TouchableOpacity style={{ flexDirection: 'row', flexGrow:2 }} >
    <Text style={{ fontSize: 16, color: '#f4f3ee', fontWeight: '600',fontFamily:"DMSansB",marginLeft:20 ,marginTop:5}}>{cityName}</Text>
    <Icon name="chevron-down-outline" size={20} color="#f3f3f3" style={{marginTop:7,marginLeft:7}}/>
  </TouchableOpacity>
  
  <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'flex-end'}}>
    <TouchableOpacity style={{ marginHorizontal: 10 }}>
      {/* <Icon name="notifications-circle" size={25} color="#fff" /> */}
    </TouchableOpacity>
    <TouchableOpacity>
      
      <Image source={require('../assets/icons/cart2.png')} style={{ width: 35, height: 35, marginRight:10 }}/>
    </TouchableOpacity>
  </View>
</View>
</FontLoader>
    );
};

export default NavBar;
