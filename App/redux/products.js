import axios from "../configs/axios";

import IP from "../configs/ip";

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_PRODUCT_BEGIN = "FETCH_PRODUCT_BEGIN";
const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";
const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

/* ------------     ACTION CREATORS      ------------------ */

// ONE PRODUCT
const fetchProductBegin = () => ({
  type: FETCH_PRODUCT_BEGIN
});

const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product
});

const fetchProductFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error }
});

// PRODUCT LIST:
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
  items: [],
  product: {},
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        product: {}
      };

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
        items: [...action.payload.products]
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

const QUERY = "products?searchCriteria[pageSize]="
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return axios
    // todo: add more items by demand
      .get(IP + QUERY + 10)
      .then(res => {
        dispatch(fetchProductsSuccess(res.data.items));
        return res.data.items;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

const PRODUCT_QUERY = "products?searchCriteria[pageSize]=";
export const fetchProduct = (id, navigation) => dispatch => {
  return dispatch => {
    dispatch(fetchProductBegin());
    return axios
      .get(IP + PRODUCT_QUERY + id)
      .then(res => {
        dispatch(fetchProductSuccess(res.data.items));
        navigation.navigate("Product", { id: id });
        return res.data.items;
      })
      .catch(error => dispatch(fetchProductFailure(error)));
  };
};
