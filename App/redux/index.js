import { combineReducers } from 'redux';

import user from './auth';
import products from './products';
import product from './product';

export default combineReducers({
  user,
  products,
  product
});
