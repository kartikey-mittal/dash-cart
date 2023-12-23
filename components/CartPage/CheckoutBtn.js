import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CheckoutButton = ({ totalBillAmount }) => {
  const X = useSharedValue(0);
  const navigation = useNavigation();

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = X.value;
    },
    onActive: (event, ctx) => {
      X.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      // Simple logic: Reset the button position when gesture ends
      X.value = withSpring(0, { damping: 15, stiffness: 80 }, (isFinished) => {
        if (isFinished) {
          runOnJS(handleSwipeEnd)();
        }
      });
    },
  });

  const handlePress = () => {
    X.value = withSpring(0, { damping: 7, stiffness: 100 });
    X.value = withSpring(width - 180, { damping: 12, stiffness: 80 }, (isFinished) => {
      if (isFinished) {
        runOnJS(handleSwipeEnd)();
      }
    });
  };

  const handleSwipeEnd = () => {
    // Navigation logic to the 'Orderconfirmed' screen
    navigation.navigate('Orderconfirmed');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: X.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler} onEnded={() => {}}>
        <Animated.View style={animatedStyle}>
          <TouchableOpacity style={styles.btn} onPress={handlePress}>
            <Text style={styles.btnstyle}>finsih</Text>
            <MaterialIcons name="arrow-forward" size={30} color="darkgreen" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    width: width - 20,
    borderColor: 'darkgreen',
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    alignSelf: 'center',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#69DB67',
  },
  btnstyle: {
    color: 'white',
    fontSize: 17,
    marginTop: 1,
  },
});

export default CheckoutButton;
