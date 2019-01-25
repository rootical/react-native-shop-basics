import axios from "../configs/axios";
import IP from "../configs/ip";

/* -----------------    ACTION TYPES    ------------------ */

const FETCH_PRODUCT_BEGIN = "FETCH_PRODUCT_BEGIN";
const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";

/* ------------     ACTION CREATORS      ------------------ */

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

/* ------------          REDUCER         ------------------ */
const initialState = {
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
    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

const PRODUCT_QUERY = "products/";
export const fetchProduct = (sku) =>
  dispatch => {
    dispatch(fetchProductBegin());
    return axios
      .get(IP + PRODUCT_QUERY + sku)
      .then(res => {
        dispatch(fetchProductSuccess(res.data));
        return res.data.items;
      })
      .catch(error => dispatch(fetchProductFailure(error)));
  };
