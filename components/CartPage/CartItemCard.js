import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/actions/actions';

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
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{title}</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Price: Rs {price}</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#333' }}>Total: Rs {totalPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={handleDecrement} style={{ padding: 5 }}>
            <MaterialIcons name="delete" size={24} color="#EB8633" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={{ padding: 3 }}>
            <MaterialIcons name="add" size={24} color="#EB8633" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={quantity > 1 ? handleRemoveClick : handleRemoveClick} style={{ marginTop: 10 }}>
        <View style={{ borderRadius: 5, paddingVertical: 6, backgroundColor: '#EB8633', alignItems: 'center' }}>
          <Text style={{ color: '#FFF', fontSize: 16 }}>{quantity > 1 ? 'REMOVE' : 'DELETE'}</Text>
        </View>
      </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CartItemCard;
