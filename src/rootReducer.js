// reducers.js
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userListReducer from './containers/UserListPage/reducer';
import userDetailReducer from './containers/UserDetailPage/reducer';
import addUserReducer from './containers/AddUserPage/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userList: userListReducer,
  userDetail: userDetailReducer,
  addUser:addUserReducer
});
export default createRootReducer
;
