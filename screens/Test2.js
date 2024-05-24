import React, { useCallback, useRef, useMemo, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import TestCard from "./TestCard";

const Test2 = () => {
  const sheetRef = useRef(null);
  const [buttonsCount, setButtonsCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    if (index === -1) {
      setButtonsCount(0);
    }
    setIsSheetOpen(index > -1);
  }, []);

  const handleButtonPress = useCallback((count) => {
    
    setButtonsCount(count);
    sheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderCards = useMemo(() => {
    const cards = [];
    for (let i = 0; i < buttonsCount + 10; i++) {
      cards.push(
        <TestCard
          key={i}
          productName={`Example Product ${i + 1}`}
          productWeight={`${500 + i * 10}g`}
          originalPrice={`₹ ${10 + i}.00`}
          discountedPrice={`$${8 + i}.00`}
          showDropdown={0}
          productimg="https://m.media-amazon.com/images/I/712l62VZ0mL._AC_UF1000,1000_QL80_.jpg"
          onAddClick={() => handleButtonPress(1)} // Pass the handleButtonPress function as a prop
        />
      );
    }
    return cards;
  }, [buttonsCount, handleButtonPress]);

  return (
    <View style={styles.container}>
      <TestCard
        productName="Example Product"
        productWeight="500g"
        originalPrice="₹ 10.00"
        discountedPrice="$8.00"
        showDropdown={1}
        productimg="https://m.media-amazon.com/images/I/712l62VZ0mL._AC_UF1000,1000_QL80_.jpg"
        onAddClick={() => handleButtonPress(1)} // Pass the handleButtonPress function as a prop
      />
      {/* <Button
        title="Open Bottom Sheet with 1 Card"
        onPress={() => handleButtonPress(1)}
      />
      <Button
        title="Open Bottom Sheet with 2 Cards"
        onPress={() => handleButtonPress(2)}
      />
      <Button
        title="Open Bottom Sheet with 3 Cards"
        onPress={() => handleButtonPress(3)}
      /> */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={styles.backgroundStyle}
        handleIndicatorStyle={styles.handleIndicator}
        enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {renderCards}
          <Button title="Close Bottom Sheet" onPress={handleClosePress} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f3ee",
    marginTop: 100,
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 0,
  },
  backgroundStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  handleIndicator: {
    backgroundColor: "#ccc",
    width: 40,
    height: 4,
    borderRadius: 2,
  },
});

export default Test2;
