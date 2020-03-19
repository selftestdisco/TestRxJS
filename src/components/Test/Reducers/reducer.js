// const initialState = {
//     value: 0,
//     userData: {}
//   };
import * as actionType from '../Actions/actionTypes';
  
  function addReducer(state, action) {
    switch(action.type) {
      case 'INCREMENT':
        return { ...state, value: state.value + 1 };
      case 'DECREASE':
        return { ...state, value: state.value - 1 };
      case 'FETCH_USER_SUCCESS':
        return { ...state, userData: action.data };
      case 'FETCH_GIT_USER_SUCCESS':
        return {...state, gitUserData: action.data };
      case actionType.UPLOAD_SUCCESS:
        return {...state, addedGitUser: action.data, msg : undefined};
      case actionType.UPLOAD_FAILED:
        return {...state, addedGitUser:{}, msg: action.msg};
      default:
        return state;
    }
  }
  
  export default addReducer;