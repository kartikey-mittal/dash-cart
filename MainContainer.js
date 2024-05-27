// MainContainer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './AppNavigator';
import BottomNavBar from './components/BottomNavBar';

const MainContainer = ({ currentRouteName }) => {
  // List of screens where BottomNavBar should be visible
  const bottomNavBarScreens = ['Home', 'Profile', 'OrderHistoryScreen'];
  console.log('route is'+currentRouteName);

  return (
    <View style={styles.container}>
      <AppNavigator />
      {bottomNavBarScreens.includes(currentRouteName) && <BottomNavBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainContainer;
