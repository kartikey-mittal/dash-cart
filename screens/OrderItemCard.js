import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CIcon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import FontLoader from '../FontLoader';

const OrderItemCard = ({ productimg, productName, productWeight, originalPrice, discountedPrice, showDropdown, onAddClick, shopname,waitingbar }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      Alert.alert("Quantity cannot be less than zero");
    }
  };

  const handleAddClick = () => {
    setQuantity(1);
    if (showDropdown === 1 && onAddClick) {
      onAddClick();
    }
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: -5, borderWidth: 0.5, borderColor: "black", paddingHorizontal: 6, paddingVertical: -5, borderRadius: 10,backgroundColor:'transparent' }}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#e6c2bf" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5, fontFamily: "DMSansB" }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#e6c2bf" />
      </TouchableOpacity>
    </View>
  );

  const truncateShopName = (name) => {
    return name.length > 9 ? name.substring(0, 9) + '...' : name;
  };

  return (
    <FontLoader>
      {/* <SafeAreaView style={{ flex: 1, marginTop: 0 }}> */}
        <View style={{ height: 10 }}></View>
        <View style={{
          width: '95%',
          backgroundColor: 'white',
          borderRadius: 15,
          borderWidth: 0.5,
          flexDirection: 'row',
          alignSelf: "center"
        }}>
          <View style={{
            height: 100,
            width: '25%',
            marginLeft: 10
          }}>
            <Image 
              source={{ uri: productimg }} 
              style={{ 
                width: '80%', 
                height: '100%', 
                resizeMode: 'cover', 
                borderRadius: 15,
                marginTop: 10
              }} 
            />
          </View>
          <View style={{
            height: 120,
            width: '65%',
            borderRadius: 15,
            borderWidth: 0,
            flexDirection: 'column',
            alignSelf: "center",
            marginLeft: 0,
            justifyContent: "center",
          
          }}>
            <Text style={{ fontFamily: "DMSansSB", fontSize: 16, color: '#454545',marginTop:5, }}>{productName}</Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 0, justifyContent: "space-between",backgroundColor:'transparent' ,width:'100%'}}>
              <View style={{flex:1,backgroundColor:'transparent',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{
                  backgroundColor: "#F9EFE8",
                  marginTop: 0,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 5,
                 
                  color: '#949494',
                  fontFamily: 'DMSans',
                  fontSize:13
                 
                }}>
                  {productWeight}
                </Text>
                {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginRight:0}}>
                <CIcon name="close" size={20} color="#00356A" style={{}} />
                <Text style={{backgroundColor:'#000125',color:'white',fontFamily:'DMSansB',paddingHorizontal:8,borderRadius:5,fontSize:18}}>2</Text></View> */}
              </View>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center',marginRight:0}}>
                <CIcon name="close" size={20} color="#00356A" style={{}} />
                <Text style={{backgroundColor:'#000125',color:'white',fontFamily:'DMSansB',paddingHorizontal:8,borderRadius:5,fontSize:18}}>2</Text></View>
              
              <View style={{ marginLeft: 10 ,marginTop:2,marginBottom:0}}>
              <Icon2 name="notebook-edit-outline" size={20} color="white" style={{backgroundColor:'#f26d50',borderRadius:100,padding:5,marginBottom:5}}/>
              </View>
              </View>
              
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 0, justifyContent: "space-between",backgroundColor:'transparent' }}>
              <View style={{ display: "flex", flexDirection: "column", marginTop: 2,flex:1,backgroundColor:'transparent' }}>
              <Text style={{ fontSize: 17, marginBottom: 0, color: '#474747', fontFamily: 'DMSansSB' }}>{discountedPrice}</Text>
                <Text style={{
                  marginRight: 0,
                  textDecorationLine: "line-through",
                  marginTop: 0,
                  color: "#949494",
                  fontFamily: 'DMSans',
                  fontSize: 13,
                  marginBottom:2
                }}>
                  {originalPrice}
                </Text>
                
              </View>
              
              <View style={{ display: "flex", flexDirection: "column",marginLeft:0,marginBottom:2,marginTop:10,width:100,marginLeft:0,backgroundColor:'transparent',justifyContent:'flex-start' }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8f9fa", borderTopRightRadius: 8, borderTopLeftRadius: 8, paddingHorizontal: 5, paddingVertical: 3 ,width:"85%",borderColor:'#00356A',borderTopWidth:0.5,borderLeftWidth:0.5,borderRightWidth:0.5,borderBottomLeftRadius:8,borderBottomWidth:0.5,borderBottomRightRadius:8,alignSelf:'flex-end',justifyContent:'center'}}>
                  <Text style={{ color: "#112252", fontFamily: "DMSans", textAlign: "left",fontSize:12 }}>
                    {truncateShopName(shopname)}
                  </Text>
                  
                </View>
                {/* <View style={{ backgroundColor: "#7B3C15", height: 5, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 ,width:"85%",borderBottomWidth:0.5,borderColor:"#00356A",borderLeftWidth:0.5,borderRightWidth:0.5,alignSelf:'flex-end'}}>
                 
                </View> */}
              </View>
            </View>
          </View>
        </View>
      {/* </SafeAreaView> */}
    </FontLoader>
  );
};

export default OrderItemCard;
