import React from 'react';
import {  TextInput } from 'react-native';
import { View, Text, TouchableOpacity,StyleSheet, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component

const AddressNavBar2 = () => {
    
        const onPressHandler = () => {
          alert('Button pressed!');
        };

  return (
    <View>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#fff', height: '60px' }}>
      <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5 }}>
        <Icon name="arrow-back-outline" size={25} color="#EB8633" />
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', flexGrow: 2 }} >
        <Text style={{ fontSize: 15, color: 'black', fontWeight: '800', }}>French Apartments</Text>

      </TouchableOpacity>


    </View>

    

    {/* -----------------SEARCHBAR⬇️⬇️⬇️⬇️⬇️ ------------------------------- */}

    <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
            <View style={{ backgroundColor: '#f2f2f2', padding: 5,  shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5 ,paddingHorizontal:10}}>
                <Text style={{color:'rgb(64 91 123)',fontWeight:600,fontSize:12,marginTop:20}}>Tower/Block</Text>
                

                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10,  borderColor: '#858484', borderWidth: 1,alignItems:'center' }}>

                    {/* ------------------ TOWER Input Text⬇️⬇️⬇️ ---------------------- */}
                    <TextInput placeholder="eg: Tower 1,Block A" style={{ marginLeft: 5 ,color:'rgb(132 132 132)',width:'100%'}} />
                </View>

                <Text style={{color:'rgb(64 91 123)',fontWeight:600,fontSize:12,marginTop:50}}>Tower/Block</Text>
                

                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10,  borderColor: '#858484', borderWidth: 1,alignItems:'center' }}>
                    
                    {/* ------------------ Flat Input Text⬇️⬇️⬇️ ---------------------- */}
                    <TextInput placeholder="eg: 41" style={{ marginLeft: 5 ,color:'rgb(132 132 132)',width:'100%'}} />
                </View>
            </View>
    </View>


    {/* --------------------- BUTTON ⬇️⬇️⬇️----------------- */}
    
    <TouchableOpacity 
        style={{ 
          backgroundColor: '#EB8633', 
          padding: 10, 
          borderRadius: 10, 
          width: 200, 
          alignItems: 'center',
          alignSelf:'center',
          width:'90%',
          height:50,
          justifyContent:'center',
          marginTop:20
        }} 
        onPress={onPressHandler}
      >
        <Text style={{ color: 'white', fontSize: 15,alignSelf:'center' ,textAlignVertical:'center'}}>Save & Continue</Text>
      </TouchableOpacity>
    </View>

  );
};



export default AddressNavBar2;
