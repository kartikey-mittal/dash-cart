import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const ProductCard = ({ product }) => {
    const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);

    return (
        <View style={{ width: '50%', padding: 6, borderColor: '#d9d9d9', borderWidth: 0.4, backgroundColor: '#fff', }}>
            <Image source={{ uri: product.image }} style={{ width: '100%', height: width * 0.4 }} resizeMode="cover" />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
            {product.weights.length > 1 ? (
                <Picker
                    selectedValue={selectedWeight}
                    onValueChange={(itemValue) => setSelectedWeight(itemValue)}
                    style={{ height: 50, width: 150 }}
                    itemStyle={{ height: 50 }}
                >
                    {product.weights.map((weight, index) => (
                        <Picker.Item key={index} label={weight} value={weight} />
                    ))}
                </Picker>
            ) : (
                <Text>{product.weights[0]}</Text>
            )}
            <Text>{product.sellingPrice}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ textDecorationLine: 'line-through' }}>MRP: {product.price}</Text>
                <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 8 }}>
                    <Text>ADD</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};




const ProductGrid = () => {
    const products = [
        {
            name: 'Product 1',
            image: 'https://via.placeholder.com/150',
            weights: ['500gm', '1kg', '2kg'],
            price: '₹10',
            sellingPrice: '₹8'
        },
        {
            name: 'Product 2',
            image: 'https://via.placeholder.com/150',
            weights: ['1kg', '2kg'],
            price: '₹20',
            sellingPrice: '₹15'
        },
        {
            name: 'Product 3',
            image: 'https://via.placeholder.com/150',
            weights: ['500gm'],
            price: '₹5',
            sellingPrice: '₹4'
        },
        // add more products here
    ];



    return (
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', width: width * 0.8 }}>
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </ScrollView>
    );
};

export default ProductGrid;
