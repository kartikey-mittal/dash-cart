import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontLoader from '../../FontLoader';

const GlobalSearchCard = ({ productimg, productName, productWeight, originalPrice, discountedPrice, showDropdown, onAddClick, shopname }) => {
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
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10, borderWidth: 0.5, borderColor: "black", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 }}>
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
      <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
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
            width: '28%',
            marginLeft: 10
          }}>
            <Image 
              source={{ uri: productimg }} 
              style={{ 
                width: '70%', 
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
            justifyContent: "center"
          }}>
            <Text style={{ fontFamily: "DMSansSB", fontSize: 16, color: '#454545' }}>{productName}</Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
              <View>
                <Text style={{
                  backgroundColor: "#F9EFE8",
                  marginTop: 5,
                  paddingHorizontal: 8,
                  paddingVertical: 1,
                  borderRadius: 5,
                  alignSelf: 'flex-start',
                  color: '#949494',
                  fontFamily: 'DMSans'
                }}>
                  {productWeight}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "column",marginLeft:85,marginBottom:5 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6e7", borderTopRightRadius: 5, borderTopLeftRadius: 5, paddingHorizontal: 15, paddingVertical: 5 ,width:"80%"}}>
                  <Text style={{ color: "#385aeb", fontFamily: "DMSans", textAlign: "left" }}>
                    {truncateShopName(shopname)}
                  </Text>
                  <TouchableOpacity style={{ padding:1 }}>
                    <MaterialIcons name="add-circle-outline" size={22} color="#949494" style={{ marginLeft: 10, borderWidth: 0 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "#7b3c15", height: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 ,width:"80%"}}>
                  <View style={{ backgroundColor: "#9dcd5a", width: "50%", height: "100%", borderBottomLeftRadius: 5 }}></View>
                </View>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 0, justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                <Text style={{
                  marginRight: 10,
                  textDecorationLine: "line-through",
                  marginTop: 3,
                  color: "#949494",
                  fontFamily: 'DMSans',
                  fontSize: 12
                }}>
                  {originalPrice}
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10, color: '#474747', fontFamily: 'DMSansSB' }}>{discountedPrice}</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                {
                  quantity === 0 ? (
                    <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 3 }}>
                      <View style={{ borderRadius: 10, padding: 0, alignItems: 'center', justifyContent: "center", height: 30, backgroundColor: "#f4f3ee", paddingHorizontal: 20, display: "flex", flexDirection: "row", borderColor: '#00356A', borderWidth: 1 }}>
                        <Text style={{ color: '#00356A', fontSize: 14, fontFamily: "DMSansB", paddingHorizontal: 10 }}>ADD</Text>
                        {showDropdown === 1 && <Icon name="chevron-down-outline" size={20} color="#e6c2bf" />}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 0, marginRight: 10 }}>
                      {renderCounterButtons()}
                    </View>
                  )
                }
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </FontLoader>
  );
};

export default GlobalSearchCard;