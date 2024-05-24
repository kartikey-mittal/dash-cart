import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontLoader from "../../FontLoader";

const WeightCard = ({ weight, isActive, onPress }) => {
  return (
        <FontLoader>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        isActive && styles.activeCard
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive && styles.activeText
        ]}
      >
        {weight}
      </Text>
    </TouchableOpacity>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:20,
    borderWidth:1,
    borderColor:"#bbbdc3"
  },
  text: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'normal',
        fontFamily:"DMSans"
  },
  activeCard: {
    backgroundColor: '#f4f3ee',
  },
  activeText: {
    fontWeight: 'bold'
  }
});

export default WeightCard;