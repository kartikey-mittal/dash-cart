import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import FontLoader from '../FontLoader';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TestCard = ({ productName, productWeight, originalPrice, discountedPrice, showDropdown }) => {

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
    Alert.alert('ADD button clicked');
    setQuantity(1);
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10, borderWidth: 1, borderColor: "black", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 }}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 1 }}>
        <MaterialIcons name="remove" size={22} color="#EB8633" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5, fontFamily: "DMSansB" }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 1 }}>
        <MaterialIcons name="add" size={22} color="#EB8633" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FontLoader>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 50 }}></View>

        <View style={{
          height: 120,
          width: '90%',
          backgroundColor: 'white',
          borderRadius: 15,
          borderWidth: 0.5,
          flexDirection: 'row',
          alignSelf: "center"
        }}>
          <View style={{
            height: 100,
            width: '28%',
            backgroundColor: '#F4F3EE',
            borderRadius: 15,
            borderWidth: 0,
            flexDirection: 'row',
            alignSelf: "center",
            marginLeft: 10
          }}></View>
          <View style={{
            height: 120,
            width: '65%',
            borderRadius: 15,
            borderWidth: 0,
            flexDirection: 'column',
            alignSelf: "center",
            marginLeft: 15,
            justifyContent: "center"
          }}>
            <Text style={{ fontFamily: "DMSansSB", fontSize: 16 ,color:'#454545'}}>{productName}</Text>
            <Text style={{
              backgroundColor: "#F9EFE8",
              marginTop: 2,
              paddingHorizontal: 8,
              paddingVertical: 1,
              borderRadius: 5,
              alignSelf: 'flex-start',
              color:'#949494',
              fontFamily:'DMSans'
            }}>
              {productWeight}
            </Text>

            <View style={{ display: "flex", flexDirection: "row", marginTop: 0, justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                <Text style={{
                  marginRight: 10,
                  textDecorationLine: "line-through",
                  marginTop: 3,
                  color: "#949494",
                  fontFamily:'DMSans',
                  fontSize:12
                }}>
                  {originalPrice}
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10 ,color:'#474747',fontFamily:'DMSansSB'}}>{discountedPrice}</Text>
              </View>

              <View style={{ marginLeft: 10 }}>
                {showDropdown === 1 ? (
                  quantity === 0 ? (
                    <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                      <View style={{ borderRadius: 5, padding: 0, alignItems: 'center', justifyContent: "center", height: 30, backgroundColor: "#EEF7FF",  paddingHorizontal: 7, display: "flex", flexDirection: "row",borderColor:'##00356A',borderWidth:0.2 }}>
                        <Text style={{ color: '#153448', fontSize: 14, fontFamily: "DMSansB" ,paddingHorizontal:5}}>ADD</Text>
                        <Icon name="chevron-down-outline" size={20} color="pink" />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10, marginRight: 10 }}>
                      {renderCounterButtons()}
                    </View>
                  )
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </FontLoader>
  );
};

export default TestCard;
