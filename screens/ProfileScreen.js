import React, { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import FontLoader from "../FontLoader";
import BottomNavBar from "../components/BottomNavBar";

const ProfileScreen = () => {
  return (
    <FontLoader>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent",height:'100vh' }}>
        <StatusBar backgroundColor="#0c356a" barStyle="light-content" />
        <View style={{height:'100vh',backgroundColor:'transparent'}}>
        <View
          style={{ padding: 10, backgroundColor: "#0c356a", paddingLeft: 10, }}
        >
          <Text
            style={{    
              color: "white",
              fontFamily: "DMSansSB",
              fontSize: 25,
              marginTop: 5,
              marginBottom: 8,
            }}
          >
           
            Kartikey Mittal
          </Text>
          <Text
            style={{ color: "#F4F3EE", fontFamily: "DMSansSB", fontSize: 18 }}
          >
            8076940848
          </Text>

          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              padding: 5,
              justifyContent: "space-between",
              marginTop: 5,
              backgroundColor: "#FAC172",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "DMSansSB",
                fontSize: 18,
                marginLeft: 5,
              }}
            >
              A-1401,French Apartment,Noida
            </Text>
            <Icon
              name="home-edit"
              size={20}
              style={{
                backgroundColor: "#de8408",
                borderRadius: 50,
                padding: 2,
              }}
              color="#f3f3f3"
            />
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Align items vertically center
            }}
          >
            <Icon1
              name="box-open"
              size={25}
              style={{ marginRight: 10 }}
              color="#A9B6C6"
            />
            <Text
              style={{ color: "#454545", fontFamily: "DMSans", fontSize: 15 ,width:'85%' }}
            >
              
              My Order
            </Text>
            <Icon1
              name="chevron-right"
              size={25}
              style={{ marginRight: 10 }}
              color="#C5DED8"
            />
          </View>
        </View>

{/* ---------------------------- 2nd Card */}
        <View>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Align items vertically center
            }}
          >
            <View style={{display: "flex",
              flexDirection: "row",
              alignItems: "center",paddingVertical:5 }}>
            <Icon2
              name="chat"
              size={25}
              style={{ marginRight: 10 }}
              color="#A9B6C6"
            />
            <Text
              style={{ color: "#454545", fontFamily: "DMSans", fontSize: 15 ,width:'85%' }}
            >
              
              Help
            </Text>
            <Icon1
              name="chevron-right"
              size={25}
              style={{ marginRight: 10 }}
              color="#C5DED8"
            />
          </View>
          <View style={{backgroundColor:'#f4e3e2',width:'95%',marginVertical:5,padding:1}}></View>
          <View style={{display: "flex",
              flexDirection: "row",
              alignItems: "center",paddingVertical:10  }}>
            <Icon
              name="file-compare"
              size={25}
              style={{ marginRight: 10 }}
              color="#A9B6C6"
            />
            <Text
              style={{ color: "#454545", fontFamily: "DMSans", fontSize: 15
               ,width:'85%' }}
            >
              
              Terms and Condition
            </Text>
            <Icon1
              name="chevron-right"
              size={25}
              style={{ marginRight: 10 }}
              color="#C5DED8"
            />
          </View>
          </View>
          
        </View>

        {/* -------------------------------3rd card */}
        <View>
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              marginHorizontal: 10,
              borderRadius: 10,
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Align items vertically center
            }}
          >
            <Icon1
              name="sign-out-alt"
              size={25}
              style={{ marginRight: 10 }}
              color="#A9B6C6"
            />
            <Text
              style={{ color: "#454545", fontFamily: "DMSans", fontSize: 15 ,width:'85%' }}
            >
              
             LogOut
            </Text>
            <Icon1
              name="chevron-right"
              size={25}
              style={{ marginRight: 10 }}
              color="#C5DED8"
            />
          </View>
        </View>
       
        </View>
      </SafeAreaView>
    </FontLoader>
  );
};

export default ProfileScreen;
