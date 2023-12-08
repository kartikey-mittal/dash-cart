import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const MyOrderCard = () => {
    return (
        <TouchableOpacity>
            <View style={{
                backgroundColor: 'white', margin: 10, borderRadius: 15, flex: 0, elevation: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1,
            }}>
                <View
                    style={{
                        flex: 0,
                        width: '100%',
                        flexDirection: 'row',
                        borderBottomColor: '#ababab',
                        marginBottom: 2,
                        borderBottomWidth: 0.7,
                        paddingBottom: 2,

                    }}>
                    <Text
                        style={{
                            color: '#7D7272',
                            textAlignVertical: 'center',
                            marginLeft: 15,
                            flexGrow: 1,
                        }}>
                        5th Aug 2023
                    </Text>

                    <Text
                        style={{
                            textAlignVertical: 'center',
                            backgroundColor: '#F2ECEC',
                            borderRadius: 10,
                            padding: 2,
                            color: '#39B564',
                            fontWeight: 500,
                            margin: 2,
                            marginRight: 10,
                            alignItems: 'center',
                            paddingHorizontal: 10
                        }}>
                        Dispacthed
                    </Text>
                </View>

                {/* ------- MID PART ---------*/}
                <View
                    style={{
                        flexDirection: 'row',

                        flex: 0,
                        marginBottom: 15
                    }}>
                    <View
                        style={{
                            flex: 1,

                            height: '100%',
                            width: '20%',
                            alignItems: 'center'
                        }}>

                        <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#F2ECEC', marginTop: 20 }}></View>

                    </View>
                    {/*- ----------- Middle's Middle Part ------------------ */}
                    <View
                        style={{ flex: 0, width: '50%' }}>
                        <Text style={{ color: 'black', fontSize: 17, marginTop: 20, fontWeight: 500 }}>
                            BigBasket
                        </Text>
                        <Text style={{ color: '#7D7272', fontSize: 15, marginTop: 10 }}>
                            ID 25474524
                        </Text>
                        <Text style={{ color: '#7D7272', fontSize: 15, marginTop: 0 }}>
                            5 Items
                        </Text>
                    </View>
                    {/*- ----------- Middle's Last Part ------------------ */}
                    <View style={{ flexGrow: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 500, marginTop: 20 }}>Rs.250</Text>
                        <Icon name="chevron-forward" size={20} color="#ababab" style={{ marginTop: 20 }} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MyOrderCard;