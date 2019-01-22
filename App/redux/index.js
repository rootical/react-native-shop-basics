import { combineReducers } from 'redux';

import currentUser from './auth';
import products from './products';

export default combineReducers({
  currentUser,
  products
});
