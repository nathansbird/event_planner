import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import * as types from "../constants";

export const login = (email, password) => async dispatch => {
    
};

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.get('/api/auth');
  
      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: types.AUTH_ERROR
      });
    }
  };

export const register = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth/register', {name, email, password}, config);
    
    dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data
    });

    dispatch(loadUser());
  } catch (e) {
    console.log(e);
  }
};

