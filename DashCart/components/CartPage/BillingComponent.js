import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const BillingComponent = ({ cart }) => {
    // const mrp = cart.reduce((total, item) => total + item.mrp, 0);
    // const billAmount = cart.reduce((total, item) => total + item.price, 0);
    const mrp = 50;
    const billAmount = 25;
    const deliveryFee = billAmount >= 500 ? 'FREE' : '$10';

    return (
        <View style={{ paddingLeft: 50, paddingRight: 50, backgroundColor: '#0a5098' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' ,fontFamily:'DMSans'}}>Cart</Text>
            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white',fontFamily:'DMSans' }}>3 items</Text>
            <View style={{ height: 1, width: '100%', backgroundColor: 'grey', marginTop: 10, marginLeft: 5 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, color: 'white', }}>
                <Text style={{ color: 'white' ,fontFamily:'DMSans'}}>M.R.P. Total</Text>
                <Text style={{ color: 'white' ,fontFamily:'DMSans'}}>{`$${mrp}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ color: 'white' ,fontFamily:'DMSans'}}>Delivery Fee</Text>
                <Text style={{ color: 'white' ,fontFamily:'DMSans'}}>{deliveryFee}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginBottom: 3 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' ,fontFamily:'DMSans'}}>Bill Amount</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#20f495' ,fontFamily:'DMSans'}}>{`$${billAmount}`}</Text>
            </View>
        </View >


    );
};

export default BillingComponent;
