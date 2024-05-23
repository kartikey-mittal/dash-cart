// loginreducer.js

const initialState = {
  mobileNumber: '',
  society: '', // New addition
  city: {
    cityName: '',
    cityId: '',
  },
  userName: '', // New addition
  userEmail: '', // New addition
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

    case 'SET_USER_NAME':
      return {
        ...state,
        userName: action.payload,
      };

    case 'SET_USER_EMAIL':
      return {
        ...state,
        userEmail: action.payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
