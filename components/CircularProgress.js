import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const strokeWidth = 4.2; // Adjust this to change the thickness of the progress bar
const { PI } = Math;
const r = 11; // Change this to the radius you want
const size = r * 2 + strokeWidth; // Calculate the size based on the radius
const cx = size / 2;
const cy = size / 2;

const CircularProgress = ({ progress = 0 }) => { // Now accepts progress as a percentage
  const circumference = 2 * PI * r;
  const strokeDashoffset = circumference * (1 - progress / 100); // Convert progress from a percentage to a value between 0 and 1

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotateZ: '270deg' }] }}>
        <Circle
          stroke="rgba(0, 0, 0, 0.1)"
          fill="none"
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
        <Circle
          stroke="green"
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          {...{
            strokeWidth,
            cx,
            cy,
            r,
          }}
        />
      </Svg>
      <Ionicons name="shopping-outline" size={15} color="green" style={{ position: 'absolute',margin:2 }} /> 
    </View>
  );
};

export default CircularProgress;
