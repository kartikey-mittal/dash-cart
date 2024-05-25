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
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

import SideMenu from '../components/SideMenu';
import { MenuProvider } from '../components/MenuContext';
import { TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontLoader from '../FontLoader';


const HomeScreen = () => {

    const loginData = useSelector((state) => state.loginReducer);
    const [userCity, setUserCity] = useState("");
    const [societyId, setSocietyId] = useState("");
    const [userName, setUserName] = useState("");


    useEffect(() => {
      // Display an alert with the data from the loginReducer
      Alert.alert(
        'Login Data',
        `Mobile Number: ${loginData.mobileNumber}\nSociety: ${loginData.society.societyName}\nBlock No: ${loginData.blockNo}\nFlat No: ${loginData.flatNo}\nName: ${loginData.userName}\nEmail: ${loginData.userEmail}`,
      );
    }, [loginData]);

    // -------------------------------AsyncStorage [UserData]----------------------------
    useEffect(() => {
      // Fetch the user data from AsyncStorage
      const fetchUserData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserData');
          const data = jsonValue != null ? JSON.parse(jsonValue) : null;
  
          // Access specific fields
          console.log('User-Name:', data['User-Name']);
          console.log('User-Email:', data['User-Email']);
          console.log('User-City:', data['User-SocietyCode']);
          
        // Set User-City in state
        setUserCity(data['User-City']);
        setSocietyId(data['User-SocietyCode'])
        setUserName(data['User-Name'])

        } catch (e) {
          // error reading value
          console.log(e);
        }
      };
  
      fetchUserData();
    }, []);
    // -------------------------------AsyncStorage [UserData] Closed-------------------------
    return (
      <FontLoader>
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="#0c356a" barStyle="light-content" />
            <MenuProvider>
            
                {/* <SideMenu username={userName}/> */}
                
            <NavBar cityName={userCity} />
            <SearchBar />
            <ScrollView style={{backgroundColor:'#f4f3ee'}}>
           
            <Category1/>
            <StoresNear societyId={societyId}/>
            </ScrollView>
            
            </MenuProvider>


            {/* Rest of your screen components go here */}
        </SafeAreaView>
        </FontLoader>
    );
};

export default HomeScreen;
// commit testing