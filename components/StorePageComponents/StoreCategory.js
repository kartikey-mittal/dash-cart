// StoreCategory.js
import React, { useState } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Image,
} from "react-native";
import FontLoader from "../../FontLoader";

const StoreCategory = ({ categories, onSelectCategory }) => {
  const [selectedView, setSelectedView] = useState(categories[0]?.name || ""); // Set the default category name

  const handleCategoryClick = (category) => {
    setSelectedView(category.name);
    onSelectCategory(category.name);
    Alert.alert(`You clicked category: ${category.name}`);
  };

  return (
    <FontLoader>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: "#f2f2f2" }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            onPress={() => handleCategoryClick(category)}
          >
            {/* <View style={{ margin: 10 }}> */}
            <View
              style={{
                borderWidth: 0.1,
                borderColor:
                  selectedView === category.name ? "black" : "lightgray",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "red",
                display: "flex",
                height: 50,
                marginHorizontal:10,
                marginTop:10
              }}
            >
              <Image
                style={{
                  padding: 0,
                  zIndex: -1,
                  height: "100%",
                  width: "100%",
                  padding:5,
                  resizeMode:"cover"
                }}
                source={{ uri: category.image }}
                resizeMode="cover"
              />
            </View>

            <Text
              style={{
                backgroundColor: "transparent",
                marginTop: 0,
                fontFamily: "DMSans",
                alignSelf: "flex-end",
              }}
            >
              `hey{category.name}`
            </Text>
            {/* </View> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </FontLoader>
  );
};

export default StoreCategory;
