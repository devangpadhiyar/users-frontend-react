import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
} from './constants';
import {fromJS} from 'immutable';

const initialState = {
  status: false,
  data: {},

};

const reducer = (state=initialState, action)=>{
  state = fromJS(state);
  switch (action.type) {
    case ADD_USER:
      return state.set('status', 'loading').set('data', false).toJS();
    case ADD_USER_ERROR:
      return state.set('status', 'error').set('data', action.payload.errors).toJS();
    case ADD_USER_SUCCESS:
      return state.set('status', 'success').set('data', action.payload).toJS();
    default:
      return state;
  }
};

export default reducer;

