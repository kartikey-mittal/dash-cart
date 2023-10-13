import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Card = ({ title, status, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#d9d9d9', margin: 10, padding: 10, borderRadius: 10, width: 74, height: 64 }}>
    <Text style={{ fontSize: 9, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>{title}</Text>
    <Text style={{ fontSize: 9, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>{status}</Text>
  </TouchableOpacity>
);

const SideCategory = () => {
  const titles = ['Category 1', 'Category 2', 'Category 3', 'Title 4', 'Title5', 'Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 3', 'Title 4'];

  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCardClick = (title) => {
    setCurrentCategory(title);
    // Do action accordingly
    // For example, you could filter the cards list, update the UI, or perform a network request
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{
        elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84
      }}>
        <Text style={{ fontSize: 12, fontWeight: '400', textAlign: 'center' }}>Categories</Text>
        <ScrollView>
          {titles.map((title, index) => (
            <Card
              key={index}
              title={title}
              onPress={() => handleCardClick(title)}
              status={currentCategory === title ? 'select' : 'no-select'}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ borderLeftWidth: 1, borderLeftColor: '#d9d9d9', }} />
    </View>
  );
};

export default SideCategory;
