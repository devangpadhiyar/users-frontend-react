import {
  GET_USER_DETAIL,
  GET_USER_DETAIL_ERROR,
  GET_USER_DETAIL_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
} from './constants';
import axios from '../../axios';

const getUserDetail = ()=>({
  type: GET_USER_DETAIL,
});

const getUserDetailError = (payload)=>({
  type: GET_USER_DETAIL_ERROR,
  payload,
});

const getUserDetailSuccess = (payload) => ({
  type: GET_USER_DETAIL_SUCCESS,
  payload,
});

export const fetchUser = (userId)=>{
  return (dispatch)=>{
    dispatch(getUserDetail());
    axios.get(`/user/${userId}`).then((res)=>{
      if (res.status === 200 ) dispatch(getUserDetailSuccess(res.data));
    }, ({response})=>{
      if (response.status === 404) dispatch(getUserDetailError(response.data));
    });
  };
};

const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

const updateUserError = (payload) => ({
  type: UPDATE_USER_ERROR,
  payload,
});

const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});


export const updateUserForm = (userId, payload)=>{
  return (dispatch)=>{
    dispatch(updateUser());
    axios.patch(`/user/${userId}`, payload).then((res)=>{
      if (res.status === 200) dispatch(updateUserSuccess(res.data));
    }, ({response})=>{
      dispatch(updateUserError(response.data));
    });
  };
}
;
