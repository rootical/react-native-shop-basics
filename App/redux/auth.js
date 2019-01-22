import axios from '../configs/axios';

import IP from '../configs/ip';
/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = (userToken) => {
  return {
    type: SET_CURRENT_USER,
    payload: {
      userToken: userToken
    }
  }
};

export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return {...action.payload};

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, navigation) => dispatch => {
  axios.post(`${IP}integration/customer/token`, {
    username: credentials.email,
    password: credentials.password
  })
    .then((res) => {
      setUserAndRedirect(res.data, navigation, dispatch);
    })
    .catch(error => navigation.navigate('SignedOut', {error: `Login failed. ${error}`}));
};

export const signup = (credentials, navigation) => dispatch => {
  axios.post(`${IP}/auth/signup`, credentials)
    .then(res => setUserAndRedirect(res.data, navigation, dispatch))
    .catch(() => navigation.navigate('SignedOut', {error: 'Signup failed.'}));
};

// todo proper logout
export const logout = navigation => dispatch => {
  axios.delete(`${IP}/auth/logout`)
    .then(() => {
      dispatch(removeCurrentUser());
      navigation.navigate('SignedOut');
    })
    .catch((error) => console.error('Logout unsuccessful:  ', error));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (userToken, navigation, dispatch) {
  dispatch(setCurrentUser(userToken));
  navigation.navigate('SignedIn');
}
