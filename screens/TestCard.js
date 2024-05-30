import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontLoader from '../FontLoader';

const TestCard = ({
  productimg,
  productName,
  productWeight,
  originalPrice,
  discountedPrice,
  productid,
  variants,
  onAddClick,
  quantity,
  handleIncrement,
  handleDecrement,
  storeData, // Function to save data to AsyncStorage
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0].variantId);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    // Save data to AsyncStorage whenever quantity changes
    storeData();
  }, [localQuantity]);

  const handleVariantChange = (variantId) => {
    setSelectedVariantId(variantId);
    setLocalQuantity(quantity); // Update the quantity based on the selected variant
  };

  const handleAddClick = () => {
    handleIncrement(`${productid}-${selectedVariantId}`);
    setLocalQuantity(1); // Set initial quantity to 1
  };

  const handleIncrementClick = () => {
    handleIncrement(`${productid}-${selectedVariantId}`);
  };

  const handleDecrementClick = () => {
    if (localQuantity > 1) {
      handleDecrement(`${productid}-${selectedVariantId}`);
    } else {
      handleDecrement(`${productid}-${selectedVariantId}`);
    }
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={handleDecrementClick} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#e6c2bf" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5, fontFamily: "DMSansB" }}>{localQuantity}</Text>
      <TouchableOpacity onPress={handleIncrementClick} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#e6c2bf" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FontLoader>
      <View style={{ height: 10 }}></View>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: productimg }} 
            style={styles.productImage} 
          />
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{productName}</Text>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productWeightContainer}>
              <Text style={styles.productWeightText}>
                {productWeight}
              </Text>
              {variants.length > 1 && (
                <TouchableOpacity onPress={() => onAddClick(variants)}>
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#000" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.addButtonContainer}>
              {localQuantity === 0 ? (
                <TouchableOpacity onPress={handleAddClick} style={styles.addButton}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.counterButtonsContainer}>
                  {renderCounterButtons()}
                </View>
              )}
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          </View>
        </View>
      </View>
    </FontLoader>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 8,
    marginVertical: 1,
    borderColor: '#989BA4',
    borderWidth: 0.5
  },
  imageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '24%',
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor:'transparent',
    resizeMode: 'contain',
    borderWidth: 2
  },
  productInfoContainer: {
    flex: 1,
    marginLeft: 10
  },
  productName: {
    backgroundColor:'transparent',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: "DMSansSB"
  },
  productDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  productWeightContainer: {
    marginLeft:0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderColor:'black',
    borderWidth:0.5,
    borderRadius:5,
    paddingHorizontal:5,
    marginTop:3
  },
  productWeightText: {
    fontSize: 16,
    color: 'black',
   
    paddingHorizontal: 5,
    fontFamily: "DMSans"
  },
  addButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor:'transparent'
  },
  addButton: {
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
    justifyContent: "center",

    borderColor: '#0c356a',
    borderWidth: 1,
    paddingHorizontal:20
  },
  addButtonTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#0c356a',
    fontSize: 14,
    fontFamily: "DMSansB"
  },
  counterButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    position: "absolute",
    
  },
  priceContainer: {
    flexDirection: 'column',
   backgroundColor:'transparent',
    marginTop: 0
  },
  discountedPrice: {
    fontSize: 16,
    color: 'black',
    marginTop: 2,
    fontFamily: "DMSansSB",
    backgroundColor:'transparent'
  },
  originalPrice: {
    fontSize: 13,
    color: '#a9a9a9',
    textDecorationLine: 'line-through',
    marginTop: 0,
    marginLeft: 0,
    fontFamily: "DMSans"
  }
});

export default TestCard;
