import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StorePage from './screens/StorePage';
import CartScreen from './screens/CartScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CartScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StorePage" component={StorePage} />
        <Stack.Screen name="CartScreen" component={CartScreen} />


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
