import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch ,useSelector} from 'react-redux';
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
    // Display an alert with the document ID
    Alert.alert('Document ID', `You clicked ADD for item with ID: ${id}`);
    
    // Dispatch an action to add the item to the Redux store
    dispatch(addToCart({ id, title, price, quantity: 1,image })); // Set quantity to 1
    
    // Set quantity to 1 (assuming you want to reset it after adding to the cart)
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
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'black' }}>{price}/-</Text>
          <Text style={{ fontSize: 13, color: '#a9a9a9', textDecorationLine: 'line-through', marginLeft: 5 }}>{discountPrice}</Text>
        </View>
        {/* demo ------------ down */}
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{ backgroundColor: '#fff', borderRadius: 5, padding: 5, marginTop: 10, width: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#989BA4', borderWidth: 0.5 }} onPress={handleDropdownClick}>
          <Text style={{ fontSize: 16 }}>{selectedOption}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          {showDropdown && (
            <View style={{ position: 'absolute', top: 40, backgroundColor: 'white', borderRadius: 5, padding: 5, width: 100, zIndex: 1 }}>
              <TouchableOpacity onPress={() => handleOptionClick('1Kg')}>
                <Text style={{ fontSize: 16 }}>1Kg</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionClick('2Kg')}>
                <Text style={{ fontSize: 16 }}>2Kg</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        {quantity === 0 ? (
          <TouchableOpacity onPress={handleAddClick} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 }}>
            <View style={{ borderRadius: 5, padding: 10, alignItems: 'center', justifyContent: 'center', height: 50, borderColor: '#EB8633', borderWidth: 1, width: 60 }}>
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
    </View>
  );
};

export default ItemCard;
