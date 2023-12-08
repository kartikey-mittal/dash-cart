import React, { useContext, useRef, useEffect, } from 'react';
import { View, Text, Animated, Dimensions, TouchableWithoutFeedback, PanResponder, Alert, TouchableOpacity } from 'react-native';
import { MenuContext } from './MenuContext';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const window = Dimensions.get('window');

const SideMenu = () => {
  const { isOpen, toggleMenu } = useContext(MenuContext);
  const animateSideMenu = useRef(new Animated.Value(-window.width)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (gesture.dx < 0) {
        animateSideMenu.setValue(gesture.dx);
      }
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx < -50) {
        Animated.timing(animateSideMenu, {
          toValue: -window.width,
          duration: 500,
          useNativeDriver: false,
        }).start(() => toggleMenu());
      } else {
        Animated.timing(animateSideMenu, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    Animated.timing(animateSideMenu, {
      toValue: isOpen ? 0 : -window.width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const handleTextClick = (text) => {
    Alert.alert(`You clicked on ${text}`);
    if (text === 'Back') {
      Animated.timing(animateSideMenu, {
        toValue: -window.width,
        duration: 500,
        useNativeDriver: false,
      }).start(() => toggleMenu());
    }
  }

  return (
    <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
      <Animated.View style={{ position: 'absolute', left: animateSideMenu, top: 0, bottom: 0, width: window.width * 0.7, backgroundColor: 'yellow', padding: 0, zIndex: 1, shadowColor: "#000", shadowOffset: { width: -10, height: 0 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24 }} {...panResponder.panHandlers}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <View>
            <View style={{ backgroundColor: '#EB8633' }}>
              <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5, width: 50 }} onPress={() => handleTextClick('Back')}>
                <Icon name="chevron-back" size={25} color="#EB8633" />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#EB8633', flexGrow: 1 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 300, marginLeft: 5, marginTop: 15 }}>Welcome</Text>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 400, marginLeft: 5, elevation: 5 }}>Kartikey</Text>
            </View>


            {/*---------------------SIDE MENU WORK SHOULD BE DONE ⬇️⬇️⬇️⬇️⬇️ ---------------------------------- */}
            
            <Text style={{ marginBottom: 10, fontSize: 18, backgroundColor: 'red', marginTop: 10 }} onPress={() => handleTextClick('Home')}>Home</Text>

            
              <Text style={{ marginBottom: 10, fontSize: 18 }} onPress={() => handleTextClick('Profile')}>Profile</Text>
            
            <Text style={{ marginBottom: 10, fontSize: 18 }} onPress={() => handleTextClick('Settings')}>Settings</Text>

            {/*---------------------SIDE MENU WORK SHOULD BE DONE ⬆️⬆️⬆️⬆️⬆️ ---------------------------------- */}
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

export default SideMenu;
