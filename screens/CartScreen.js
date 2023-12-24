import React from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItemCard from '../components/CartPage/CartItemCard';
import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';
import createOrder from '../components/CartPage/createOrder';
import Icon from 'react-native-vector-icons/Ionicons';
import { Client, Databases, ID } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65773c8581b895f83d40');


const CartScreen = () => {
  
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);
  const keyExtractor = (item) => (item.id ? item.id.toString() : Math.random().toString());
  const totalBillAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const databases = new Databases(client);
  const handleConfirmOrder = async () => {
    try {
      const getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = now.toISOString(); // You can format the date according to your requirements
        return formattedDate;
      };
      alert(totalBillAmount)
      // Fetch Store-ID from AsyncStorage
      const storeId = await AsyncStorage.getItem('storeid');
      const userData = await AsyncStorage.getItem('UserData');
      const userId = JSON.parse(userData)?.['User-Phone'];
      // Generate a random 5-digit Order-ID
      const orderId = Math.floor(10000 + Math.random() * 90000);
      
      // Create the Order document
      const orderData = {
        'Order-ID': orderId,
        'Order-Value': totalBillAmount,
        'Order-PayValue': totalBillAmount,
        'Store-ID': storeId,
        'User-ID': userId, // Adjust this based on your user data structure
        'Order-Status': 'Awaiting Confirmation',
        'Order-Created': getCurrentDateTime(),
        'Order-Items': cartItems.map(item => `${item.pid}:${item.quantity}`),
        'Status-Key':0

      };
  
      const promise = databases.createDocument('data-level-1', 'OrdersDB', ID.unique(), orderData);

      // const waitingData ={
      //   'StoreID': storeId,
        
      // }

      // Dispatch any actions needed for your Redux store after the order is placed
      // ...

      // Clear the cart or perform any other necessary actions
      // ...

      // Show a success message to the user or navigate to the order confirmation screen
      // ...
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle the error as needed
    }
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
            pid={item.pid}
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
            <Text style={{ fontSize: 20, color: '#EB8633' ,fontFamily:'DMSansB'}}>Place Order</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black', marginRight: 5 ,fontFamily:'DMSansB'}}>{`₹ ${totalBillAmount}`}</Text>
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
