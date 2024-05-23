import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Category1 = () => {
  const imageUrls = [
    'https://i.ibb.co/qYKCdLk/Grocery.png',
    'https://i.ibb.co/yFR7RGG/Stationary.png',
    'https://i.ibb.co/gJy3Cpz/Mecial.png',
    'https://i.ibb.co/fG0tqDY/Untitled-design-2.pngg',
    
    // Add more image URLs as needed
  ];

  const handlePress = (imageUrl) => {
    console.log(`Image clicked: ${imageUrl}`);
    // Handle the click event here
  };

  return (
    <View style={styles.container}>
        
      {imageUrls.map((imageUrl, index) => (
        <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => handlePress(imageUrl)}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor:'red',
    borderRadius:10,
    borderWidth:0.4,
    margin:15,
    marginTop:15,
    padding: 10, // Add padding to make the shadow visible
    backgroundColor: '#fff', // Change this to the desired background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    
  },
  imageContainer: {
    width: '25%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Category1;
