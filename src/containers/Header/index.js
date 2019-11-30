/* eslint-disable require-jsdoc */
import React, {PureComponent} from 'react';
import {Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


class Header extends PureComponent {
  render() {
    return (
      <Navbar bg={'dark'} variant="dark">
        <NavLink to='' className="navbar-brand">
            User CRUD app
        </NavLink>
      </Navbar>
    );
  }
}

export default Header;
