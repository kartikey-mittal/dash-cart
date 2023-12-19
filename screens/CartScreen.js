import React from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItemCard from '../components/CartPage/CartItemCard';
import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';

import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const keyExtractor = (item) => (item.id ? item.id.toString() : Math.random().toString());
  const totalBillAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    // Dispatch any actions needed before creating the order

    // Call createOrder with the necessary parameters
    createOrder(totalBillAmount, cartItems, dispatch);

    // Reset the cart after placing the order
    dispatch({ type: 'RESET_CART' });

    // You can navigate to the order confirmation screen or perform any other actions
    // based on your application flow
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#EB8633" barStyle="light-content" />

      <CartNavBar storeName="Bigbasket" />
      <BillingComponent totalBillAmount={totalBillAmount} />
      <FlatList
        data={cartItems}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <CartItemCard
            id={item.id}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
          />
        )}
      />
      {cartItems.length > 0 ? (
        <>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 60,
              backgroundColor: 'white',
              paddingHorizontal: 20,
              position: 'absolute',
              bottom: 0,
              width: '98%',
              borderColor: '#EB8633',
              borderWidth: 2,
              borderRadius: 100,
              margin: 5,
              marginRight: 10,
              alignSelf: 'center',
            }}
            onPress={handleConfirmOrder}
          >
            <Text style={{ fontSize: 20, color: '#3388CB' }}>Confirm</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black', marginRight: 5 }}>{`₹${totalBillAmount}`}</Text>
              <Icon name="arrow-forward" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Your cart is empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
