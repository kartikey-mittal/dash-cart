import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StoreScreen from './screens/StoreScreen';
import CartScreen from './screens/CartScreen';
import TestScreen from './screens/TestScreen';
import LoginScreen from './screens/LoginScreen';
import Delivery from './LoginPages/Screens/Delivery';
import Delivery2 from './LoginPages/Screens/Delivery2';


import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';





const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="OrderScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* -------- test screen below -------------*/}
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Delivery2" component={Delivery2} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} />


{/* test screen above */}

    

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f6f6f6',

//   },
// });
