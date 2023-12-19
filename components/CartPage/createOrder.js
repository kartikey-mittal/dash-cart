import { Client, Databases } from 'appwrite';
import { useSelector } from 'react-redux';


const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');

// Initialize Databases instance
const databases = new Databases(client);



const createOrder = async (totalBillAmount, cartItems) => {
  try {
    // Replace 'your-orders-collection-id' with the actual ID of your OrdersDB collection
    const collectionId = 'OrdersDB';

    // Get the current user's information from the login reducer
    const { mobileNumber } = useSelector((state) => state.loginReducer.mobileNumber);

    // Generate a random 3-digit order ID
    const orderId = Math.floor(100 + Math.random() * 900);

    // Get the current user's society and city information from the login reducer
    // const { society, city } = getState().login;

    // Get the current date and time
    const orderCreated = new Date().toISOString();

    // Prepare the order items array
    const orderItems = cartItems.reduce((items, item) => {
      items[item.id] = item.quantity;
      return items;
    }, {});

    // Create the order document
    const orderDocument = {
      'Order-ID': `Order-${orderId}`,
      'Order-Value': totalBillAmount,
      'Store-ID': 'ST-5120',
      'User-ID': mobileNumber,
      'Order-Created': orderCreated,
      'Order-Items': orderItems,
      // Add any additional attributes if needed
    };

    // Make the request to create the order
    const response = await databases.createDocument('data-level-1',collectionId, orderDocument);

    // Log the response or handle success as needed
    console.log('Order created successfully:', response);
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

export default createOrder;
