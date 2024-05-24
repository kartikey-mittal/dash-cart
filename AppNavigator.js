import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StoreScreen from './screens/StoreScreen';
import CartScreen from './screens/CartScreen';
// import TestScreen from './screens/TestCard';
import LoginScreen from './LoginPages/Screens/LoginScreen';
import Delivery from './LoginPages/Screens/Delivery';
import Delivery2 from './LoginPages/Screens/Delivery2';
import CityScreen from './LoginPages/Screens/CityScreen';

import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Deliveryd from './LoginPages/Screens/Deliveryd';
import CheckoutButton from './components/CartPage/CheckoutBtn';
import Orderconfirmed from './components/CartPage/Orderconfirmed';
import NameScreen from './LoginPages/Screens/NameScreen';
// import Test2 from './screens/Test2';
import Test from './screens/Test';
import WeightCardScreen from './screens/WeightCardScreen';
import GlobalTest from './screens/GlobalTest';




const Stack = createStackNavigator();
const AppNavigator = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="GlobalTest" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="GlobalTest" component={GlobalTest} />
        <Stack.Screen name="WeightCardScreen" component={WeightCardScreen} />
        <Stack.Screen name="Orderconfirmed" component={Orderconfirmed} />
        <Stack.Screen name="CheckoutBtn" component={CheckoutButton} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* -------- test screen below -------------*/}
        {/* <Stack.Screen name="Test2" component={Test2} /> */}
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Delivery2" component={Delivery2} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />
        <Stack.Screen name="CityScreen" component={CityScreen} />
        <Stack.Screen name="Deliveryd" component={Deliveryd} />
        <Stack.Screen name="NameScreen" component={NameScreen} />

{/* test screen above */}

    

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;



