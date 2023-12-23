import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const BillingComponent = ({ cart,totalBillAmount }) => {
    // const mrp = cart.reduce((total, item) => total + item.mrp, 0);
    // const billAmount = cart.reduce((total, item) => total + item.price, 0);
    const mrp = 50;
    const billAmount = 50;
    const deliveryFee = billAmount >= 500 ? 'FREE' : 'FREE';

    return (
        <View style={{ paddingLeft: 50, paddingRight: 50, backgroundColor: '#EB8633' }}>
            {/* <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Cart</Text> */}
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>3 items</Text>
            <View style={{ height: 1, width: '100%', backgroundColor: 'grey', marginTop: 10, marginLeft: 5 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, color: 'white', }}>
                <Text style={{ color: 'white' }}>M.R.P. Total</Text>
                <Text style={{ color: 'white' }}>{`₹${totalBillAmount}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ color: 'white' }}>Delivery Fee</Text>
                <Text style={{ color: 'white' }}>{deliveryFee}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginBottom: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Bill Amount</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#20f495' }}>{`₹${totalBillAmount}`}</Text>
            </View>
        </View >


    );
};

export default BillingComponent;
