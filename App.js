// App.js
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainContainer from './MainContainer';
import store from './redux/store/store'; // Ensure this path is correct

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
      <NavigationContainer onStateChange={handleStateChange}>
        <MainContainer currentRouteName={currentRouteName} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
