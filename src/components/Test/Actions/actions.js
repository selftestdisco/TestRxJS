import axios from 'axios';
import { INCREMENT, DECREASE, FETCH_USER_FAILED, FETCH_USER_SUCCESS, FETCH_USER } from "./actionTypes";

export function incrementAction() {
  return {
    type: INCREMENT,
  };
}
export function decreaseAction() {
  return {
    type: DECREASE,
  };
}

export function getData() {
  console.log('asdf')
  return {
    type: FETCH_USER
  };
}

export const getDataSuccess = (data) => {
  return {
      type: FETCH_USER_SUCCESS,
      data: data
  }
}

export const getUserFailed = () => ({
  type: FETCH_USER_FAILED
});

export function getUsers() {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response =>
        dispatch(getDataSuccess(response.data))
      ).catch(error => dispatch({ type: FETCH_USER_FAILED, payload: error }));
  };
}