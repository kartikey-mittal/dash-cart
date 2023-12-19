import React from 'react';
import { TextInput } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const AddressNavBar = ({ onSocietyChange }) => {
  const [societyName, setSocietyName] = useState('');
  const handleSocietyChange = (text) => {
    setSocietyName(text);
    onSocietyChange(text); // Callback to pass the value to the parent component (Delivery.js)
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 1, backgroundColor: '#fff', height: '60px' }}>
        <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, margin: 5 }}>
          <Icon name="arrow-back-outline" size={25} color="#EB8633" />
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', flexGrow: 2 }} >
          <Text style={{ fontSize: 15, color: 'black', fontWeight: '800' }}>Select Delivery Location</Text>
        </TouchableOpacity>
      </View>

      {/* -----------------SEARCHBAR⬇️⬇️⬇️⬇️⬇️ ------------------------------- */}
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={{ backgroundColor: 'white', padding: 5, shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, borderColor: '#858484', borderWidth: 1, alignItems: 'center' }}>
            <Icon name="search" size={20} color="black" />
            <TextInput
              placeholder="Search for your society"
              style={{ marginLeft: 10 }}
              onChangeText={handleSocietyChange}
              value={societyName}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressNavBar;
