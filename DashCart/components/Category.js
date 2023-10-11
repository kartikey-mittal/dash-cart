import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const CategoryComponent = () => {
    return (
        <View>
            <Text style={{ fontSize: 20, paddingLeft: 5, paddingTop: 5,fontFamily:'DMSans'}}>Shops by Category</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'column' }}>
                    {[1, 2].map((row) => (
                        <View key={row} style={{ flexDirection: 'row' }}>
                            {[1, 2, 3, 4].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        margin: 10,
                                        borderWidth: 0.4,
                                        borderRadius: 10,
                                        backgroundColor: '#eaecee'

                                    }}
                                    onPress={() => {
                                        // Handle your onPress event here
                                    }}
                                >
                                    {/* Your content goes here */}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default CategoryComponent;
