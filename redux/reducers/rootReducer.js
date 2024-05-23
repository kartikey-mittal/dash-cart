// rootReducer.js

import { combineReducers } from 'redux';
import loginReducer from './login/loginReducers';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  loginReducer,cart:cartReducer,
  // Add other reducers here if needed
});

export default rootReducer;
