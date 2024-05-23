// actions.js

export const setMobileNumber = (mobileNumber) => ({
  type: 'SET_MOBILE_NUMBER',
  payload: mobileNumber,
});

export const setSocietyInfo = (societyName, societyId) => ({
  type: 'SET_SOCIETY',
  payload: { societyName, societyId },
});

export const setBlockNo = (blockNo) => ({
  type: 'SET_BLOCK_NO',
  payload: blockNo,
});

export const setFlatNo = (flatNo) => ({
  type: 'SET_FLAT_NO',
  payload: flatNo,
});

export const setCityInfo = (cityName, cityId) => ({
  type: 'SET_CITY_INFO',
  payload: { cityName, cityId },
});

// {/ // --------------------   CART ITEMS --------------------

// // actions.js
// /}

// actions.js
export const addToCart = (item) => ({
type: 'ADD_TO_CART',
payload: item,
});

export const removeFromCart = (itemId) => ({
type: 'REMOVE_FROM_CART',
payload: itemId,
});

export const updateCartItemQuantity = (itemId, quantity) => ({
type: 'UPDATE_CART_ITEM_QUANTITY',
payload: { itemId, quantity },
});

// ----------------  NAME ----------------
export const setUserName = (name) => ({
type: 'SET_USER_NAME',
payload: name,
});

export const setUserEmail = (email) => ({
type: 'SET_USER_EMAIL',
payload: email,
});