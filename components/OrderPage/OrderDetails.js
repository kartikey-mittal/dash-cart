import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const OrderDetails = () => {
  // Sample order details
  const deliveryDetails = {
    deliveryDate: 'Tue December 25, 2023',
    deliveryTime: 'Arrives in: 28 minutes',
    orderstatus: 'Complete',
  };

  const addressDetails = {
    name: 'Mittal',
    address: 'J K Chambers Sector 17 Vashi, Mumbai, Noida, 400703, India',
    phoneNumber: '1234567890',
  };

  const paymentDetails = {
    orderno: 'TBN-1234565432-09876',
    paymentoption: 'UPI',
    orderitems: '1 item',
    Subtotal: 'Rs 120',
    delcharges: 'Rs 0',
    RedemedNeucoins: 'Rs 3.16',
    total: 'Rs 116.84',
  };

  return (
    <View style={styles.container}>
      {/* Delivery Details Section*/}
      <Text style={styles.mainHead}>Delivery Details</Text>
      <View style={styles.section}>
        <Text style={styles.text}>{deliveryDetails.deliveryDate}</Text>
        <Text style={styles.text}>{deliveryDetails.deliveryTime}</Text>
        <Text style={styles.text}>{deliveryDetails.orderstatus}</Text>
      </View>

      {/* Address Section*/}
      <Text style={styles.mainHead}>Address</Text>
      <View style={styles.section}>
        <Text style={styles.text}>{addressDetails.name}</Text>
        <Text style={styles.text}>{addressDetails.address}</Text>
        <Text style={styles.text}>
        <Ionicons name="ios-call" size={18} color="grey" />{addressDetails.phoneNumber}</Text>
      </View>

      {/* Payment Section*/}
      <Text style={styles.mainHead}>Payment Details</Text>
      <View style={[styles.section, styles.paymentSection]}>
        <View style={styles.leftColumn}>
          <Text style={styles.text}>Order No:</Text>
          <Text style={styles.text}>Payment Option:</Text>
          <Text style={styles.text}>Order items:</Text>
          <Text style={styles.text}>Sub total:</Text>
          <Text style={styles.text}>Delivery Charges:</Text>
          <Text style={[styles.text]}>Redeemed NeuCoins:</Text>
          <Text style={[styles.text, styles.blackText]}>Total:</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.text}>{paymentDetails.orderno}</Text>
          <Text style={styles.text}>{paymentDetails.paymentoption}</Text>
          <Text style={styles.text}>{paymentDetails.orderitems}</Text>
          <Text style={[styles.text,styles.blackText]}>{paymentDetails.Subtotal}</Text>
          <Text style={[styles.text,styles.blackText]}>{paymentDetails.delcharges}</Text>
          <Text style={[styles.text,styles.blackText]}>{paymentDetails.RedemedNeucoins}</Text>
          <Text style={[styles.text, styles.goldenText]}>{paymentDetails.total}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  mainHead: {
    color: 'grey',
    marginBottom: 8,
  },
  text: {
    marginVertical: 2,
    marginHorizontal: 2,
    color: 'grey',
  },
  section: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftColumn: {
    flex: 1,
    backgroundColor: 'white',
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  goldenText: {
    color: '#DAA520',
    fontWeight:"700" // Golden color
  },
  blackText: {
    color: 'black',
    fontWeight:"500"
  },
});

export default OrderDetails;
