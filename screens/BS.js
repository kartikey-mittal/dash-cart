import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
const sheetRef = useRef(null);
const BS = () => {
    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%'], []);

  const handleOpenSheet = () => {
    
    sheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };
    

  return (
    <div>
     <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={console.log('hep')}
        backgroundStyle={{backgroundColor:'red'}}
        handleIndicatorStyle={{color:'green'}}
        enablePanDownToClose
      >
        <BottomSheetScrollView contentContainerStyle={{backgroundColor:'pink'}}>
         
          <Button title="Close Bottom Sheet" />
        </BottomSheetScrollView>
      </BottomSheet>
    </div>
  )
};

export default BS
