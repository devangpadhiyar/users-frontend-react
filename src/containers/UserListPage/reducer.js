import {
  GET_USER_LIST,
  GET_USER_LIST_ERROR,
  GET_USER_LIST_SUCCESS,
  REMOVE_USER,
  REMOVE_USER_ERROR,
  REMOVE_USER_SUCCESS,
} from './constants';
import {fromJS} from 'immutable';

const initialState = {
  users: [],
  getUserStatus: false,
  removeUserStatus: false,
  removeUserResponse: {},
};

const reducer = (state=initialState, action)=>{
  state = fromJS(state);
  switch (action.type) {
    case GET_USER_LIST:
      return state.set('getUserStatus', 'loading').set('users', fromJS([])).toJS();
    case GET_USER_LIST_ERROR:
      return state.set('getUserStatus', 'error').set('users', fromJS([])).toJS();
    case GET_USER_LIST_SUCCESS:
      return state.set('getUserStatus', 'success').set('users', action.payload).toJS();

    case REMOVE_USER:
      return state.set('removeUserStatus', 'loading').set('removeUserResponse', {}).toJS();
    case REMOVE_USER_ERROR:
      return state.set('removeUserStatus', 'error').set('removeUserResponse', {}).toJS();
    case REMOVE_USER_SUCCESS:
      return state.set('removeUserStatus', 'success').set('removeUserResponse', {}).toJS();
    default:
      return state;
  }
};

export default reducer;
;
