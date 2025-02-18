import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewModal = ({ show, handleClose, modaldata }) => (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>View Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modaldata ? (
                <>
                    <p>
                    </p>
                    <p><strong>Customer ID:</strong> {modaldata.customer.custeromId}</p>
                    <p><strong>Order ID:</strong> {modaldata.modaldataId}</p>
                    <p><strong>Order Date:</strong> {modaldata.orderDate}</p>
                    <p><strong>Total Amount:</strong> {modaldata.totalAmount}</p>
                    <p><strong>Shipping Status:</strong> {modaldata.shippingStatus}</p>
                    <p><strong>Order Items:</strong> {modaldata.orderItems.orderItemId}</p>
                </>
            ) : (<>Not Found</>)}

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ViewModal;
