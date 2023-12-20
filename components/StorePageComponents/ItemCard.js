import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/actions';

const ItemCard = ({ id, title, price, discountPrice, image }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('500gms');
  const [quantity, setQuantity] = useState(0);

  const handleDropdownClick = () => setShowDropdown(!showDropdown);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleIncrement = () => setQuantity((prevQuantity) => prevQuantity + 1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      setQuantity(0);
    }
  };

  const handleAddClick = () => {
    Alert.alert('Document ID', `You clicked ADD for item with ID: ${id}`);
    dispatch(addToCart({ id, title, price, quantity: 1, image }));
    setQuantity(1);
  };

  const renderCounterButtons = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
      <TouchableOpacity onPress={handleDecrement} style={{ padding: 5 }}>
        <MaterialIcons name="remove" size={20} color="#EB8633" />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginHorizontal: 5 }}>{quantity}</Text>
      <TouchableOpacity onPress={handleIncrement} style={{ padding: 5 }}>
        <MaterialIcons name="add" size={20} color="#EB8633" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginHorizontal: 10, marginVertical: 5, borderColor: '#989BA4', borderWidth: 0.5 }}>
      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0)', width: 100, height: 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
      <View style={{ flex: 1, marginLeft: 25 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black', marginTop: 4 }}>{price}/-</Text>
          <Text style={{ fontSize: 13, color: '#a9a9a9', textDecorationLine: 'line-through', marginLeft: 5 }}>{discountPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
  <TouchableOpacity
    style={{
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
      width: 120,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderColor: '#989BA4',
      borderWidth: 1,
    }}
    onPress={handleDropdownClick}
  >
    <Text style={{ fontSize: 16, color: 'black' }}>{selectedOption}</Text>
    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
  </TouchableOpacity>
  {showDropdown && (
    <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10, marginLeft: 5, zIndex: 1 }}>
      <TouchableOpacity onPress={() => handleOptionClick('1Kg')} style={styles.dropdownOption}>
        <Text style={styles.dropdownOptionText}>1Kg</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOptionClick('2Kg')} style={styles.dropdownOption}>
        <Text style={styles.dropdownOptionText}>2Kg</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

        {quantity === 0 ? (
          <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={{ borderRadius: 5, padding: 4, alignItems: 'center', justifyContent: 'center', height: 30, borderColor: '#EB8633', borderWidth: 1, width: 60 }}>
              <Text style={{ color: '#EB8633', fontSize: 14 }}>ADD</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
            {renderCounterButtons()}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  dropdownOption: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: 'black',
  },
};


export default ItemCard;

