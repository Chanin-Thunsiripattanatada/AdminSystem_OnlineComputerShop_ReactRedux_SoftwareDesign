import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, onDelete }) => (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this customer?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={onDelete}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteModal;
