import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';

const StoreCategory = () => {
  const [selectedView, setSelectedView] = useState(null);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ backgroundColor:'#f2f2f2',maxHeight:110}}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity key={item} onPress={() => { setSelectedView(item); Alert.alert(`You clicked view number ${item}`) }}>
          <View style={{ width: 75, height: 75, borderWidth: 1, borderColor: selectedView === item ? 'black' : 'lightgray', justifyContent: 'center', alignItems: 'center', margin: 10, borderRadius: 10 }}>
            <Image
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              source={{ uri: 'https://www.freepngimg.com/thumb/grocery/53973-6-grocery-free-hq-image.png' }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StoreCategory;
