import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontLoader from '../FontLoader';

const TestCard = ({ productimg, productName, productWeight, originalPrice, discountedPrice, showDropdown, onAddClick, }) => {
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
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: -20,marginBottom:-12,borderWidth: 0.5, borderColor: "black", paddingHorizontal: 6, paddingVertical: 0, borderRadius: 10,backgroundColor:'transparent' }}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#e6c2bf" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5, fontFamily: "DMSansB" }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#e6c2bf" />
      </TouchableOpacity>
    </View>
  );

  

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
              <View style={{width:'40%',backgroundColor:'transparent'}}>
                <Text style={{
                  backgroundColor: "#F9EFE8",
                  marginTop: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 0,
                  borderRadius: 5,
                  alignSelf: 'flex-start',
                  color: '#949494',
                  fontFamily: 'DMSans',
                  fontSize:13
                 
                }}>
                  {productWeight}
                </Text>
              </View>
              <View style={{ marginLeft: 10 ,marginTop:25,marginBottom:5,backgroundColor:'transparent'}}>
                {
                  quantity === 0 ? (
                    <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 3,marginTop:5 }}>
                      <View style={{ borderRadius: 10, padding: 0, alignItems: 'center', justifyContent: "center", height: 30, backgroundColor: "#f4f3ee", paddingHorizontal: 20, display: "flex", flexDirection: "row", borderColor: '#00356A', borderWidth: 1 }}>
                        <Text style={{ color: '#00356A', fontSize: 14, fontFamily: "DMSansB", paddingHorizontal: 10 }}>ADD</Text>
                        {showDropdown === 1 && <Icon name="chevron-down-outline" size={20} color="#e6c2bf" />}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: -15, marginRight: 10,backgroundColor:'transparent',paddingVertical:10 }}>
                      {renderCounterButtons()}
                    </View>
                  )
                }
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 0, justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "column", marginTop: 2,flex:1,backgroundColor:'transparent' }}>
              <Text style={{ fontSize: 17, marginBottom: 0, color: '#474747', fontFamily: 'DMSansSB' }}>{discountedPrice}</Text>
                <Text style={{
                  marginRight: 10,
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
             
            </View>
          </View>
        </View>
      {/* </SafeAreaView> */}
    </FontLoader>
  );
};

export default TestCard;
