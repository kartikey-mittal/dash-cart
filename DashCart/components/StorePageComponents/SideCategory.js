import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


const Card = ({ title }) => (
  <TouchableOpacity style={{ backgroundColor: '#d9d9d9', margin: 10, padding: 10, borderRadius: 10, width: 74, height: 64 }}>
    <Text style={{ fontSize: 12, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>{title}</Text>
  </TouchableOpacity>
);

const SideCategory = () => {
  const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title5', 'Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 3', 'Title 4'];
  const cards = ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5'];

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{
        elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84
      }}>
        <Text style={{ fontSize: 12, fontWeight: '400', textAlign: 'center' }}>Categories</Text>
        <ScrollView>
          {titles.map((title, index) => (
            <Card key={index} title={title} />
          ))}
        </ScrollView>
      </View>
      <View style={{ borderLeftWidth: 1, borderLeftColor: '#d9d9d9', marginLeft: 5 }} />
    </View>
  );
};
export default SideCategory;
