import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, FlatList, ActivityIndicator, SafeAreaView, StatusBar, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Client, Databases, Query } from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBarStore from '../components/StorePageComponents/NavBarStore';
import SearchBarStore from '../components/StorePageComponents/SearchBarStore';
import StoreCategory from '../components/StorePageComponents/StoreCategory';
import TestCard from './TestCard';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const StoreScreen = ({ route }) => {
  
  const { storeid, storename } = route.params;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const sheetRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [variantQuantities, setVariantQuantities] = useState({});
  const [selectedVariantDetails, setSelectedVariantDetails] = useState({});

  const snapPoints = useMemo(() => ['50%'], []);

  const handleOpenSheet = useCallback((productId, variants) => {
    setSelectedProductId(productId);
    setSelectedVariants(variants);
    sheetRef.current?.expand();
  }, []);

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const saveDataToAsyncStorage = async (data) => {
    try {
      // Get existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem('storeData');
      let storeData = existingData ? JSON.parse(existingData) : {};

      // Prepare the new data to be saved
      const newData = {
        storeid,
        storename,
        itemsdata: Object.entries(data || variantQuantities)
          .filter(([_, quantity]) => quantity > 0)
          .map(([key, quantity]) => {
            const [productId, variantId] = key.split('-');
            return { productid: productId, variantid: variantId, qty: quantity };
          }),
      };

      // Merge the new data with existing data
      storeData[storeid] = newData;

      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem('storeData', JSON.stringify(storeData));
      console.log('Data saved:', JSON.stringify(storeData, null, 2));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const handleBuyVariant = useCallback((variant) => {
    setSelectedVariantDetails((prevDetails) => ({
      ...prevDetails,
      [selectedProductId]: variant,
    }));
    handleCloseSheet();
  }, [selectedProductId]);

  const handleIncrementVariant = (variantId) => {
    setVariantQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [variantId]: (prevQuantities[variantId] || 0) + 1,
      };
      saveDataToAsyncStorage(newQuantities);
      return newQuantities;
    });
  };

  const handleDecrementVariant = (variantId) => {
    setVariantQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[variantId] > 0) {
        newQuantities[variantId] -= 1;
      }
      saveDataToAsyncStorage(newQuantities);
      return newQuantities;
    });
  };

  const fetchData = async () => {
    const client = new Client();
    client.setEndpoint('https://cloud.appwrite.io/v1');
    client.setProject('65773c8581b895f83d40');

    const databases = new Databases(client);
    const collectionId = 'Shop_ItemsDB_testing';
    const productCollectionId = '664f1ca60037dad0be9c';

    try {
      const shopItemsResponse = await databases.listDocuments(
        'data-level-1',
        collectionId,
        [Query.search('SHOP_ID', storeid)]
      );

      const shopItems = shopItemsResponse.documents[0]['Shop_Items-SP'];
      const productIds = shopItems.map((item) => item.split(':')[0].split('.')[0]);

      const productDetailsResponse = await databases.listDocuments('data-level-1', productCollectionId);
      const productDetails = productDetailsResponse.documents;

      const categoriesMap = {};
      productDetails.forEach((product) => {
        if (productIds.includes(product.ProductID.toString())) {
          if (!categoriesMap[product.Product_Category]) {
            categoriesMap[product.Product_Category] = product['Category-Image'];
          }
        }
      });

      const uniqueCategories = Object.keys(categoriesMap).map((category) => ({
        name: category,
        image: categoriesMap[category],
      }));

      setCategories(uniqueCategories);

      const combinedItems = shopItems.map((item) => {
        const [variantId, price] = item.split(':');
        const productId = variantId.split('.')[0];
        const variant = variantId.split('.')[1];

        const product = productDetails.find((p) => p.ProductID.toString() === productId);
        const mrpInfo = product ? product['Product-MRP'].find((m) => m.startsWith(variantId)) : null;
        const weightInfo = product ? product['Product_ID-Weight'].find((w) => w.startsWith(variantId)) : null;
        const mrp = mrpInfo ? mrpInfo.split(':')[1] : 'N/A';
        const weight = weightInfo ? weightInfo.split(':')[1] : 'N/A';

        return {
          productId,
          variant,
          price,
          mrp,
          weight,
          name: product ? product.Product_Name : 'Unknown Product',
          image: product ? product.Product_Image : '',
          category: product ? product.Product_Category : 'Unknown Category',
          variants: shopItems
            .filter((i) => i.split(':')[0].split('.')[0] === productId)
            .map((v) => {
              const [varId, varPrice] = v.split(':');
              const varWeight = product['Product_ID-Weight'].find((w) => w.startsWith(varId));
              return {
                variantId: varId.split('.')[1],
                price: varPrice,
                weight: varWeight ? varWeight.split(':')[1] : 'N/A',
              };
            }),
        };
      });

      const uniqueProducts = Object.values(
        combinedItems.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = item;
          }
          return acc;
        }, {})
      );

      setItems(uniqueProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storeid]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddClick = (productId) => {
    const selectedVariant = selectedVariantDetails[productId];
    if (selectedVariant) {
      handleIncrementVariant(`${productId}-${selectedVariant.variantId}`);
    }
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <NavBarStore storename={storename} />
      <SearchBarStore />
      <StoreCategory categories={categories} onSelectCategory={handleCategorySelect} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#c2c2c2" />
        ) : filteredItems.length === 0 ? (
          <Text>No items found</Text>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.productId}
            renderItem={({ item }) => {
              const selectedVariantId =
                selectedVariantDetails[item.productId]?.variantId || item.variants[0].variantId;
              const variantKey = `${item.productId}-${selectedVariantId}`;
              return (
                <TestCard
                  productid={item.productId}
                  productimg={item.image}
                  productName={item.name}
                  productWeight={
                    selectedVariantDetails[item.productId]?.weight || item.weight
                  }
                  originalPrice={
                    selectedVariantDetails[item.productId]?.mrp || item.mrp
                  }
                  discountedPrice={
                    selectedVariantDetails[item.productId]?.price || item.price
                  }
                  showDropdown={false}
                  variants={item.variants}
                  onAddClick={(variants) =>
                    handleOpenSheet(item.productId, variants)
                  }
                  quantity={variantQuantities[variantKey] || 0}
                  handleIncrement={() => handleIncrementVariant(variantKey)}
                  handleDecrement={() => handleDecrementVariant(variantKey)}
                  storeData={saveDataToAsyncStorage} // Pass the saveDataToAsyncStorage function to TestCard
                />
              );
            }}
          />
        )}
      </View>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={(index) =>
          setSelectedProductId(index > -1 ? selectedProductId : null)
        }
        enablePanDownToClose={true}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Select a variant:
          </Text>
          {selectedVariants.map((variant) => (
            <TouchableOpacity
              key={variant.variantId}
              onPress={() => handleBuyVariant(variant)}
              style={styles.variantButton}
            >
              <Text>{`${variant.weight} - Rs. ${variant.price}`}</Text>
            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  variantButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default StoreScreen;
