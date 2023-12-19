import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/actions/actions';

const CartItemCard = ({ id, title, price, quantity, image }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = () => {
    dispatch(updateCartItemQuantity(id, quantity + 1));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity(id, quantity - 1));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const totalPrice = price * quantity; // Calculate total price

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 5, borderColor: '#989BA4', borderWidth: 0.5 }}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'black' }}>{price}/-</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>
            {/* Display total price */}
            <Text>Total: {totalPrice}/-</Text>
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
          <TouchableOpacity onPress={handleDecrement} style={{ padding: 5 }}>
            <MaterialIcons name="remove" size={20} color="#EB8633" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginHorizontal: 5 }}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={{ padding: 5 }}>
            <MaterialIcons name="add" size={20} color="#EB8633" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRemoveClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
          <View style={{ borderRadius: 5, padding: 10, alignItems: 'center', justifyContent: 'center', height: 50, borderColor: '#EB8633', borderWidth: 1, width: 60 }}>
            <Text style={{ color: '#EB8633', fontSize: 14 }}>REMOVE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;
