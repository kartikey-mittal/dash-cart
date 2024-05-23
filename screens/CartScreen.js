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
        if (responseWaitingList.documents.length > 0 || responseWaitingList.documents.length <= 0) {
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

            //----------------- if (combineSize > storeTicket)  ⬇️⬇️⬇️-----------------------------
            console.log('Order can be placed successfully in the else condition!');

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
              'StoreCurrentSize': combinedSize,
              'StoreTicketSize': storeTicketSize,
              'UserID': userId,
              'Amount': totalBillAmount,
              'Delivery': 0,
              'Order-ID': orderIdElse,
              // Add other attributes as needed
            };

            const orderDataElse = {
              'Order-ID': orderIdElse,
              'Order-Value': totalBillAmount,
              'Order-PayValue': totalBillAmount,
              'Store-ID': storeId,
              'User-ID': userId,
              'Order-Status': 'Awaiting Confirmation',
              'Order-Created': getCurrentDateTime(),
              'Order-Items': cartItems.map((item) => `${item.pid}:${item.quantity}`),
              'Status-Key': 1,
            };

            try {
              const waitingListPromiseElse = databases.createDocument('data-level-1', 'WaitingListDB', ID.unique(), waitingListDataElse);
              const orderPromiseElse = databases.createDocument('data-level-1', 'OrdersDB', ID.unique(), orderDataElse);

              await Promise.all([waitingListPromiseElse, orderPromiseElse]);
              //------------------------TESTING-------------------

              //------------------- Fetching OrderID to update data ⬇️⬇️---------------------
              const waitingListResponse = await databases.listDocuments('data-level-1', 'WaitingListDB', [
                Query.equal('StoreID', storeId),
                Query.select(['Order-ID', 'Amount']), // Add other attributes as needed
              ]);

              // Log the waiting list data


              const orderIDsToUpdate = waitingListResponse.documents.map((doc) => doc['Order-ID']);
              console.log(orderIDsToUpdate);
              //------------------- Fetching OrderID to update data ⬆️⬆️---------------------

              for (const orderIDToUpdate of orderIDsToUpdate) {
                try {
                  // Find the corresponding Order document using Query.equal
                  const orderDocumentResponse = await databases.listDocuments('data-level-1', 'OrdersDB', [
                    Query.equal('Order-ID', orderIDToUpdate),
                  ]);

                  // Check if any documents were found
                  if (orderDocumentResponse.documents.length > 0) {
                    const orderDocumentID = orderDocumentResponse.documents[0]['$id']; // Get the document ID


                    // Update the Order document with the specified document ID
                    const orderUpdateResponse = await databases.updateDocument(
                      'data-level-1',
                      'OrdersDB',
                      orderDocumentID,
                      {
                        'Status-Key': '5',
                        // Add other fields to update as needed
                      }
                    );

                    console.log(`Order document with Order-ID ${orderIDToUpdate} updated successfully!`);

                    // Log the Order document ID
                    console.log(`Document ID for Order-ID ${orderIDToUpdate}: ${orderDocumentID}`);
                  } else {
                    console.log(`No Order document found for Order-ID ${orderIDToUpdate}`);
                  }
                } catch (error) {
                  console.error(`Error fetching Order document ID for Order-ID ${orderIDToUpdate}:`, error);
                  // Handle the error accordingly
                }
              }


              //------------------------TESTING⬆️⬆️-------------------


              console.log('WaitingList and Order documents created successfully in the else condition!');

            } catch (error) {
              console.error('Error creating documents in the else condition:', error);
              // Handle the error accordingly
            }
          }
          //-------------------- if (combineSize > storeTicket)CLOSED ⬆️⬆️⬆️------------------------




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
<<<<<<< HEAD
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f3ee' }}>
      <StatusBar backgroundColor="#0c356a" barStyle="light-content" />

      <CartNavBar storeName="Bigbasket" />
      <View style={{flex:1}}>
=======
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#EB8633" barStyle="light-content" />

      <CartNavBar storeName="Bigbasket" />
      <BillingComponent totalBillAmount={totalBillAmount} />
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce
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
<<<<<<< HEAD
      </View>
     
      
      {cartItems.length > 0 ? (
        <>
<View style={{height:'500px'}}>



<View><BillingComponent totalBillAmount={totalBillAmount} /></View>
<View  style={{backgroundColor:'#fff',display:'flex',flexDirection:'row',justifyContent:'space-between'}}><TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignItems: 'center',
           
              backgroundColor: '#fc2c1e',
              paddingHorizontal: 20,
              // position: 'absolute',
              bottom: 0,
              width: '28%',
              borderColor: '#000',
              borderBottomWidth: 5,
              borderLeftWidth:0.5,
              borderRightWidth:2,
              borderRadius: 20,
              margin: 5,
              marginRight: 10,
              alignSelf: 'center',
              padding:10
            }}
            onPress={handleConfirmOrder}
          >
            <Text style={{ fontSize: 20, color: '#fff', fontFamily: 'DMSansSB' }}>CANCEL</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* HELLO */}{/* HELLO */}{/* HELLO */}{/* HELLO */}
              {/* <Text style={{ fontSize: 20, color: '#fea505', marginRight: 5, fontFamily: 'DMSansSB' }}></Text> */}
              {/* <Icon name="arrow-forward" size={30} color="black" /> */}
            </View>
          </TouchableOpacity>
          
=======
      {cartItems.length > 0 ? (
        <>
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
<<<<<<< HEAD
              // alignItems: 'center',
           
              backgroundColor: '#0c356a',
              paddingHorizontal: 20,
              // position: 'absolute',
              bottom: 0,
              // width: '100%',
              borderColor: '#fea505',
              borderBottomWidth: 5,
              borderLeftWidth:0.5,
              borderRightWidth:2,
              borderRadius: 20,
              margin: 5,
              marginRight: 10,
              alignSelf: 'center',
              padding:10,
              flex:1
            }}
            onPress={handleConfirmOrder}
          >
            <Text style={{ fontSize: 20, color: '#fea505', fontFamily: 'DMSansSB' }}>Pay</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#fea505', marginRight: 5, fontFamily: 'DMSansSB' }}>{`₹ ${totalBillAmount}`}</Text>
              <Icon name="arrow-forward" size={30} color="black" />
            </View>
          </TouchableOpacity>
          
          </View>
          
          </View>
=======
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
>>>>>>> 3edd26eab9b427cb1ce9dbe86d85556ed3e4d6ce
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
