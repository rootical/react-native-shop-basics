import { combineReducers } from 'redux';

import currentUser from './auth';
import products from './products';
import product from './product';

export default combineReducers({
  currentUser,
  products,
  product
});
