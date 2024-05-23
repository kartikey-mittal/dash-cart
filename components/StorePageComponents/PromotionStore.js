import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // replace with your actual icon component
import FontLoader from '../../FontLoader';

const PromotionStore = () => {
    return (
        <FontLoader>
            <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
                <View style={{ backgroundColor: '#0c356a', padding: 5, shadowColor: '#ababb2', shadowOffset: { width: 0, height: 0.3 }, shadowOpacity: 0.4, shadowRadius: 2, elevation: 5, }}>

                <View style={{ flexDirection: 'row', backgroundColor: '#f2f2f2', borderRadius: 10, padding: 10, marginHorizontal: 20, height: 100, marginBottom: 10, borderColor: 'black', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontFamily: 'DMSansB', fontSize: 25 ,color:'#ababab'}}>{"\n"}Advertisement</Text></View>


                </View>
            </View>
        </FontLoader>

    );
};

export default PromotionStore;
