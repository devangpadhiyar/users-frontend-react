import {
  GET_USER_LIST,
  GET_USER_LIST_ERROR,
  GET_USER_LIST_SUCCESS,
  REMOVE_USER,
  REMOVE_USER_ERROR,
  REMOVE_USER_SUCCESS,
} from './constants';
import axios from '../../axios';

const getUserList = ()=>({
  type: GET_USER_LIST,
});


const getUserListError = (payload)=>({
  type: GET_USER_LIST_ERROR,
  payload,
});

const getUserListSuccess = (payload) => ({
  type: GET_USER_LIST_SUCCESS,
  payload,
});

export const fetchUserList = ()=>{
  return (dispatch)=>{
    dispatch(getUserList());
    axios.get('/').then((res)=>{
      // If get an response
      if (res.status===200) dispatch(getUserListSuccess(res.data));
    }).catch((err)=>{
      dispatch(getUserListError(err.data));
    });
  };
};

const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId,
});

const removeUserError = (payload) => ({
  type: REMOVE_USER_ERROR,
  payload,
});

const removeUserSuccess = (payload) => ({
  type: REMOVE_USER_SUCCESS,
  payload,
});

export const removeUserFromList = (userId)=>{
  return (dispatch)=>{
    dispatch(removeUser());
    axios.delete(`/user/${userId}`).then((res)=>{
      // If get an response
      if (res.status===204) {
        dispatch(removeUserSuccess(res.data));
      };
    }).catch((err)=>{
      dispatch(getUserListError(err.data));
    });
  };
};
