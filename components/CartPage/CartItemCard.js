import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/actions/actions';
import FontLoader from '../../FontLoader';

const CartItemCard = ({ id, title, price, quantity, image }) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleRemoveClick = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => dispatch(removeFromCart(id)));
  };

  const handleIncrement = () => {
    dispatch(updateCartItemQuantity(id, quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(id, quantity - 1));
    } else {
      handleRemoveClick();
    }
  };

  const totalPrice = price * quantity;

  return (
    <FontLoader>
    <Animated.View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        opacity: fadeAnim,
      }}
    >

      <View style={{ width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 8, overflow: 'hidden' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={{ fontSize: 15,  color: '#333',fontFamily:"DMSansSB" }}>{title}</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#666',fontFamily:"DMSans" }}>Price: Rs {price}</Text>
          <Text style={{ fontSize: 17,  marginTop: 10, color: '#333' ,fontFamily:"DMSansSB"}}>Total: Rs {totalPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={handleDecrement} style={{ padding: 5 }}>
            <MaterialIcons name="remove-circle" size={24} color="#EB8633" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginHorizontal: 10 ,fontFamily:"DMSansB"}}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={{ padding: 3 }}>
            <MaterialIcons name="add-circle" size={24} color="#EB8633" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={quantity > 1 ? handleRemoveClick : handleRemoveClick} style={{ marginTop: 10 }}>
        <View style={{ borderRadius: 5, paddingVertical: 6, backgroundColor: '#EB8633', alignItems: 'center' }}>
          <Text style={{ color: '#FFF', fontSize: 16,fontFamily:"DMSans" }}>{quantity > 1 ? 'REMOVE' : 'DELETE'}</Text>
        </View>
      </TouchableOpacity>
      </View>
    </Animated.View>
    </FontLoader>
  );
};

export default CartItemCard;
