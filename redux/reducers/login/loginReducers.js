// loginreducer.js

const initialState = {
  mobileNumber: '',
  society: '', // New addition
  city: {
    cityName: '',
    cityId: '',
  },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOBILE_NUMBER':
      return {
        ...state,
        mobileNumber: action.payload,
      };
    case 'SET_SOCIETY':
      return {
        ...state,
        society:{
          societyName: action.payload.societyName,
          societyId : action.payload.societyId,
        },
      };

    case 'SET_BLOCK_NO':
      return {
        ...state,
        blockNo: action.payload,
      };

    case 'SET_FLAT_NO':
      return {
        ...state,
        flatNo: action.payload,
      };

    case 'SET_CITY_INFO':
      return {
        ...state,
        city: {
          cityName: action.payload.cityName,
          cityId: action.payload.cityId,
        },
      };

    default:
      return state;
  }
};

export default loginReducer;
