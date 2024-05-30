// StoreCategory.js
import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Alert, Text, Image } from "react-native";
import FontLoader from "../../FontLoader";

const StoreCategory = ({ categories, onSelectCategory }) => {
  const [selectedView, setSelectedView] = useState(categories[0]?.name || ""); // Set the default category name

  const handleCategoryClick = (category) => {
    setSelectedView(category.name);
    onSelectCategory(category.name === "All" ? "" : category.name); // Pass empty string for "All" category
    Alert.alert(`You clicked category: ${category.name}`);
  };

  return (
    <FontLoader>
      <View style={{ height: 95 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Add "All" category */}
          <TouchableOpacity onPress={() => handleCategoryClick({ name: "All" })}>
            <View style={styles.categoryItem}>
              <Image
                style={styles.categoryImage}
                source={{ uri: "https://profile.line-scdn.net/0hb99xalRCPRYEARTnpp5CQThEM3tzLztefDJ1cCkIM3UqZShIOTV3d3NSMyV8OS5BaGN1dXECNHR8" }}
              />
             
            </View>
            <Text style={[styles.categoryText, { fontFamily: selectedView === "All" ? "DMSansSB" : "DMSans" }]}>All</Text>
          </TouchableOpacity>
          {/* Map through categories */}
          {categories.map((category) => (
            <TouchableOpacity key={category.name} onPress={() => handleCategoryClick(category)}>
              <View style={styles.categoryItem}>
                <Image style={styles.categoryImage} source={{ uri: category.image }} />
               
              </View>
              <Text style={[styles.categoryText, { fontFamily: selectedView === category.name ? "DMSansSB" : "DMSans" }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </FontLoader>
  );
};

const styles = {
  categoryItem: {
    borderWidth: 0.1,
    borderColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    height: 60,
    width: 65,
    marginHorizontal: 10,
    marginTop: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryImage: {
    height: "100%",
    width: "101%",
    zIndex: -1,
    resizeMode: "cover",
  },
  categoryText: {
    backgroundColor: "transparent",
    marginTop: 0,
    fontFamily: "DMSans",
    alignSelf: "center",
    color: "#00356a",
  },
};

export default StoreCategory;
