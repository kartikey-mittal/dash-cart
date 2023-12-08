import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ItemCard = ({ title, price, discountPrice, image }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('500gms');

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
                marginHorizontal: 10,
                marginVertical:5,
                borderColor: '#989BA4',
                borderWidth: 0.5,
            }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: 'black' }}>{price}/-</Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: '#a9a9a9',
                                textDecorationLine: 'line-through',
                                marginLeft: 5,
                            }}
                        >
                            {discountPrice}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 10,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            borderColor:'#989BA4',
                            borderWidth:0.5,
                        }}
                        onPress={handleDropdownClick}
                    >
                        <Text style={{ fontSize: 16 }}>{selectedOption}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        {showDropdown && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 40,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    padding: 5,
                                    width: 100,
                                    zIndex: 1,
                                }}
                            >
                                <TouchableOpacity onPress={() => handleOptionClick('1Kg')}>
                                    <Text style={{ fontSize: 16 }}>1Kg</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleOptionClick('2Kg')}>
                                    <Text style={{ fontSize: 16 }}>2Kg</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                       
                        borderRadius: 5,
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        alignSelf: 'center',
                        borderColor:'#EB8633',
                        borderWidth:1,
                        width:60
                    }}
                >
                    <Text style={{ color: '#EB8633', fontSize: 14 ,}}>ADD</Text>
                </TouchableOpacity>
            </View>
            );
};

            export default ItemCard;
