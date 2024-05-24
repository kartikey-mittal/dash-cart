import React,{useState} from "react";
import { ScrollView ,View} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import WeightCard from "../components/test/WeightCard";


const WeightCardScreen = () => {

        const [activeButton, setActiveButton] = useState(null);

  const handlePress = (weight) => {
    setActiveButton(weight === activeButton ? null : weight);
  };
  const weights = ['100 gm', '200 gm','300 gm','400 gm','500 gm']; // Example array of weights

  return (
        <SafeAreaView style={{width:"90%",alignSelf:"center",height:"15%",backgroundColor:"#fafaf8"}} >
                <Icon name="chevron-down-outline" size={20} color="#495562" style={{alignSelf:"center"}} />
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} horizontal style={{width:"90%",alignSelf:"center"}} showsHorizontalScrollIndicator={false}>
    {weights.map((weight, index) => (
        <WeightCard
          key={index}
          weight={weight}
          isActive={weight === activeButton}
          onPress={() => handlePress(weight)}
        />
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

export default WeightCardScreen;