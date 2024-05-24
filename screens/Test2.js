import React, { useCallback, useRef, useMemo, useState } from "react";
import { View, Button, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import BottomSheet,{ BottomSheetScrollView }  from "@gorhom/bottom-sheet";

const Test2 = () => {
  // hooks
  const sheetRef = useRef(null);
  const [buttonsCount, setButtonsCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    if (index === -1) {
      // Reset buttons count when the sheet is fully closed
      setButtonsCount(0);
    }
    setIsSheetOpen(index > -1); // Update isSheetOpen based on bottom sheet index
  }, []);

  const handleButtonPress = useCallback((count) => {
    setButtonsCount(count);
    sheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleOverlayPress = useCallback(() => {
    if (isSheetOpen) {
      sheetRef.current?.close();
    }
  }, [isSheetOpen]);

  // render
  const renderButtons = useMemo(() => {
    const buttons = [];
    for (let i = 0; i < buttonsCount + 10; i++) {
      buttons.push(
        <Button key={i} title={`Button ${i + 1}`} onPress={() => {}} />
      );
    }
    return buttons;
  }, [buttonsCount]);

  return (
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <View style={styles.container}>
        <Button
          title="Open Bottom Sheet with 1 Button"
          onPress={() => handleButtonPress(1)}
        />
        <Button
          title="Open Bottom Sheet with 2 Buttons"
          onPress={() => handleButtonPress(2)}
        />
        <Button
          title="Open Bottom Sheet with 3 Buttons"
          onPress={() => handleButtonPress(3)}
        />
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          backgroundStyle={styles.backgroundStyle}
          handleIndicatorStyle={styles.handleIndicator}
          enablePanDownToClose
        >
          <BottomSheetScrollView>
            <View
              style={[styles.contentContainer, { opacity: isSheetOpen ? 1 : 0 }]}
            >
              {renderButtons}
              <Button title="Close Bottom Sheet" onPress={handleClosePress} />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 16,
  },
  backgroundStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0.5, // Add top border
    borderColor: "#ccc", // Border color
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
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
