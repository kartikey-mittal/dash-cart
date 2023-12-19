// StoreCategory.js
import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';

const StoreCategory = ({ categories, onSelectCategory }) => {
  const [selectedView, setSelectedView] = useState(categories[0]?.name || ''); // Set the default category name

  const handleCategoryClick = (category) => {
    setSelectedView(category.name);
    onSelectCategory(category.name);
    Alert.alert(`You clicked category: ${category.name}`);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor: '#f2f2f2', maxHeight: 110 }}>
      {categories.map((category) => (
        <TouchableOpacity key={category.name} onPress={() => handleCategoryClick(category)}>
          <View style={{ width: 75, height: 75, borderWidth: 1, borderColor: selectedView === category.name ? 'black' : 'lightgray', justifyContent: 'center', alignItems: 'center', margin: 10, borderRadius: 10 }}>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={{ uri: category.image }} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StoreCategory;
