import React, { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/actions/actions';
import FontLoader from '../../FontLoader';

const CartItemCard = ({ id, title, price, quantity, image,pid }) => {
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
        height:190
      }}
    >

      <View style={{ width: 100, height: 100, borderRadius: 8, overflow: 'hidden' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' ,position:"absolute",left:-20}} />
      </View>
      <View style={{ flex: 1, marginLeft:-10 }}>
        <Text style={{ fontSize: 15,  color: '#333',fontFamily:"DMSansSB" }}>{title}</Text>
        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 5 }}>
          <Text style={{ fontSize: 16, color: '#666',fontFamily:"DMSans" ,marginTop: 5}}>5 kg</Text>
          <Text style={{ fontSize: 17,  marginTop: 15, color: '#333' ,fontFamily:"DMSansSB"}}>₹ {totalPrice}</Text>
        </View>
              <View style={{ 
        width:86,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        marginTop: 25,
        borderWidth: 1, // Border width
        borderColor: 'black', // Border color
        padding: 1, // Padding to give some space inside the border
        position:"absolute",
        top:10,
        right:-10,
        borderRadius:10,
              paddingVertical:3
      }}>
        <TouchableOpacity onPress={handleDecrement} style={{ padding: 0 }}>
          <MaterialIcons name="remove" size={20} color="#0c356a" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, marginHorizontal: 10, fontFamily: "DMSansB"}}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement} style={{ padding: 2 }}>
          <MaterialIcons name="add" size={20} color="#0c356a" />
        </TouchableOpacity>
      </View>
      <Text style={{fontWeight:"600",fontSize:16,position:"absolute",right:115,top:135,width:200,fontFamily:'DMSansSB'}}>Item Total : ₹{totalPrice}</Text>
      <View style={{
        borderTopWidth:.4,
        borderTopColor:"F3EEEA",
        marginTop:25,
        width:"100%"
      }}></View>
        <TouchableOpacity onPress={quantity > 1 ? handleRemoveClick : handleRemoveClick} style={{ marginTop: 10 ,width:100 ,position:"absolute",right:-5,top:100}}>
          
        <View style={{ borderRadius: 5, paddingVertical: 6, backgroundColor: '#0c356a', alignItems: 'center' ,marginTop:20}}>
          <Text style={{ color: '#FFF', fontSize: 15,fontFamily:"DMSans" }}>{quantity > 1 ? 'REMOVE' : 'DELETE'}</Text>
        </View>
      </TouchableOpacity>
      </View>
    </Animated.View>
    </FontLoader>
  );
};

export default CartItemCard;
