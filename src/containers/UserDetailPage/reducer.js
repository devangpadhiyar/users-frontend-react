import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_ERROR,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './constants';
import {fromJS} from 'immutable';

const initialState = {
  userStatus: false,
  userData: {},
  updateStatus: false,
  updateData: {},
};

const reducer = (state=initialState, action)=>{
  state = fromJS(state);
  switch (action.type) {
    case GET_USER_DETAIL:
      return state.set('userStatus', 'loading').set('userData', false).toJS();
    case GET_USER_DETAIL_ERROR:
      return state.set('userStatus', 'error').set('userData', fromJS(action.payload)).toJS();
    case GET_USER_DETAIL_SUCCESS:
      return state.set('userStatus', 'success').set('userData', action.payload).toJS();

    case UPDATE_USER:
      return state.set('updateStatus', 'loading').set('updateData', {}).toJS();
    case UPDATE_USER_ERROR:
      return state.set('updateStatus', 'error').set('updateData', {}).toJS();
    case UPDATE_USER_SUCCESS:
      return state.set('updateStatus', 'success').set('updateData', {}).toJS();
    default:
      return state;
  }
};

export default reducer;
;

