import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
} from './constants';
import axios from '../../axios';

const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

const addUserError = (payload) => ({
  type: ADD_USER_ERROR,
  payload,
});

const addUserSuccess = (payload) => ({
  type: ADD_USER_SUCCESS,
  payload,
});

export const addUserForm = (payload)=>{
  return (dispatch)=>{
    dispatch(addUser());
    axios.post(`/user`, payload).then((res)=>{
      if (res.status === 200 ) {
        dispatch(addUserSuccess(res.data));
      };
    }, ({response})=>{
      if (response.status === 400) dispatch(addUserError(response.data));
    });
  };
};
