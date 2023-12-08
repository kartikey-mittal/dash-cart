import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Category1 = () => {
  const imageUrls = [
    'https://th.bing.com/th/id/OIG..fuOKiJrxyjhidoGc30u?pid=ImgGn',
    'https://img.freepik.com/free-vector/different-stationery-items-blue-plastic-glass-composition-red-circle-white-background-realistic-vector-illustration_1284-19882.jpg',
    'https://img.freepik.com/premium-vector/medicine-pharmacy_131590-145.jpg',
    'https://www.freepngimg.com/thumb/grocery/53973-6-grocery-free-hq-image.png',
    
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
    borderRadius:25,
    borderWidth:0.4,
    margin:15,
    marginTop:25,
    padding: 10, // Add padding to make the shadow visible
    backgroundColor: '#fff', // Change this to the desired background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
  },
  imageContainer: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default Category1;
