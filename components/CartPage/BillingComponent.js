import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const BillingComponent = ({ cart,totalBillAmount }) => {
    // const mrp = cart.reduce((total, item) => total + item.mrp, 0);
    // const billAmount = cart.reduce((total, item) => total + item.price, 0);
    const mrp = 50;
    const billAmount = 50;
    const deliveryFee = billAmount >= 500 ? 'FREE' : 'FREE';

    return (
        <FontLoader>
        <View style={{ paddingLeft: 50, paddingRight: 50, backgroundColor: '#EB8633' }}>
            {/* <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Cart</Text> */}
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#000522',fontFamily:"DMSansB" }}>3 items</Text>
            <View style={{ height: 1, width: '100%', backgroundColor: '#f3f3f3', marginTop: 10, marginLeft: 5 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, color: 'white', }}>
                <Text style={{ color: '#1C2833', fontFamily:"DMSansSB"}}>M.R.P. Total</Text>
                <Text style={{ color: 'white', fontFamily:"DMSansB"}}>{`₹ ${totalBillAmount}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Text style={{ color: '#1C2833',fontFamily:"DMSansSB" }}>Delivery Fee</Text>
                <Text style={{ color: 'white' ,fontFamily:"DMSansB"}}>{deliveryFee}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7, marginBottom: 3 }}>
                <Text style={{ fontSize: 18,  color: 'white' ,fontFamily:"DMSansB"}}>Bill Amount</Text>
                <Text style={{ fontSize: 18,  color: '#20f495',fontFamily:"DMSansB" }}>{`₹ ${totalBillAmount}`}</Text>
            </View>
        </View >
        </FontLoader>


    );
};

export default BillingComponent;
