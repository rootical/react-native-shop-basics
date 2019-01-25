import axios from "../configs/axios";

import IP from "../configs/ip";

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

/* ------------     ACTION CREATORS      ------------------ */

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
