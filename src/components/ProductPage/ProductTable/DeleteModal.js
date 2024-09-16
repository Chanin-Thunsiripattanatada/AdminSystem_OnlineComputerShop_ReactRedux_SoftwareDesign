import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../../auth/AuthContext';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../actions/products';
const DeleteModal = ({ show, handleClose, modalId }) => {
    const dispatch = useDispatch();
    const { token } = useAuth();
       
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteProduct(token, modalId));
        handleClose();

    };
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
