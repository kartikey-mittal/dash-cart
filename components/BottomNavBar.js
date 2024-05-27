// BottomNavBar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FontLoader from '../FontLoader';

const BottomNavBar = () => {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const navigation = useNavigation();

  const handleIconPress = (iconName) => {
    if (iconName === 'home') {
      navigation.navigate('Home');
    } else if (iconName === 'orders') {
      navigation.navigate('OrderHistoryScreen');
    } else if (iconName === 'account') {
      navigation.navigate('Profile');
    }
    setSelectedIcon(iconName);
  };

  return (
    <FontLoader>
      <View style={styles.navContainer}>
        <TouchableOpacity onPress={() => handleIconPress('home')} style={styles.iconContainer}>
          <Icon2
            name="home-filled"
            size={25}
            color={selectedIcon === 'home' ? '#00356a' : '#989898'}
          />
          <Text style={[styles.iconText, { color: selectedIcon === 'home' ? '#00356a' : '#989898' }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('orders')} style={styles.iconContainer}>
          <Icon1
            name="box-open"
            size={23}
            color={selectedIcon === 'orders' ? '#00356a' : '#989898'}
          />
          <Text style={[styles.iconText, { color: selectedIcon === 'orders' ? '#00356a' : '#989898' }]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress('account')} style={styles.iconContainer}>
          <Ionicons
            name="account-circle"
            size={25}
            color={selectedIcon === 'account' ? '#00356a' : '#989898'}
          />
          <Text style={[styles.iconText, { color: selectedIcon === 'account' ? '#00356a' : '#989898' }]}>
            Account
          </Text>
        </TouchableOpacity>
      </View>
    </FontLoader>
  );
};

const styles = {
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopColor: '#2c2c2c',
    borderTopWidth: 0.5,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  iconText: {
    fontFamily: 'DMSansSB',
  },
};

export default BottomNavBar;
