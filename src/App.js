import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // For bootstrap
import logo from './logo.svg';
import './App.css';
import Header from './containers/Header';
import UserListPage from './containers/UserListPage';
import UserDetailPage from './containers/UserDetailPage';
import AddUserPage from './containers/AddUserPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path='/user/add' exact>
            <AddUserPage />
          </Route>
          <Route path='/user/:id'>
            <UserDetailPage />
          </Route>
          <Route path=''>
            <UserListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
