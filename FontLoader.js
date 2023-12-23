// FontLoader.js

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'DMSans': require('./assets/fonts/DMSans.ttf')
        
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or a loading indicator
  }

  return <>{children}</>;
};

export default FontLoader;
