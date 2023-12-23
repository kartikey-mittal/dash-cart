import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert,SafeAreaView,StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setUserEmail } from '../../redux/actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FontLoader from '../../FontLoader';

const NameScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Retrieve values from the Redux store
    const userNameFromStore = useSelector((state) => state.loginReducer.userName);
    const userEmailFromStore = useSelector((state) => state.loginReducer.userEmail);

    const handleSaveAndContinue = () => {
        if (name.trim() === '' || email.trim() === '') {
            // Show an error message if any of the fields is empty
            Alert.alert('Error', 'Please fill in all fields.');
        } else {
            // Dispatch actions to set name and email in the Redux store
            dispatch(setUserName(name));
            dispatch(setUserEmail(email));
            navigation.navigate('CityScreen');
        }
    };

    // Log the values from the Redux store whenever the component re-renders
    console.log('UserName from Redux store:', userNameFromStore);
    console.log('UserEmail from Redux store:', userEmailFromStore);
    return (
        <FontLoader>
        <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#fff', height: '60px' }}>
                <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5 }}>
                    <Icon name="arrow-back-outline" size={25} color="#EB8633" />
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', flexGrow: 2 }} >
                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '800' }}>Enter details</Text>
                </TouchableOpacity>
            </View>

            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                <View style={{ backgroundColor: '#f2f2f2', padding: 5, shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5, paddingHorizontal: 10 }}>
                    <Text style={{ color: 'rgb(64 91 123)', fontWeight: 600, fontSize: 12, marginTop: 20 }}>Name</Text>

                    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: '#858484', borderWidth: 1, alignItems: 'center' }}>
                        <TextInput
                            placeholder="Your good name? 😀"
                            style={{ marginLeft: 5, color: 'rgb(132 132 132)', width: '100%' }}
                            onChangeText={(text) => setName(text.replace(/\b\w/g, (l) => l.toUpperCase()))}
                            value={name}
                        />
                    </View>

                    <Text style={{ color: 'rgb(64 91 123)', fontWeight: 600, fontSize: 12, marginTop: 50 }}>Email</Text>

                    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: '#858484', borderWidth: 1, alignItems: 'center' }}>
                        <TextInput
                            placeholder="We won't spam 😅"
                            style={{ marginLeft: 5, color: 'rgb(132 132 132)', width: '100%' }}
                            onChangeText={(text) => setEmail(text)} // Set the entered email
                            keyboardType="email-address"
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#EB8633',
                    padding: 10,
                    borderRadius: 10,
                    width: 200,
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '90%',
                    height: 50,
                    justifyContent: 'center',
                    marginTop: 20,

                }}

                onPress={handleSaveAndContinue} // Call the function when the button is pressed
            >
                <Text style={{ color: 'white', fontSize: 15, alignSelf: 'center', textAlignVertical: 'center' }}>Save & Continue</Text>
            </TouchableOpacity>


        </View>
        </SafeAreaView>
        </FontLoader>
    );
};

export default NameScreen;