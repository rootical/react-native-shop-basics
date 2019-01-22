import axios from "../configs/axios";

import IP from "../../IP";

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_PRODUCT = "SET_PRODUCT";
const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

/* ------------     ACTION CREATORS      ------------------ */


const fetchProduct = product => ({ type: FETCH_PRODUCT }, product);

const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
/* ------------          REDUCER         ------------------ */
const initialState = {
  products: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

const query =
  "products?searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][1][field]=name";

export function fetchProducts() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return axios.get(IP + query)
        .then(res => {
          dispatch(fetchProductsSuccess(res.data.items));
          return res.data.items;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
}

export const openProduct = (id, navigation) => dispatch => {
  // dispatch(GET_PRODUCT_LIST(userToken));
  navigation.navigate("Product", { id: id });
};

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect(userToken, navigation, dispatch) {
  dispatch(setCurrentUser(userToken));
  navigation.navigate("SignedIn");
}
