import React from 'react';
import { View } from 'react-native';

import { SafeAreaView, StatusBar } from 'react-native';
import AddressNavBar from '../Components/AddressNavBar';
import AddressNavBar2 from '../Components/AddressNavbar2';




const Delivery = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            
<AddressNavBar/>
<AddressNavBar2/>


            {/* Rest of your screen components go here */}
        </SafeAreaView>
    );
};

export default Delivery;