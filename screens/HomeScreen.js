import React, { useContext }  from 'react';
import { View } from 'react-native';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import { SafeAreaView, StatusBar } from 'react-native';
import CategoryComponent from '../components/Category';
import StoresNear from '../components/StoresNear';
import StoreCard from '../components/StoreCard';
import Category1 from '../components/Category1';
import { ScrollView ,Alert} from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SideMenu from '../components/SideMenu';
import { MenuProvider } from '../components/MenuContext';
import { TouchableWithoutFeedback } from 'react-native';


const HomeScreen = () => {

    const loginData = useSelector((state) => state.loginReducer);

    useEffect(() => {
      // Display an alert with the data from the loginReducer
      Alert.alert(
        'Login Data',
        `Mobile Number: ${loginData.mobileNumber}\nSociety: ${loginData.society.societyName}\nBlock No: ${loginData.blockNo}\nFlat No: ${loginData.flatNo}`,
      );
    }, [loginData]);
    
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#EB8633" barStyle="light-content" />
            <MenuProvider>
            
                <SideMenu/>
                
            <NavBar />
            <SearchBar />
            <ScrollView style={{backgroundColor:'#f2f2f2'}}>
           
            <Category1/>
            <StoresNear />
            </ScrollView>
            
            </MenuProvider>


            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default HomeScreen;
// commit testing