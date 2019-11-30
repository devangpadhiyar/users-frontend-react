/* eslint-disable require-jsdoc */
import React, {PureComponent} from 'react';
import {Navbar} from 'react-bootstrap';


class Header extends PureComponent {
  render() {
    return (
      <Navbar bg={'dark'} variant="dark">
        <Navbar.Brand>
            User CRUD app
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
