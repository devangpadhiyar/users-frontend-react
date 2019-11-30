import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

// eslint-disable-next-line require-jsdoc
function DeleteConfirmDialog(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
            Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

DeleteConfirmDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  heading: PropTypes.string,
  body: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmDialog;

