import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity } from '../../redux/actions/actions';
import FontLoader from '../../FontLoader';

const ItemCard = ({ id, title, price, discountPrice, image, weight }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Find the cart item corresponding to the current ItemCard
  const cartItem = cartItems.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    // Update the local state when the cart item quantity changes
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItem]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);

    // Dispatch an action to update the quantity in the cart reducer
    dispatch(updateCartItemQuantity(id, quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);

      // Dispatch an action to update the quantity in the cart reducer
      dispatch(updateCartItemQuantity(id, quantity - 1));
    } else {
      setQuantity(0);
    }
  };
//
  const handleAddClick = () => {
    Alert.alert('Document ID', `You clicked ADD for item with ID: ${id}`);
    dispatch(addToCart({ id, title, price, quantity: 1, image }));
    setQuantity(1);
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 ,borderWidth:1,borderColor:"black",paddingHorizontal:6,paddingVertical:2,borderRadius:10,position:"absolute",top:-40}}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#EB8633" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5,fontFamily:"DMSansB" }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#EB8633" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FontLoader>
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 5, borderColor: '#989BA4', borderWidth: 0.5 }}>
       <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '90%', resizeMode: 'contain' ,borderWidth:2}} />
      </View>
      <View style={{ flex: 1, marginLeft: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500',fontFamily:"DMSansSB" }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 9,fontFamily:"DMSansSB" }}>{price}/-</Text>
          <Text style={{ fontSize: 15, color: '#a9a9a9', textDecorationLine: 'line-through',marginTop: 9, marginLeft: 5,fontFamily:"DMSans" }}>{discountPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 13 }}>
          <Text style={{ fontSize: 16, color: 'black', backgroundColor: '#f2f2f2', paddingHorizontal: 5 ,fontFamily:"DMSans"}}>{weight}</Text>
        </View>
      {quantity === 0 ? (
        <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <View style={{ borderRadius: 5, padding: 4, alignItems: 'center',justifyContent:"center", height: 30, borderColor: '#EB8633', borderWidth: 1, width: 60 }}>
            <Text style={{ color: '#EB8633', fontSize: 14 ,fontFamily:"DMSansB"}}>ADD</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
          {renderCounterButtons()}
        </View>
      )}
    </View>
    </View>
    </FontLoader>
  );
};

export default ItemCard;
