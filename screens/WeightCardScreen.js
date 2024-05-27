import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import FontLoader from "../FontLoader";

const WeightCardScreen = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handlePress = (weight) => {
    setActiveButton(weight === activeButton ? null : weight);
  };

  const weights = ['100 gm', '200 gm', '300 gm', '400 gm', '500 gm']; // Example array of weights

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

  return (
    <View style={{ width: "100%", alignSelf: "center", paddingVertical: 0, backgroundColor: "#fafaf8" }}>
      {/* <Icon name="chevron-down-outline" size={20} color="#495562" style={{ alignSelf: "center" }} /> */}
      <ScrollView contentContainerStyle={{ alignItems: 'center',paddingVertical:20 }} horizontal style={{ width: "90%", alignSelf: "center" }} showsHorizontalScrollIndicator={false}>
        {weights.map((weight, index) => (
          <WeightCard
            key={index}
            weight={weight}
            isActive={weight === activeButton}
            onPress={() => handlePress(weight)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
   paddingHorizontal:10,
    paddingVertical:5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#bbbdc3"
  },
  text: {
    color: 'grey',
    fontSize: 16,
    
    fontFamily: "DMSans"
  },
  activeCard: {
    backgroundColor: '#f4f3ee',
  },
  activeText: {
    fontFamily:'DMSansB'
  }
});

export default WeightCardScreen;
