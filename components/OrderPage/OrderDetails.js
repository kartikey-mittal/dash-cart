import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const OrderDetails = () => {
  return (
   <View>
    {/* Delivery Details Section*/}
    <Text style={{margin:5,color:'#ababab',fontSize:15,fontWeight:500,marginTop:15}}>Delivery Details</Text>
    <View style={{backgroundColor:'white',width:'100%',height:120}}>
    </View>
    
    {/* Address Section*/}
    <Text style={{margin:5,color:'#ababab',fontSize:15,marginTop:20,fontWeight:500}}>Address </Text>
    <View style={{backgroundColor:'white',width:'100%',height:120}}>
    </View>

     {/* Payment Section*/}
     <Text style={{margin:5,color:'#ababab',fontSize:15,marginTop:20,fontWeight:500}}>Payment Details</Text>
    <View style={{backgroundColor:'white',width:'100%',height:120}}>
    </View>


   </View>
  );
};

export default OrderDetails;
