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
                        <p><strong>Order ID:</strong> {modaldata.orderId}</p>
                        <p><strong>Customer:</strong> {modaldata.customer?.firstName} {modaldata.customer?.lastName}</p>
                        <p><strong>Email:</strong> {modaldata.customer?.email}</p>
                        <p><strong>Shipping Address:</strong> {modaldata.customer?.shippingAddress}</p>
                        <p><strong>Billing Address:</strong> {modaldata.customer?.billingAddress}</p>
                        <p><strong>Order Date:</strong> {new Date(modaldata.orderDate).toLocaleString()}</p>
                        <p><strong>Total Amount:</strong> ${modaldata.totalAmount.toFixed(2)}</p>
                        <p><strong>Shipping Status:</strong> {modaldata.shippingStatus}</p>
                        <h5>Order Items:</h5>
                        <ul>
                            {modaldata.orderItems && modaldata.orderItems.length > 0 ? (
                                modaldata.orderItems.map((item) => (
                                    <li key={item.orderItemId}>
                                        <strong>{item.product.name}</strong> - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                                    </li>
                                ))
                            ) : (
                                <li>No order items found.</li>
                            )}
                        </ul>

                        {/* Conditionally render the image upload form if modaldata.privateImage is null */}
                        {modaldata.privateImage == null ? (
                            <h4>ยังไม่ยืนยัน</h4>
                        ) : (
                            <p><strong>Private Image:</strong>ยืนยัน Image already uploaded.</p>
                        )}

                    </>
                ) : (
                    <>Not Found</>
                )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ViewModal;
