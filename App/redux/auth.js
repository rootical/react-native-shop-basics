import axios from '../configs/axios';
import IP from '../configs/ip';
import { Vibration } from 'react-native';
import { onSignIn, setStorage, onSignOut } from '../auth';

/* -----------------    ACTION TYPES    ------------------ */

const AUTH_BEGIN = 'AUTH_REMOVE_CURRENT_USER';
const AUTH_SET_CURRENT_USER = 'AUTH_SET_CURRENT_USER';
const AUTH_FAILURE = 'AUTH_FAILURE';
const AUTH_REMOVE_CURRENT_USER = 'AUTH_REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const loginBegin = () => (
  { type: AUTH_BEGIN }
);


const setCurrentUser = (userToken) => {
  return {
    type: AUTH_SET_CURRENT_USER,
    payload: {
      userToken: userToken
    }
  }
};

const loginFailure = error => ({
  type: AUTH_FAILURE,
  payload: { error: error }
});

export const removeCurrentUser = () => ({ type: AUTH_REMOVE_CURRENT_USER });

const initialState = {
  userToken: null,
  loading: false,
  error: null
};
/* ------------          REDUCER         ------------------ */

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case AUTH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_SET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        ...action.payload
      };

    case AUTH_REMOVE_CURRENT_USER:
      return {
        ...state,
        userToken: null
      };

    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, navigation) => dispatch => {
  dispatch(loginBegin());
  onSignIn();
  axios.post(`${IP}integration/customer/token`, {
    username: credentials.email,
    password: credentials.password
  })
    .then((res) => {
      setUserAndRedirect(res.data, navigation, dispatch);
      setStorage(res.data);
    })
    .catch((error) => {
      dispatch(loginFailure(error));
      Vibration.vibrate(1000);
      navigation.navigate('SignedOut');
    });
};

// todo proper logout
export const logout = navigation => dispatch => {
  // axios.delete(`${IP}/auth/logout`)
  //   .then(() => {
      dispatch(removeCurrentUser());
      onSignOut();
      navigation.navigate('SignedOut');
    // })
    // .catch((error) => console.error('Logout unsuccessful:  ', error));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (userToken, navigation, dispatch) {
  dispatch(setCurrentUser(userToken));
  navigation.navigate('SignedIn');
}
