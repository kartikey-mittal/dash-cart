import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './MainContainer';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'; 
import store from './redux/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

const App = () => {
  const [currentRouteName, setCurrentRouteName] = useState('LoginScreen');

  const handleStateChange = (state) => {
    const route = getCurrentRouteName(state);
    console.log('Current route is: ', route);
    setCurrentRouteName(route);
  };

  const getCurrentRouteName = (state) => {
    if (!state || !state.routes) {
      return null;
    }
    const route = state.routes[state.index];
    if (route.state) {
      return getCurrentRouteName(route.state);
    }
    return route.name;
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}> 
        <BottomSheetModalProvider>
          <NavigationContainer onStateChange={handleStateChange}>
            <MainContainer currentRouteName={currentRouteName} />
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
