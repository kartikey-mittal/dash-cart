import React, { useState } from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItemCard from '../components/CartPage/CartItemCard';
import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';
import createOrder from '../components/CartPage/createOrder';
import Icon from 'react-native-vector-icons/Ionicons';
import { Client, Databases, ID, Query } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65773c8581b895f83d40');


  const CartScreen = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [storeDetails, setStoreDetails] = useState(null);
  
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
  
        // Fetch Store-ID from AsyncStorage
        const storeId = await AsyncStorage.getItem('storeid');
        const userData = await AsyncStorage.getItem('UserData');
        const userId = JSON.parse(userData)?.['User-Phone'];
  
        // Use Query.equal to search for documents with the specified storeid
        const responseStores = await databases.listDocuments('data-level-1', 'StoresDB', [
          Query.equal('Store-ID', storeId),
          Query.select(['Store-TicketSize']),
        ]);
  
        // Check if any documents were found in StoresDB
        if (responseStores.documents.length > 0) {
          const storeTicketSize = responseStores.documents[0]['Store-TicketSize'];
          console.log('Store Ticket Size:', storeTicketSize);
  
          // Now, query the WaitingListDB collection
          const responseWaitingList = await databases.listDocuments('data-level-1', 'WaitingListDB', [
            Query.equal('StoreID', storeId),
            Query.select(['Amount']),
          ]);
  
          // Check if any documents were found in WaitingListDB
          if (responseWaitingList.documents.length > 0) {
            // Calculate the sum of Store-CurrentSize from all documents in WaitingListDB
            const totalCurrentSize = responseWaitingList.documents.reduce(
              (total, doc) => total + (parseFloat(doc['Amount']) || 0),
              0
            );
            console.log('Total Current Size in WaitingListDB:', totalCurrentSize);
  
            // Check if (totalCurrentSize + totalBillAmount) is less than storeTicketSize
            const combinedSize = totalCurrentSize + totalBillAmount;
            console.log(combinedSize);
  
            let orderId; // Declare orderId outside the if-else block
  
            if (combinedSize < storeTicketSize) {
              // Code for the condition where combinedSize is less than storeTicketSize
              console.log('Going in waiting list and ordersDB');
              const generateOrderId = () => Math.floor(10000 + Math.random() * 90000);
  
              const isOrderIdUnique = async (orderId) => {
                try {
                  const response = await databases.listDocuments('data-level-1', 'OrdersDB', [
                    Query.equal('Order-ID', String(orderId)),
                  ]);
                  return response.documents.length === 0;
                } catch (error) {
                  console.error('Error checking Order-ID uniqueness:', error);
                  return false;
                }
              };
  
              do {
                orderId = generateOrderId();
              } while (!(await isOrderIdUnique(orderId)));
  
              const orderData = {
                'Order-ID': orderId,
                'Order-Value': totalBillAmount,
                'Order-PayValue': totalBillAmount,
                'Store-ID': storeId,
                'User-ID': userId,
                'Order-Status': 'Awaiting Confirmation',
                'Order-Created': getCurrentDateTime(),
                'Order-Items': cartItems.map((item) => `${item.pid}:${item.quantity}`),
                'Status-Key': 0,
              };
  
              const waitingListData = {
                'StoreID': storeId,
                'StoreCurrentSize': combinedSize,
                'StoreTicketSize': storeTicketSize,
                'UserID': userId,
                'Amount': totalBillAmount,
                'Delivery': 0,
                'Order-ID': orderId,
                // Add other attributes as needed
              };
  
              try {
                const orderPromise = databases.createDocument('data-level-1', 'OrdersDB', ID.unique(), orderData);
                const waitingListPromise = databases.createDocument('data-level-1', 'WaitingListDB', ID.unique(), waitingListData);
  
                await Promise.all([orderPromise, waitingListPromise]);
  
                console.log('Order and WaitingList documents created successfully!');
              } catch (error) {
                console.error('Error creating documents:', error);
              }
            } else {
              // Code for the else condition when combinedSize is greater than or equal to storeTicketSize
              console.log('Order can be placed successfully in the else condition!');
  
              // Reuse the generateOrderId function for the else condition
              const generateOrderIdElse = () => Math.floor(10000 + Math.random() * 90000);
              let orderIdElse;
  
              const isOrderIdUniqueElse = async (orderId) => {
                try {
                  const response = await databases.listDocuments('data-level-1', 'OrdersDB', [
                    Query.equal('Order-ID', String(orderId)),
                  ]);
                  return response.documents.length === 0;
                } catch (error) {
                  console.error('Error checking Order-ID uniqueness in else condition:', error);
                  return false;
                }
              };
  
              do {
                orderIdElse = generateOrderIdElse();
              } while (!(await isOrderIdUniqueElse(orderIdElse)));
  
              const waitingListDataElse = {
                'StoreID': storeId,
                'StoreCurrentSize': totalCurrentSize,
                'StoreTicketSize': storeTicketSize,
                'UserID': userId,
                'Amount': totalBillAmount,
                'Delivery': 0,
                'Order-ID': orderIdElse,
                // Add other attributes as needed
              };
  
              try {
                const waitingListPromiseElse = databases.createDocument('data-level-1', 'WaitingListDB', ID.unique(), waitingListDataElse);
                await waitingListPromiseElse;
  
                console.log('WaitingList document created successfully in the else condition!');
              } catch (error) {
                console.error('Error creating WaitingList document in the else condition:', error);
              }
            }
  
          } else {
            console.log('No documents found in WaitingListDB for the specified Store-ID.');
          }
  
        } else {
          console.log('Store not found in StoresDB.');
        }
  
        // Additional logic if needed after the if-else block
        // ...
  
      }
  
        // Generate a random 5-digit Order-ID
  
        // Dispatch any actions needed for your Redux store after the order is placed
        // ...
  
        // Clear the cart or perform any other necessary actions
        // ...
  
        // Show a success message to the user or navigate to the order confirmation screen
        // ...
      catch (error) {
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
            <Text style={{ fontSize: 20, color: '#EB8633', fontFamily: 'DMSansB' }}>Place Order</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black', marginRight: 5, fontFamily: 'DMSansB' }}>{`₹ ${totalBillAmount}`}</Text>
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
