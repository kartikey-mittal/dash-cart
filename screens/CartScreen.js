import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, FlatList, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import CartNavBar from '../components/CartPage/CartNavBar';
import BillingComponent from '../components/CartPage/BillingComponent';

import { Client, Databases, Query } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('65773c8581b895f83d40');
const databases = new Databases(client);

const CartScreen = () => {
  const [storeData, setStoreData] = useState({});
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem('storeData');
        const parsedData = data ? JSON.parse(data) : {};
        setStoreData(parsedData);
  
        const firstStoreId = Object.keys(parsedData)[0];
        if (firstStoreId) {
          setSelectedStoreId(firstStoreId);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
  
    fetchDataFromAsyncStorage();
  }, []);
  
  useEffect(() => {
    if (selectedStoreId && storeData[selectedStoreId]) {
      fetchProductDetails();
      fetchShopPrices();
    }
  }, [selectedStoreId]);

  

  useEffect(() => {
    calculateTotalBillAmount();
  }, [productDetails, storeData]);

  const fetchProductDetails = async () => {
    const itemsData = storeData[selectedStoreId]?.itemsdata || [];
    
    console.log('itemsData:', itemsData);
 
    try {
      const productIds = [...new Set(itemsData.map(item => item.productid))];
      console.log('productIds:', productIds);
  
      const promises = productIds.map(id => 
        databases.listDocuments('data-level-1', '664f1ca60037dad0be9c', [Query.equal('ProductID', id)])
      );
      const results = await Promise.all(promises);
      console.log('product details results:', results);
  
      const details = results.reduce((acc, res) => {
        res.documents.forEach(doc => {
          acc[doc.ProductID] = doc; // Changed from doc.$id to doc.ProductID
        });
        return acc;
      }, {});
      
      console.log('Product Details:', details);
      setProductDetails(details);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  

  const fetchShopPrices = async () => {
    try {
      const response = await databases.listDocuments('data-level-1', 'Shop_ItemsDB_testing', [
        Query.equal('SHOP_ID', selectedStoreId)
      ]);
      console.log('prices response:', response);
  
      const documents = response.documents;
      if (documents.length > 0) {
        const prices = documents[0]['Shop_Items-SP'] || [];
        console.log('prices:', prices);
  
        const updatedStoreData = { ...storeData };
        const itemsData = updatedStoreData[selectedStoreId]?.itemsdata || [];
  
        itemsData.forEach(item => {
          const variantKey = `${item.productid}.${item.variantid}`;
          const shopItemPrice = prices.find(sp => sp.startsWith(variantKey));
          if (shopItemPrice) {
            const sellingPrice = shopItemPrice.split(':')[1];
            item.sellingPrice = parseFloat(sellingPrice);
          }
        });
  
        console.log('Updated Store Data:', updatedStoreData);
        setStoreData(updatedStoreData);
      } else {
        console.log('No documents found in response.');
      }
    } catch (error) {
      console.error('Error fetching shop prices:', error);
    }
  };
  
  
  

  const calculateTotalBillAmount = () => {
    if (selectedStoreId && storeData[selectedStoreId]) {
      const itemsData = storeData[selectedStoreId].itemsdata;
      const totalAmount = itemsData.reduce((sum, item) => sum + (item.qty * item.sellingPrice), 0);
      setTotalBillAmount(totalAmount);
    }
  };

  const handleIncrementQuantity = (productid, variantid) => {
    const updatedStoreData = { ...storeData };
    const selectedStoreItems = updatedStoreData[selectedStoreId].itemsdata;

    const itemIndex = selectedStoreItems.findIndex(item => item.productid === productid && item.variantid === variantid);
    if (itemIndex !== -1) {
      selectedStoreItems[itemIndex].qty += 1;
      setStoreData(updatedStoreData);
      saveDataToAsyncStorage(updatedStoreData);
    }
  };

  const handleDecrementQuantity = (productid, variantid) => {
    const updatedStoreData = { ...storeData };
    const selectedStoreItems = updatedStoreData[selectedStoreId].itemsdata;
  
    const itemIndex = selectedStoreItems.findIndex(item => item.productid === productid && item.variantid === variantid);
    if (itemIndex !== -1) {
      if (selectedStoreItems[itemIndex].qty === 1) {
        // Remove the item if its quantity is 1
        selectedStoreItems.splice(itemIndex, 1);
      } else {
        selectedStoreItems[itemIndex].qty -= 1;
      }
      setStoreData(updatedStoreData);
      saveDataToAsyncStorage(updatedStoreData);
    }
  };
  

  const saveDataToAsyncStorage = async (data) => {
    try {
      await AsyncStorage.setItem('storeData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const renderStoreButtons = () => {
    return Object.keys(storeData).map(storeId => (
      <TouchableOpacity
        key={storeId}
        style={[styles.storeButton, selectedStoreId === storeId && styles.selectedStoreButton]}
        onPress={() => setSelectedStoreId(storeId)}
      >
        <Text style={styles.storeButtonText}>{storeData[storeId].storename}</Text>
      </TouchableOpacity>
    ));
  };

  const renderCartItem = ({ item }) => {
    const product = productDetails[item.productid] || {};
    const sellingPrice = item.sellingPrice || 0;
    console.log(sellingPrice);
  
    console.log('Rendering item:', item, 'with product details:', product, 'and selling price:', sellingPrice);
  
    const variantKey = `${item.productid}.${item.variantid}`;
    const variantInfo = product["Product_ID-Weight"]?.find(v => v.startsWith(variantKey + ":")) || '';
    const weight = variantInfo.split(':')[1]?.trim() || 'N/A';  // Add trim() to remove any leading/trailing spaces
    const mrpInfo = product["Product-MRP"]?.find(m => m.startsWith(variantKey + ":")) || '';
    const mrp = mrpInfo.split(':')[1]?.trim() || 'N/A';  // Add trim() to remove any leading/trailing spaces
  
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <View>
          <Text style={{ fontSize: 16 }}>{product.Product_Name}</Text>
          <Text style={{ fontSize: 16 }}>{product.Product_Image}</Text>
          <Image source={{ uri: product.Product_Image }}  style={{height:50,width:50}}></Image>
          <Text style={{ fontSize: 14, color: '#888' }}>Weight: {weight}</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>MRP: ₹{mrp}</Text>
          <Text style={{ fontSize: 14, color: '#888' }}>Selling Price: ₹{sellingPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => handleDecrementQuantity(item.productid, item.variantid)} style={{ padding: 10, backgroundColor: '#eee', borderRadius: 5 }}>
            <Text style={{ fontSize: 20 }}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{item.qty}</Text>
          <TouchableOpacity onPress={() => handleIncrementQuantity(item.productid, item.variantid)} style={{ padding: 10, backgroundColor: '#eee', borderRadius: 5 }}>
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  
  

  const selectedStoreItems = selectedStoreId ? storeData[selectedStoreId].itemsdata : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f4f3ee' }}>
      <StatusBar backgroundColor="#0c356a" barStyle="light-content" />

      <CartNavBar storeName="Cart" />

      <View style={styles.storeButtonsContainer}>
        {renderStoreButtons()}
      </View>

      <View style={{ flex: 1 }}>
        {selectedStoreItems.length > 0 ? (
          <FlatList
            data={selectedStoreItems}
            keyExtractor={(item) => `${item.productid}-${item.variantid}`}
            renderItem={renderCartItem}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text>Your cart is empty</Text>
          </View>
        )}
      </View>

      <BillingComponent totalBillAmount={totalBillAmount} />

      {selectedStoreItems.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: '#fc2c1e' }]}
            onPress={() => console.log('Cancel Order')}
          >
            <Text style={styles.footerButtonText}>CANCEL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: '#0c356a' }]}
            onPress={() => console.log('Pay')}
          >
            <Text style={styles.footerButtonText}>Pay</Text>
            <View style={styles.footerButtonRight}>
              <Text style={styles.footerButtonAmount}>{`₹ ${totalBillAmount}`}</Text>
              <Icon name="arrow-forward" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  storeButtonsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  storeButton: {
    padding: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedStoreButton: {
    backgroundColor: '#0c356a',
  },
  storeButtonText: {
    color: '#fff',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
    padding: 10,
  },
  footerButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  footerButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonAmount: {
    fontSize: 20,
    color: '#fea505',
    marginRight: 5,
  },
});

export default CartScreen;
