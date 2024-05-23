import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // replace with your actual icon component
import FontLoader from "../../FontLoader";

const BillingComponent = ({ cart, totalBillAmount }) => {
  // const mrp = cart.reduce((total, item) => total + item.mrp, 0);
  // const billAmount = cart.reduce((total, item) => total + item.price, 0);
  const mrp = 50;
  const billAmount = 50;
  const deliveryFee = billAmount >= 500 ? "FREE" : "FREE";

  return (
    <FontLoader>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "#fff",
          marginLeft: 0,
          marginRight: 0,
          borderRadius: 0,
          marginTop: 0,
           
            borderColor:'#eadfb4',
            borderTopWidth:0.5,
            borderLeftWidth:0.5,
            borderRightWidth:0.5,
            // borderRadius:10
        //   elevation: 15, // Elevation for shadow on Android
        //   shadowColor: "#000", // Shadow properties for iOS
        //   shadowOffset: { width: 0, height: -10 }, // Negative height for top shadow
        //   shadowOpacity: 0.25,
        //   shadowRadius: 3.84,
          // overflow: 'hidden' // Ensure the content doesn't overflow the rounded corners
        }}
      >
        {/* <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Cart</Text> */}
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "#2e2d33",
            fontFamily: "DMSansB",
            marginTop:5
          }}
        >
          3 items
        </Text>
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#000",
            marginTop: 10,
            marginLeft: 5,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
            color: "white",
          }}
        >
          <Text style={{ color: "#a09486", fontFamily: "DMSansSB" }}>
            M.R.P. Total
          </Text>
          <Text
            style={{ color: "#363636", fontFamily: "DMSansSB" }}
          >{`₹ ${totalBillAmount}`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#a09486", fontFamily: "DMSansSB" }}>
            Delivery Fee
          </Text>
          <Text style={{ color: "#eb5353", fontFamily: "DMSansSB" }}>
            {deliveryFee}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 7,
            marginBottom: 3,
          }}
        >
          <Text
            style={{ fontSize: 15, color: "#2e2d33", fontFamily: "DMSansB" }}
          >
            Total Pay
          </Text>
          <Text
            style={{ fontSize: 18, color: "#0c356a", fontFamily: "DMSansB" }}
          >{`₹ ${totalBillAmount}`}</Text>
        </View>
      </View>
    </FontLoader>
  );
};

export default BillingComponent;
