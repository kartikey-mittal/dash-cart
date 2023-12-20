import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Orderconfirmed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Orderconfirmed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Orderconfirmed;
