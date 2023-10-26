import React, { useState } from "react";

import {
        View,
        StyleSheet,
        Text,
        TouchableOpacity,
        TextInput,
        Alert
} from "react-native";

const LoginScreen = () => {
        const [phoneNumber, setPhoneNumber] = useState("");

        const handleInput = (text) => {
                // You can add your own validation here if needed
                setPhoneNumber(text);
        };

        const handleSubmit = () => {
                // You can perform further actions with the phone number here
                Alert.alert("Submitted", `+91 ${phoneNumber}`);
        };

        return (
                <View style={styles.full}>
                        <View style={styles.container}>
                                <Text style={styles.heading}>
                                        Let's start with your mobile number
                                </Text>
                                <Text style={styles.subheading}>
                                        We'll send a text with a Verification
                                        code.
                                </Text>
                                <View style={styles.buttons}>
                                        <View style={styles.btn1}>
                                                <Text style={styles.btnouttxt}>
                                                        Enter Mobile No.
                                                </Text>
                                                <TextInput
                                                        style={styles.button}
                                                        placeholder="Enter your mobile number"
                                                        keyboardType="numeric"
                                                        onChangeText={
                                                                handleInput
                                                        }
                                                        value={phoneNumber}
                                                />
                                        </View>
                                        <View style={styles.btn2}>
                                                <Text style={styles.btnouttxt}>
                                                        Enter OTP
                                                </Text>
                                                <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={() => {}}
                                                >
                                                        <View
                                                                style={
                                                                        styles.doingflex
                                                                }
                                                        >
                                                                <Text
                                                                        style={
                                                                                styles.btntxt
                                                                        }
                                                                >
                                                                        1234
                                                                </Text>
                                                        </View>
                                                </TouchableOpacity>
                                        </View>
                                </View>
                                <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
                                        <Text style={styles.submittxt}>
                                                Submit
                                        </Text>
                                </TouchableOpacity>
                        </View>
                </View>
        );
};

const styles = StyleSheet.create({
        full: {
                width: "100%",
                height: "100%",
                backgroundColor: "#F6F6F6",
        },
        container: {
                width: "80%",
                marginHorizontal: 10,
                height: "50%",
                alignSelf: "center",

                marginTop: 80,
        },
        heading: {
                fontSize: 28,

                color: "#0A5098",
                fontWeight: "900",
                lineHeight: 40,
        },
        subheading: {
                fontSize: 18,
                width: "70%",
                marginLeft: 7,
                color: "#989BA4",
                fontWeight: "600",
                lineHeight: 25,
                color: "gray",
                marginTop: 20,
        },
        buttons: {
                marginTop: 50,
        },
        button: {
                width: "100%",
                height: 52,
                backgroundColor: "white",
                borderWidth: 1,
                marginTop: 5,
                borderRadius: 6,
                paddingLeft:15,
                color:"black",
                fontWeight:"600"
        },
        btnouttxt: {
                color: "#0A5098",
                fontWeight: "500",
        },
        btn2: {
                marginTop: 40,
        },
        doingflex: {
                flex: 1,

                justifyContent: "center",
        },
        btntxt: {
                fontWeight: "600",
        },
        submitbtn: {
                width: 110,
                height: 45,
                backgroundColor: "#2C64F4",
                alignSelf: "center",
                marginTop: 60,
                borderRadius: 30,
        },
        submittxt: {
                textAlign: "center",
                paddingTop: 10,
                color: "white",
        },
});

export default LoginScreen;
