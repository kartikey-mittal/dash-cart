import React, { useContext, useRef, useEffect, } from 'react';
import { View, Text, Animated, Dimensions, TouchableWithoutFeedback, PanResponder, Alert, TouchableOpacity } from 'react-native';
import { MenuContext } from './MenuContext';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
 // replace with your actual icon component
import FontLoader from '../FontLoader';

const window = Dimensions.get('window');

const SideMenu = ({username}) => {
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
    <FontLoader>
    <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 ,flexDirection:'column'}}>
      <Animated.View style={{ position: 'absolute', left: animateSideMenu, top: 0, bottom: 0, width: window.width * 0.7, backgroundColor: '#fff', padding: 0, zIndex: 1, shadowColor: "#000", shadowOffset: { width: -10, height: 0 }, shadowOpacity: 0.58, shadowRadius: 16.00, elevation: 24,flex:1 }} {...panResponder.panHandlers}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <View>
            <View style={{ backgroundColor: '#0c356a',flexDirection:'row-reverse' }}>
              <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5, width: 50,alignItems:'center' }} onPress={() => handleTextClick('Back')}>
                <Icon name="close" size={25} color="#0c356a" />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#0c356a', flexGrow: 1 }}>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: 300, marginLeft: 5, marginTop: 15,fontFamily:"DMSans" }}>Hiiiii !! 👋</Text>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 500, marginLeft: 5, marginBottom:10,elevation: 5,fontFamily:"DMSans" }}>{username} !</Text>
            </View>


            {/*---------------------SIDE MENU WORK SHOULD BE DONE ⬇️⬇️⬇️⬇️⬇️ ---------------------------------- */}

            {/* <Text style={{ marginBottom: 10, fontSize: 18, backgroundColor: 'red', marginTop: 10 }} onPress={() => handleTextClick('Home')}>Home</Text>

            
              <Text style={{ marginBottom: 10, fontSize: 18 }} onPress={() => handleTextClick('Profile')}>Profile</Text>
            
            <Text style={{ marginBottom: 10, fontSize: 18 }} onPress={() => handleTextClick('Settings')}>Settings</Text> */}


            <View style={{  }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding:10,flex:0,borderBottomWidth:0 ,borderColor:'#8F97A1',marginTop:5,backgroundColor:'#ececec'}} onPress={() => {/* Navigate to Home */ }}>
                <Icon name="home" size={25} color="#405B7B" />
                <Text style={{ marginLeft: 10 ,fontSize:15,fontFamily:"DMSans",fontWeight:'bold'}}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding:10,borderBottomWidth:0.0,borderColor:'#8F97A1' }} onPress={() => {/* Navigate to My Orders */ }}>
                <Icon name="apps-sharp" size={25} color="#405B7B" />
                <Text style={{ marginLeft: 10,fontSize:15 ,fontFamily:"DMSans"}}>My Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding:10 ,borderBottomWidth:0.0,borderColor:'#8F97A1'}} onPress={() => {/* Navigate to Support */ }}>
                <Icon name="help-circle" size={25} color="#405B7B" />
                <Text style={{ marginLeft: 10,fontSize:15,fontFamily:"DMSans" }}>Support</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding:10,borderBottomWidth:0.0,borderColor:'#8F97A1' }} onPress={() => {/* Navigate to Contact Us */ }}>
                <Icon name="mail" size={25} color="#405B7B" />
                <Text style={{ marginLeft: 10 ,fontSize:15,fontFamily:"DMSans"}}>Contact Us</Text>
              </TouchableOpacity>
            </View>

            {/*---------------------SIDE MENU WORK SHOULD BE DONE ⬆️⬆️⬆️⬆️⬆️ ---------------------------------- */}

            <View style={{justifyContent:'flex-end',marginTop:300}}>
            <View style={{height:1,width:'40%',backgroundColor:'#d4d4d4',marginLeft:10,marginTop:20}}></View>
              <Text style={{color:"#d4d4d4",fontSize:20,marginLeft:10,marginTop:5,fontWeight:400,fontFamily:"DMSansB"}}>dashhh!!!!</Text>
              <Text style={{color:"#d4d4d4",fontSize:35,marginLeft:10,marginTop:0,fontWeight:300,fontFamily:"DMSansB"}}>dashcart</Text>
              
              
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
    </FontLoader>
  );
}

export default SideMenu;
